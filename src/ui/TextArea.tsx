import { FC, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  return (
    <textarea
      className="
        h-[90%]
        w-full resize-none border-none
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
