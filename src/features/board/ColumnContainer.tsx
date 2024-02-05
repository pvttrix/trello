import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FC, useMemo, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { useAppSelector } from '../../hooks/useSelector'
import { selectTasks } from '../../store/slices/BoardSlice'
import { Column } from '../../types'
import AddTaskButton from './AddTaskButton'
import TaskCard from './TaskCard'
import UpdateColumnTitle from './UpdateColumnTitle'

const ColumnContainer: FC<{ column: Column }> = ({ column }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const tasks = useAppSelector(selectTasks(column.id))
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
         p-2 rounded-sm bg-lime-100 border-slate-300 border"
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }

  return (
    <div
      className="flex gap-3 flex-col basis-[320px] grow-0 shrink-0 h-full p-2 rounded-sm "
      ref={setNodeRef}
      style={style}
    >
      <div
        {...attributes}
        {...listeners}
        className="w-full items-center px-3 py-2 bg-primary-col
      rounded-md flex justify-center text-white gap-3 hover:cursor-pointer
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
            <button
              className="hover:cursor-pointer px-3 py-1"
              onClick={() => setIsTitleEditing(true)}
            >
              <CiEdit />
            </button>
          </>
        )}
      </div>
      <div className="flex gap-5 flex-col">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
            />
          ))}
        </SortableContext>
        <AddTaskButton column={column} />
      </div>
    </div>
  )
}

export default ColumnContainer
