import UserModel from "@/lib/userModel";

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (refreshToken) {
      await UserModel.deleteRefreshToken(refreshToken);
    }

    return Response.json({ message: "Успешный выход" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка выхода:", error);
    return Response.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
