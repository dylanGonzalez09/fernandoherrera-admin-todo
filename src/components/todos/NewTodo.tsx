"use client"

import { addTodo, deleteCompleted } from "@/actions/todo-action"
import { createTodo, deleteTodo } from "@/helpers/todos/todos"
import { Todo } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"

interface Props {
  todos: Todo[]
}

export const NewTodo = () => {
  const [description, setDescription] = useState("")
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (description.trim().length === 0) return

    // await createTodo(description)
    await addTodo(description)

    setDescription("")

    // router.refresh()
  }

  const onDelete = async () => {
    await deleteTodo()

    router.refresh()
  }

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  )
}
