import type { FC, TextareaHTMLAttributes } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  const uniqueId = uuidv4()
  return (
    <textarea
      id={uniqueId}
      className="
       h-[90%] w-full resize-none border-none
        rounded bg-transparent
        text-primary-col focus:outline-none
      "
      value={props.value}
      autoFocus
      placeholder="Task content here"
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      onChange={props.onChange}
    />
  )
}

export default TextArea
