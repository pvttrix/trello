import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FC, useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FcCheckmark } from 'react-icons/fc'
import { useAppDispatch } from '../../hooks/useDispatch'
import { updateTask } from '../../store/slices/BoardSlice'
import { Task } from '../../types'
import InputField from '../../ui/InputField'

const TaskCard: FC<{ task: Task; isDraggable?: boolean }> = ({
  task,
  isDraggable = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const taskId = task.id
  const [content, setContent] = useState(task.content)
  const [isEditing, setIsEditing] = useState(isDraggable ? false : true)
  const dispatch = useAppDispatch()

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  function handleUpdateTaskContent() {
    dispatch(updateTask({ taskId, content }))
    setIsEditing(false)
  }

  return (
    <div
      className={`py-5 px-2 w-full bg-white-accent rounded-md flex justify-stretch items-end gap-2 ${
        isDragging ? 'opacity-35' : ''
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {isEditing ? (
        <>
          <InputField
            value={content}
            type="text"
            ref={inputRef}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="button"
            onClick={handleUpdateTaskContent}
            className="w-[40px] h-[40px] flex justify-center items-center"
          >
            <FcCheckmark />
          </button>
        </>
      ) : (
        <div className="flex justify-between gap-5 items-center w-full">
          <span>{task.content}</span>
          <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskCard
