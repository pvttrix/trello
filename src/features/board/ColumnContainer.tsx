import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { CiEdit } from 'react-icons/ci'

import { useAppDispatch } from '../../hooks/useDispatch.ts'
import { useAppSelector } from '../../hooks/useSelector'
import { addTask, selectTasksByColumnId } from '../../store/slices/BoardSlice'
import type { Column } from '../../types'
import Button from '../../ui/Button.tsx'

import TaskCard from './TaskCard'
import UpdateColumnTitle from './UpdateColumnTitle'

interface ColumnContainerProps {
  column: Column
}
const ColumnContainer: FC<ColumnContainerProps> = ({ column }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)

  const tasks = useAppSelector(selectTasksByColumnId(column.id))
  const dispatch = useAppDispatch()
  function handleAddTaskButton(columnId: string) {
    dispatch(addTask({ columnId }))
  }

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        className="flex gap-3 opacity-35
         flex-col basis-[320px]
         grow-0 shrink-0 h-full
         p-2 rounded-lg bg-lime-100 border-slate-300 border "
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }

  return (
    <div
      className="flex gap-3 flex-col
      basis-[320px] grow-0 shrink-0
      h-full p-2 rounded-lg bg-base-col overflow-y-auto"
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className="w-full items-center px-3 py-2
        bg-primary-col
        rounded-md flex justify-center
        text-white gap-3
        hover:cursor-pointer
        "
      >
        {isTitleEditing ? (
          <UpdateColumnTitle
            id={column.id}
            columnTitle={column.title}
            setIsTitleEditing={setIsTitleEditing}
          />
        ) : (
          <>
            <h3 className="text-center text-2xl ">{column.title}</h3>
            <Button
              type="button"
              className="hover:cursor-pointer px-3 py-1"
              onClick={() => setIsTitleEditing(true)}
            >
              <CiEdit />
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-5 flex-col">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </SortableContext>
        <Button type="button" onClick={() => handleAddTaskButton(column.id)}>
          Add task
        </Button>
      </div>
    </div>
  )
}

export default ColumnContainer
