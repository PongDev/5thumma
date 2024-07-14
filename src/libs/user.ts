import { User } from "@/models/user";
import { usersCollection } from "./firestore";
import crypto from "crypto";
import { TaskType } from "@/models/task";

const TokenLength = 64;

export const InvalidTokenError = new Error("Invalid token");
export const UserNotFoundError = new Error("User not found");

export const validateUserToken = (token: string) => {
  if (token.length != TokenLength) {
    throw InvalidTokenError;
  }
};

export const generateUserToken = (): string => {
  let token = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < TokenLength; i++) {
    token += characters.charAt(crypto.randomInt(0, characters.length));
  }
  return token;
};

export const getUserData = async (
  token: string,
): Promise<
  [
    FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >,
    User | undefined,
  ]
> => {
  const userRef = usersCollection.doc(token);

  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw UserNotFoundError;
  }
  return [userRef, userDoc.data()];
};

export const createUser = async (allowTaskTypes: TaskType[]) => {
  let token = generateUserToken();
  let userRef = usersCollection.doc(token);
  let userDoc = await userRef.get();
  let retry = 0;
  while (userDoc.exists && retry < 3) {
    token = generateUserToken();
    userRef = usersCollection.doc(token);
    userDoc = await userRef.get();
    retry++;
  }
  if (retry >= 3) {
    throw new Error("Failed to generate a unique token");
  }
  const user: User = {
    allowTaskTypes,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };
  await userRef.set(user);
  return token;
};
