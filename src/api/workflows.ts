import { APIClient } from '../base.js'
import { DTOsMap, Json } from '../types.js'
import { buildRequestData, buildVersionHeader } from '../utils.js'
import { APIVersionHeader } from '../constants.js'
import {
  V1Alpha1WorkflowResourceCreateRequestDTO,
  V1Alpha1WorkflowResourceCreateResponseDTO,
  V1Alpha1WorkflowResourceReadResponseDTO,
  V1Alpha1WorkflowResourceUpdateRequestDTO,
  V1Alpha1WorkflowResourceUpdateResponseDTO,
  V1Alpha1WorkflowRunReadResponseDTO,
} from '../dto/workflows.js'

const WorkflowResourceType = 'workflow'
const WorkflowRunResourceType = 'workflow_run'

const ReadWorkflowResourceRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1WorkflowResourceReadResponseDTO],
}
const CreateWorkflowResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1WorkflowResourceCreateRequestDTO,
    V1Alpha1WorkflowResourceCreateResponseDTO,
  ],
}
const UpdateWorkflowResourceRequestDtos: DTOsMap = {
  v1alpha1: [
    V1Alpha1WorkflowResourceUpdateRequestDTO,
    V1Alpha1WorkflowResourceUpdateResponseDTO,
  ],
}

const ReadWorkflowRunResourceRequestDtos: DTOsMap = {
  v1alpha1: [undefined, V1Alpha1WorkflowRunReadResponseDTO],
}

// ReadWorkflowResourceResponse is an alias for all possible response types for the read operation response
export type ReadWorkflowResourceResponse =
  V1Alpha1WorkflowResourceReadResponseDTO
// CreateWorkflowResourceRequest is an alias for all possible request types for the create operation body
export type CreateWorkflowResourceRequest =
  V1Alpha1WorkflowResourceCreateRequestDTO
// CreateWorkflowResourceResponse is an alias for all possible response types for the create operation response
export type CreateWorkflowResourceResponse =
  V1Alpha1WorkflowResourceCreateResponseDTO
// UpdateWorkflowResourceRequest is an alias for all possible request types for the update operation body
export type UpdateWorkflowResourceRequest =
  V1Alpha1WorkflowResourceUpdateRequestDTO
// UpdateWorkflowResourceResponse is an alias for all possible response types for the update operation response
export type UpdateWorkflowResourceResponse =
  V1Alpha1WorkflowResourceUpdateResponseDTO

// ReadWorkflowRunResourceResponse is an alias for all possible response types for the read operation response
export type ReadWorkflowRunResourceResponse = V1Alpha1WorkflowRunReadResponseDTO

/**
 * CreateWorkflowOptions is the options for creating a workflow resource.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns CreateWorkflowOptions
 */
export type CreateWorkflowOptions = {
  request: CreateWorkflowResourceRequest | any
  version?: string
}

/**
 * DeleteWorkflowOptions is the options for deleting a workflow resource.
 * @param identifier - The ID or name of the resource to delete.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns DeleteWorkflowOptions
 */
export type DeleteWorkflowOptions = {
  identifier: string
  version?: string
}

/**
 * GetWorkflowOptions is the options for getting a workflow resource.
 * @param identifier - The ID or name of the resource to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetWorkflowOptions
 */
export type GetWorkflowOptions = {
  identifier: string
  version?: string
}

/**
 * ListWorkflowsOptions is the options for listing workflow resources.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListWorkflowsOptions
 */
export type ListWorkflowsOptions = {
  version?: string
}

/**
 * UpdateWorkflowOptions is the options for updating a workflow resource.
 * @param identifier - The ID or name of the resource to update.
 * @param request - The request body. Can be a specific request type or a generic object.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns UpdateWorkflowOptions
 */
export type UpdateWorkflowOptions = {
  identifier: string
  request: UpdateWorkflowResourceRequest | any
  version?: string
}

/**
 * ListWorkflowRunsOptions is the options for listing workflow run resources.
 * @param identifier - The ID or name of the workflow to list runs for.
 * @param limit - The maximum number of runs to return.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns ListWorkflowRunsOptions
 */
export type ListWorkflowRunsOptions = {
  identifier: string
  limit?: number
  version?: string
}

/**
 * GetWorkflowRunOptions is the options for getting a workflow run resource.
 * @param identifier - The ID or name of the resource to get.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns GetWorkflowRunOptions
 */
export type GetWorkflowRunOptions = {
  identifier: string
  version?: string
}

/**
 * DeleteWorkflowRunOptions is the options for deleting a workflow run resource.
 * @param identifier - The ID or name of the resource to delete.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns DeleteWorkflowRunOptions
 */
export type DeleteWorkflowRunOptions = {
  identifier: string
  version?: string
}

/**
 * RunWorkflowOptions is the options for running a workflow.
 * @param identifier - The ID or name of the workflow to run.
 * @param input - The input data for the workflow run.
 * @param wait - Whether to wait for the run to complete before returning.
 * @param namespace - The namespace to run the workflow in.
 * @param version - The API version to use. If not provided, the latest version will be used.
 * @returns RunWorkflowOptions
 */
