export interface ITask {
  id: number
  content: string
  completed: boolean
  categoryId: number | null
  date: Date
}

export interface IRoutine {
  id: number
  name: string
}

export interface IroutineLog {
  id: number
  routineId: number
  date: Date
}
