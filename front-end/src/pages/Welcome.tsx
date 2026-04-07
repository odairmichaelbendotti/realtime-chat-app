import {
  MessageCircle,
  // Users,
  // Clock,
  // TrendingUp,
  LogOut,
  User,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useAuth } from "../store/useAuth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Welcome() {
  const [isFetching, setIsFetching] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { setAuthUser, authuser } = useAuth();
  const navigate = useNavigate();
  const { disconnectSocket, onlineUsers } = useAuth();

  // const stats = [
  //   { icon: Users, label: "Online", value: "247", color: "#10b981" },
  //   { icon: MessageCircle, label: "Conversas", value: "89", color: "#3b82f6" },
  //   { icon: Clock, label: "Tempo Médio", value: "12min", color: "#8b5cf6" },
  //   { icon: TrendingUp, label: "Crescimento", value: "+23%", color: "#f59e0b" },
  // ];

  function getInitialsOfName(fullname: string): string {
    const splitedName = fullname.split(" ");
    const arrName =
      splitedName.length > 2
        ? `${splitedName[0][0]}${splitedName[splitedName.length - 1][0]}`
        : `${splitedName[0][0]}${splitedName[0][1].toUpperCase()}`;
    return arrName;
  }

  const background = [
    "from-emerald-400 to-teal-500",
    "from-blue-400 to-indigo-500",
    "from-violet-400 to-purple-500",
    "from-amber-400 to-orange-500",
    "from-pink-400 to-rose-500",
  ];

  const mockOnline = onlineUsers.slice(0, 5).map((user, i) => ({
    initials: getInitialsOfName(user.name),
    bg: background[i],
  }));

  const handleLogout = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro ao realizar requisição");
        return;
      }

      disconnectSocket();
      setAuthUser(null);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-cyan-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[60%] w-75 h-75 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {confirmDialog && (
        <ConfirmDialog
          title="logout"
          onCancel={setConfirmDialog}
          action={handleLogout}
          isFetching={isFetching}
        />
      )}

      <div className="w-full max-w-4xl relative z-10">
        {/* Main Card with Glass Effect */}
        <div className="bg-white/3 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header with Gradient Border */}
          <div className="relative px-4 sm:px-6 py-4 sm:py-6 text-center">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 mb-2 sm:mb-3">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Realtime Chat
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight bg-linear-to-r from-white via-white to-cyan-200 bg-clip-text">
              Bem-vindo de volta
            </h1>
            <p className="text-white/50 mt-1 sm:mt-2 text-xs sm:text-sm">
              Conecte-se com amigos e comece a conversar
            </p>
          </div>

          <div className="p-3 sm:p-6 pt-0">
            {/* User Profile */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/2 border border-white/5">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                  <User
                    className="w-7 h-7 sm:w-10 sm:h-10 text-white/60"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-md sm:rounded-lg border-2 border-[#0a0a0f] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-base sm:text-xl font-bold text-white">
                  {authuser?.fullname || "Usuário"}
                </h2>
                <p className="text-white/40 text-xs sm:text-sm">
                  {authuser?.email}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5 sm:mt-2 text-[10px] sm:text-xs">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-400">Online agora</span>
                  <span className="text-white/20 hidden sm:inline">•</span>
                  <span className="text-white/30 hidden sm:inline">
                    Membro desde 2024
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-2 sm:p-5 rounded-xl sm:rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 hover:bg-white/4 transition-all duration-300"
                >
                  <div
                    className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-1.5 sm:mb-3 mx-auto sm:mx-0"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <p className="text-base sm:text-2xl font-bold text-white mb-0 sm:mb-0.5 text-center sm:text-left">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-sm text-white/40 text-center sm:text-left">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div> */}

            {/* Online Users */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Quem está online
                </h3>
                <span className="text-xs sm:text-sm text-white/40 flex items-center gap-1.5">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />
                  {onlineUsers.length > 1
                    ? `${onlineUsers.length} usuarios ativos`
                    : `${onlineUsers.length} usuario ativo`}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap overflow-hidden">
                {mockOnline.slice(0, 5).map((user, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br ${user.bg} p-0.5 cursor-pointer transition-transform duration-300 shrink-0`}
                  >
                    <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                      {user.initials}
                    </div>
                  </div>
                ))}
                {onlineUsers.length > 5 && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-[10px] sm:text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer shrink-0">
                    {onlineUsers.length - 5}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/chat"
                className="group w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Entrar no Chat</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setConfirmDialog(true)}
                className="w-full cursor-pointer bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/20"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs sm:text-sm mt-4">
          Ao entrar, você concorda com nossos termos de uso
        </p>
      </div>
    </div>
  );
}
