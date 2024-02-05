import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../../hooks/useDispatch'
import { addTask } from '../../store/slices/BoardSlice'
import { Column } from '../../types'
const AddTaskButton: FC<{ column: Column }> = ({ column }) => {
  const dispatch = useAppDispatch()
  function handleAddTask() {
    dispatch(addTask({ id: uuidv4(), columnId: column.id }))
  }
  return (
    <button
      className="px-4 py-2 w-full bg-white-accent  text-base text-primary-col"
      onClick={handleAddTask}
    >
      Add task
    </button>
  )
}

export default AddTaskButton
