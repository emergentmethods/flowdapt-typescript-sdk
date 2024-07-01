import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import { V1Alpha1SystemStatusResponseDTO } from '../dto/system.js'

const ResourceType = 'system'

const ReadSystemStatusRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1SystemStatusResponseDTO],
}

// ReadSystemStatusResponse is an alias for all possible response types for the system status response
export type ReadSystemStatusResponse = V1Alpha1SystemStatusResponseDTO

/**
 * GetStatusOptions is the options for getting the system status.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetStatusOptions
 */
export type GetStatusOptions = {
  version?: string
}

/**
 * SystemApi provides the API for viewing the system status.
 *
 * @param client - The API client to use.
 * @returns SystemApi
 */
export class SystemApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Get the system status.
   * @param options - The options for getting the system status.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadSystemResourceResponse>
   */
  public async status(
    options: GetStatusOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadSystemStatusResponse> {
    const { version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadSystemStatusRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/status`,
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
        ) as ReadSystemStatusResponse
      })
  }
}
