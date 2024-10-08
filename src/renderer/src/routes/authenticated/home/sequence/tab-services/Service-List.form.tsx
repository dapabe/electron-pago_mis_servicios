import { SupportedServices } from '#shared/constants/supported-services'
import { ChangeEvent, KeyboardEvent, useId, useMemo, useState } from 'react'

type IAddServiceProps = {}
export const ServiceListForm = ({}: IAddServiceProps) => {
  const [current, setCurrent] = useState('')
  const id = useId() + 'list'

  const updatedServices = useMemo(() => {
    return SupportedServices._def.values.filter((x) => !Object.hasOwn(data?.serviceFields ?? {}, x))
  }, [data?.serviceFields])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrent(evt.currentTarget.value)
  }
  const handleKeyChange = (evt: KeyboardEvent<HTMLLIElement>) => {
    if (['Enter', ' '].some((x) => x === evt.key)) {
      setCurrent(evt.currentTarget.dataset.value!)
    }
  }

  return (
    <div>
      <div className="combobox flex">
        {/* <label htmlFor={id}>Elige uno de los servicios disponibles...</label> */}
        <input
          id={id}
          type="text"
          role="combobox"
          // className="w-max"
          aria-owns={id}
          value={current}
          onChange={handleChange}
        />
        <button></button>
        <ul role="listbox" id={id} className="has-shadow has-hover">
          {updatedServices.map((x) => (
            <li
              key={x}
              tabIndex={0}
              role="option"
              data-value={x}
              onClick={() => setCurrent(x)}
              onKeyDown={handleKeyChange}
              aria-selected={x === current ? 'true' : undefined}
            >
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
