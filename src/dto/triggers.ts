import { z } from 'zod'
import { V1Alpha1ResourceMetadataSchema } from './base.js'
import { DTO, Json } from '../types.js'

export const V1Alpha1TriggerRuleTypeSchema = z.enum(['schedule', 'condition'])
/**
 * V1Alpha1TriggerRuleType is a type of trigger rule.
 */
export type V1Alpha1TriggerRuleType = z.infer<
  typeof V1Alpha1TriggerRuleTypeSchema
>

export const V1Alpha1TriggerRuleActionSchema = z.object({
  target: z.string(),
  parameters: z.record(z.any()),
})
/**
 * V1Alpha1TriggerRuleAction is the action to be taken when the trigger rule is triggered.
 */
export type V1Alpha1TriggerRuleAction = z.infer<
  typeof V1Alpha1TriggerRuleActionSchema
>

export const V1Alpha1TriggerRuleResourceSpecSchema = z.object({
  type: V1Alpha1TriggerRuleTypeSchema,
  rule: z.record(z.any()).or(z.array(z.string())),
  action: V1Alpha1TriggerRuleActionSchema,
})
/**
 * V1Alpha1TriggerRuleResourceSpec is a type for a trigger rule.
 */
export type V1Alpha1TriggerRuleResourceSpec = z.infer<
  typeof V1Alpha1TriggerRuleResourceSpecSchema
>

export const V1Alpha1TriggerRuleResourceKindSchema = z.literal('trigger_rule')
/**
 * V1Alpha1TriggerResourceKind is a type for the kind of a trigger resource.
 * The kind of a trigger resource is always 'trigger'.
 */
export type V1Alpha1TriggerRuleResourceKind = z.infer<
  typeof V1Alpha1TriggerRuleResourceKindSchema
>

export const V1Alpha1TriggerRuleResourceCreateRequestSchema = z.object({
  kind: V1Alpha1TriggerRuleResourceKindSchema.optional(),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1TriggerRuleResourceSpecSchema,
})
/**
 * V1Alpha1TriggerResourceCreateRequest is a type for a request to create a new trigger resource.
 */
export type V1Alpha1TriggerRuleResourceCreateRequest = z.infer<
  typeof V1Alpha1TriggerRuleResourceCreateRequestSchema
>

