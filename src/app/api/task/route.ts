import { CreateTaskResponseDTO, UpdateTaskRequestDTO } from "@/dtos/task";
import { createTask, updateTasksStatus } from "@/libs/task";
import { validateUserToken } from "@/libs/user";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization");
  try {
    if (!token) throw new Error("Unauthorized");
    validateUserToken(token);

    const res: CreateTaskResponseDTO = await createTask(token);
    return Response.json(res);
  } catch (error) {
    return Response.json("Unauthorized", { status: 401 });
  }
}

export async function PUT(request: Request) {
  const req: UpdateTaskRequestDTO = await request.json();
  const token = request.headers.get("Authorization");
  try {
    if (!token) throw new Error("Unauthorized");
    validateUserToken(token);

    await updateTasksStatus(
      token,
      req.name,
      req.type,
      req.locationURL,
      req.status,
    );
    return Response.json("Task updated");
  } catch (error) {
    return Response.json("Unauthorized", { status: 401 });
  }
}
