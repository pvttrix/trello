import { FC, TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  return <textarea {...props} />
}

export default TextArea