export const V1Alpha1TriggerRuleResourceCreateResponseSchema = z.object({
  kind: V1Alpha1TriggerRuleResourceKindSchema.default('trigger_rule'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1TriggerRuleResourceSpecSchema,
})
/**
 * V1Alpha1TriggerResourceCreateResponse is a type for a response to a create request for a trigger resource.
 */
export type V1Alpha1TriggerRuleResourceCreateResponse = z.infer<
  typeof V1Alpha1TriggerRuleResourceCreateResponseSchema
>

export const V1Alpha1TriggerRuleResourceReadResponseSchema = z.object({
  kind: V1Alpha1TriggerRuleResourceKindSchema.default('trigger_rule'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1TriggerRuleResourceSpecSchema,
})
/**
 * V1Alpha1TriggerResourceReadResponse is a type for a response to a read request for a trigger resource.
 */
export type V1Alpha1TriggerRuleResourceReadResponse = z.infer<
  typeof V1Alpha1TriggerRuleResourceReadResponseSchema
>

export const V1Alpha1TriggerRuleResourceUpdateRequestSchema = z.object({
  kind: V1Alpha1TriggerRuleResourceKindSchema.optional(),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1TriggerRuleResourceSpecSchema,
})
/**
 * V1Alpha1TriggerResourceUpdateRequest is a type for a request to update a trigger resource.
 */
export type V1Alpha1TriggerRuleResourceUpdateRequest = z.infer<
  typeof V1Alpha1TriggerRuleResourceUpdateRequestSchema
>

export const V1Alpha1TriggerRuleResourceUpdateResponseSchema = z.object({
  kind: V1Alpha1TriggerRuleResourceKindSchema.default('trigger_rule'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1TriggerRuleResourceSpecSchema,
})
/**
 * V1Alpha1TriggerResourceUpdateResponse is a type for a response to an update request for a trigger resource.
 */
export type V1Alpha1TriggerRuleResourceUpdateResponse = z.infer<
  typeof V1Alpha1TriggerRuleResourceUpdateResponseSchema
>

/**
 * V1Alpha1TriggerResourceCreateRequestDTO is a request to create a new trigger resource.
 */
export class V1Alpha1TriggerRuleResourceCreateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.trigger_rule.v1alpha1+json'

  data: V1Alpha1TriggerRuleResourceCreateRequest

  /**
   * Create a new V1Alpha1TriggerRuleResourceCreateRequestDTO.
   *
   * @param data - The data of the trigger resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1TriggerRuleResourceCreateRequestDTO.
   */
  constructor(data: V1Alpha1TriggerRuleResourceCreateRequest) {
    this.data = V1Alpha1TriggerRuleResourceCreateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1Alpha1TriggerRuleResourceCreateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1TriggerRuleResourceCreateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1TriggerRuleResourceCreateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1TriggerRuleResourceCreateRequestDTO {
    return new V1Alpha1TriggerRuleResourceCreateRequestDTO(json)
  }
}

/**
 * V1Alpha1TriggerRuleResourceCreateResponseDTO is a response to a create request for a trigger resource.
 */
export class V1Alpha1TriggerRuleResourceCreateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.trigger_rule.v1alpha1+json'

  data: V1Alpha1TriggerRuleResourceCreateResponse

  /**
   * Create a new V1Alpha1TriggerResourceCreateResponseDTO.
   *
   * @param data - The data of the trigger resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1TriggerRuleResourceCreateResponseDTO.
   */
  constructor(data: V1Alpha1TriggerRuleResourceCreateResponse) {
    this.data = V1Alpha1TriggerRuleResourceCreateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1TriggerRuleResourceCreateResponse
   */
  toJSON(): V1Alpha1TriggerRuleResourceCreateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1TriggerRuleResourceCreateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1TriggerRuleResourceCreateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1TriggerRuleResourceCreateResponseDTO {
    return new V1Alpha1TriggerRuleResourceCreateResponseDTO(json)
  }
}

/**
 * V1Alpha1TriggerRuleResourceReadResponseDTO is a response to a read request for a trigger resource.
 */
export class V1Alpha1TriggerRuleResourceReadResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.trigger_rule.v1alpha1+json'

  data: V1Alpha1TriggerRuleResourceReadResponse

  /**
   * Create a new V1Alpha1TriggerResourceReadResponseDTO.
   *
   * @param data - The data of the trigger resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1TriggerRuleResourceReadResponseDTO.
   */
  constructor(data: V1Alpha1TriggerRuleResourceReadResponse) {
    this.data = V1Alpha1TriggerRuleResourceReadResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1Alpha1TriggerRuleResourceReadResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1TriggerRuleResourceReadResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1TriggerRuleResourceReadResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1TriggerRuleResourceReadResponseDTO {
    return new V1Alpha1TriggerRuleResourceReadResponseDTO(json)
  }
}

/**
 * V1Alpha1TriggerRuleResourceUpdateRequestDTO is a request to update a trigger resource.
 */
export class V1Alpha1TriggerRuleResourceUpdateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.trigger_rule.v1alpha1+json'

  data: V1Alpha1TriggerRuleResourceUpdateRequest

  /**
   * Create a new V1Alpha1TriggerResourceUpdateRequestDTO.
   *
   * @param data - The data of the trigger resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1TriggerRuleResourceUpdateRequestDTO.
   */
  constructor(data: V1Alpha1TriggerRuleResourceUpdateRequest) {
    this.data = V1Alpha1TriggerRuleResourceUpdateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1TriggerRuleResourceUpdateRequest
   */
  toJSON(): V1Alpha1TriggerRuleResourceUpdateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1TriggerRuleResourceUpdateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1TriggerRuleResourceUpdateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1TriggerRuleResourceUpdateRequestDTO {
    return new V1Alpha1TriggerRuleResourceUpdateRequestDTO(json)
  }
}

/**
 * V1Alpha1TriggerRuleResourceUpdateResponseDTO is a response to an update request for a trigger resource.
 */
export class V1Alpha1TriggerRuleResourceUpdateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.trigger_rule.v1alpha1+json'

  data: V1Alpha1TriggerRuleResourceUpdateResponse

  /**
   * Create a new V1Alpha1TriggerResourceUpdateResponseDTO.
   *
   * @param data - The data of the trigger resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1TriggerRuleResourceUpdateResponseDTO.
   */
  constructor(data: V1Alpha1TriggerRuleResourceUpdateResponse) {
    this.data = V1Alpha1TriggerRuleResourceUpdateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1TriggerRuleResourceUpdateResponse
   */
  toJSON(): V1Alpha1TriggerRuleResourceUpdateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1TriggerRuleResourceUpdateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1TriggerRuleResourceUpdateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1TriggerRuleResourceUpdateResponseDTO {
    return new V1Alpha1TriggerRuleResourceUpdateResponseDTO(json)
  }
}

export type TriggerRuleResourceCreateRequestDTOType = {
  v1alpha1: V1Alpha1TriggerRuleResourceCreateRequestDTO
  latest: V1Alpha1TriggerRuleResourceCreateRequestDTO
}
export type TriggerRuleResourceCreateResponseDTOType = {
  v1alpha1: V1Alpha1TriggerRuleResourceCreateResponseDTO
  latest: V1Alpha1TriggerRuleResourceCreateResponseDTO
}
export type TriggerRuleResourceReadResponseDTOType = {
  v1alpha1: V1Alpha1TriggerRuleResourceReadResponseDTO
  latest: V1Alpha1TriggerRuleResourceReadResponseDTO
}
export type TriggerRuleResourceUpdateRequestDTOType = {
  v1alpha1: V1Alpha1TriggerRuleResourceUpdateRequestDTO
  latest: V1Alpha1TriggerRuleResourceUpdateRequestDTO
}
export type TriggerRuleResourceUpdateResponseDTOType = {
  v1alpha1: V1Alpha1TriggerRuleResourceUpdateResponseDTO
  latest: V1Alpha1TriggerRuleResourceUpdateResponseDTO
}
