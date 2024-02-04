import { FC, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/useDispatch'
import { addColumn } from '../../store/slices/BoardSlice'
import Button from '../../ui/Button'
import InputField from '../../ui/InputField'

const CreateColumn: FC<{ onCloseModal?: () => void; idx: number }> = ({
  onCloseModal,
  idx,
}) => {
  const [columnName, setColumnName] = useState('')
  const dispatch = useAppDispatch()

  function handleCreateDesk(e: FormEvent) {
    e.preventDefault()

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
        onChange={(e) => setColumnName(e.target.value)}
        error={false}
      />
      <Button type="submit">Create Column</Button>
    </form>
  )
}

export default CreateColumn
