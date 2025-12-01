// app/api/test-profile/route.js
export const runtime = "nodejs";

export async function GET(request) {
  return Response.json({ 
    message: "Test profile works",
    timestamp: new Date().toISOString()
  });
}