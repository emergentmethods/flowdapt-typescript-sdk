import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import { V1Alpha1MetricsDTO } from '../dto/metrics.js'

const ResourceType = 'metrics'

const ReadMetricsRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1MetricsDTO],
}

// ReadMetricsResponse is an alias for all possible response types for the metrics response
export type ReadMetricsResponse = V1Alpha1MetricsDTO

/**
 * GetMetricsOptions is the options for getting metrics.
 * @param name - The name of the metric to get.
 * @param start_time - The start time of the metric to get.
 * @param end_time - The end time of the metric to get.
 * @param max_length - The maximum number of values to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetMetricsOptions
 */
export type GetMetricsOptions = {
  name?: string
  start_time?: Date
  end_time?: Date
  max_length?: number
  version?: string
}

/**
 * MetricsApi provides the API for viewing the metrics.
 *
 * @param client - The API client to use.
 * @returns MetricsApi
 */
export class MetricsApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Get the metrics.
   * @param options - The options for getting the metrics.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadMetricsResourceResponse>
   */
  public async getMetrics(
    options: GetMetricsOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadMetricsResponse> {
    const { name, start_time, end_time, max_length, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadMetricsRequestDtos,
      null,
      version
    )

    const query: Record<string, string> = {}
    if (name) query['name'] = name
    if (start_time) query['start_time'] = start_time.toISOString()
    if (end_time) query['end_time'] = end_time.toISOString()
    if (max_length) query['max_length'] = max_length.toString()

    return this.client
      .request<Json>(
        {
          path: `/metrics`,
          method: 'GET',
          query: query,
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
        return ResponseDto!.fromJSON(response.content) as ReadMetricsResponse
      })
  }
}
