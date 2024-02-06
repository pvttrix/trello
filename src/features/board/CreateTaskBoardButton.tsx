import type {FC} from 'react';

import Button from "../../ui/Button.tsx";
import Modal from "../../ui/Popup.tsx";

import CreateTaskBoardForm from "./CreateTaskBoardForm.tsx";

const CreateTaskBoardButton: FC = () => {
  return (
      <div className="h-full rounded-2xl m-auto">
        <Modal>
          <Modal.Open opens="create-task-board">
            <Button type="submit">Create Task Board</Button>
          </Modal.Open>
          <Modal.Window name="create-task-board">
            <CreateTaskBoardForm/>
          </Modal.Window>
        </Modal>
      </div>
  );
};
export default CreateTaskBoardButton;