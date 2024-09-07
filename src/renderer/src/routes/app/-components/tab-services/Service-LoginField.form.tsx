import { FormattedMessage } from 'react-intl'

export const ServiceLoginFieldForm = () => {
  return (
    <div className="flex flex-col">
      <div className="w-min">
        <label htmlFor="username">
          <FormattedMessage id="common.form.username" />
        </label>
        <input type="text" name="username" id="username" />
      </div>
      <div className="w-min">
        <label htmlFor="password">
          <FormattedMessage id="common.form.username" />
        </label>
        <input type="password" name="password" id="password" />
      </div>
    </div>
  )
}
