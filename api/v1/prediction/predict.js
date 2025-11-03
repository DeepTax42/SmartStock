// /api/v1/prediction/predict.js

export default async function handler(req, res) {
  // 1. 메서드 체크
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 2. 너 AWS FastAPI 주소 (http 그대로 둔다)
  const backendBase =
    process.env.BACKEND_INTERNAL_URL ||
    "http://ec2-43-203-159-41.ap-northeast-2.compute.amazonaws.com:8000";

  try {
    // 3. Vercel → AWS로 그대로 전달
    const backendRes = await fetch(
      `${backendBase}/api/v1/prediction/predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Vercel 함수로 들어온 body 그대로 AWS로 보냄
        body: JSON.stringify(req.body),
      }
    );

    const data = await backendRes.json();

    // 4. AWS가 200이 아니어도 상태코드 그대로 프론트에 전달
    return res.status(backendRes.status).json(data);
  } catch (err) {
    console.error("prediction proxy error:", err);
    return res
      .status(500)
      .json({ message: "Internal proxy error from Vercel → AWS" });
  }
}
