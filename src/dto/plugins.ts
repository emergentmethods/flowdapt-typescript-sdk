import { z } from 'zod'
import { DTO, Json } from '../types.js'

export const V1Alpha1PluginMetadataSchema = z.object({
  description: z.string(),
  author: z.string(),
  license: z.string(),
  url: z.string(),
  version: z.string(),
  requirements: z.array(z.string()).optional().default([]),
})
/**
 * V1Alpha1PluginMetadata is a type for the metadata of a plugin.
 */
export type V1Alpha1PluginMetadata = z.infer<
  typeof V1Alpha1PluginMetadataSchema
>

export const V1AlphaPluginFilesListResponseSchema = z.object({
  files: z.array(z.string()),
})
/**
 * V1AlphaPluginFiles is a type for the files of a plugin.
 */
export type V1AlphaPluginFilesListResponse = z.infer<
  typeof V1AlphaPluginFilesListResponseSchema
>

export const V1Alpha1PluginReadResponseSchema = z.object({
  name: z.string(),
  metadata: V1Alpha1PluginMetadataSchema,
  module: z.string(),
})
/**
 * V1Alpha1Plugin is a type for a plugin.
 */
export type V1Alpha1PluginReadResponse = z.infer<
  typeof V1Alpha1PluginReadResponseSchema
>

/**
 * V1Alpha1PluginReadResponse is a  response for reading a plugin.
 */
export class V1Alpha1PluginReadResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.plugin.v1alpha1+json'

  data: V1Alpha1PluginReadResponse

  /**
   * Create a new V1Alpha1PluginReadResponse.
   * @param data - The data of the plugin.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1PluginReadResponse.
   */
  constructor(data: V1Alpha1PluginReadResponse) {
    this.data = V1Alpha1PluginReadResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1Alpha1PluginReadResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1PluginReadResponse.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1PluginReadResponse
   */
  static fromJSON(json: Json): V1Alpha1PluginReadResponseDTO {
    return new V1Alpha1PluginReadResponseDTO(json)
  }
}

/**
 * V1Alpha1PluginFilesListResponseDTO is a response for listing the files of a plugin.
 */
export class V1Alpha1PluginFilesListResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.plugin_file.v1alpha1+json'

  data: V1AlphaPluginFilesListResponse

  /**
   * Create a new V1Alpha1PluginFilesListResponse.
   * @param data
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1PluginFilesListResponse.
   */
  constructor(data: V1AlphaPluginFilesListResponse) {
    this.data = V1AlphaPluginFilesListResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1AlphaPluginFilesListResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1PluginFilesListResponseDTO.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1PluginFilesListResponseDTO
   */
  static fromJSON(json: Json): V1Alpha1PluginFilesListResponseDTO {
    return new V1Alpha1PluginFilesListResponseDTO(json)
  }
}

export type PluginReadResponseDTOType = {
  v1alpha1: V1Alpha1PluginReadResponse
  latest: V1Alpha1PluginReadResponse
}
export type PluginFilesListResponseDTOType = {
  v1alpha1: V1AlphaPluginFilesListResponse
  latest: V1AlphaPluginFilesListResponse
}
