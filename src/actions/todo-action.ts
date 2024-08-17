"use server"

import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  if (!todo) throw `Todo con id ${id} no existe`

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  })

  //   Recargar el navegador
  revalidatePath("/dashboard/server-todos")

  return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        complete: false,
      },
    })

    revalidatePath("/dashboard/server-todos")

    return todo
  } catch (error) {
    return { message: "Error al crear todo" }
  }
}

export const deleteCompleted = async (): Promise<void> => {
  const todos = await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  })

  revalidatePath("/dashboard/server-todos")
}
