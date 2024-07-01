import { z } from 'zod'

export const V1Alpha1ResourceMetadataSchema = z.object({
  uid: z.string().uuid().optional(),
  name: z.string(),
  // Pipe to coerce date because API doesn't return *true* ISO8601 dates
  created_at: z.optional(z.coerce.date()),
  updated_at: z.optional(z.coerce.date()),
  annotations: z.record(z.string()),
})
export type V1Alpha1ResourceMetadata = z.infer<
  typeof V1Alpha1ResourceMetadataSchema
>
