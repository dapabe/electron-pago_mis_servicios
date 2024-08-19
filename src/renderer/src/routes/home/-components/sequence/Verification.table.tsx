import { ISupportedServices } from '#shared/constants/supported-services'
import { ChangeEvent, PropsWithChildren, useId } from 'react'
import { FormattedMessage } from 'react-intl'

type IVerifTableProps = {
  hasSequenceStarted: boolean

  invalidateValues: Record<ISupportedServices, boolean>
  handleInvalidation: (evt: ChangeEvent<HTMLInputElement>) => void

  toBePaidValues: Record<ISupportedServices, boolean>
  handleToBePaid: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const VerificationTable = ({
  hasSequenceStarted,
  handleInvalidation,
  handleToBePaid,
  invalidateValues,
  toBePaidValues
}: IVerifTableProps) => {
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
        {Object.entries(toBePaidValues).map(([service, value]) => (
          <tr key={service} className="space-y-1">
            <td>{service}</td>
            <td>
              <VerificationTable.CheckMethod
                name={service}
                isChecked={invalidateValues[service]}
                isDisabled={hasSequenceStarted}
                onChange={handleInvalidation}
              >
                <FormattedMessage id={invalidateValues[service] ? 'common.no' : 'common.yes'} />
              </VerificationTable.CheckMethod>
            </td>
            <td>
              <VerificationTable.CheckMethod
                name={service}
                isChecked={value}
                isDisabled={hasSequenceStarted || invalidateValues[service]}
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
