import type { FC, FormEvent } from 'react'
import { useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { createBoard } from '../../store/slices/BoardSlice'
import Button from '../../ui/Button'
import InputField from '../../ui/InputField'

interface CreateTaskBoardFormProps {
  onCloseModal?: () => void
}
const CreateTaskBoardForm: FC<CreateTaskBoardFormProps> = ({
  onCloseModal,
}) => {
  const [boardName, setBoardName] = useState('')
  const dispatch = useAppDispatch()

  function handleCreateDesk(e: FormEvent) {
    e.preventDefault()

    dispatch(createBoard(boardName))
    onCloseModal?.()
  }
  return (
    <form
      className="flex flex-col align-middle justify-center gap-5"
      onSubmit={handleCreateDesk}
    >
      <InputField
        name="BoardName"
        label="Board Name"
        type="text"
        placeholder="Enter a board name"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <Button type="submit">Create a board</Button>
    </form>
  )
}

export default CreateTaskBoardForm
