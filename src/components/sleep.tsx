import { DateTime } from './datetime'
import style from './sleep.module.scss'
import bg from '/bg.jpg'

export function Sleep(props: { show: boolean; dismiss: () => void }) {
  const { show, dismiss } = props

  return (
    <>
      <div class={style.fade} data-show={show ? 'true' : 'false'}></div>
      <div class={style.sleep} data-show={show ? 'true' : 'false'} onClick={dismiss}>
        <img id="bg" src={bg} alt=""></img>
        <div>
          <DateTime format="h:mm:ss a" />
          <DateTime format="MMMM D, YYYY" />
        </div>
      </div>
    </>
  )
}
