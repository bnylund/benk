import { useEffect } from 'preact/hooks'
import Sockette, { SocketteOptions } from 'sockette'

const createSocket = (options?: SocketteOptions) => {
  return new Sockette('ws://localhost:10000', {
    timeout: 500,
    ...options,
  })
}

export default createSocket

export const useWebsocket = (options?: SocketteOptions) => {
  useEffect(() => {
    const socket = createSocket(options)

    return () => {
      socket.close()
    }
  }, [])
}
