import { z } from 'zod'
import { DTO, Json } from '../types.js'

export const V1Alpha1MetricsBucketValueSchema = z.object({
  attributes: z.record(z.any()),
  start_time_unix_nano: z.number().nullable(),
  time_unix_nano: z.number(),
  count: z.number(),
  bucket_counts: z.array(z.number()),
  explicit_bounds: z.array(z.number()),
  sum: z.number(),
  min: z.number(),
  max: z.number(),
})
/**
 * V1Alpha1MetricsBucketValue is a type for the value of a bucket in a histogram.
 */
export type V1Alpha1MetricsBucketValue = z.infer<
  typeof V1Alpha1MetricsBucketValueSchema
>

export const V1Alpha1MetricsCountValueSchema = z.object({
  attributes: z.record(z.any()),
  start_time_unix_nano: z.number().nullable(),
  time_unix_nano: z.number(),
  value: z.number(),
})
/**
 * V1Alpha1MetricsCountValue is a type for the value of a count metric.
 */
export type V1Alpha1MetricsCountValue = z.infer<
  typeof V1Alpha1MetricsCountValueSchema
>

export const V1Alpha1MetricsValueSchema = z.union([
  V1Alpha1MetricsBucketValueSchema,
  V1Alpha1MetricsCountValueSchema,
])
/**
 * V1Alpha1MetricsValue is a type for the value of a metric.
 * It can be either a bucket value or a count value.
 * @see V1Alpha1MetricsBucketValue
 * @see V1Alpha1MetricsCountValue
 */
export type V1Alpha1MetricsValue = z.infer<typeof V1Alpha1MetricsValueSchema>

export const V1Alpha1MetricsSchema = z.record(
  z.array(V1Alpha1MetricsValueSchema)
)
/**
 * V1Alpha1Metrics is a type for the metrics of a flowdapt instance.
 */
export type V1Alpha1Metrics = z.infer<typeof V1Alpha1MetricsSchema>

/**
 * V1Alpha1MetricsDTO is a response object for the metrics endpoint.
 */
export class V1Alpha1MetricsDTO implements DTO {
  static readonly __version = 'v1alpha1'
  static readonly __contentType =
    'application/vnd.flowdapt.ai.metrics.v1alpha1+json'

  data: V1Alpha1Metrics

  /**
   * Create a new V1Alpha1MetricsDTO.
   * @param data - The metrics values.
   * @throws {z.ZodError} if the input object does not match the schema.
   * @returns A new V1Alpha1MetricDTO.
   */
  constructor(data: V1Alpha1Metrics) {
    this.data = V1Alpha1MetricsSchema.parse(data)
  }

  /**
   * Convert the response to JSON.
   * @returns V1Alpha1Metrics
   */
  toJSON(): V1Alpha1Metrics {
    return structuredClone({ ...this.data })
  }

  /**
   * Convert JSON to the V1Alpha1Metrics object.
   * @param json - The JSON data to convert.
   * @returns V1Alpha1Metrics
   */
  static fromJSON(json: Json): V1Alpha1MetricsDTO {
    return new V1Alpha1MetricsDTO(json)
  }
}

export type MetricsDTOType = {
  v1alpha1: V1Alpha1MetricsDTO
  latest: V1Alpha1MetricsDTO
}
