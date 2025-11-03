// src/pages/Prediction.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";

// Vite 환경변수 사용 (NEXT_PUBLIC 아님)
const FILE_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://ec2-43-203-159-41.ap-northeast-2.compute.amazonaws.com:8000";

export default function Prediction() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  // 예측 실행
  const handlePredict = async () => {
    if (!selectedFile) return;
    try {
      const res = await axios.post(
        // 👉 이건 Vercel 프록시로 보낸다
        "/api/v1/prediction/predict",
        {
          // FastAPI 쪽에서 이 이름으로 받는다고 했으니까 그대로 보냄
          stored_filename: selectedFile.filename,
        }
      );
      // 백엔드가 { predictions: {...} } 이렇게 줄 거라 가정
      setPredictionResult(res.data.predictions);
    } catch (err) {
      console.error("예측 요청 실패:", err);
      alert("예측 중 오류 났다. Vercel 함수 로그 한번 봐라.");
    }
  };

  // 파일 목록 불러오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // 👉 이건 이미 Vercel에서 잘 되는 거 확인했음
        const res = await axios.get("/api/files");
        // 응답이 { files: [...] } 형태였음
        setFiles(res.data.files || []);
      } catch (err) {
        console.error("파일 목록 불러오기 실패:", err);
      }
    };
    fetchFiles();
  }, []);

  // 파일 다운로드 (백엔드에서 /uploads/...로 주는 거 그대로 연다)
  const handleDownload = (file) => {
    if (!file?.url) return;
    // Vite env + 업로드 경로
    const fullUrl = `${FILE_BASE_URL}${file.url}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* 업로드 파일 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>업로드된 파일 목록</CardTitle>
          <CardDescription>
            backend/uploads 폴더의 파일들이 자동으로 표시됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>선택</TableHead>
                <TableHead>파일명</TableHead>
                <TableHead>크기 (KB)</TableHead>
                <TableHead>다운로드</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length > 0 ? (
                files.map((file, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <input
                        type="radio"
                        name="selectedFile"
                        checked={selectedFile?.filename === file.filename}
                        onChange={() => setSelectedFile(file)}
                      />
                    </TableCell>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell>{file.size_kb}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        다운로드
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    업로드된 파일이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 선택된 파일 정보 + 예측 버튼 */}
      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle>선택된 파일</CardTitle>
            <CardDescription>아래는 선택된 파일 정보입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <strong>파일명:</strong> {selectedFile.filename}
            </p>
            <p>
              <strong>크기:</strong> {selectedFile.size_kb} KB
            </p>
            <Button onClick={handlePredict} disabled={!selectedFile}>
              선택 파일 예측
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 예측 결과 */}
      {predictionResult && (
        <Card>
          <CardHeader>
            <CardTitle>예측 결과</CardTitle>
            <CardDescription>
              아래는 미리보기입니다 (새로고침 시 사라짐)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(predictionResult).map(([productName, preds]) => (
              <div key={productName} className="space-y-2">
                <h4 className="font-semibold">{productName}</h4>
                <ul className="list-disc list-inside space-y-1">
                  {preds.map((dayPred, idx) => (
                    <li key={idx}>
                      Day {idx + 1} - 재고: {dayPred[0]}, 가용재고: {dayPred[1]},
                      {" "}
                      재고예정: {dayPred[2]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
