import UserModel from "@/lib/userModel";
import jwt from "@/lib/jwt";

export async function POST(request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return Response.json(
        { message: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    const existingUserName = await UserModel.findUserByName(name);
    const existingUserEmail = await UserModel.findUserByEmail(email);
    if (existingUserName) {
      return Response.json({ message: "Имя уже занято" }, { status: 400 });
    } else if (existingUserEmail) {
      return Response.json(
        { message: "Email уже зарегистрирован" },
        { status: 400 }
      );
    }

    const user = await UserModel.createUser(name, email, password);

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
      message: "Пользователь создан успешно",
    });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return Response.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
