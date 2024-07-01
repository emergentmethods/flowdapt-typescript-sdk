import { z } from 'zod'
import { V1Alpha1ResourceMetadataSchema } from './base.js'
import { DTO, Json } from '../types.js'

export const V1Alpha1ConfigSelectorTypeSchema = z.enum(['annotation', 'name'])
/**
 * V1Alpha1ConfigSelectorType is a type for the type of a config selector.
 */
export type V1Alpha1ConfigSelectorType = z.infer<
  typeof V1Alpha1ConfigSelectorTypeSchema
>

export const V1Alpha1ConfigSelectorSchema = z.object({
  kind: z.string().optional().nullable(),
  type: V1Alpha1ConfigSelectorTypeSchema,
  value: z.union([z.string(), z.record(z.string())]).nullable(),
})
/**
 * V1Alpha1ConfigSelector is a type for a config selector.
 */
export type V1Alpha1ConfigSelector = z.infer<
  typeof V1Alpha1ConfigSelectorSchema
>

export const V1Alpha1ConfigResourceSpecSchema = z.object({
  selector: V1Alpha1ConfigSelectorSchema,
  data: z.record(z.any()),
})
/**
 * V1AlphaConfigResourceSpec is a type for the spec of a config resource.
 */
export type V1AlphaConfigResourceSpec = z.infer<
  typeof V1Alpha1ConfigResourceSpecSchema
>

export const V1Alpha1ConfigResourceKindSchema = z.literal('config')
/**
 * V1Alpha1ConfigResourceKind is a type for the kind of a config resource.
 * The kind of a config resource is always 'config'.
 */
export type V1Alpha1ConfigResourceKind = z.infer<
  typeof V1Alpha1ConfigResourceKindSchema
>

export const V1Alpha1ConfigResourceCreateRequestSchema = z.object({
  kind: V1Alpha1ConfigResourceKindSchema.optional(),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1ConfigResourceSpecSchema,
})
/**
 * V1Alpha1ConfigResourceCreateRequest is a type for a create config resource request.
 */
export type V1Alpha1ConfigResourceCreateRequest = z.infer<
  typeof V1Alpha1ConfigResourceCreateRequestSchema
>

