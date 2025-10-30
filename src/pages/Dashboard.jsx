import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart 
} from "recharts";
import { 
  TrendingUp, TrendingDown, AlertTriangle, Package, 
  Upload 
} from "lucide-react";
import { analyticsService } from "../services/analyticsService";

const topProducts = [
  { name: "제품 A", forecast: 1250, stock: 800, status: "부족" },
  { name: "제품 B", forecast: 980, stock: 1200, status: "적정" },
  { name: "제품 C", forecast: 2100, stock: 500, status: "심각" },
  { name: "제품 D", forecast: 750, stock: 850, status: "적정" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [kpiData, setKpiData] = useState({
    accuracy: 0,
    wape: 0,
    stock_alerts: 0,
    total_value: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await analyticsService.getSummary();
      setChartData(data.chart_data);
      setKpiData(data.kpi);
    } catch (error) {
      console.error('Dashboard 데이터 로딩 실패:', error);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadDashboardData}>다시 시도</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">대시보드</h1>
        <p className="text-muted-foreground">
          AI 기반 수요 예측 및 재고 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">예측 정확도</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.accuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">+2.1%</span> 전월 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">WAPE</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.wape}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">-0.5%</span> 전월 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">품절 위험 품목</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.stock_alerts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600 font-medium">+3</span> 전월 대비
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">총 재고 가치</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₩{(kpiData.total_value / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">-5.2%</span> 전월 대비
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>수요 예측 vs 실제 수요</CardTitle>
            <CardDescription>최근 6개월 트렌드 분석</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="재고" fill="#E9EDF3" />
                  <Line 
                    type="monotone" 
                    dataKey="실제수요" 
                    stroke="#335C81" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="AI예측" 
                    stroke="#D9853B" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                데이터가 없습니다
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>품목별 예측 정확도</CardTitle>
            <CardDescription>상위 품목 분석</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="실제수요" fill="#335C81" />
                  <Bar dataKey="AI예측" fill="#D9853B" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                데이터가 없습니다
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>품절 위험 품목</CardTitle>
          <CardDescription>즉시 조치가 필요한 품목</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    예측 수요: {product.forecast} | 현재 재고: {product.stock}
                  </p>
                </div>
                <Badge
                  variant={
                    product.status === "심각" 
                      ? "destructive" 
                      : product.status === "부족" 
                      ? "default" 
                      : "secondary"
                  }
                >
                  {product.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="h-auto py-6 flex flex-col gap-2" 
          onClick={() => navigate("/prediction")}
        >
          <TrendingUp className="h-6 w-6" />
          <span>예측 결과 보기</span>
        </Button>
        <Button 
          className="h-auto py-6 flex flex-col gap-2" 
          variant="outline" 
          onClick={() => navigate("/order")}
        >
          <Package className="h-6 w-6" />
          <span>발주 추천</span>
        </Button>
        <Button 
          className="h-auto py-6 flex flex-col gap-2" 
          variant="outline" 
          onClick={() => navigate("/upload")}
        >
          <Upload className="h-6 w-6" />
          <span>새 데이터 업로드</span>
        </Button>
      </div>
    </div>
  );
}