import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Database, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "전체 사용자",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "활성 사용자",
      value: "856",
      change: "+8%",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "데이터 사용량",
      value: "2.4TB",
      change: "+23%",
      icon: Database,
      color: "text-purple-500"
    },
    {
      title: "시스템 알림",
      value: "3",
      change: "-2",
      icon: AlertCircle,
      color: "text-yellow-500"
    }
  ];

  const recentUsers = [
    { id: 1, name: "홍길동", email: "hong@company.com", company: "ABC Corp", date: "2024-10-22", status: "활성" },
    { id: 2, name: "김철수", email: "kim@company.com", company: "XYZ Inc", date: "2024-10-21", status: "활성" },
    { id: 3, name: "이영희", email: "lee@company.com", company: "DEF Ltd", date: "2024-10-20", status: "대기" },
    { id: 4, name: "박민수", email: "park@company.com", company: "GHI Co", date: "2024-10-19", status: "활성" },
    { id: 5, name: "최지연", email: "choi@company.com", company: "JKL Corp", date: "2024-10-18", status: "활성" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">대시보드</h1>
        <p className="text-gray-400">시스템 전체 현황을 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Users Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">최근 가입 사용자</CardTitle>
          <CardDescription className="text-gray-400">
            최근 등록된 사용자 목록입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">이름</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">이메일</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">회사</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">가입일</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-white">{user.name}</td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4 text-gray-300">{user.company}</td>
                    <td className="py-3 px-4 text-gray-400">{user.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === '활성' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {user.status}
                      </span>
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