import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AdminLogin({ setIsAdminLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 간단한 어드민 인증 (실제로는 백엔드 API 연동)
    if (email === "admin@smartstock.ai" && password === "admin123") {
      setIsAdminLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      alert("관리자 계정이 아닙니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">관리자 로그인</h1>
          <p className="text-gray-400 text-sm">SmartStock AI Admin</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Admin Access</CardTitle>
            <CardDescription className="text-gray-400">
              관리자 계정으로 로그인하세요
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-gray-200">이메일</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@smartstock.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-gray-200">비밀번호</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                관리자 로그인
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-gray-300"
          >
            일반 사용자 페이지로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}