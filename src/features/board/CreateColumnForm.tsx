import type { FC, FormEvent } from 'react'
import { useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { addColumn } from '../../store/slices/BoardSlice'
import Button from '../../ui/Button'
import InputField from '../../ui/InputField'

interface CreateColumnProps {
  idx: number
}

const CreateColumn: FC<CreateColumnProps> = ({ idx }) => {
  const [columnName, setColumnName] = useState('')
  const [error, setError] = useState<string>('')

  const dispatch = useAppDispatch()

  function handleCreateDesk(e: FormEvent) {
    e.preventDefault()

    if (!columnName.trim()) {
      setError('Column name cannot be empty')
      return
    }

    if (columnName.length > 150) {
      setError('Column name must be less than 150 characters')
      return
    }

    dispatch(addColumn({ title: columnName, index: idx }))
    onCloseModal?.()
  }

  return (
    <form
      className="flex flex-col align-middle justify-center gap-5"
      onSubmit={handleCreateDesk}
    >
      <InputField
        name="columnName"
        label="Column name"
        type="text"
        placeholder="Enter a column"
        value={columnName}
        onChange={(e) => {
          setColumnName(e.target.value)
          setError('')
        }}
      />
      <Button type="submit">Create Column</Button>
    </form>
  )
}

export default CreateColumn
