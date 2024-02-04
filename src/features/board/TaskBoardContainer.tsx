import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import React, { FC, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch } from '../../hooks/useDispatch'
import { useAppSelector } from '../../hooks/useSelector'
import { swapColumns, swapTasksOverATable } from '../../store/slices/BoardSlice'
import { Column, Task } from '../../types'
import ColumnContainer from './ColumnContainer'
import CreateColumnButton from './CreateColumnButton'
import TaskCard from './TaskCard'

const TaskBoardContainer: FC = () => {
  const columns = useAppSelector((state) => state.board.columns)
  const columnsId = useMemo(() => columns.map((column) => column.id), [columns])
  const dispatch = useAppDispatch()
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 25,
      },
    })
  )

  function onDragEnd(e: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = e
    if (!over) return

    const activeColumnId = active.id
    const overColumnId = over.id
    if (activeColumnId === overColumnId) return
    if (e.active.data.current?.type === 'column') {
      dispatch(swapColumns({ activeColumnId, overColumnId }))
    } else return
  }

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === 'column') {
      setActiveColumn(e.active.data.current.column)
      return
    }

    if (e.active.data.current?.type === 'task') {
      setActiveTask(e.active.data.current.task)
      return
    }
  }

  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'task'
    const isOverATask = over.data.current?.type === 'task'

    if (!isActiveATask) return

    const activeTaskId = active.data.current?.task?.id
    const overTaskId = over.data.current?.task?.id

    if (isActiveATask && isOverATask && activeTaskId && overTaskId) {
      dispatch(
        swapTasksOverATable({
          targetTaskId: activeTaskId,
          onDropTaskId: overTaskId,
        })
      )
    }
  }

  if (!columns.length)
    return (
      <div
        className="bg-white rounded-2xl 
        m-auto
        flex
        h-full
        w-full
        items-start
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
        py-[20px]
        flex-b
      "
      >
        <CreateColumnButton idx={0} />
      </div>
    )

  return (
    <div className="flex gap-5 w-full bg-white h-full rounded-2xl p-6 min-w-full overflow-x-scroll">
      <DndContext
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        sensors={sensors}
      >
        <SortableContext items={columnsId}>
          {columns.map((column, idx) => (
            <React.Fragment key={column.id}>
              <CreateColumnButton idx={idx} />
              <ColumnContainer
                key={column.id}
                column={column}
              />
            </React.Fragment>
          ))}
          <CreateColumnButton idx={columns.length} />
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
            {activeTask && (
              <TaskCard
                task={activeTask}
                isDraggable={true}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default TaskBoardContainer
