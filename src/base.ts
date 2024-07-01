import {
  APIRequestOptions,
  APIRequest,
  APIResponse,
  APIError,
  FetchAPI,
} from './types.js'
import {
  determineContentType,
  serializeBody,
  deserializeBody,
  buildUrl,
} from './utils.js'
import { version } from './version.js'

export const BASE_URL = 'http://localhost:8080'.replace(/\/+$/, '')
export const DEFAULT_USER_AGENT = `flowdapt-ts-sdk/${version}`

export interface APIClientOptions {
  baseUrl?: string
  userAgent?: string
  fetchAPI?: FetchAPI
}

export class APIClient {
  protected baseUrl: string
  protected userAgent: string
  protected fetchAPI: FetchAPI

  constructor(options: APIClientOptions = {}) {
    const {
      baseUrl = BASE_URL,
      userAgent = DEFAULT_USER_AGENT,
      fetchAPI = fetch,
    } = options

    this.baseUrl = baseUrl
    this.userAgent = userAgent
    this.fetchAPI = fetchAPI
  }

  private toAPIRequest(options: APIRequestOptions): APIRequest {
    const { path, method, query, headers, body, params, accept } = options

    const url = buildUrl(this.baseUrl, path, query, params)
    const headersObj = new Headers(headers)
    const bodyObj = body ? serializeBody(body) : undefined

    if (bodyObj) headersObj.set('Content-Type', determineContentType(body))
    if (accept) {
      headersObj.set(
        'Accept',
        accept.map(([type, q]) => `${type}; q=${q}`).join(', ')
      )
    }

    headersObj.set('User-Agent', this.userAgent)

    return {
      method,
      url,
      headers: headersObj,
      body: bodyObj,
    } as APIRequest
  }

  private async toAPIResponse<T>(response: Response): Promise<APIResponse<T>> {
    const headers = new Headers(response.headers)
    const contentType = response.headers.get('Content-Type') || 'text/plain'
    const content = response.body
      ? await deserializeBody(response, contentType)
      : response.body

    return {
      status: response.status,
      headers,
      contentType,
      content,
    } as APIResponse<T>
  }

  async request<T>(
    options: APIRequestOptions,
    initOverride?: RequestInit
  ): Promise<APIResponse<T>> {
    const request = this.toAPIRequest(options)
    const response = await this.fetchAPI(request.url, {
      ...initOverride,
      method: request.method,
      headers: request.headers,
      body: request.body,
    })

    if (!response.ok) {
      const error = await response.json()
      const headers = new Headers(response.headers)
      throw {
        status: response.status,
        headers,
        ...(error as object),
      } as APIError
    }

    return this.toAPIResponse<T>(response)
  }
}
