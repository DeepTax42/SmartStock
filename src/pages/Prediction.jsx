import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const predictionData = [
  { date: "2025-11", actual: 2400, predicted: 2300, confidence: 0.92 },
  { date: "2025-12", actual: 2210, predicted: 2150, confidence: 0.89 },
  { date: "2026-01", actual: null, predicted: 2280, confidence: 0.87 },
  { date: "2026-02", actual: null, predicted: 2450, confidence: 0.85 },
  { date: "2026-03", actual: null, predicted: 2600, confidence: 0.82 },
];

const productPredictions = [
  { id: "P001", name: "제품 A", current: 850, predicted: 1200, change: 41.2, trend: "up" },
  { id: "P002", name: "제품 B", current: 640, predicted: 580, change: -9.4, trend: "down" },
  { id: "P003", name: "제품 C", current: 1200, predicted: 1450, change: 20.8, trend: "up" },
  { id: "P004", name: "제품 D", current: 420, predicted: 380, change: -9.5, trend: "down" },
  { id: "P005", name: "제품 E", current: 980, predicted: 1100, change: 12.2, trend: "up" },
];

export default function Prediction() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">예측 결과</h1>
          <p className="text-muted-foreground">
            AI 기반 수요 예측 결과를 확인하세요
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          리포트 다운로드
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">평균 예측 정확도</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">94.2%</div>
            <p className="text-sm text-muted-foreground">
              지난 3개월 평균
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">다음 달 예측 수요</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">2,280</div>
            <p className="text-sm text-green-600 font-medium">
              +3.2% 전월 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">신뢰도</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">87%</div>
            <p className="text-sm text-muted-foreground">
              높은 신뢰도
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>수요 예측 트렌드</CardTitle>
          <CardDescription>
            과거 실적 및 미래 예측 (최근 5개월)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF3" />
                <XAxis dataKey="date" stroke="#6C757D" />
                <YAxis stroke="#6C757D" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E9EDF3' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#335C81"
                  strokeWidth={2}
                  name="실제 수요"
                  dot={{ r: 4, fill: '#335C81' }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#D9853B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="예측 수요"
                  dot={{ r: 4, fill: '#D9853B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>제품별 예측</CardTitle>
          <CardDescription>
            다음 달 주요 제품 수요 예측
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="increasing">증가 예상</TabsTrigger>
              <TabsTrigger value="decreasing">감소 예상</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제품 ID</TableHead>
                    <TableHead>제품명</TableHead>
                    <TableHead>현재 수요</TableHead>
                    <TableHead>예측 수요</TableHead>
                    <TableHead>변화율</TableHead>
                    <TableHead>트렌드</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPredictions.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.current.toLocaleString()}</TableCell>
                      <TableCell>{product.predicted.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={product.change > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {product.change > 0 ? "+" : ""}{product.change}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {product.trend === "up" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            증가
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            감소
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="increasing" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제품 ID</TableHead>
                    <TableHead>제품명</TableHead>
                    <TableHead>현재 수요</TableHead>
                    <TableHead>예측 수요</TableHead>
                    <TableHead>변화율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPredictions.filter(p => p.trend === "up").map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.current.toLocaleString()}</TableCell>
                      <TableCell>{product.predicted.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        +{product.change}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="decreasing" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제품 ID</TableHead>
                    <TableHead>제품명</TableHead>
                    <TableHead>현재 수요</TableHead>
                    <TableHead>예측 수요</TableHead>
                    <TableHead>변화율</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPredictions.filter(p => p.trend === "down").map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.current.toLocaleString()}</TableCell>
                      <TableCell>{product.predicted.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {product.change}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}