// /api/v1/prediction/predict.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 니 EC2 FastAPI 주소
  const backendBase =
    process.env.BACKEND_INTERNAL_URL ||
    "http://ec2-43-203-159-41.ap-northeast-2.compute.amazonaws.com:8000";

  try {
    const backendRes = await fetch(
      `${backendBase}/api/v1/prediction/predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    // AWS가 지금 "Internal Server Error" 같은 텍스트를 주고 있으니까
    // 일단 있는 그대로 받아온다
    const rawText = await backendRes.text();

    // 디버깅용으로 Vercel 로그에 찍어놓자
    console.log("🔹 backend status:", backendRes.status);
    console.log("🔹 backend raw response:", rawText);

    // 1) 만약 JSON이면 그대로 JSON으로 넘기고
    // 2) JSON 아니면 그냥 텍스트로 넘긴다
    try {
      const asJson = JSON.parse(rawText);
      return res.status(backendRes.status).json(asJson);
    } catch (e) {
      // JSON 아니면 텍스트로 그대로 내보냄
      return res
        .status(backendRes.status)
        .send(rawText); // 👈 여기서 더이상 JSON.parse 안 함
    }
  } catch (error) {
    console.error("prediction proxy error (fetch failed):", error);
    return res
      .status(500)
      .json({ message: "Vercel proxy failed", error: String(error) });
  }
}
