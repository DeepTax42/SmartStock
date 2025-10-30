import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Download, Package, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Order() {
  const recommendations = [
    {
      id: 1,
      product: "스마트워치 Pro",
      category: "전자제품",
      currentStock: 45,
      recommendedOrder: 120,
      reason: "다가오는 연말 시즌 대비",
      priority: "높음",
      estimatedDelivery: "2025-11-01"
    },
    {
      id: 2,
      product: "무선 이어폰 X",
      category: "전자제품",
      currentStock: 78,
      recommendedOrder: 80,
      reason: "꾸준한 판매 추세",
      priority: "중간",
      estimatedDelivery: "2025-11-05"
    },
    {
      id: 3,
      product: "블루투스 스피커",
      category: "전자제품",
      currentStock: 23,
      recommendedOrder: 150,
      reason: "재고 부족 위험",
      priority: "높음",
      estimatedDelivery: "2025-10-28"
    }
  ];

  // 발주서 다운로드 함수
  const handleDownloadOrder = () => {
    // CSV 형식으로 발주서 생성
    const headers = ["제품명", "카테고리", "현재재고", "추천발주량", "우선순위", "예상입고일", "사유"];
    const rows = recommendations.map(item => [
      item.product,
      item.category,
      item.currentStock,
      item.recommendedOrder,
      item.priority,
      item.estimatedDelivery,
      item.reason
    ]);

    // CSV 문자열 생성
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // BOM 추가 (한글 깨짐 방지)
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    
    // 다운로드
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `발주추천서_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 개별 발주 확정
  const handleConfirmOrder = (id) => {
    alert(`발주 ID ${id}가 확정되었습니다.`);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "높음": return "bg-red-100 text-red-800";
      case "중간": return "bg-yellow-100 text-yellow-800";
      case "낮음": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">발주 추천</h1>
          <p className="text-muted-foreground">
            AI가 분석한 최적의 발주 시점과 수량입니다
          </p>
        </div>
        <Button 
          onClick={handleDownloadOrder}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          발주서 다운로드
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">총 추천 발주</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendations.length}개</div>
            <p className="text-xs text-muted-foreground mt-1">
              이번 주 기준
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">긴급 발주</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {recommendations.filter(r => r.priority === "높음").length}개
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              즉시 처리 필요
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">예상 입고</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7일 이내</div>
            <p className="text-xs text-muted-foreground mt-1">
              평균 배송 기간
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle>발주 추천 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">제품명</th>
                  <th className="text-left py-3 px-4 font-medium">카테고리</th>
                  <th className="text-left py-3 px-4 font-medium">현재 재고</th>
                  <th className="text-left py-3 px-4 font-medium">추천 발주량</th>
                  <th className="text-left py-3 px-4 font-medium">우선순위</th>
                  <th className="text-left py-3 px-4 font-medium">예상 입고일</th>
                  <th className="text-left py-3 px-4 font-medium">사유</th>
                  <th className="text-right py-3 px-4 font-medium">작업</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.product}</td>
                    <td className="py-3 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3 px-4">
                      <span className={item.currentStock < 50 ? "text-red-600 font-semibold" : ""}>
                        {item.currentStock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-blue-600">{item.recommendedOrder}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.estimatedDelivery}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.reason}</td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleConfirmOrder(item.id)}
                      >
                        발주 확정
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}