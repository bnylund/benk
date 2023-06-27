import { render } from 'preact'
import { App } from './app.tsx'
import 'scss-reset/reset.css'
import 'inter-ui/inter.scss'
import './index.scss'

render(<App />, document.getElementById('app') as HTMLElement)
