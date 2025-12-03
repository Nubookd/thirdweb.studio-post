import Master from "@/lib/masterModel";
import jwt from "@/lib/jwt";

export async function POST(request, { params }) {
  try {
    const {comment} = await request.json();
    const { id: master__id } = await params;

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Токен не предоставлен" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    let decoded, user__id;
    try {
      decoded = jwt.verifyAccessToken(token);
      user__id = decoded.user_id;
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError.message);
      return Response.json({ message: "Невалидный токен" }, { status: 401 });
    }
    console.log(master__id, user__id);
    if (!master__id || !user__id || !comment) {
      return Response.json(
        { message: "Указаны не все обязательные данные" },
        { status: 400 }
      );
    }

    const newComment = await Master.addComment(master__id, user__id, comment);
    if (!newComment) {
      return Response.json(
        { message: "Ошибка в созданиии комментария" },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Комментарий успешно создан" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка создания комментария:", error);
    return Response.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
