import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import {
  V1Alpha1TriggerRuleResourceCreateRequestDTO,
  V1Alpha1TriggerRuleResourceCreateResponseDTO,
  V1Alpha1TriggerRuleResourceReadResponseDTO,
  V1Alpha1TriggerRuleResourceUpdateRequestDTO,
  V1Alpha1TriggerRuleResourceUpdateResponseDTO,
} from '../dto/triggers.js'

const ResourceType = 'trigger_rule'

const ReadTriggerRuleResourceRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1TriggerRuleResourceReadResponseDTO],
}
const CreateTriggerRuleResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1TriggerRuleResourceCreateRequestDTO,
    V1Alpha1TriggerRuleResourceCreateResponseDTO,
  ],
}
const UpdateTriggerRuleResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1TriggerRuleResourceUpdateRequestDTO,
    V1Alpha1TriggerRuleResourceUpdateResponseDTO,
  ],
}

// ReadTriggerRuleResourceResponse is an alias for all possible response types for the read operation response
export type ReadTriggerRuleResourceResponse =
  V1Alpha1TriggerRuleResourceReadResponseDTO
// CreateTriggerRuleResourceRequest is an alias for all possible request types for the create operation body
export type CreateTriggerRuleResourceRequest =
  V1Alpha1TriggerRuleResourceCreateRequestDTO
// CreateTriggerRuleResourceResponse is an alias for all possible response types for the create operation response
export type CreateTriggerRuleResourceResponse =
  V1Alpha1TriggerRuleResourceCreateResponseDTO
// UpdateTriggerRuleResourceRequest is an alias for all possible request types for the update operation body
export type UpdateTriggerRuleResourceRequest =
  V1Alpha1TriggerRuleResourceUpdateRequestDTO
// UpdateTriggerRuleResourceResponse is an alias for all possible response types for the update operation response
export type UpdateTriggerRuleResourceResponse =
  V1Alpha1TriggerRuleResourceUpdateResponseDTO

/**
 * CreateTriggerOptions is the options for creating a trigger rule resource.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns CreateTriggerOptions
 */
export type CreateTriggerOptions = {
  request: CreateTriggerRuleResourceRequest | any
  version?: string
}

/**
 * DeleteTriggerOptions is the options for deleting a trigger rule resource.
 * @param id - The ID of the resource to delete.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns DeleteTriggerOptions
 */
export type DeleteTriggerOptions = {
  id: string
  version?: string
}

/**
 * GetTriggerOptions is the options for getting a trigger rule resource.
 * @param id - The ID of the resource to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetTriggerOptions
 */
export type GetTriggerOptions = {
  id: string
  version?: string
}

/**
 * ListTriggersOptions is the options for listing trigger rule resources.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListTriggersOptions
 */
export type ListTriggersOptions = {
  version?: string
}

/**
 * UpdateTriggerOptions is the options for updating a trigger rule resource.
 * @param id - The ID of the resource to update.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns UpdateTriggerOptions
 */
export type UpdateTriggerOptions = {
  id: string
  request: UpdateTriggerRuleResourceRequest | any
  version?: string
}

/**
 * TriggersApi provides the API for managing trigger resources.
 *
 * @param client - The API client to use.
 * @returns TriggersApi
 */
export class TriggersApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Create a new trigger rule resource.
   * @param options - The options for creating a trigger rule resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<CreateTriggerRuleResourceResponse>
   */
  public async createTrigger(
    options: CreateTriggerOptions,
    initOverride?: RequestInit
  ): Promise<CreateTriggerRuleResourceResponse> {
    const { request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      CreateTriggerRuleResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/triggers/',
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
        ) as CreateTriggerRuleResourceResponse
      })
  }

  /**
   * Delete a trigger rule resource.
   * @param options - The options for deleting a trigger rule resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadTriggerRuleResourceResponse>
   */
  public async deleteTrigger(
    options: DeleteTriggerOptions,
    initOverride?: RequestInit
  ): Promise<ReadTriggerRuleResourceResponse> {
    const { id, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadTriggerRuleResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/triggers/${id}`,
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
        ) as ReadTriggerRuleResourceResponse
      })
  }

  /**
   * List all trigger rule resources.
   * @param options - The options for listing trigger rule resources.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadTriggerRuleResourceResponse[]>
   */
  public async listTriggers(
    options: ListTriggersOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadTriggerRuleResourceResponse[]> {
    const { version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadTriggerRuleResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/triggers/',
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
          (item: any) =>
            ResponseDto!.fromJSON(item) as ReadTriggerRuleResourceResponse
        )
      })
  }

  /**
   * Get a trigger rule resource.
   * @param options - The options for getting a trigger rule resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadTriggerRuleResourceResponse>
   */
  public async getTrigger(
    options: GetTriggerOptions,
    initOverride?: RequestInit
  ): Promise<ReadTriggerRuleResourceResponse> {
    const { id, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadTriggerRuleResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/triggers/${id}`,
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
        ) as ReadTriggerRuleResourceResponse
      })
  }

  /**
   * Update a trigger rule resource.
   * @param options - The options for updating a trigger rule resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<UpdateTriggerRuleResourceResponse>
   */
  public async updateTrigger(
    options: UpdateTriggerOptions,
    initOverride?: RequestInit
  ): Promise<UpdateTriggerRuleResourceResponse> {
    const { id, request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      UpdateTriggerRuleResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/triggers/${id}`,
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
        ) as UpdateTriggerRuleResourceResponse
      })
  }
}
