"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const session = await getServerSession(authOptions);

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) throw `Todo con id ${id} no existe`;

  const updatedTodo = await prisma.todo.update({
    where: { id, userId: session?.user?.id! },
    data: { complete },
  });

  //   Recargar el navegador
  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const session = await getServerSession(authOptions);

  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        complete: false,
        userId: session?.user?.id!,
      },
    });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return { message: "Error al crear todo" };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  const session = await getServerSession(authOptions);

  const todos = await prisma.todo.deleteMany({
    where: {
      complete: true,
      userId: session?.user?.id!,
    },
  });

  revalidatePath("/dashboard/server-todos");
};
