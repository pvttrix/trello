import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { closestCenter } from '@dnd-kit/core'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { useAppDispatch } from '../../hooks/useDispatch'
import { useAppSelector } from '../../hooks/useSelector'
import {
  addTaskInEmptyColumn,
  swapColumns,
  swapTasksOverATable,
} from '../../store/slices/BoardSlice'
import type { Column, Task } from '../../types'

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

    const activeColumnId = active.id as string
    const overColumnId = over.id as string
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

    if (!isActiveATask && !isOverATask) return

    const activeTaskId = active.data.current?.task?.id as string
    const overTaskId = over.data.current?.task?.id
    //1) Swapping Tasks between each other
    if (isActiveATask && isOverATask && activeTaskId && overTaskId) {
      dispatch(
        swapTasksOverATable({
          targetTaskId: activeTaskId,
          onDropTaskId: overTaskId,
        })
      )
      return
    }

    //2 Swap task inside column
    const isOverAColumn = over.data.current?.type === 'column'
    const overColumnId = over.data.current?.column?.id
    if (isActiveATask && isOverAColumn) {
      dispatch(
        addTaskInEmptyColumn({
          targetTaskId: activeTaskId,
          onDropColumnId: overColumnId,
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
    <div
      className="
    flex gap-5 w-full
    items-center
    bg-white h-full
    rounded-2xl p-6
    min-w-full
    overflow-x-auto"
    >
      <DndContext
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={columnsId}>
          {columns.map((column, idx) => (
            <React.Fragment key={column.id}>
              <CreateColumnButton idx={idx} />
              <ColumnContainer key={column.id} column={column} />
            </React.Fragment>
          ))}
          <CreateColumnButton idx={columns.length} />
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && <ColumnContainer column={activeColumn} />}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default TaskBoardContainer
