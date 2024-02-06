import type { FC, FormEvent } from 'react'
import { useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { updateColumnName } from '../../store/slices/BoardSlice'
import Button from '../../ui/Button'
import InputField from '../../ui/InputField'

interface UpdateColumnTitleProps {
  id: string
  columnTitle: string
  setIsTitleEditing: (isEditing: boolean) => void
}

const UpdateColumnTitle: FC<UpdateColumnTitleProps> = ({
  id,
  columnTitle,
  setIsTitleEditing,
}) => {
  const [newTitle, setNewTitle] = useState(columnTitle)
  const dispatch = useAppDispatch()

  function handleUpdateTableName(e: FormEvent) {
    e.preventDefault()
    dispatch(updateColumnName({ columnId: id, newTitle }))
    setIsTitleEditing(false)
  }
  return (
    <form
      className="w-full gap-2 justify-between"
      onSubmit={handleUpdateTableName}
    >
      <InputField
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  )
}

export default UpdateColumnTitle
