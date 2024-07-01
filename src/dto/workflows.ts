import { z } from 'zod'
import { V1Alpha1ResourceMetadataSchema } from './base.js'
import { DTO, Json } from '../types.js'

/**
 * V1Alpha1WorkflowStage is a stage in a workflow.
 */
export const V1Alpha1WorkflowStageSchema = z.object({
  type: z.enum(['simple', 'parameterized']).optional().default('simple'),
  target: z.string(),
  name: z.string(),
  description: z.string().optional().default(''),
  version: z.string().optional().default(''),
  depends_on: z.array(z.string()).optional().default([]),
  options: z.record(z.any()).optional().default({}),
  resources: z.record(z.any()).optional().default({}),
  priority: z.number().optional().nullable().default(null),
})
export type V1Alpha1WorkflowStage = z.infer<typeof V1Alpha1WorkflowStageSchema>

/**
 * V1Alpha1WorkflowResourceSpec is the spec for a workflow resource.
 */
export const V1Alpha1WorkflowResourceSpecSchema = z.object({
  stages: z.array(V1Alpha1WorkflowStageSchema),
})
export type V1Alpha1WorkflowResourceSpec = z.infer<
  typeof V1Alpha1WorkflowResourceSpecSchema
>

/**
 * V1Alpha1WorkflowResourceKind is the kind for a workflow resource.
 */
export const V1Alpha1WorkflowResourceKindSchema = z.literal('workflow')
export type V1Alpha1WorkflowResourceKind = z.infer<
  typeof V1Alpha1WorkflowResourceKindSchema
>

/**
 * V1Alpha1WorkflowRunSchema is the schema for a workflow run.
 */
export const V1Alpha1WorkflowRunSchema = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  workflow: z.string(),
  started_at: z.coerce.date(),
  finished_at: z.optional(z.coerce.date()),
  result: z.any(),
  state: z.enum(['pending', 'running', 'finished', 'failed']),
  source: z.string().optional(),
})
export type V1Alpha1WorkflowRun = z.infer<typeof V1Alpha1WorkflowRunSchema>

export const V1Alpha1WorkflowResourceCreateRequestSchema = z.object({
  kind: V1Alpha1WorkflowResourceKindSchema.optional(),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1WorkflowResourceSpecSchema,
})
/**
 * V1Alpha1WorkflowResourceCreateRequest is a type for a request to create a workflow resource.
 */
export type V1Alpha1WorkflowResourceCreateRequest = z.infer<
  typeof V1Alpha1WorkflowResourceCreateRequestSchema
>

