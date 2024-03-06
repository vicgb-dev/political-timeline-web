import { Lumiflex, Novatrix, Opulento, Tranquiluxe, Velustro } from 'uvcanvas'
import '../../index.css'

export function Background () {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 blur-3xl">
      {/* https://uvcanvas.com/docs/installation */}
      {/* A lo mejor actualizan para cambiar la velocidad de la animacion */}
      {/* https://github.com/latentcat/uvcanvas/issues */}
      {/* <Lumiflex /> */}
      {/* <Novatrix /> */}
      {/* <Velustro /> */}
      {/* <Tranquiluxe /> */}
      <Opulento />
      <div className="fixed top-0 left-0 w-full h-full z-10  bg-[color:var(--accent-5)] opacity-20">
      </div>
    </div>
  )
}
