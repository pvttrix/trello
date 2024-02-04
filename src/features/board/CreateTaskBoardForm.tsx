import { FC, FormEvent, useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { createBoard } from '../../store/slices/BoardSlice'
import Button from '../../ui/Button'
import InputField from '../../ui/InputField'

const CreateTaskBoardForm: FC<{ onCloseModal?: () => void }> = ({
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
        error={false}
      />
      <Button type="submit">Create a board</Button>
    </form>
  )
}

export default CreateTaskBoardForm
