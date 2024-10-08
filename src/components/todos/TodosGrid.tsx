"use client"
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import * as todosApi from "@/helpers/index"
import { useRouter } from "next/navigation"
import { toggleTodo } from "@/actions/todo-action"

interface Props {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  // With API
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete)

  //   router.refresh() //actualiza la pagina, pero solo reconstruye el componente afectado
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
