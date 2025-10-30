import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { 
  Upload, Download, Save, Undo, Redo, Play, Plus, 
  Filter, SortAsc, FileSpreadsheet, BarChart3, 
  LineChart as LineChartIcon, ScatterChart as ScatterChartIcon,
  Grid3x3, TrendingUp, Code
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const sampleColumns = [
  { name: "product_id", dtype: "int64", nulls: 0, unique: 150 },
  { name: "product_name", dtype: "string", nulls: 2, unique: 148 },
  { name: "category", dtype: "string", nulls: 0, unique: 12 },
  { name: "price", dtype: "float64", nulls: 5, unique: 89 },
  { name: "quantity", dtype: "int64", nulls: 0, unique: 45 },
  { name: "sales", dtype: "float64", nulls: 3, unique: 142 },
  { name: "date", dtype: "datetime64", nulls: 0, unique: 90 },
];

const initialSampleData = [
  { product_id: 1, product_name: "제품 A", category: "전자기기", price: 45000, quantity: 120, sales: 5400000, date: "2025-01-15" },
  { product_id: 2, product_name: "제품 B", category: "의류", price: 28000, quantity: 85, sales: 2380000, date: "2025-01-16" },
  { product_id: 3, product_name: "제품 C", category: "식품", price: 12000, quantity: 250, sales: 3000000, date: "2025-01-17" },
  { product_id: 4, product_name: "제품 D", category: "전자기기", price: 89000, quantity: 45, sales: 4005000, date: "2025-01-18" },
  { product_id: 5, product_name: "제품 E", category: "생활용품", price: 15000, quantity: 180, sales: 2700000, date: "2025-01-19" },
  { product_id: 6, product_name: "제품 F", category: "의류", price: 35000, quantity: 95, sales: 3325000, date: "2025-01-20" },
];

const chartData = [
  { category: "전자기기", sales: 9405000 },
  { category: "의류", sales: 5705000 },
  { category: "식품", sales: 3000000 },
  { category: "생활용품", sales: 2700000 },
];

export default function DataLab() {
  const [sampleData, setSampleData] = useState(initialSampleData);
  const [selectedColumns, setSelectedColumns] = useState(["product_name", "category", "sales"]);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("category");
  const [yAxis, setYAxis] = useState("sales");
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  
  // History management for undo/redo
  const [history, setHistory] = useState([initialSampleData]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [saveStatus, setSaveStatus] = useState("저장됨");
  
  const fileInputRef = useRef(null);

  const handleColumnToggle = (columnName) => {
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter(col => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  // Undo functionality
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSampleData(history[newIndex]);
      setSaveStatus("수정됨");
    }
  };

  // Redo functionality
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSampleData(history[newIndex]);
      setSaveStatus("수정됨");
    }
  };

  // Save functionality
  const handleSave = () => {
    setSaveStatus("저장 중...");
    
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus("저장됨");
      console.log("데이터 저장 완료:", sampleData);
    }, 500);
  };

  // Upload functionality
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("파일 업로드:", file.name);
      
      // Simulate file processing
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Here you would parse CSV or other file formats
          console.log("파일 내용 로드 완료");
          setSaveStatus("수정됨");
        } catch (error) {
          console.error("파일 처리 오류:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Generate Python script
  const handleGeneratePythonScript = () => {
    const script = `import pandas as pd
import matplotlib.pyplot as plt

# 데이터 로드
df = pd.read_csv('sales_data.csv')

# 데이터 전처리
df = df.dropna()

# 선택된 컬럼: ${selectedColumns.join(', ')}
selected_df = df[${JSON.stringify(selectedColumns)}]

# 그룹화 및 집계
grouped_df = df.groupby('${xAxis}')['${yAxis}'].sum().reset_index()

# 시각화
plt.figure(figsize=(10, 6))
${chartType === 'bar' ? "plt.bar(grouped_df['" + xAxis + "'], grouped_df['" + yAxis + "'])" : 
  chartType === 'line' ? "plt.plot(grouped_df['" + xAxis + "'], grouped_df['" + yAxis + "'])" :
  "plt.scatter(grouped_df['" + xAxis + "'], grouped_df['" + yAxis + "'])"}
plt.xlabel('${xAxis}')
plt.ylabel('${yAxis}')
plt.title('데이터 분석 결과')
plt.show()

# 결과 저장
selected_df.to_csv('output.csv', index=False)
print('분석 완료!')
`;

    // Create a blob and download
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis_script.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("Python 스크립트 다운로드 완료");
  };

  // Export CSV
  const handleExportCSV = () => {
    // Filter data by selected columns
    const filteredData = sampleData.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(col => {
        if (row.hasOwnProperty(col)) {
          filteredRow[col] = row[col];
        }
      });
      return filteredRow;
    });

    // Convert to CSV
    const headers = selectedColumns.join(',');
    const rows = filteredData.map(row => 
      selectedColumns.map(col => {
        const value = row[col];
        // Handle values that might contain commas
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    // Create blob and download
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("CSV 내보내기 완료");
  };

  // Apply transformation
  const handleApplyTransformation = () => {
    console.log("변환 적용 중...");
    
    // Example transformation: Remove rows with null values
    const transformedData = sampleData.filter(row => 
      Object.values(row).every(val => val !== null && val !== undefined && val !== '')
    );
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(transformedData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSampleData(transformedData);
    setSaveStatus("수정됨");
    
    console.log("변환 적용 완료");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col h-[calc(100vh-10rem)] gap-3">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Top Toolbar */}
        <Card className="flex-shrink-0">
          <CardContent className="py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">DataLab 워크스페이스</h2>
                <Badge variant={saveStatus === "저장됨" ? "secondary" : "default"} className="text-xs">
                  {saveStatus}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                >
                  <Undo className="h-3.5 w-3.5 mr-1" />
                  실행취소
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                >
                  <Redo className="h-3.5 w-3.5 mr-1" />
                  다시실행
                </Button>
                <div className="h-5 w-px bg-border mx-1" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={handleSave}
                  disabled={saveStatus === "저장됨"}
                >
                  <Save className="h-3.5 w-3.5 mr-1" />
                  저장
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={handleUpload}
                >
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  업로드
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - 3 Column Layout */}
        <div className="flex flex-1 gap-3 min-h-0">
          {/* Left Panel - Data Management */}
          {showLeftPanel && (
            <Card className="w-64 flex-shrink-0 overflow-hidden flex flex-col">
              <CardHeader className="py-3 px-4 flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileSpreadsheet className="h-4 w-4" />
                  데이터 관리
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-4 pb-4 overflow-hidden">
                <Tabs defaultValue="info" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
                    <TabsTrigger value="info" className="text-xs">정보</TabsTrigger>
                    <TabsTrigger value="history" className="text-xs">히스토리</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="flex-1 overflow-auto space-y-2 mt-0 pr-1">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-xs">데이터셋 정보</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">행 수</span>
                          <span className="font-medium">{sampleData.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">열 수</span>
                          <span className="font-medium">{sampleColumns.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">메모리</span>
                          <span className="font-medium">8.2 KB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">결측치</span>
                          <span className="font-medium text-orange-600">10 (1.2%)</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div>
                      <h4 className="font-semibold text-xs mb-2">컬럼 정보</h4>
                      <div className="space-y-1.5">
                        {sampleColumns.map((col, idx) => (
                          <div key={idx} className="p-2 border rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-xs">{col.name}</span>
                              <Badge variant="outline" className="text-[10px] px-1 py-0">{col.dtype}</Badge>
                            </div>
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                              <span>결측: {col.nulls}</span>
                              <span>고유: {col.unique}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="flex-1 overflow-auto mt-0 pr-1">
                    <div className="space-y-1.5">
                      <div className="p-2 border rounded text-xs">
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium">데이터 로드</span>
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">1</Badge>
                        </div>
                        <div className="text-[10px] text-muted-foreground mb-1">
                          2025-01-21 10:30:15
                        </div>
                        <div className="bg-muted p-1.5 rounded text-[10px] font-mono">
                          df = pd.read_csv('data.csv')
                        </div>
                      </div>
                      <div className="p-2 border rounded text-xs">
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium">결측치 제거</span>
                          <Badge variant="secondary" className="text-[10px] px-1 py-0">2</Badge>
                        </div>
                        <div className="text-[10px] text-muted-foreground mb-1">
                          2025-01-21 10:31:22
                        </div>
                        <div className="bg-muted p-1.5 rounded text-[10px] font-mono">
                          df = df.dropna()
                        </div>
                      </div>
                      {history.length > 1 && (
                        <div className="p-2 border rounded text-xs">
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-medium">변환 적용</span>
                            <Badge variant="secondary" className="text-[10px] px-1 py-0">{history.length}</Badge>
                          </div>
                          <div className="text-[10px] text-muted-foreground mb-1">
                            {new Date().toLocaleString('ko-KR')}
                          </div>
                          <div className="bg-muted p-1.5 rounded text-[10px] font-mono">
                            변환이 적용되었습니다
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Center Panel - DataFrame & Chart */}
          <div className="flex-1 flex flex-col gap-3 min-w-0 overflow-hidden">
            {/* DataFrame Table */}
            <Card className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <CardHeader className="py-2.5 px-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">DataFrame 미리보기</CardTitle>
                    <CardDescription className="text-xs">현재 데이터셋: sales_data.csv</CardDescription>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Filter className="h-3 w-3 mr-1" />
                      필터
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <SortAsc className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 p-0 overflow-auto">
                <div className="px-4 pb-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10 text-xs">#</TableHead>
                        {sampleColumns.map((col, idx) => (
                          <TableHead key={idx} className="text-xs">
                            <div className="flex flex-col gap-0.5">
                              <span>{col.name}</span>
                              <Badge variant="outline" className="text-[10px] w-fit px-1 py-0">{col.dtype}</Badge>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleData.map((row, rowIdx) => (
                        <TableRow key={rowIdx}>
                          <TableCell className="text-xs text-muted-foreground">{rowIdx + 1}</TableCell>
                          <TableCell className="text-xs">{row.product_id}</TableCell>
                          <TableCell className="text-xs">{row.product_name}</TableCell>
                          <TableCell className="text-xs">{row.category}</TableCell>
                          <TableCell className="text-xs">₩{row.price.toLocaleString()}</TableCell>
                          <TableCell className="text-xs">{row.quantity}</TableCell>
                          <TableCell className="text-xs">₩{row.sales.toLocaleString()}</TableCell>
                          <TableCell className="text-xs">{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Chart Visualization */}
            <Card className="flex-shrink-0">
              <CardHeader className="py-2.5 px-4">
                <CardTitle className="text-sm">시각화 미리보기</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF3" />
                        <XAxis dataKey={xAxis} stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey={yAxis} fill="#335C81" name="매출" />
                      </BarChart>
                    ) : chartType === "line" ? (
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF3" />
                        <XAxis dataKey={xAxis} stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line type="monotone" dataKey={yAxis} stroke="#335C81" strokeWidth={2} name="매출" />
                      </LineChart>
                    ) : (
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF3" />
                        <XAxis dataKey={xAxis} stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <YAxis dataKey={yAxis} stroke="#6C757D" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Scatter name="데이터" data={chartData} fill="#335C81" />
                      </ScatterChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analysis Settings */}
          {showRightPanel && (
            <Card className="w-72 flex-shrink-0 overflow-hidden flex flex-col">
              <CardHeader className="py-3 px-4 flex-shrink-0">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  분석 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-4 pb-4 overflow-hidden">
                <Tabs defaultValue="viz" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
                    <TabsTrigger value="viz" className="text-xs">시각화</TabsTrigger>
                    <TabsTrigger value="transform" className="text-xs">변환</TabsTrigger>
                  </TabsList>

                  <TabsContent value="viz" className="flex-1 overflow-auto space-y-2.5 mt-0 pr-1">
                    <div className="space-y-1.5">
                      <Label className="text-xs">차트 유형</Label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <Button
                          variant={chartType === "bar" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("bar")}
                          className="flex flex-col h-auto py-1.5"
                        >
                          <BarChart3 className="h-3.5 w-3.5 mb-0.5" />
                          <span className="text-[10px]">막대</span>
                        </Button>
                        <Button
                          variant={chartType === "line" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("line")}
                          className="flex flex-col h-auto py-1.5"
                        >
                          <LineChartIcon className="h-3.5 w-3.5 mb-0.5" />
                          <span className="text-[10px]">라인</span>
                        </Button>
                        <Button
                          variant={chartType === "scatter" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("scatter")}
                          className="flex flex-col h-auto py-1.5"
                        >
                          <ScatterChartIcon className="h-3.5 w-3.5 mb-0.5" />
                          <span className="text-[10px]">분산</span>
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-1.5">
                      <Label className="text-xs">X축</Label>
                      <Select value={xAxis} onValueChange={setXAxis}>
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleColumns.map((col) => (
                            <SelectItem key={col.name} value={col.name} className="text-xs">
                              {col.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs">Y축</Label>
                      <Select value={yAxis} onValueChange={setYAxis}>
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleColumns.filter(col => col.dtype === "float64" || col.dtype === "int64").map((col) => (
                            <SelectItem key={col.name} value={col.name} className="text-xs">
                              {col.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs mb-1.5 block">표시할 컬럼</Label>
                      <div className="border rounded p-2 space-y-1.5 max-h-48 overflow-auto">
                        {sampleColumns.map((col) => (
                          <div key={col.name} className="flex items-center space-x-2">
                            <Checkbox
                              id={col.name}
                              checked={selectedColumns.includes(col.name)}
                              onCheckedChange={() => handleColumnToggle(col.name)}
                              className="h-3.5 w-3.5"
                            />
                            <label htmlFor={col.name} className="text-xs cursor-pointer">
                              {col.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="transform" className="flex-1 overflow-auto space-y-2.5 mt-0 pr-1">
                    <div>
                      <h4 className="font-semibold text-xs mb-1.5">데이터 변환</h4>
                      <div className="space-y-1.5">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-7 text-xs"
                          onClick={() => console.log("결측치 처리 실행")}
                        >
                          <Filter className="h-3 w-3 mr-1.5" />
                          결측치 처리
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-7 text-xs"
                          onClick={() => console.log("One-Hot Encoding 실행")}
                        >
                          <Grid3x3 className="h-3 w-3 mr-1.5" />
                          One-Hot Encoding
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start h-7 text-xs"
                          onClick={() => console.log("정규화/스케일링 실행")}
                        >
                          <TrendingUp className="h-3 w-3 mr-1.5" />
                          정규화 / 스케일링
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold text-xs mb-1.5">그룹화 & 집계</h4>
                      <div className="space-y-1.5">
                        <div className="space-y-1">
                          <Label className="text-[10px]">그룹 기준</Label>
                          <Select defaultValue="category">
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="category" className="text-xs">category</SelectItem>
                              <SelectItem value="date" className="text-xs">date</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-[10px]">집계 대상</Label>
                          <Select defaultValue="sales">
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sales" className="text-xs">sales</SelectItem>
                              <SelectItem value="quantity" className="text-xs">quantity</SelectItem>
                              <SelectItem value="price" className="text-xs">price</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          className="w-full bg-primary h-7 text-xs"
                          onClick={() => console.log("그룹화 실행")}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          그룹화 실행
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bottom Action Bar */}
        <Card className="flex-shrink-0">
          <CardContent className="py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setShowLeftPanel(!showLeftPanel)}
                >
                  {showLeftPanel ? "좌측 패널 숨기기" : "좌측 패널 표시"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setShowRightPanel(!showRightPanel)}
                >
                  {showRightPanel ? "우측 패널 숨기기" : "우측 패널 표시"}
                </Button>
              </div>

              <div className="flex items-center gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={handleGeneratePythonScript}
                >
                  <Code className="h-3.5 w-3.5 mr-1" />
                  Python 스크립트
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs"
                  onClick={handleExportCSV}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  CSV 내보내기
                </Button>
                <Button 
                  className="bg-primary h-7 text-xs"
                  onClick={handleApplyTransformation}
                >
                  <Play className="h-3.5 w-3.5 mr-1" />
                  변환 적용
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}