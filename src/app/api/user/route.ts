import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  GetUserResponseDTO,
} from "@/dtos/user";
import { createUser, getUserData, validateUserToken } from "@/libs/user";

export async function POST(request: Request) {
  const req: CreateUserRequestDTO = await request.json();
  const token = await createUser(req.allowTaskTypes);

  const res: CreateUserResponseDTO = { token };
  return Response.json(res);
}

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");
  try {
    if (!token) throw new Error("Unauthorized");
    validateUserToken(token);

    const [_, userData] = await getUserData(token);

    const res: GetUserResponseDTO = {
      tasks: userData?.tasks ?? [],
    };
    return Response.json(res);
  } catch (error) {
    return Response.json("Unauthorized", { status: 401 });
  }
}
