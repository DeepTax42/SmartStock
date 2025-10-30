import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
import { Bell, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: "시스템 점검 안내", 
      content: "12월 25일 새벽 2시~5시 시스템 점검이 예정되어 있습니다.",
      isActive: true,
      createdAt: "2025-10-22 14:30",
      type: "system"
    },
    { 
      id: 2, 
      title: "새로운 기능 업데이트", 
      content: "DataLab에 새로운 분석 도구가 추가되었습니다.",
      isActive: true,
      createdAt: "2025-10-21 10:00",
      type: "update"
    },
    { 
      id: 3, 
      title: "서비스 이용 안내", 
      content: "더 나은 서비스 제공을 위해 노력하겠습니다.",
      isActive: false,
      createdAt: "2025-10-20 09:00",
      type: "info"
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info",
    isActive: true
  });

  const handleCreate = () => {
    const newNotification = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleString('ko-KR')
    };
    setNotifications([newNotification, ...notifications]);
    setFormData({ title: "", content: "", type: "info", isActive: true });
    setIsCreateOpen(false);
  };

  const handleEdit = (notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      content: notification.content,
      type: notification.type,
      isActive: notification.isActive
    });
  };

  const handleUpdate = () => {
    setNotifications(notifications.map(n => 
      n.id === editingNotification.id 
        ? { ...n, ...formData }
        : n
    ));
    setEditingNotification(null);
    setFormData({ title: "", content: "", type: "info", isActive: true });
  };

  const handleDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const toggleActive = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isActive: !n.isActive } : n
    ));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'system': return 'bg-red-500/20 text-red-400';
      case 'update': return 'bg-blue-500/20 text-blue-400';
      case 'info': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'system': return '시스템';
      case 'update': return '업데이트';
      case 'info': return '안내';
      default: return '기타';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">공지사항 관리</h1>
          <p className="text-gray-400">사용자에게 표시될 공지사항을 관리합니다</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              새 공지 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">새 공지 작성</DialogTitle>
              <DialogDescription className="text-gray-400">
                사용자에게 표시할 공지사항을 작성하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-200">제목</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="공지 제목을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-200">내용</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white min-h-32"
                  placeholder="공지 내용을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-gray-200">유형</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="info">안내</option>
                  <option value="update">업데이트</option>
                  <option value="system">시스템</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-gray-200">즉시 활성화</Label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="bg-gray-700 text-white border-gray-600">
                취소
              </Button>
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                작성
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notifications List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">공지사항 목록 ({notifications.length}개)</CardTitle>
          <CardDescription className="text-gray-400">
            등록된 공지사항 목록입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-white">{notification.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{notification.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(notification.type)}>
                      {getTypeLabel(notification.type)}
                    </Badge>
                    {notification.isActive ? (
                      <Badge className="bg-green-500/20 text-green-400">
                        <Eye className="h-3 w-3 mr-1" />
                        활성
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/20 text-gray-400">
                        <EyeOff className="h-3 w-3 mr-1" />
                        비활성
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{notification.content}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(notification.id)}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    {notification.isActive ? '비활성화' : '활성화'}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(notification)}
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        수정
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">공지 수정</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-gray-200">제목</Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-200">내용</Label>
                          <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white min-h-32"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
                          저장
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(notification.id)}
                    className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}