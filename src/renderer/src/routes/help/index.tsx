import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Underline } from '../-components/Underline'
import {
  Accordion,
  AccordionContainer,
  AccordionContent,
  AccordionIcon,
  AccordionPanel,
  AccordionTitle,
  Button
} from 'keep-react'

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
      <Accordion className="h-full max-h-[100vh-20rem] p-2 space-y-1  overflow-y-scroll">
        <AccordionPanel>
          <AccordionContainer>
            <AccordionTitle>¿Como funciona?</AccordionTitle>
            <AccordionIcon />
          </AccordionContainer>
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
        </AccordionPanel>
        <AccordionPanel>
          <AccordionContainer>
            <AccordionTitle>¿Cuales son mis datos personales?</AccordionTitle>
            <AccordionIcon />
          </AccordionContainer>
          <AccordionContent>
            <p>
              Tus credenciales de inicio de sesión a los servicios que utilices, información de tus
              tarjetas de credito o debito y número de cuenta del servicio.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionContainer>
            <AccordionTitle>¿Para que se usa mi información?</AccordionTitle>
            <AccordionIcon />
          </AccordionContainer>
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
        </AccordionPanel>
      </Accordion>
    </main>
  )
}
