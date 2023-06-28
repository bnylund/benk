import { DateTime } from './datetime'
import style from './toolbar.module.scss'

export function Toolbar() {
  return (
    <div class={style.toolbar}>
      <div></div>
      <div>
        <DateTime format="h:mm a" />
      </div>
      <div></div>
    </div>
  )
}
