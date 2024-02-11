import type { FC, FormEvent } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

import { useAppDispatch } from '../../hooks/useDispatch.ts'
import { addColumn } from '../../store/slices/BoardSlice.ts'
import Button from '../../ui/Button'

interface CreateColumnButtonProps {
  idx: number
}
const CreateColumnButton: FC<CreateColumnButtonProps> = ({ idx }) => {
  const dispatch = useAppDispatch()
  function handleCreateColumn(e: FormEvent) {
    e.preventDefault()

    dispatch(addColumn({ title: '', index: idx }))
  }
  return (
    <Button
      type="button"
      className="
      flex gap-2 items-center
      justify-center bg-primary-col
      rounded-lg"
      onClick={handleCreateColumn}
    >
      <IoMdAddCircleOutline />
    </Button>
  )
}

export default CreateColumnButton
