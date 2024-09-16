import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Underline } from '../-components/Underline'
import { Button } from '#renderer/shadcn/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '#renderer/shadcn/ui/accordion'

export const Route = createFileRoute('/help/')({
  component: Component
})
function Component() {
  const nav = useNavigate()
  return (
    <main className="flex h-full">
      <div className="p-2 bg-metal-900">
        <Button variant="link" color="secondary" onClick={() => nav({ to: '/' })}>
          Volver
        </Button>
      </div>
      <Accordion
        type="single"
        //  className="h-full max-h-[100vh-20rem] p-2 space-y-1 overflow-y-scroll"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>¿Como funciona?</AccordionTrigger>
          <AccordionContent>
            <p>
              Al momento de registrar tu cuenta se te pedira un correo y contraseña unica, solo
              necesitaras la contraseña para acceder a tus datos.
              <br />
              Estos datos se guardaran de forma encriptada y{' '}
              <Underline>solo se puede acceder con tu contraseña</Underline>.
              <br />
              En caso que olvides tu contraseña se te enviara un mensaje al correo con esta misma.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>¿Cuales son mis datos personales?</AccordionTrigger>
          <AccordionContent>
            <p>
              Tus credenciales de inicio de sesión a los servicios que utilices, información de tus
              tarjetas de credito o debito y número de cuenta del servicio.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>¿Para que se usa mi información?</AccordionTrigger>
          <AccordionContent>
            <p>
              Hay dos modos en que opera esta aplicación y cada uno usa un metodo de pago a tu
              elección;
            </p>
            <ul>
              <li>
                <Underline>Credenciales</Underline> - Usuario y contraseña del servicio en cuestion.
              </li>
              <li>
                <Underline>Número de cuenta</Underline> - Solo el número de cuenta del servicio en
                cuestion.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}
