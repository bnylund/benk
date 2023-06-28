import bg from '/bg.jpg'
import './app.scss'
import { Toolbar } from './components/toolbar'
import { Sleep } from './components/sleep'
import { useEffect, useState } from 'preact/hooks'
import { useWebsocket } from './shared/websocket'

export function App() {
  const [sleep, setSleep] = useState(true)

  useWebsocket({})

  useEffect(() => {
    setTimeout(() => {
      setSleep(false)
      setTimeout(() => {
        setSleep(true)
      }, 5000)
    }, 5000)
  }, [])

  return (
    <>
      <Sleep show={sleep} dismiss={() => setSleep(false)} />
      <Toolbar />
      <img id="bg" src={bg} alt=""></img>
    </>
  )
}
