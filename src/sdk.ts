import { APIClient, APIClientOptions } from './base.js'
import { Json } from './types.js'
import {
  ConfigsApi,
  TriggersApi,
  WorkflowsApi,
  SystemApi,
  MetricsApi,
  PluginsApi,
} from './api/index.js'

/**
 * FlowdaptSDK is the main class for interacting with the Flowdapt API
 * @class
 * @public
 * @param {APIClientOptions} config - The configuration options for the SDK
 * @example
 * const client = new FlowdaptSDK({ baseUrl: "http://my.flowdaptserver.com" });
 *
 * client.ping().then((response) => {
 *    console.log("Ping response", response);
 * });
 *
 * await client.ping();
 *
 * @example
 * const client = new FlowdaptSDK({ baseUrl: "http://my.flowdaptserver.com" });
 *
 * client.configs.listConfigs().then((response) => {
 *   console.log("Configs", response);
 * });
 */
export class FlowdaptSDK {
  private client: APIClient

  public configs: ConfigsApi
  public triggers: TriggersApi
  public workflows: WorkflowsApi
  public system: SystemApi
  public metrics: MetricsApi
  public plugins: PluginsApi

  constructor(config?: APIClientOptions) {
    this.client = new APIClient(config)

    this.configs = new ConfigsApi(this.client)
    this.triggers = new TriggersApi(this.client)
    this.workflows = new WorkflowsApi(this.client)
    this.system = new SystemApi(this.client)
    this.metrics = new MetricsApi(this.client)
    this.plugins = new PluginsApi(this.client)
  }

  /**
   * Call the ping endpoint
   * @returns Json
   */
  public async ping(): Promise<Json> {
    return this.client
      .request<Json>({ method: 'GET', path: '/' })
      .then(response => {
        return response.content
      })
  }
}
