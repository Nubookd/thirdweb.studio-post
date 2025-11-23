import jwt from "@/lib/jwt";


export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return Response.json(
        { message: "Refresh token не указан" },
        { status: 400 }
      );
    }

    const tokens = await jwt.refreshTokens(refreshToken);

    return Response.json(
      { ...tokens, message: "Токены успешно обновлены" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка refresh token:", error);
    return Response.json(
      { message: "Невалидный refresh token" },
      { status: 401 }
    );
  }
}
