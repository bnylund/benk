/**
 * Mock bend server for developing the frontend against.
 *
 * Supported commands: set-gpio, get-gpio, pin-event
 */
import { WebSocket, WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 10000 })
const pins = {}

// Initialize pins
for (let i = 1; i <= 40; i++) {
  pins[i] = {
    mode: 'output',
    value: 0,
  }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    const cmd = data.toString()
    if (cmd !== 'ping') console.log(`Received: '${cmd}'`)

    if (cmd.split(' ')[0] === 'set-gpio') {
      /**
       * Sets the value of the given GPIO pin
       */
      try {
        const pin = Number.parseInt(cmd.split(' ')[1])
        if (pin > 0 && pin <= 40) {
          const mode = cmd.split(' ')[2]
          if (mode === 'output' || mode === 'input') {
            pins[pin].mode = mode
          }
          const value = cmd.split(' ')[3]
          if (value === '1' || value === '0') {
            pins[pin].value = Number.parseInt(value)
          }
        }
      } catch (ex) {
        /* empty */
      }
    } else if (cmd.split(' ')[0] === 'get-gpio') {
      /**
       * Returns the value of the given GPIO pin in
       * the form of pin-info <PIN> <VALUE>
       * ex. pin-info 18 1
       */
      try {
        const pin = Number.parseInt(cmd.split(' ')[1])
        if (pin > 0 && pin <= 40) {
          ws.send(`pin-info ${pin} ${pins[pin].value}`)
        }
      } catch (ex) {
        /* empty */
      }
    } else if (cmd.split(' ')[0] === 'pin-event') {
      /**
       * Transmits a pin-event message to all clients.
       * This is used by the emulator in place of the
       * "subscribe" command.
       */
      try {
        const pin = Number.parseInt(cmd.split(' ')[1])
        if (pin > 0 && pin <= 40) {
          const value = cmd.split(' ')[2]
          if (value === '0' || value === '1') {
            console.log(`Broadcasting 'pin-event ${pin} ${value}'`)
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(`pin-event ${pin} ${value}`)
              }
            })
          }
        }
      } catch (ex) {
        /* empty */
        console.error(ex)
      }
    }
  })
})

process.on('SIGINT', () => {
  wss.close()
})
