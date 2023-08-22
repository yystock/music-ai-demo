import { auth, currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const decrementCredits = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const user = await prismadb.user.findUnique({
    where: { userId: userId },
  });
  if (!user) return false;

  if (user) {
    await prismadb.user.update({
      where: { userId: userId },
      data: { credits: user.credits - 1 },
    });
  }
};

export const checkCredits = async () => {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) {
    return false;
  }

  const userdb = await prismadb.user.findUnique({
    where: { userId: userId },
  });
  if (!userdb) {
    console.log("creating user");
    await prismadb.user.create({
      data: {
        userId: userId,
        credits: 5,
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return true;
  }
  if (userdb.credits == 0) {
    return false;
  } else {
    return true;
  }
};

export const getCreditsCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const user = await prismadb.user.findUnique({
    where: {
      userId,
    },
  });

  if (!user) {
    return 0;
  }

  return user.credits;
};
