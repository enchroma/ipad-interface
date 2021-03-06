import { isProd } from 'c:/constants'
import AppEmitter from 'c:/emitter'
import safeStringify from 'fast-safe-stringify'

class WS {
 constructor() {
  this.init()
 }

 init(ip = 'localhost', port = process.env.WS_PORT) {
  this.client = new WebSocket(`ws://${ip}:${port}`)

  this.client.onopen = () => {
   AppEmitter.emit('websocket:connected', true)
   this.onopen()
  }

  this.client.onclose = () => {
   AppEmitter.emit('websocket:connected', false)
   setTimeout(() => {
    this.client.close()
    this.client = null
    this.init()
   }, 1500)
  }
 }

 send(data, type) {
  this.client.send(safeStringify({ data, type }))
 }

 onopen() {}
}

export default WS
