import type { FC, FormEvent } from 'react'
import { useState, useEffect } from 'react'

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
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    setNewTitle(columnTitle)
  }, [columnTitle])

  function handleUpdateTableName(e: FormEvent) {
    e.preventDefault()
    if (newTitle.length > 150) {
      setError('Title could not be bigger than 150 characters')
      return
    }
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
        error={error}
        autoFocus
        onChange={(e) => {
          setNewTitle(e.target.value)
          setError('')
        }}
      />
      <Button type="submit">Save</Button>
    </form>
  )
}

export default UpdateColumnTitle
