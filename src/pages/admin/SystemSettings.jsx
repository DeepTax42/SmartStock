import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { Settings, Bell, Database, Shield } from "lucide-react";

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">시스템 설정</h1>
        <p className="text-gray-400">서비스 전체 설정을 관리합니다</p>
      </div>

      {/* General Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            일반 설정
          </CardTitle>
          <CardDescription className="text-gray-400">
            서비스 기본 설정을 관리합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name" className="text-gray-200">사이트 이름</Label>
            <Input
              id="site-name"
              defaultValue="SmartStock AI"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description" className="text-gray-200">사이트 설명</Label>
            <Textarea
              id="site-description"
              defaultValue="AI 기반 수요 예측 플랫폼"
              className="bg-gray-700 border-gray-600 text-white min-h-20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email" className="text-gray-200">지원 이메일</Label>
            <Input
              id="support-email"
              type="email"
              defaultValue="support@smartstock.ai"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            저장
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            알림 설정
          </CardTitle>
          <CardDescription className="text-gray-400">
            시스템 알림 설정을 관리합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">이메일 알림</Label>
              <p className="text-sm text-gray-400">중요한 업데이트를 이메일로 받습니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">신규 가입 알림</Label>
              <p className="text-sm text-gray-400">새로운 사용자 가입 시 알림을 받습니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">시스템 점검 알림</Label>
              <p className="text-sm text-gray-400">정기 점검 시 사용자에게 알림을 보냅니다</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-5 w-5" />
            데이터베이스
          </CardTitle>
          <CardDescription className="text-gray-400">
            데이터베이스 관리 및 백업
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">데이터베이스 크기</p>
              <p className="text-2xl font-bold text-white">2.4 TB</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">마지막 백업</p>
              <p className="text-2xl font-bold text-white">1시간 전</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              백업 실행
            </Button>
            <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              백업 기록
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            보안 설정
          </CardTitle>
          <CardDescription className="text-gray-400">
            시스템 보안 설정을 관리합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">2단계 인증</Label>
              <p className="text-sm text-gray-400">관리자 계정에 2FA를 적용합니다</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">세션 타임아웃</Label>
              <p className="text-sm text-gray-400">30분 동안 활동이 없으면 자동 로그아웃</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-200">IP 제한</Label>
              <p className="text-sm text-gray-400">특정 IP에서만 관리자 접근 허용</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}