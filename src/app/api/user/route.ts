import { CreateUserRequestDTO, CreateUserResponseDTO } from "@/dtos/user";
import { createUser } from "@/libs/user";

export async function POST(request: Request) {
  const req: CreateUserRequestDTO = await request.json();
  const token = await createUser(req.allowTaskTypes);

  const res: CreateUserResponseDTO = { token };
  return Response.json(res);
}
