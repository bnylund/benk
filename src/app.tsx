import bg from '/bg.jpg'
import './app.scss'
import { Toolbar } from './components/toolbar'
import { Sleep } from './components/sleep'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createSocket } from './shared/websocket'
import Sockette from 'sockette'
import dayjs from 'dayjs'

export function App() {
  const [sleep, setSleep] = useState(false)
  const [socket] = useState<Sockette>(
    createSocket({
      onopen: () => {
        addLine(`Websocket connected`)
      },
      onclose: () => {
        addLine(`Websocket disconnected`)
      },
      onerror: () => {
        addLine(`Websocket error`)
      },
      onmessage: (ev) => {
        if (ev.data !== 'pong') addLine(`Received message: "${ev.data}"`)
      },
    }),
  )
  const ref = useRef<HTMLDivElement | null>(null)

  const addLine = (line: string) => {
    if (ref.current) {
      ref.current.innerHTML += `<p>[${dayjs(Date.now()).format()}] ${line}</p>`
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      socket.send('ping')
    }, 2500)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <>
      <Sleep show={sleep} dismiss={() => setSleep(false)} />
      <Toolbar />
      <img id="bg" src={bg} alt=""></img>
      <div id="log" ref={ref}></div>
      <div id="reset">
        <button
          onClick={() => {
            socket?.send('execute command')
          }}
        >
          Reset
        </button>
      </div>
    </>
  )
}
