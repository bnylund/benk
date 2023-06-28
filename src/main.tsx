import { render } from 'preact'
import { App } from './app.tsx'
import './assets/fontawesome/scss/fontawesome.scss'
import './assets/fontawesome/scss/brands.scss'
import './assets/fontawesome/scss/solid.scss'
import 'scss-reset/reset.css'
import 'inter-ui/inter.scss'
import './index.scss'

render(<App />, document.getElementById('app') as HTMLElement)
