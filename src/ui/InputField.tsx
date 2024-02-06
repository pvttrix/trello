import type { ChangeEvent, FC, InputHTMLAttributes, MutableRefObject } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value: string | number
  name?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  ref?: MutableRefObject<HTMLInputElement | null>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputField: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {
  return (
    <div className="input-wrapper mt-4 w-full">
      <label
        htmlFor={label}
        className="font-bold text-xl text-primary-col block mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="text-base font-normal text-primary-col
          bg-white border
          border-primary-col rounded-lg
          shadow-sm py-2 px-4 focus:outline-none 
          focus:ring focus:border-primary-col w-full"
      />
      {error && (
        <p className="error text-red-500 text-sm font-normal mt-1 ml-3">
          Input field can't be empty!
        </p>
      )}
    </div>
  )
}

export default InputField
