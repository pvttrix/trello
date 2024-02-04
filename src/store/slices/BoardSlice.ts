import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Column, Task } from '../../types'
import type { RootState } from '../store'

// Define a type for the slice state
interface IBoardState {
  name: string
  columns: Column[]
  tasks: Task[]
}

// Define the initial state using that type
const initialState: IBoardState = {
  name: '',
  columns: [],
  tasks: [],
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload }
    },

    addColumn: (
      state,
      action: PayloadAction<{ title: string; index: number }>
    ) => {
      const { title, index } = action.payload
      const newColumn: Column = { id: uuidv4(), title }
      const newColumns = [...state.columns]
      newColumns.splice(index, 0, newColumn)

      return { ...state, columns: newColumns }
    },

    updateColumnName: (
      state,
      action: PayloadAction<{
        columnId: UniqueIdentifier
        newTitle: UniqueIdentifier
      }>
    ) => {
      const updatedColumns = state.columns.map((column) => {
        if (column.id === action.payload.columnId) {
          return { ...column, title: action.payload.newTitle }
        }
        return column
      })

      return { ...state, columns: updatedColumns }
    },

    addTask: (
      state,
      action: PayloadAction<{ task: Task; columnId: string }>
    ) => {
      return { ...state, tasks: [...state.tasks, action.payload] }
    },

    swapTasksOverATable: (
      state,
      action: PayloadAction<{ targetTaskId: string; onDropTaskId: string }>
    ) => {
      const { targetTaskId, onDropTaskId } = action.payload

      const targetIndex = state.tasks.findIndex(
        (task) => task.id === targetTaskId
      )
      const onDropIndex = state.tasks.findIndex(
        (task) => task.id === onDropTaskId
      )

      if (targetIndex !== -1 && onDropIndex !== -1) {
        const updatedTasks = [...state.tasks]
        const [movedTask] = updatedTasks.splice(targetIndex, 1)
        updatedTasks.splice(onDropIndex, 0, {
          ...movedTask,
          columnId: state.tasks[onDropIndex].columnId,
        })

        return {
          ...state,
          tasks: updatedTasks,
        }
      }

      return state // If tasks or indices are not found, return the unchanged state
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: UniqueIdentifier; content: string }>
    ) => {
      const { taskId, content } = action.payload
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, content }
        }
        return task
      })

      return { ...state, tasks: updatedTasks }
    },
    swapColumns: (
      state,
      action: PayloadAction<{ activeColumnId: string; overColumnId: string }>
    ) => {
      const targetColumnIndex = state.columns.findIndex(
        (col) => col.id === action.payload.activeColumnId
      )
      const onDragColumnIndex = state.columns.findIndex(
        (col) => col.id === action.payload.overColumnId
      )
      return {
        ...state,
        columns: arrayMove(state.columns, targetColumnIndex, onDragColumnIndex),
      }
    },
  },
})

export const {
  createBoard,
  addColumn,
  addTask,
  updateColumnName,
  swapColumns,
  updateTask,
  swapTasksOverATable,
} = boardSlice.actions

export const selectBoard = (state: RootState) => state.board
export const selectTasks =
  (columnId: UniqueIdentifier) => (state: RootState) => {
    return state.board.tasks.filter((task) => task.columnId === columnId)
  }

export default boardSlice.reducer
