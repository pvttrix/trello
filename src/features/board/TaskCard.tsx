import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { useAppDispatch } from '../../hooks/useDispatch'
import { updateTask } from '../../store/slices/BoardSlice'
import type { Task } from '../../types'
import TextArea from '../../ui/TextArea.tsx'

interface TaskCardProps {
  task: Task
  columnId?: string
}

const TaskCard: FC<TaskCardProps> = ({ task, columnId }) => {
  const taskId = task.id
  const [localContent, setLocalContent] = useState(task.content)
  const [isContentModified, setIsContentModified] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isContentModified && localContent !== task.content) {
      setLocalContent(task.content)
    }
  }, [localContent, task.content, isContentModified])

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
    if (isContentModified && columnId) {
      dispatch(
        updateTask({ columnId: columnId, taskId, content: localContent })
      )
      setIsContentModified(false)
    }
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
        value={localContent}
        onChange={(e) => {
          setLocalContent(e.target.value)
          setIsContentModified(true)
        }}
        onBlur={handleUpdateTaskContent}
      />
    </div>
  )
}

export default TaskCard
