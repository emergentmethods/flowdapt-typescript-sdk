import { z } from 'zod'
import { DTO, Json } from '../types.js'

/**
 * V1Alpha1SystemStatusOSInfo is a type for the OS information of a flowdapt instance.
 */
export const V1Alpha1SystemStatusOSInfoSchema = z.object({
  name: z.string(),
  version: z.string(),
  release: z.string(),
  machine: z.string(),
})
export type V1Alpha1SystemStatusOSInfo = z.infer<
  typeof V1Alpha1SystemStatusOSInfoSchema
>

/**
 * V1Alpha1SystemStatusSystemInfo is a type for the system information of a flowdapt instance
 */
export const V1Alpha1SystemStatusSystemInfoSchema = z.object({
  time: z.string(),
  cpu_pct: z.number(),
  memory: z.number(),
  disk_pct: z.number(),
  network_io_sent: z.number(),
  network_io_recv: z.number(),
  threads: z.number(),
  fds: z.number(),
  pid: z.number(),
})
export type V1Alpha1SystemStatusSystemInfo = z.infer<
  typeof V1Alpha1SystemStatusSystemInfoSchema
>

/**
 * V1Alpha1SystemStatus is a type for the system status of a flowdapt instance.
 */
export const V1Alpha1SystemStatusResponseSchema = z.object({
  version: z.string(),
  name: z.string(),
  system: V1Alpha1SystemStatusSystemInfoSchema,
  os: V1Alpha1SystemStatusOSInfoSchema,
  python: z.string(),
  hostname: z.string(),
  services: z.record(z.any()),
  database: z.string(),
})
export type V1Alpha1SystemStatusResponse = z.infer<
  typeof V1Alpha1SystemStatusResponseSchema
>

/**
 * V1Alpha1SystemStatusResponse is a type for the response of the system status.
 */
export class V1Alpha1SystemStatusResponseDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.system.v1alpha1+json'

  data: V1Alpha1SystemStatusResponse

  /**
   * Create a new V1Alpha1SystemStatus.
   * @param data - The data of the system status.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1SystemStatus.
   */
  constructor(data: V1Alpha1SystemStatusResponse) {
    this.data = V1Alpha1SystemStatusResponseSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns Json
   */
  toJSON(): V1Alpha1SystemStatusResponse {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1SystemStatus.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1SystemStatus
   */
  static fromJSON(json: Json): V1Alpha1SystemStatusResponseDTO {
    return new V1Alpha1SystemStatusResponseDTO(json)
  }
}

export type SystemStatusResponseDTOType = {
  v1alpha1: V1Alpha1SystemStatusResponseDTO
  latest: V1Alpha1SystemStatusResponseDTO
}
