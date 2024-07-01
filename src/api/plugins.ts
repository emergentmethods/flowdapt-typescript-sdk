import { ReadableStream } from 'stream/web'
import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import {
  V1Alpha1PluginReadResponseDTO,
  V1Alpha1PluginFilesListResponseDTO,
} from '../dto/plugins.js'

const PluginResourceType = 'plugin'
const PluginFileResourceType = 'plugin.files'

const ReadPluginRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1PluginReadResponseDTO],
}
const ReadPluginFilesListRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1PluginFilesListResponseDTO],
}

// ReadPluginResponse is an alias for all possible response types for the plugin response
export type ReadPluginResponse = V1Alpha1PluginReadResponseDTO
// ReadPluginFilesListResponse is an alias for all possible response types for the plugin files list response
export type ReadPluginFilesListResponse = V1Alpha1PluginFilesListResponseDTO

/**
 * GetPluginOptions is the options for getting a plugin.
 * @param name - The name of the plugin to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetPluginOptions
 */
export type GetPluginOptions = {
  name: string
  version?: string
}

/**
 * ListPluginsOptions is the options for listing plugins.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListPluginsOptions
 */
export type ListPluginsOptions = {
  version?: string
}

/**
 * ListPluginFilesOptions is the options for listing files in a plugin.
 * @param name - The name of the plugin to list files for.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListPluginFilesOptions
 */
export type ListPluginFilesOptions = {
  name: string
  version?: string
}

/**
 * DownloadPluginFileOptions is the options for downloading a file from a plugin.
 * @param name - The name of the plugin to get the file from.
 * @param file - The name of the file to get.
 * @returns DownloadPluginFileOptions
 */
export type DownloadPluginFileOptions = {
  name: string
  file: string
}

/**
 * PluginsApi provides mechanisms to interact with the Plugins API.
 *
 * @param client - The API client to use.
 * @returns PluginsApi
 */
export class PluginsApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Get the plugin by name.
   * @param options - The options for getting the plugin.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadPluginResponse>
   */
  public async getPlugin(
    options: GetPluginOptions,
    initOverride?: RequestInit
  ): Promise<ReadPluginResponse> {
    const { name, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadPluginRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/plugin/${name}`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              PluginResourceType,
              resolvedVersion
            ),
          },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return ResponseDto!.fromJSON(response.content) as ReadPluginResponse
      })
  }

  /**
   * List the plugins.
   * @param options - The options for listing plugins.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadPluginResponse[]>
   */
  public async listPlugins(
    options: ListPluginsOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadPluginResponse[]> {
    const { version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadPluginRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/plugin/`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              PluginResourceType,
              resolvedVersion
            ),
          },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return response.content.map(
          (item: any) => ResponseDto!.fromJSON(item) as ReadPluginResponse
        )
      })
  }

  /**
   * List the files in the plugin.
   * @param options - The options for listing files in a plugin.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadPluginFilesListResponse>
   */
  public async listPluginFiles(
    options: ListPluginFilesOptions,
    initOverride?: RequestInit
  ): Promise<ReadPluginFilesListResponse> {
    const { name, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadPluginFilesListRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/plugin/${name}/files`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              PluginFileResourceType,
              resolvedVersion
            ),
          },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return ResponseDto!.fromJSON(
          response.content
        ) as ReadPluginFilesListResponse
      })
  }

  /**
   * Download a file from a plugin.
   * @param options - The options for downloading a file from a plugin.
   * @param initOverride - Optional request init override.
   * @returns Promise<Buffer>
   */
  public async downloadPluginFile(
    options: DownloadPluginFileOptions,
    initOverride?: RequestInit
  ): Promise<ReadableStream<any>> {
    const { name, file } = options

    return this.client
      .request<ReadableStream<any>>(
        {
          path: `/plugin/${name}/files/${file}`,
          method: 'GET',
          accept: [['application/octet-stream', 1.0]],
        },
        initOverride
      )
      .then(response => {
        return response.content
      })
  }
}
