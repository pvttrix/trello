import { FC } from 'react'
import { useAppSelector } from '../../hooks/useSelector'
import Button from '../../ui/Button'
import Modal from '../../ui/Popup'
import CreateTaskBoardForm from './CreateTaskBoardForm'
import TaskBoardContainer from './TaskBoardContainer'

const TaskBoard: FC = () => {
  const taskBoardName = useAppSelector((state) => state.board.name)

  if (!taskBoardName)
    return (
      <div className="h-full rounded-2xl m-auto">
        <Modal>
          <Modal.Open opens="create-task-board">
            <Button type="submit">Create Task Board</Button>
          </Modal.Open>
          <Modal.Window name="create-task-board">
            <CreateTaskBoardForm />
          </Modal.Window>
        </Modal>
      </div>
    )
  return <TaskBoardContainer />
}

export default TaskBoard
