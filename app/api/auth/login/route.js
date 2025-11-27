import UserModel from "@/lib/userModel";
import jwt from "@/lib/jwt";

export async function POST(request) {
  try {
    const { name, password } = await request.json();

    if (!name || !password) {
      return Response.json(
        { message: "Необходимо указать логин и пароль" },
        { status: 400 }
      );
    }

    const user = await UserModel.findUserByName(name);
    if (!user) {
      return Response.json(
        { message: "Пользователь не найден" },
        { status: 401 }
      );
    }

    const isPasswordVerify = await UserModel.verifyPassword(
      password,
      user.user_password_hash
    );
    if (!isPasswordVerify) {
      return Response.json({ message: "Неверный пароль" }, { status: 401 });
    }

    const accessToken = jwt.generateAccessToken({
      user_id: user.user_id,
      name: user.user_name,
      email: user.user_email,
    });

    const refreshToken = jwt.generateRefreshToken({
      user_id: user.user_id,
      name: user.user_name,
      email: user.user_email,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await UserModel.saveRefreshToken(user.user_id, refreshToken, expiresAt);

    return Response.json({
      accessToken,
      refreshToken,
      user: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
      },
      message: "Вход прошёл успешно",
    });
  } catch (error) {
    console.error("Ошибка входа:", error);
    return Response.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
