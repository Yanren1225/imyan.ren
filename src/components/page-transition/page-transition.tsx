import { type ParentComponent } from 'solid-js'
import './page-transition.css'

export const PageTransition: ParentComponent = (props) => {
  return <div class="page-transition">{props.children}</div>
}
