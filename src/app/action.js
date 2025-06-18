"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function registerAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ name, email, password });

  try {
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 12); // 10 - 13 -> Not much resources / Not too long to process.
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
  } catch (err) {
    console.log(err);
    return {
      message: "User already exist",
    };
  }
}

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let user = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    console.log("Something went wrong!");
    return {
      message: "Something went wrong!",
    };
  }

  if (!user) {
    console.log("User does not exist");
    return {
      message: "User does not exist!",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Invalid Password!");
    return {
      message: "Invalid Password!",
    };
  }

  console.log("Login success!");
  // Authorization
}
