import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Column, Task } from '../../types'
import type { RootState } from '../store'

interface IBoardState {
  name: string
  columns: Column[]
  tasks: Task[]
}

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
      const activeIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.targetTaskId
      )
      const overIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.onDropTaskId
      )

      state.tasks[activeIndex].columnId = state.tasks[overIndex].columnId
      state.tasks = arrayMove(state.tasks, activeIndex, overIndex)
    },

    addTaskInEmptyColumn: (
      state,
      action: PayloadAction<{ targetTaskId: string; onDropColumnId: string }>
    ) => {
      const activeIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.targetTaskId
      )
      state.tasks[activeIndex].columnId = action.payload.onDropColumnId

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
  addTaskInEmptyColumn,
} = boardSlice.actions

export const selectBoard = (state: RootState) => state.board
export const selectTasks =
  (columnId: UniqueIdentifier) => (state: RootState) => {
    return state.board.tasks.filter((task) => task.columnId === columnId)
  }

export default boardSlice.reducer
