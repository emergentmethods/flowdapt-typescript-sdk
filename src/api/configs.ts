import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import {
  V1Alpha1ConfigResourceCreateRequestDTO,
  V1Alpha1ConfigResourceCreateResponseDTO,
  V1Alpha1ConfigResourceUpdateRequestDTO,
  V1Alpha1ConfigResourceUpdateResponseDTO,
  V1Alpha1ConfigResourceReadResponseDTO,
} from '../dto/configs.js'

const ResourceType = 'config'

const ReadConfigResourceRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1ConfigResourceReadResponseDTO],
}
const CreateConfigResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1ConfigResourceCreateRequestDTO,
    V1Alpha1ConfigResourceCreateResponseDTO,
  ],
}
const UpdateConfigResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1ConfigResourceUpdateRequestDTO,
    V1Alpha1ConfigResourceUpdateResponseDTO,
  ],
}

// ReadConfigResourceResponse is an alias for all possible response types for the read operation response
export type ReadConfigResourceResponse = V1Alpha1ConfigResourceReadResponseDTO
// CreateConfigResourceRequest is an alias for all possible request types for the create operation body
export type CreateConfigResourceRequest = V1Alpha1ConfigResourceCreateRequestDTO
// CreateConfigResourceResponse is an alias for all possible response types for the create operation response
export type CreateConfigResourceResponse =
  V1Alpha1ConfigResourceCreateResponseDTO
// UpdateConfigResourceRequest is an alias for all possible request types for the update operation body
export type UpdateConfigResourceRequest = V1Alpha1ConfigResourceUpdateRequestDTO
// UpdateConfigResourceResponse is an alias for all possible response types for the update operation response
export type UpdateConfigResourceResponse =
  V1Alpha1ConfigResourceUpdateResponseDTO

/**
 * CreateConfigOptions is the options for creating a config resource.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns CreateConfigOptions
 */
export type CreateConfigOptions = {
  request: CreateConfigResourceRequest | any
  version?: string
}

/**
 * DeleteConfigOptions is the options for deleting a config resource.
 * @param identifier - The ID or name of the resource to delete.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns DeleteConfigOptions
 */
export type DeleteConfigOptions = {
  identifier: string
  version?: string
}

/**
 * ListConfigsOptions is the options for listing config resources.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListConfigsOptions
 */
export type ListConfigsOptions = {
  version?: string
}

/**
 * GetConfigOptions is the options for getting a config resource.
 * @param identifier - The ID or name of the resource to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetConfigOptions
 */
export type GetConfigOptions = {
  identifier: string
  version?: string
}

/**
 * UpdateConfigOptions is the options for updating a config resource.
 * @param identifier - The ID or name of the resource to update.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns UpdateConfigOptions
 */
export type UpdateConfigOptions = {
  identifier: string
  request: UpdateConfigResourceRequest | any
  version?: string
}

/**
 * ConfigsApi provides the API for managing config resources.
 *
 * @param client - The API client to use.
 * @returns ConfigsApi
 */
export class ConfigsApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Create a new config resource.
   * @param options - The options for creating the config resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<CreateConfigResourceResponse>
   */
  public async createConfig(
    options: CreateConfigOptions,
    initOverride?: RequestInit
  ): Promise<CreateConfigResourceResponse> {
    const { request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      CreateConfigResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/configs/',
          method: 'POST',
          body: RequestDto!.toJSON(),
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              ResourceType,
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
        ) as CreateConfigResourceResponse
      })
  }

  /**
   * Delete a config resource.
   * @param options - The options for deleting the config resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadConfigResourceResponse>
   */
  public async deleteConfig(
    options: DeleteConfigOptions,
    initOverride?: RequestInit
  ): Promise<ReadConfigResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadConfigResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/configs/${identifier}`,
          method: 'DELETE',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              ResourceType,
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
        ) as ReadConfigResourceResponse
      })
  }

  /**
   * List all config resources.
   * @param options - The options for listing the config resources.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadConfigResourceResponse[]>
   */
  public async listConfigs(
    options: ListConfigsOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadConfigResourceResponse[]> {
    const { version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadConfigResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/configs/',
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              ResourceType,
              resolvedVersion
            ),
          },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return response.content.map(
          (item: Json) =>
            ResponseDto!.fromJSON(item) as ReadConfigResourceResponse
        )
      })
  }

  /**
   * Get a config resource.
   * @param options - The options for getting the config resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadConfigResourceResponse>
   */
  public async getConfig(
    options: GetConfigOptions,
    initOverride?: RequestInit
  ): Promise<ReadConfigResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadConfigResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/configs/${identifier}`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              ResourceType,
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
        ) as ReadConfigResourceResponse
      })
  }

  /**
   * Update a config resource.
   * @param options - The options for updating the config resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<UpdateConfigResourceResponse>
   */
  public async updateConfig(
    options: UpdateConfigOptions,
    initOverride?: RequestInit
  ): Promise<UpdateConfigResourceResponse> {
    const { identifier, request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      UpdateConfigResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/configs/${identifier}`,
          method: 'PUT',
          body: RequestDto!.toJSON(),
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              ResourceType,
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
        ) as UpdateConfigResourceResponse
      })
  }
}
