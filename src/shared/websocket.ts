import Sockette, { SocketteOptions } from 'sockette'

export const createSocket = (options?: SocketteOptions) => {
  return new Sockette('ws://localhost:10000/ws', {
    timeout: 250,
    ...options,
  })
}
