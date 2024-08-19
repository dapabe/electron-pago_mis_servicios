import { ISupportedServices } from '#shared/constants/supported-services'
import { UserServiceManager } from '#shared/schemas/userServiceField.schema'
import { ChangeEvent, PropsWithChildren, useId, useState } from 'react'
import { FormattedMessage } from 'react-intl'

const createDefaultValues = () => {
  const temp = {} as Record<ISupportedServices, boolean>

  for (const service of Object.keys(UserServiceManager.getLastSchema().shape)) {
    temp[service] = null
  }

  return temp
}

type IVerifTableProps = {
  hasSequenceStarted: boolean
}

export const VerificationTable = ({ hasSequenceStarted }: IVerifTableProps) => {
  const [toBePaid, setToBePaid] = useState(createDefaultValues())
  const [toInvalidate, setInvalidation] = useState(createDefaultValues())

  const handleToBePaid = (evt: ChangeEvent<HTMLInputElement>) => {
    const service = evt.currentTarget.name
    const value = evt.currentTarget.checked
    setToBePaid((x) => ({ ...x, [service as keyof ISupportedServices]: value }))
  }
  const handleInvalidation = (evt: ChangeEvent<HTMLInputElement>) => {
    const service = evt.currentTarget.name
    const value = evt.currentTarget.checked
    setInvalidation((x) => ({ ...x, [service as keyof ISupportedServices]: value }))
  }

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th>
            <div className="w-max mr-auto underline">
              <FormattedMessage id="page.home.tab.verify.table.col-1" />
            </div>
          </th>
          <th>
            <div className="w-max mr-auto underline">
              <FormattedMessage id="page.home.tab.verify.table.col-2" />
            </div>
          </th>
          <th>
            <div className="w-max mr-auto underline">
              <FormattedMessage id="page.home.tab.verify.table.col-3" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(toBePaid).map(([service, value]) => (
          <tr key={service} className="space-y-1">
            <td>{service}</td>
            <td>
              <VerificationTable.CheckMethod
                name={service}
                isChecked={toInvalidate[service]}
                isDisabled={hasSequenceStarted}
                onChange={handleInvalidation}
              >
                <FormattedMessage id={toInvalidate[service] ? 'common.no' : 'common.yes'} />
              </VerificationTable.CheckMethod>
            </td>
            <td>
              <VerificationTable.CheckMethod
                name={service}
                isChecked={value}
                isDisabled={hasSequenceStarted || toInvalidate[service]}
                onChange={handleToBePaid}
              >
                <FormattedMessage
                  id={
                    value
                      ? 'page.home.tab.verify.table.with-account'
                      : 'page.home.tab.verify.table.no-account'
                  }
                />
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
  isDisabled?: boolean
  name: string
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

const CheckMethod = ({ children, isChecked, name, isDisabled, onChange }: ICheckMethodProps) => {
  const id = useId() + 'cm'
  return (
    <div className="w-max mr-auto">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}

VerificationTable.CheckMethod = CheckMethod
