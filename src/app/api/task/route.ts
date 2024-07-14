import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "@/dtos/task";
import { createTask, updateTasksStatus } from "@/libs/task";
import { validateUserToken } from "@/libs/user";

export async function POST(request: Request) {
  const req: CreateTaskRequestDTO = await request.json();
  const token = request.headers.get("Authorization");
  try {
    if (!token) throw new Error("Unauthorized");
    validateUserToken(token);

    await createTask(token, req);
    return Response.json("Task created");
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
