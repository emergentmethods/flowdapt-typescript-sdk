# Flowdapt TypeScript SDK

This is the official TypeScript SDK for the Flowdapt API. It provides a simple way to programmatically interact with Flowdapt in TypeScript. It is asynchronous and uses `fetch` as the underlying HTTP client but is written in a way that allows you to override and use your own HTTP client.

## Installation

```bash
npm install @emergentmethods/flowdapt-ts-sdk
```

## Usage

```typescript
import { FlowdaptSDK } from '@emergentmethods/flowdapt-ts-sdk'

async function main() {
  const client = new FlowdaptSDK()

  console.log(await client.ping())

  const workflows = await client.workflows.listWorkflows({
    version: 'v1alpha1',
  })
  console.log(workflows)

  const workflow = await client.workflows.getWorkflow({
    identifier: 'my-workflow',
    version: 'v1alpha1',
  })
  console.log(workflow)

  const result = await client.workflows.runWorkflow({
    identifier: 'my-workflow',
    input: { x: 5 },
    wait: true,
    namespace: 'default',
    version: 'v1alpha1',
  })
  console.log(result)
}
```
