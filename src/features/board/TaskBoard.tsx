import type { FC } from 'react'

import { useAppSelector } from '../../hooks/useSelector'

import CreateTaskBoardButton from './CreateTaskBoardButton.tsx'
import TaskBoardContainer from './TaskBoardContainer'

const TaskBoard: FC = () => {
  const taskBoardName = useAppSelector((state) => state.board.name)

  if (!taskBoardName) return <CreateTaskBoardButton />
  return (
    <div className="flex flex-col items-stretch w-full h-full">
      <h1 className="text-center text-3xl text-primary-col">
        Board Name: {taskBoardName}
      </h1>
      <TaskBoardContainer />
    </div>
  )
}

export default TaskBoard
