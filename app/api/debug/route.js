// app/api/test-profile/route.js
export const runtime = "nodejs";

export async function GET(request) {
  console.log("✅ TEST PROFILE ENDPOINT WORKS!");
  return Response.json({ 
    message: "Test profile works",
    timestamp: new Date().toISOString()
  });
}