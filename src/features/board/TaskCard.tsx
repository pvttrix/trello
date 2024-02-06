import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { updateTask } from '../../store/slices/BoardSlice'
import type { Task } from '../../types'
import TextArea from '../../ui/TextArea.tsx'

interface TaskCardProps {
  task: Task
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const taskId = task.id
  const [content, setContent] = useState(task.content)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setContent(task.content)
  }, [task.content])

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

  function handleUpdateTaskContent() {
    dispatch(updateTask({ taskId, content }))
  }

  return (
    <div
      className={`py-5 px-2 w-full bg-white-accent rounded-md flex justify-stretch items-end gap-2 text-primary-col ${
        isDragging ? 'opacity-35' : ''
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleUpdateTaskContent}
      />
    </div>
  )
}

export default TaskCard
