import { ISupportedServices } from '#shared/constants/supported-services'
import { UserServiceManager } from '#shared/schemas/userServiceField.schema'
import { ChangeEvent, PropsWithChildren, useId } from 'react'
import { useForm } from 'react-hook-form'

export const VerificationTable = () => {
  const createDefaultValues = () => {
    const temp = {} as Record<keyof ISupportedServices, null | boolean>

    for (const service of Object.keys(UserServiceManager.getLastSchema().shape)) {
      temp[service] = false
    }

    return temp
  }

  const { getValues, setValue } = useForm({
    values: createDefaultValues()
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.currentTarget.name as any, evt.currentTarget.checked)
    setValue(evt.currentTarget.name as any, evt.currentTarget.checked)
  }

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th>Service</th>
          <th>Metodo de pago</th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>
        {Object.keys(UserServiceManager.getLastSchema().shape).map((service) => (
          <tr key={service} className="space-y-1">
            <td>{service}</td>
            <td className="flex justify-center gap-0 border py-1 border-gray-300">
              <VerificationTable.CheckMethod
                name={service}
                isChecked={getValues()[service]}
                onChange={handleChange}
              >
                {getValues()[service] ? 'Con cuenta' : 'Sin cuenta'}
              </VerificationTable.CheckMethod>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type ICheckMethodProps = PropsWithChildren & {
  isChecked?: boolean
  name: string
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

const CheckMethod = ({ children, isChecked, name, onChange }: ICheckMethodProps) => {
  const id = useId() + 'cm'
  return (
    <div>
      <input id={id} type="radio" name={name} checked={isChecked} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}

VerificationTable.CheckMethod = CheckMethod