export const V1Alpha1ConfigResourceCreateResponseSchema = z.object({
  kind: V1Alpha1ConfigResourceKindSchema.default('config'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1ConfigResourceSpecSchema,
})
/**
 * V1Alpha1ConfigResourceCreateResponse is a type for a create config resource response.
 */
export type V1Alpha1ConfigResourceCreateResponse = z.infer<
  typeof V1Alpha1ConfigResourceCreateResponseSchema
>

export const V1Alpha1ConfigResourceReadResponseSchema = z.object({
  kind: V1Alpha1ConfigResourceKindSchema.default('config'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1ConfigResourceSpecSchema,
})
/**
 * V1Alpha1ConfigResourceReadResponse is a type for a read config resource response.
 * The kind of a config resource is always 'config'.
 */
export type V1Alpha1ConfigResourceReadResponse = z.infer<
  typeof V1Alpha1ConfigResourceReadResponseSchema
>

export const V1Alpha1ConfigResourceUpdateRequestSchema = z.object({
  kind: V1Alpha1ConfigResourceKindSchema.default('config'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1ConfigResourceSpecSchema,
})
/**
 * V1Alpha1ConfigResourceUpdateRequest is a type for an update config resource request.
 */
export type V1Alpha1ConfigResourceUpdateRequest = z.infer<
  typeof V1Alpha1ConfigResourceUpdateRequestSchema
>

export const V1Alpha1ConfigResourceUpdateResponseSchema = z.object({
  kind: V1Alpha1ConfigResourceKindSchema.default('config'),
  metadata: V1Alpha1ResourceMetadataSchema,
  spec: V1Alpha1ConfigResourceSpecSchema,
})
/**
 * V1Alpha1ConfigResourceUpdateResponse is a type for an update config resource response.
 */
export type V1Alpha1ConfigResourceUpdateResponse = z.infer<
  typeof V1Alpha1ConfigResourceUpdateResponseSchema
>

/**
 * V1Alpha1ConfigResourceCreateRequestDTO is a request to create a new config resource.
 */
export class V1Alpha1ConfigResourceCreateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.config.v1alpha1+json'

  data: V1Alpha1ConfigResourceCreateRequest

  /**
   * Create a new V1Alpha1ConfigResourceCreateRequestDTO.
   *
   * @param data - The data of the request.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1ConfigResourceCreateRequestDTO.
   */
  constructor(data: V1Alpha1ConfigResourceCreateRequest) {
    this.data = V1Alpha1ConfigResourceCreateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1ConfigResourceCreateRequestDTO
   */
  toJSON(): V1Alpha1ConfigResourceCreateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1ConfigResourceCreateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1ConfigResourceCreateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1ConfigResourceCreateRequestDTO {
    return new V1Alpha1ConfigResourceCreateRequestDTO(json)
  }
}

/**
 * V1Alpha1ConfigResourceCreateResponseDTO is a response to a create config resource request.
 */
export class V1Alpha1ConfigResourceCreateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.config.v1alpha1+json'

  data: V1Alpha1ConfigResourceCreateResponse

  /**
   * Create a new V1Alpha1ConfigResourceCreateResponseDTO.
   *
   * @param data - The data of the response.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1ConfigResourceCreateResponseDTO.
   */
  constructor(data: V1Alpha1ConfigResourceCreateResponse) {
    this.data = V1Alpha1ConfigResourceCreateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1ConfigResourceCreateResponse
   */
  toJSON(): V1Alpha1ConfigResourceCreateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1ConfigResourceCreateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1ConfigResourceCreateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1ConfigResourceCreateResponseDTO {
    return new V1Alpha1ConfigResourceCreateResponseDTO(json)
  }
}

/**
 * V1Alpha1ConfigResourceReadResponseDTO is a response to a read config resource request.
 */
export class V1Alpha1ConfigResourceReadResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.config.v1alpha1+json'

  data: V1Alpha1ConfigResourceReadResponse

  /**
   * Create a new V1Alpha1ConfigResourceReadResponseDTO.
   *
   * @param kind - The kind of the resource. Always 'config'.
   * @param metadata - The metadata of the resource.
   * @param spec - The spec of the resource.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1ConfigResourceReadResponseDTO.
   */
  constructor(data: V1Alpha1ConfigResourceReadResponse) {
    this.data = V1Alpha1ConfigResourceReadResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1ConfigResourceReadResponse
   */
  toJSON(): V1Alpha1ConfigResourceReadResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1ConfigResourceReadResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1ConfigResourceReadResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1ConfigResourceReadResponseDTO {
    return new V1Alpha1ConfigResourceReadResponseDTO(json)
  }
}

/**
 * V1Alpha1ConfigResourceUpdateRequestDTO is a request to update a config resource.
 */
export class V1Alpha1ConfigResourceUpdateRequestDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.config.v1alpha1+json'

  data: V1Alpha1ConfigResourceUpdateRequest

  /**
   * Create a new V1Alpha1ConfigResourceUpdateRequestDTO.
   *
   * @param data - The data of the request.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1ConfigResourceUpdateRequestDTO.
   */
  constructor(data: V1Alpha1ConfigResourceUpdateRequest) {
    this.data = V1Alpha1ConfigResourceUpdateRequestSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1ConfigResourceUpdateRequest
   */
  toJSON(): V1Alpha1ConfigResourceUpdateRequest {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1ConfigResourceUpdateRequestDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1ConfigResourceUpdateRequestDTO
   */
  static fromJSON(json: Json): V1Alpha1ConfigResourceUpdateRequestDTO {
    return new V1Alpha1ConfigResourceUpdateRequestDTO(json)
  }
}

/**
 * V1Alpha1ConfigResourceUpdateResponseDTO is a response to an update config resource request.
 */
export class V1Alpha1ConfigResourceUpdateResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.config.v1alpha1+json'

  data: V1Alpha1ConfigResourceUpdateResponse

  /**
   * Create a new V1Alpha1ConfigResourceUpdateResponseDTO.
   *
   * @param data - The data of the response.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1ConfigResourceUpdateResponseDTO.
   */
  constructor(data: V1Alpha1ConfigResourceUpdateResponse) {
    this.data = V1Alpha1ConfigResourceUpdateResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1ConfigResourceUpdateResponse
   */
  toJSON(): V1Alpha1ConfigResourceUpdateResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1ConfigResourceUpdateResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1ConfigResourceUpdateResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1ConfigResourceUpdateResponseDTO {
    return new V1Alpha1ConfigResourceUpdateResponseDTO(json)
  }
}

export type ConfigResourceCreateRequestDTOType = {
  v1alpha1: V1Alpha1ConfigResourceCreateRequestDTO
  latest: V1Alpha1ConfigResourceCreateRequestDTO
}
export type ConfigResourceCreateResponseDTOType = {
  v1alpha1: V1Alpha1ConfigResourceCreateResponseDTO
  latest: V1Alpha1ConfigResourceCreateResponseDTO
}
export type ConfigResourceReadResponseDTOType = {
  v1alpha1: V1Alpha1ConfigResourceReadResponseDTO
  latest: V1Alpha1ConfigResourceReadResponseDTO
}
export type ConfigResourceUpdateRequestDTOType = {
  v1alpha1: V1Alpha1ConfigResourceUpdateRequestDTO
  latest: V1Alpha1ConfigResourceUpdateRequestDTO
}
export type ConfigResourceUpdateResponseDTOType = {
  v1alpha1: V1Alpha1ConfigResourceUpdateResponseDTO
  latest: V1Alpha1ConfigResourceUpdateResponseDTO
}
