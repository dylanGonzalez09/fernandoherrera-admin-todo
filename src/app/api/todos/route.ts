import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client"
import { NextResponse } from "next/server"
import * as yup from "yup"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = +(searchParams.get("take") ?? "10")
  const skip = +(searchParams.get("skip") ?? "0")

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Take debe ser un numero" },
      { status: 400 }
    )
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "Skip debe ser un numero" },
      { status: 404 }
    )
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  })

  return NextResponse.json({ todos })
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    )

    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
      },
    })

    return NextResponse.json({ todo })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const todos = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    })

    return NextResponse.json({ todos })
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
    })
  }
}
