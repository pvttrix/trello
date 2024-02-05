import { FC } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Button from '../../ui/Button'
import Modal from '../../ui/Popup'
import CreateColumn from './CreateColumnForm'

const CreateColumnButton: FC<{ idx: number }> = ({ idx }) => {
  return (
    <Modal>
      <Modal.Open opens="create-column">
        <Button
          type="button"
          className="flex gap-2 items-center px-[4px] bg-secondary-col"
        >
          <IoMdAddCircleOutline />
        </Button>
      </Modal.Open>
      <Modal.Window name="create-column">
        <CreateColumn idx={idx} />
      </Modal.Window>
    </Modal>
  )
}

export default CreateColumnButton