export const V1Alpha1WorkflowResourceCreateResponseSchema = z.object({
  kind: V1Alpha1WorkflowResourceKindSchema.default('workflow'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1WorkflowResourceSpecSchema,
})
/**
 * V1Alpha1WorkflowResourceCreateResponse is a type for a response to creating a workflow resource.
 */
export type V1Alpha1WorkflowResourceCreateResponse = z.infer<
  typeof V1Alpha1WorkflowResourceCreateResponseSchema
>

export const V1Alpha1WorkflowResourceReadResponseSchema = z.object({
  kind: V1Alpha1WorkflowResourceKindSchema.default('workflow'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1WorkflowResourceSpecSchema,
})
/**
 * V1Alpha1WorkflowResourceReadResponse is a type for a response to a read request for a workflow resource.
 */
export type V1Alpha1WorkflowResourceReadResponse = z.infer<
  typeof V1Alpha1WorkflowResourceReadResponseSchema
>

export const V1Alpha1WorkflowResourceUpdateRequestSchema = z.object({
  kind: V1Alpha1WorkflowResourceKindSchema.optional(),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1WorkflowResourceSpecSchema,
})
/**
 * V1Alpha1WorkflowResourceUpdateRequest is a type for a request to update a workflow resource.
 */
export type V1Alpha1WorkflowResourceUpdateRequest = z.infer<
  typeof V1Alpha1WorkflowResourceUpdateRequestSchema
>

export const V1Alpha1WorkflowResourceUpdateResponseSchema = z.object({
  kind: V1Alpha1WorkflowResourceKindSchema.default('workflow'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1WorkflowResourceSpecSchema,
})
/**
 * V1Alpha1WorkflowResourceUpdateResponse is a type for a response to updating a workflow resource.
 */
export type V1Alpha1WorkflowResourceUpdateResponse = z.infer<
  typeof V1Alpha1WorkflowResourceUpdateResponseSchema
>

export const V1Alpha1WorkflowRunReadResponseSchema = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  workflow: z.string(),
  started_at: z.coerce.date(),
  finished_at: z.optional(z.coerce.date()),
  result: z.any(),
  state: z.enum(['pending', 'running', 'finished', 'failed']),
  source: z.string().optional(),
})
/**
 * V1Alpha1WorkflowRunReadResponse is a type for a response to a read request for a workflow run.
 */
export type V1Alpha1WorkflowRunReadResponse = z.infer<
  typeof V1Alpha1WorkflowRunReadResponseSchema
>

/**
 * V1Alpha1WorkflowResourceCreateRequestDTO is a request to create a workflow resource.
 */
export class V1Alpha1WorkflowResourceCreateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow.v1alpha1+json'

  data: V1Alpha1WorkflowResourceCreateRequest

  /**
   * Create a new V1Alpha1WorkflowResourceCreateRequestDTO.
   *
   * @param data - The data of the workflow resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowResourceCreateRequestDTO
   */
  constructor(data: V1Alpha1WorkflowResourceCreateRequest) {
    this.data = V1Alpha1WorkflowResourceCreateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1WorkflowResourceCreateRequest
   */
  toJSON(): V1Alpha1WorkflowResourceCreateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowResourceCreateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowResourceCreateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowResourceCreateRequestDTO {
    return new V1Alpha1WorkflowResourceCreateRequestDTO(json)
  }
}

/**
 * V1Alpha1WorkflowResourceCreateResponseDTO is a response to creating a workflow resource.
 */
export class V1Alpha1WorkflowResourceCreateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow.v1alpha1+json'

  data: V1Alpha1WorkflowResourceCreateResponse

  /**
   * Create a new V1Alpha1WorkflowResourceCreateResponseDTO.
   *
   * @param data - The data of the workflow resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowResourceCreateResponseDTO
   */
  constructor(data: V1Alpha1WorkflowResourceCreateResponse) {
    this.data = V1Alpha1WorkflowResourceCreateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1WorkflowResourceCreateResponse
   */
  toJSON(): V1Alpha1WorkflowResourceCreateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowResourceCreateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowResourceCreateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowResourceCreateResponseDTO {
    return new V1Alpha1WorkflowResourceCreateResponseDTO(json)
  }
}

/**
 * V1Alpha1WorkflowResourceReadResponseDTO is a response to a read request for a workflow resource.
 */
export class V1Alpha1WorkflowResourceReadResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow.v1alpha1+json'

  data: V1Alpha1WorkflowResourceReadResponse

  /**
   * Create a new V1Alpha1WorkflowResourceReadResponseDTO.
   *
   * @param data - The data of the workflow resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowResourceReadResponseDTO
   */
  constructor(data: V1Alpha1WorkflowResourceReadResponse) {
    this.data = V1Alpha1WorkflowResourceReadResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1WorkflowResourceReadResponse
   */
  toJSON(): V1Alpha1WorkflowResourceReadResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowResourceReadResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowResourceReadResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowResourceReadResponseDTO {
    return new V1Alpha1WorkflowResourceReadResponseDTO(json)
  }
}

/**
 * V1Alpha1WorkflowResourceUpdateRequestDTO is a request to update a workflow resource.
 */
export class V1Alpha1WorkflowResourceUpdateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow.v1alpha1+json'

  data: V1Alpha1WorkflowResourceUpdateRequest

  /**
   * Create a new V1Alpha1WorkflowResourceUpdateRequestDTO.
   *
   * @param data - The data of the workflow resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowResourceUpdateRequestDTO
   */
  constructor(data: V1Alpha1WorkflowResourceUpdateRequest) {
    this.data = V1Alpha1WorkflowResourceUpdateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1WorkflowResourceUpdateRequest
   */
  toJSON(): V1Alpha1WorkflowResourceUpdateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowResourceUpdateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowResourceUpdateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowResourceUpdateRequestDTO {
    return new V1Alpha1WorkflowResourceUpdateRequestDTO(json)
  }
}

/**
 * V1Alpha1WorkflowResourceUpdateResponseDTO is a response to updating a workflow resource.
 */
export class V1Alpha1WorkflowResourceUpdateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow.v1alpha1+json'

  data: V1Alpha1WorkflowResourceUpdateResponse

  /**
   * Create a new V1Alpha1WorkflowResourceUpdateResponseDTO.
   *
   * @param data - The data of the workflow resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowResourceUpdateResponseDTO
   */
  constructor(data: V1Alpha1WorkflowResourceUpdateResponse) {
    this.data = V1Alpha1WorkflowResourceUpdateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1WorkflowResourceUpdateResponse
   */
  toJSON(): V1Alpha1WorkflowResourceUpdateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowResourceUpdateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowResourceUpdateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowResourceUpdateResponseDTO {
    return new V1Alpha1WorkflowResourceUpdateResponseDTO(json)
  }
}

/**
 * V1Alpha1WorkflowRunReadResponse is a response to a read request for a workflow run.
 */
export class V1Alpha1WorkflowRunReadResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.workflow_run.v1alpha1+json'

  data: V1Alpha1WorkflowRunReadResponse

  /**
   * Create a new V1Alpha1WorkflowRunReadResponseDTO.
   *
   * @param data - The data of the workflow run.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns V1Alpha1WorkflowRunReadResponseDTO
   */
  constructor(data: V1Alpha1WorkflowRunReadResponse) {
    this.data = V1Alpha1WorkflowRunReadResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1Alpha1WorkflowRunReadResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1WorkflowRunReadResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1WorkflowRunReadResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1WorkflowRunReadResponseDTO {
    return new V1Alpha1WorkflowRunReadResponseDTO(json)
  }
}

export type WorkflowResourceCreateRequestDTOType = {
  v1alpha1: V1Alpha1WorkflowResourceCreateRequestDTO
  latest: V1Alpha1WorkflowResourceCreateRequestDTO
}
export type WorkflowResourceCreateResponseDTOType = {
  v1alpha1: V1Alpha1WorkflowResourceCreateResponseDTO
  latest: V1Alpha1WorkflowResourceCreateResponseDTO
}
export type WorkflowResourceReadResponseDTOType = {
  v1alpha1: V1Alpha1WorkflowResourceReadResponseDTO
  latest: V1Alpha1WorkflowResourceReadResponseDTO
}
export type WorkflowResourceUpdateRequestDTOType = {
  v1alpha1: V1Alpha1WorkflowResourceUpdateRequestDTO
  latest: V1Alpha1WorkflowResourceUpdateRequestDTO
}
export type WorkflowResourceUpdateResponseDTOType = {
  v1alpha1: V1Alpha1WorkflowResourceUpdateResponseDTO
  latest: V1Alpha1WorkflowResourceUpdateResponseDTO
}
export type WorkflowRunReadResponseDTOType = {
  v1alpha1: V1Alpha1WorkflowRunReadResponseDTO
  latest: V1Alpha1WorkflowRunReadResponseDTO
}
