import './background.css'

import { Lumiflex, Novatrix, Opulento, Tranquiluxe, Velustro } from 'uvcanvas'
export function Background () {
  return (
    <div className="fixed background-img">
      {/* https://uvcanvas.com/docs/installation */}
      {/* A lo mejor actualizan para cambiar la velocidad de la animacion */}
      {/* https://github.com/latentcat/uvcanvas/issues */}
      {/* <Lumiflex /> */}
      {/* <Novatrix /> */}
      {/* <Velustro /> */}
      {/* <Tranquiluxe /> */}
      <Opulento />

    </div>
  )
}
