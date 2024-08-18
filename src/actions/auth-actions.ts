import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  //   Crear nuevo usuario
  if (!user) {
    const dbUser = await createUser(email, password);

    return dbUser;
  }

  //   Comparar password
  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  // Password no se puede desencriptar
  const hashPassword = bcrypt.hashSync(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      name: email.split("@")[0],
    },
  });

  return user;
};
