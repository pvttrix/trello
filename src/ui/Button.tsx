import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onCustomClick?: () => void
  children: ReactNode
  className?: string
  type: 'submit' | 'button' | 'reset'
}

const CustomButton: FC<CustomButtonProps> = ({
  onClick,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={`
      px-4 py-2
      bg-primary-col 
      rounded-sm hover:cursor-pointer
      text-white text-base
      font-bold
      flex items-center justify-center
      ${className || ''}`}
    >
      {children}
    </button>
  )
}

export default CustomButton