export type RunWorkflowOptions = {
  identifier: string
  input?: Json
  wait?: boolean
  namespace?: string
  version?: string
}

/**
 * WorkflowsApi provides the API for managing workflow resources.
 *
 * @param client - The API client to use.
 * @returns WorkflowsApi
 */
export class WorkflowsApi {
  client: APIClient

  constructor(client: APIClient) {
    this.client = client
  }

  /**
   * Create a new workflow resource.
   * @param options - The options for creating a workflow resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<CreateWorkflowResourceResponse>
   */
  public async createWorkflow(
    options: CreateWorkflowOptions,
    initOverride?: RequestInit
  ): Promise<CreateWorkflowResourceResponse> {
    const { request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      CreateWorkflowResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/workflows/',
          method: 'POST',
          body: RequestDto!.toJSON(),
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowResourceType,
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
        ) as CreateWorkflowResourceResponse
      })
  }

  /**
   * Delete a workflow resource.
   * @param options - The options for deleting a workflow resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowResourceResponse>
   */
  public async deleteWorkflow(
    options: DeleteWorkflowOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/${identifier}`,
          method: 'DELETE',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowResourceType,
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
        ) as ReadWorkflowResourceResponse
      })
  }

  /**
   * List all workflow resources.
   * @param options - The options for listing workflow resources.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowResourceResponse[]>
   */
  public async listWorkflows(
    options: ListWorkflowsOptions = {},
    initOverride?: RequestInit
  ): Promise<ReadWorkflowResourceResponse[]> {
    const { version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: '/workflows/',
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowResourceType,
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
            ResponseDto!.fromJSON(item) as ReadWorkflowResourceResponse
        )
      })
  }

  /**
   * Get a workflow resource.
   * @param options - The options for getting a workflow resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowResourceResponse>
   */
  public async getWorkflow(
    options: GetWorkflowOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/${identifier}`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowResourceType,
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
        ) as ReadWorkflowResourceResponse
      })
  }

  /**
   * Update a workflow resource.
   * @param options - The options for updating a workflow resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<UpdateWorkflowResourceResponse>
   */
  public async updateWorkflow(
    options: UpdateWorkflowOptions,
    initOverride?: RequestInit
  ): Promise<UpdateWorkflowResourceResponse> {
    const { identifier, request, version } = options
    const [RequestDto, ResponseDto, resolvedVersion] = buildRequestData(
      UpdateWorkflowResourceRequestDtos,
      request,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/${identifier}`,
          method: 'PUT',
          body: RequestDto!.toJSON(),
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowResourceType,
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
        ) as UpdateWorkflowResourceResponse
      })
  }

  /**
   * List all workflow run resources.
   * @param options - The options for listing workflow run resources.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowRunResourceResponse[]>
   */
  public async listWorkflowRuns(
    options: ListWorkflowRunsOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowRunResourceResponse[]> {
    const { identifier, limit, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowRunResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/${identifier}/run`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowRunResourceType,
              resolvedVersion
            ),
          },
          query: { limit: (limit || 10).toString() },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return response.content.map(
          (item: Json) =>
            ResponseDto!.fromJSON(item) as ReadWorkflowRunResourceResponse
        )
      })
  }

  /**
   * Get a workflow run resource.
   * @param options - The options for getting a workflow run resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowRunResourceResponse>
   */
  public async getWorkflowRun(
    options: GetWorkflowRunOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowRunResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowRunResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/run/${identifier}`,
          method: 'GET',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowRunResourceType,
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
        ) as ReadWorkflowRunResourceResponse
      })
  }

  /**
   * Delete a workflow run.
   * @param options - The options for deleting a workflow run resource.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowRunResourceResponse>
   */
  public async deleteWorkflowRun(
    options: DeleteWorkflowRunOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowRunResourceResponse> {
    const { identifier, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowRunResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/run/${identifier}`,
          method: 'DELETE',
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowRunResourceType,
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
        ) as ReadWorkflowRunResourceResponse
      })
  }

  /**
   * Run a workflow.
   * @param options - The options for running a workflow.
   * @param initOverride - Optional request init override.
   * @returns Promise<ReadWorkflowRunResourceResponse>
   */
  public async runWorkflow(
    options: RunWorkflowOptions,
    initOverride?: RequestInit
  ): Promise<ReadWorkflowRunResourceResponse> {
    const { identifier, input = {}, wait = true, namespace, version } = options
    const [_, ResponseDto, resolvedVersion] = buildRequestData(
      ReadWorkflowRunResourceRequestDtos,
      null,
      version
    )

    return this.client
      .request<Json>(
        {
          path: `/workflows/${identifier}/run`,
          method: 'POST',
          body: input,
          headers: {
            [APIVersionHeader]: buildVersionHeader(
              WorkflowRunResourceType,
              resolvedVersion
            ),
          },
          query: {
            wait: wait.toString(),
            ...(namespace ? { namespace } : {}),
          },
          accept: [[ResponseDto!.__contentType, 1.0]],
        },
        initOverride
      )
      .then(response => {
        return ResponseDto!.fromJSON(
          response.content
        ) as ReadWorkflowRunResourceResponse
      })
  }
}
