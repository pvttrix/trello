import type { ChangeEvent, FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'number' | 'email' | 'password'
  label?: string
  value: string | number
  name?: string
  placeholder?: string
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputField: FC<InputProps> = ({ ...InputProps }) => {
  return (
    <div className="input-wrapper mt-4 w-full">
      <label
        htmlFor={InputProps.label}
        className="font-bold text-xl text-primary-col block mb-2"
      >
        {InputProps.label}
      </label>
      <input
        autoFocus={InputProps.autoFocus}
        type={InputProps.type}
        id={InputProps.label}
        value={InputProps.value}
        name={InputProps.name}
        placeholder={InputProps.placeholder}
        onChange={InputProps.onChange}
        disabled={InputProps.disabled}
        className="text-base font-normal text-primary-col
          bg-white border
          border-primary-col rounded-lg
          shadow-sm py-2 px-4 focus:outline-none 
          focus:ring focus:border-primary-col w-full"
      />
      {InputProps.error && (
        <p className="error text-red-500 text-sm font-normal mt-1 ml-3">
          {InputProps.error}
        </p>
      )}
    </div>
  )
}

export default InputField
