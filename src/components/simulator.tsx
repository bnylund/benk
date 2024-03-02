import Sockette from 'sockette'
import style from './simulator.module.scss'
import { useState } from 'preact/hooks'

export function Simulator({ socket }: { socket: Sockette | null }) {
  const [show, setShow] = useState(false)
  const [state, setState] = useState({
    pin: 1,
    value: false,
  })
  const [message, setMessage] = useState('')
  if (!socket) return null
  return (
    <>
      <div class={style.button} onClick={() => setShow(true)}>
        <i className="fa-solid fa-bug"></i>
      </div>
      {show ? (
        <div class={style.popup} onClick={() => setShow(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <p>GPIO Simulator</p>

            <div>
              <p>Select pin:</p>
              <select
                value={state.pin}
                onChange={(e: any) => {
                  setState({ ...state, pin: e.target?.value })
                }}
              >
                {[...Array(40).keys()].map((pin) => {
                  return <option value={pin + 1}>Pin #{pin + 1}</option>
                })}
              </select>
            </div>

            <div>
              <p>Value:</p>
              <input
                type="checkbox"
                checked={state.value}
                onChange={() => {
                  setState((prev) => {
                    return { ...state, value: !prev.value }
                  })
                }}
              />
            </div>

            <div style={{ marginTop: '26px' }}>
              <button
                onClick={() => {
                  const command = `pin-event ${state.pin} ${state.value ? 1 : 0}`
                  socket.send(command)
                  setMessage(`Sent command: '${command}'`)
                }}
              >
                Send Pin Event
              </button>
            </div>

            <p>{message}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
