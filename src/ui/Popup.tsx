import React, {
  FC,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { HiX } from 'react-icons/hi'
import { useOutsideClick } from '../hooks/useOutsideClick'

interface ModalContextProps {
  openName: string
  close: () => void
  open: (name: string) => void
}

const StyledModal = `
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100
  rounded-lg shadow-lg p-8 transition-all duration-500
`

const Overlay = `
  fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-1000 transition-all duration-500
`

const Button = `
  bg-none border-none p-1 rounded-sm transform translate-x-2 transition-all duration-200 absolute top-3 right-4

  hover:bg-gray-200

  svg {
    w-6 h-6 text-gray-500
  }
`

const ModalContext = createContext<ModalContextProps>({
  openName: '',
  close: () => {},
  open: () => {},
})

interface ModalProps {
  children: ReactNode
}

interface ModalComponent extends FC<ModalProps> {
  Open: FC<OpenProps>
  Window: FC<WindowProps>
}

const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState<string>('')

  const close = () => setOpenName('')
  const open = (name: string) => setOpenName(name)

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

interface OpenProps {
  children: ReactNode
  opens: string
  className?: string
}

const Open: FC<OpenProps> = ({ children, opens, className }) => {
  const { open } = useContext(ModalContext)

  return cloneElement(children as any, {
    onClick: () => open(opens),
    className: className,
  })
}

interface WindowProps {
  children: ReactNode
  name: string
}

const Window: FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext)
  const ref = useOutsideClick(close)

  if (name !== openName) return null

  return createPortal(
    <div className={Overlay}>
      <div
        className={StyledModal}
        ref={ref}
      >
        <button
          className={Button}
          onClick={close}
        >
          <HiX />
        </button>

        <div>{cloneElement(children as any, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
