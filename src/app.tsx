import bg from '/bg.jpg'
import './app.scss'
import { Toolbar } from './components/toolbar'
import { Sleep } from './components/sleep'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createSocket } from './shared/websocket'
import Sockette from 'sockette'
import dayjs from 'dayjs'
import { Simulator } from './components/simulator'

export function App() {
  const [sleep, setSleep] = useState(false)
  const [socket, setSocket] = useState<Sockette | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState(false)

  const addLine = (line: string) => {
    if (ref.current) {
      ref.current.innerHTML += `<p>[${dayjs(Date.now()).format()}] ${line}</p>`
    }
  }

  useEffect(() => {
    const socket = createSocket({
      onopen: function () {
        addLine(`Websocket connected`)
        setTimeout(() => {
          this.send('set-gpio 16 input')
          this.send('subscribe 16')
        }, 1000)
      },
      onclose: function () {
        addLine(`Websocket disconnected`)
      },
      onerror: function () {
        addLine(`Websocket error`)
      },
      onmessage: function (ev) {
        if (ev.data !== 'pong') addLine(`Received message: "${ev.data}"`)
      },
    })
    setSocket(socket)

    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      socket?.send('ping')
    }, 2500)
    return () => {
      clearInterval(interval)
    }
  }, [socket])

  return (
    <>
      <Sleep show={sleep} dismiss={() => setSleep(false)} />
      <Toolbar />
      <img id="bg" src={bg} alt=""></img>
      <div id="log" ref={ref}></div>
      <div id="reset">
        <button
          onClick={() => {
            socket?.send(`set-gpio 18 output ${status ? 0 : 1}`)
            setStatus(!status)
          }}
        >
          {status ? 'Turn off' : 'Turn on'}
        </button>
      </div>
      {import.meta.env.DEV ? <Simulator socket={socket} /> : null}
    </>
  )
}
