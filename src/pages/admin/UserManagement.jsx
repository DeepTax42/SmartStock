import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Search, MoreVertical, UserCheck, UserX, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "홍길동", email: "hong@company.com", company: "ABC Corp", role: "Admin", status: "활성", lastLogin: "2024-10-22 14:30" },
    { id: 2, name: "김철수", email: "kim@company.com", company: "XYZ Inc", role: "User", status: "활성", lastLogin: "2024-10-22 10:15" },
    { id: 3, name: "이영희", email: "lee@company.com", company: "DEF Ltd", role: "User", status: "대기", lastLogin: "2024-10-20 09:45" },
    { id: 4, name: "박민수", email: "park@company.com", company: "GHI Co", role: "User", status: "활성", lastLogin: "2024-10-21 16:20" },
    { id: 5, name: "최지연", email: "choi@company.com", company: "JKL Corp", role: "Manager", status: "비활성", lastLogin: "2024-10-15 11:30" },
    { id: 6, name: "정민호", email: "jung@company.com", company: "MNO Inc", role: "User", status: "활성", lastLogin: "2024-10-22 08:00" },
    { id: 7, name: "강수진", email: "kang@company.com", company: "PQR Ltd", role: "User", status: "활성", lastLogin: "2024-10-21 13:45" },
    { id: 8, name: "윤서연", email: "yoon@company.com", company: "STU Corp", role: "User", status: "대기", lastLogin: "-" }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">회원 관리</h1>
          <p className="text-gray-400">전체 사용자 계정을 관리합니다</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          새 사용자 추가
        </Button>
      </div>

      {/* Search & Filter */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="이름, 이메일, 회사명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">사용자 목록 ({filteredUsers.length}명)</CardTitle>
          <CardDescription className="text-gray-400">
            등록된 전체 사용자 목록입니다
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
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">권한</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">상태</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">최근 접속</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">작업</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-white font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4 text-gray-300">{user.company}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} className="bg-gray-700 text-gray-300">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === '활성' 
                          ? 'bg-green-500/20 text-green-400' 
                          : user.status === '대기'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{user.lastLogin}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <UserCheck className="mr-2 h-4 w-4" />
                            활성화
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <UserX className="mr-2 h-4 w-4" />
                            비활성화
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                            <Trash2 className="mr-2 h-4 w-4" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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