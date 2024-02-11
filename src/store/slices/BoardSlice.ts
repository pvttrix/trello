import type { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import type { Column, Task } from '../../types'
import type { RootState } from '../store'

interface IBoardState {
  name: string
  columns: Column[]
}

const initialState: IBoardState = {
  name: '',
  columns: [],
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
      const newColumn: Column = { id: uuidv4(), title, tasks: [] }
      const newColumns = [...state.columns]
      newColumns.splice(index, 0, newColumn)

      return { ...state, columns: newColumns }
    },

    updateColumnName: (
      state,
      action: PayloadAction<{ columnId: UniqueIdentifier; newTitle: string }>
    ) => {
      const { columnId, newTitle } = action.payload
      const columnIndex = state.columns.findIndex((col) => col.id === columnId)
      if (columnIndex !== -1) {
        state.columns[columnIndex].title = newTitle
      }
    },

    addTask: (
      state,
      action: PayloadAction<{
        columnId: string
        index: number
      }>
    ) => {
      const { columnId, index } = action.payload
      const columnIndex = state.columns.findIndex((col) => col.id === columnId)

      if (columnIndex !== -1) {
        const newTask: Task = { id: uuidv4(), content: '' }
        state.columns[columnIndex].tasks.splice(index, 0, newTask)
      }
    },
    swapTasksOverATable: (
      state,
      action: PayloadAction<{ targetTaskId: string; onDropTaskId: string }>
    ) => {
      const { targetTaskId, onDropTaskId } = action.payload

      // Find columns of both tasks
      const activeColumnIndex = state.columns.findIndex((col) =>
        col.tasks.some((task) => task.id === targetTaskId)
      )
      const overColumnIndex = state.columns.findIndex((col) =>
        col.tasks.some((task) => task.id === onDropTaskId)
      )

      if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
        const activeTaskIndex = state.columns[
          activeColumnIndex
        ].tasks.findIndex((task) => task.id === targetTaskId)
        const overTaskIndex = state.columns[overColumnIndex].tasks.findIndex(
          (task) => task.id === onDropTaskId
        )

        // Swap tasks between columns
        const activeTask =
          state.columns[activeColumnIndex].tasks[activeTaskIndex]
        state.columns[activeColumnIndex].tasks.splice(activeTaskIndex, 1)
        state.columns[overColumnIndex].tasks.splice(
          overTaskIndex,
          0,
          activeTask
        )
      }
    },

    addTaskInEmptyColumn: (
      state,
      action: PayloadAction<{ targetTaskId: string; onDropColumnId: string }>
    ) => {
      const { targetTaskId, onDropColumnId } = action.payload

      const activeColumnIndex = state.columns.findIndex((col) =>
        col.tasks.some((task) => task.id === targetTaskId)
      )
      const overColumnIndex = state.columns.findIndex(
        (col) => col.id === onDropColumnId
      )

      if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
        const activeTaskIndex = state.columns[
          activeColumnIndex
        ].tasks.findIndex((task) => task.id === targetTaskId)

        // Move task to the specified column
        const activeTask =
          state.columns[activeColumnIndex].tasks[activeTaskIndex]
        state.columns[activeColumnIndex].tasks.splice(activeTaskIndex, 1)
        state.columns[overColumnIndex].tasks.push(activeTask)
      }
    },

    updateTask: (
      state,
      action: PayloadAction<{
        columnId: UniqueIdentifier
        taskId: UniqueIdentifier
        content: string
      }>
    ) => {
      const { columnId, taskId, content } = action.payload

      const columnIndex = state.columns.findIndex((col) => col.id === columnId)
      if (columnIndex !== -1) {
        // Find the task within the column
        const taskIndex = state.columns[columnIndex].tasks.findIndex(
          (task) => task.id === taskId
        )
        if (taskIndex !== -1) {
          // Update the task content
          state.columns[columnIndex].tasks[taskIndex].content = content
        }
      }
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

// Memoized selector factory function
export const selectTasksByColumnId = (columnId: UniqueIdentifier) =>
  createSelector(
    (state: RootState) => state.board.columns,
    (columns) => {
      const column = columns.find((col) => col.id === columnId)
      return column ? column.tasks : []
    }
  )

export default boardSlice.reducer
