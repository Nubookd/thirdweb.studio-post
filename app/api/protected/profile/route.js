import UserModel from "@/lib/userModel";
import jwt from "@/lib/jwt";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Токен не предоставлен" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    let decoded;
    try {
      decoded = jwt.verifyAccessToken(token);
      console.log("Token decoded successfully:", { userId: decoded.userId });
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError.message);
      return Response.json({ message: "Невалидный токен" }, { status: 401 });
    }

    const user = await UserModel.findUserById(decoded.userId);

    if (!user) {
      console.error("User not found for ID:", decoded.userId);
      return Response.json(
        { message: "Пользователь не найден" },
        { status: 404 }
      );
    }

    console.log("User found:", { id: user.user_id, name: user.user_name });

    return Response.json(
      {
        user: {
          id: user.user_id,
          email: user.user_email,
          name: user.user_name,
          created_at: user.created_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile error:", error);
    return Response.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
