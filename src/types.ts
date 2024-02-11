export type Id = string

export type Column = {
  id: Id
  title: string
  tasks: Task[]
}

export type Task = {
  id: Id
  content: string
}
