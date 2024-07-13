import { User } from "@/models/user";
import { usersCollection } from "./firestore";

export const InvalidTokenError = new Error("Invalid token");
export const UserNotFoundError = new Error("User not found");

export const validateUserToken = (token: string) => {
  if (token.length != 64) {
    throw InvalidTokenError;
  }
};

export const getUserData = async (
  token: string
): Promise<
  [
    FirebaseFirestore.DocumentReference<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >,
    User | undefined
  ]
> => {
  const userRef = usersCollection.doc(token);

  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw UserNotFoundError;
  }
  return [userRef, userDoc.data()];
};
