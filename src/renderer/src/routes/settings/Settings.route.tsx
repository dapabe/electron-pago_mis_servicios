import { CheckBox } from '../-components/CheckBox'
import { Form } from 'react-router-dom'
import { SyntheticEvent } from 'react'
import { useUserDataStore } from '@renderer/stores/user-data.store'
import { IFlagConfig } from '@renderer/common/schemas/flags.schema'
import { FormattedMessage } from 'react-intl'

export const SettingsRoute = (): JSX.Element => {
  const { flags, toggleFlag } = useUserDataStore()

  const handleFlag = async (evt: SyntheticEvent<HTMLInputElement>): Promise<void> => {
    toggleFlag(evt.currentTarget.name as keyof IFlagConfig)
  }

  return (
    <Form>
      {Object.entries(flags!).map(([name, value]) => (
        <CheckBox key={name} name={name} isChecked={value} onChange={handleFlag}>
          <div className="flex gap-x-2">
            <FormattedMessage id={`flags.${name}.text`} />{' '}
            <span className="text-gray-500">
              <FormattedMessage id={`flags.${name}.label`} />
            </span>
          </div>
        </CheckBox>
      ))}
    </Form>
  )
}
