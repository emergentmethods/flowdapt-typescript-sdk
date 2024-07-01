import { ReadableStream } from 'stream/web'

export type FetchAPI = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>

export type Json = any
export type HttpBody = Json | FormData | URLSearchParams | null
export type HttpHeaders = Record<string, string>
export type HttpQuery = URLSearchParams | Record<string, string> | string
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  | 'TRACE'

export interface APIRequestOptions {
  path: string
  method: HttpMethod
  query?: HttpQuery
  headers?: HttpHeaders
  body?: HttpBody
  params?: Record<string, string>
  accept?: Array<[string, number]>
}

export interface APIRequest {
  method: HttpMethod
  url: string
  query?: URLSearchParams
  headers?: Headers
  body?: HttpBody
}

export interface APIResponse<T = any> {
  status: number
  headers: Headers
  body: ReadableStream<any>
  content: T
  contentType: string
}

export interface APIError<T = any> extends Error {
  status: number
  headers: Headers
  body: T
  code?: number
  detail?: string
}

export function isAPIError(error: any): error is APIError {
  return (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number' &&
    (!error.code || typeof error.code === 'number') &&
    (!error.detail || typeof error.detail === 'string')
  )
}

export interface DTO {
  toJSON(): Json
}

export interface DTOConstructor {
  new (data: any): DTO
  readonly __version: string
  readonly __contentType: string
  fromJSON(data: Json): DTO
}

export type DTOsMap = Record<
  string,
  [DTOConstructor | undefined, DTOConstructor | undefined]
>
