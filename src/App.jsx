import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, BarChart3, Package, TrendingUp, HelpCircle, LogOut, Settings as SettingsIcon, FlaskConical, Bell, Users, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { ChatBot } from './components/ChatBot';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Prediction from './pages/Prediction';
import Help from './pages/Help';
import Login from './pages/Login';
import Settings from './pages/Settings';
import DataLab from './pages/DataLab';
import Policy from './pages/Policy';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SystemSettings from './pages/admin/SystemSettings';
import NotificationManagement from './pages/admin/NotificationManagement';

function Layout({ children, isLoggedIn, setIsLoggedIn, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = React.useRef(null);
  React.useEffect(() => {
    function onDown(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') setUserMenuOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/admin/login');
  };

  // Admin Login 페이지
  if (location.pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-900">
        <main>{children}</main>
      </div>
    );
  }

  // Admin Layout (로그인 후)
  if (location.pathname.startsWith('/admin')) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        {/* Admin Header */}
        <header className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SmartStock AI</h1>
                  <p className="text-xs text-gray-400">Admin Panel</p>
                </div>
              </Link>

              {/* Admin User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-600 text-white text-sm">
                        Admin
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white">관리자</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 z-[100]">
                  <DropdownMenuItem onClick={() => navigate('/')} className="text-gray-300 hover:bg-gray-700">
                    일반 사이트로 이동
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleAdminLogout} className="text-red-400 hover:bg-gray-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* Admin Sidebar */}
          <aside className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0">
            <nav className="p-4 space-y-1">
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/admin/dashboard')
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <BarChart3 size={20} />
                대시보드
              </Link>
              <Link
                to="/admin/users"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/admin/users')
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Users size={20} />
                회원 관리
              </Link>
              <Link
                to="/admin/settings"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/admin/settings')
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <SettingsIcon size={20} />
                시스템 설정
              </Link>
              <Link
                to="/admin/notifications"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/admin/notifications')
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Bell size={20} />
                공지사항 관리
              </Link>
            </nav>
          </aside>

          {/* Admin Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Login, Help, Policy 페이지는 별도 Layout (로고만)
  if (location.pathname === '/login' || location.pathname === '/policy' || (location.pathname === '/help' && !isLoggedIn)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">SmartStock AI</h1>
              </Link>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium">
                    로그인
                  </button>
                </Link>
                <Link to="/login?tab=signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                    무료로 시작하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <ChatBot />
      </div>
    );
  }

  // Home (랜딩) 페이지 - Public Header
  if (location.pathname === '/' && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">SmartStock AI</h1>
              </Link>
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium">
                    로그인
                  </button>
                </Link>
                <Link to="/login?tab=signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                    무료로 시작하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <ChatBot />
      </div>
    );
  }

  // 로그인 후 - Header + Sidebar Layout (일반 사용자)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SmartStock AI</h1>
            </Link>

            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-xs">
                      2
                    </Badge>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-white">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold">알림</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                      <p className="text-sm font-medium">시스템 점검 안내</p>
                      <p className="text-xs text-gray-500 mt-1">
                        12월 25일 새벽 2시~5시 시스템 점검이 예정되어 있습니다.
                      </p>
                      <p className="text-xs text-gray-400 mt-2">2시간 전</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium">새로운 기능 업데이트</p>
                      <p className="text-xs text-gray-500 mt-1">
                        DataLab에 새로운 분석 도구가 추가되었습니다.
                      </p>
                      <p className="text-xs text-gray-400 mt-2">1일 전</p>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Dropdown */}
              <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      홍
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">홍길동</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-48 z-[100000] overflow-visible pointer-events-auto"
              >
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  설정
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  도움말
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r flex-shrink-0">
          <nav className="p-4 space-y-1">
            <Link
              to="/upload"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive('/upload')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UploadIcon size={20} />
              업로드
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive('/dashboard')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={20} />
              대시보드
            </Link>
            <Link
              to="/prediction"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive('/prediction')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp size={20} />
              예측결과
            </Link>
            <Link
              to="/order"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive('/order')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package size={20} />
              발주추천
            </Link>
            <Link
              to="/datalab"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive('/datalab')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FlaskConical size={20} />
              DataLab
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Layout 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/policy" element={<Policy />} />
          
          {/* User Routes */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/order" element={<Order />} />
          <Route path="/datalab" element={<DataLab />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          <Route path="/admin/notifications" element={<NotificationManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
