import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client"
import { NextResponse } from "next/server"
import * as yup from "yup"

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  return todo
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params

  const todo = await getTodo(id)

  if (!todo)
    return NextResponse.json(
      {
        message: "No hay todo",
      },
      { status: 404 }
    )

  return NextResponse.json({
    message: "Todo encontrado",
    todo,
  })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segments) {
  try {
    const { id } = params

    const todo = await getTodo(id)

    const { complete, description } = await putSchema.validate(
      await request.json()
    )

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    })

    if (!todo)
      return NextResponse.json(
        {
          message: "No hay todo",
        },
        { status: 404 }
      )

    return NextResponse.json({
      message: "Todo encontrado",
      updatedTodo,
    })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
