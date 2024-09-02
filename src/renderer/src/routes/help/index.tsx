import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Collapse } from '../-components/Collapse'
import { Underline } from '../-components/Underline'

export const Route = createFileRoute('/help/')({
  component: Component
})
function Component() {
  const nav = useNavigate()
  return (
    <section className="flex h-full">
      <div className="p-2 border-r border-black mr-4">
        {/* <a className="cursor-pointer" onClick={() => nav(-1)}>
          Volver
        </a> */}
      </div>
      <div className="has-scrollbar flex-1 py-2 space-y-2 overflow-y-auto">
        <Collapse title={'¿Como funciona?'}>
          <p>
            Al momento de registrar tu cuenta se te pedira un correo y contraseña unica, solo
            necesitaras la contraseña para acceder a tus datos.
            <br />
            Estos datos se guardaran de forma encriptada y{' '}
            <Underline>solo se puede acceder con tu contraseña</Underline>.
            <br />
            En caso que olvides tu contraseña se te enviara un mensaje al correo con esta misma.
          </p>
        </Collapse>
        <Collapse title={'¿Cuales son mis datos personales?'}>
          <p>
            Tus credenciales de inicio de sesión a los servicios que utilices, información de tus
            tarjetas de credito o debito y número de cuenta del servicio.
          </p>
        </Collapse>
        <Collapse title={'¿Para que se usa mi información?'}>
          <p>
            Hay dos modos en que opera esta aplicación y cada uno usa un metodo de pago a tu
            elección;
          </p>
          <ul className="tree-view">
            <li>
              <Underline>Credenciales</Underline> - Usuario y contraseña del servicio en cuestion.
            </li>
            <li>
              <Underline>Número de cuenta</Underline> - Solo el número de cuenta del servicio en
              cuestion.
            </li>
          </ul>
        </Collapse>
      </div>
    </section>
  )
}
