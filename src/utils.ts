import { DTO, DTOConstructor, DTOsMap } from './types.js'

export const jsonMimeType = new RegExp(
  '^(:?application/json|[^;/ \\t]+/[^;/ \\t]+[+]json)[ \\t]*(:?;.*)?$',
  'i'
)

export function buildVersionHeader(
  resourceType: string,
  version: string
): string {
  return `${resourceType}.${version}`
}

export function buildUrl(
  baseUrl: string,
  endpoint: string,
  query?: URLSearchParams | Record<string, string> | string,
  params?: Record<string, string>
): string {
  const url = new URL(endpoint, baseUrl)
  if (params) {
    Object.keys(params).forEach(
      key => (url.pathname = url.pathname.replace(`{${key}}`, params[key]))
    )
  }

  if (query) {
    if (typeof query === 'string') {
      url.search = query
    } else if (query instanceof URLSearchParams) {
      url.search = query.toString()
    } else {
      Object.keys(query).forEach(key =>
        url.searchParams.append(key, query[key])
      )
    }
  }
  return url.toString()
}

export function determineContentType(body: any): string {
  if (body && typeof body === 'object' && '__contentType' in body) {
    return body.__contentType
  } else if (body instanceof FormData) {
    return 'multipart/form-data'
  } else if (body instanceof URLSearchParams) {
    return 'application/x-www-form-urlencoded'
  } else if (body instanceof Blob) {
    return body.type
  } else if (body instanceof ArrayBuffer) {
    return 'application/octet-stream'
  } else if (typeof body === 'object') {
    return 'application/json'
  } else if (body === null) {
    return ''
  } else {
    return 'text/plain'
  }
}

export function serializeBody(
  body: any
): string | FormData | URLSearchParams | null {
  if (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body === null
  ) {
    return body
  } else if (typeof body === 'object') {
    return JSON.stringify(body)
  } else {
    return body
  }
}

export async function deserializeBody<T>(
  response: Response,
  contentType: string
): Promise<T> {
  if (jsonMimeType.test(contentType)) {
    return (await response.json()) as T
  } else if (contentType === 'application/octet-stream') {
    return response.body as T
  } else if (contentType === 'text/plain') {
    return (await response.text()) as T
  } else if (contentType === 'multipart/form-data') {
    return (await response.formData()) as T
  } else {
    return (await response.text()) as T
  }
}

export function getLatestVersion(dtosMap: DTOsMap): string {
  return Object.keys(dtosMap).pop() || 'v1alpha1'
}

export function getDTOVersion(dto: DTO | DTOConstructor): string | undefined {
  if (typeof dto === 'function' && '__version' in dto) {
    return dto.__version
  } else if (
    typeof dto === 'object' &&
    dto.constructor &&
    '__version' in dto.constructor
  ) {
    return (dto.constructor as DTOConstructor).__version
  }
  return undefined
}

export function buildRequestData(
  dtosMap: DTOsMap,
  data: any,
  version?: string
): [DTO | undefined, DTOConstructor | undefined, string] {
  if (!version) {
    version =
      typeof data === 'object' && data != null && '__version' in data
        ? data.__version
        : getLatestVersion(dtosMap)
  }

  if (!((version as string) in dtosMap)) {
    throw new Error(`Unsupported version: ${version}`)
  }

  const [RequestDto, ResponseDto] = dtosMap[version!]
  if (RequestDto !== undefined && !(data instanceof RequestDto))
    data = new RequestDto(data)
  return [data, ResponseDto, version!]
}
