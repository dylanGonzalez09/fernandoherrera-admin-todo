import prisma from "@/app/lib/prisma"
import { TodosGrid } from "@/components"
import { NewTodo } from "@/components/todos/NewTodo"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Listado de todos",
  description: "SEO title",
}

const page = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  )
}

export default page
