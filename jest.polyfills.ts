import { ReadableStream, WritableStream, TransformStream } from 'stream/web'
import { TextEncoder, TextDecoder } from 'util'
import 'whatwg-fetch'

class MockBroadcastChannel {
  name: string
  onmessage: ((event: MessageEvent) => void) | null = null
  constructor(name: string) {
    this.name = name
  }
  postMessage(message: any) {
    this.onmessage?.({ data: message } as MessageEvent)
  }
  close() {}
}

;(globalThis as any).BroadcastChannel = MockBroadcastChannel

Object.assign(globalThis, { ReadableStream, WritableStream })
globalThis.TransformStream =
  TransformStream as unknown as typeof globalThis.TransformStream
globalThis.TextEncoder = TextEncoder
globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
