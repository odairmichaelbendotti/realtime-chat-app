import {
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
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

  const stats = [
    { icon: Users, label: "Online", value: "247", color: "#10b981" },
    { icon: MessageCircle, label: "Conversas", value: "89", color: "#3b82f6" },
    { icon: Clock, label: "Tempo Médio", value: "12min", color: "#8b5cf6" },
    { icon: TrendingUp, label: "Crescimento", value: "+23%", color: "#f59e0b" },
  ];

  const onlineUsers = [
    { initials: "AM", bg: "from-emerald-400 to-teal-500" },
    { initials: "BC", bg: "from-blue-400 to-indigo-500" },
    { initials: "DE", bg: "from-violet-400 to-purple-500" },
    { initials: "FG", bg: "from-amber-400 to-orange-500" },
    { initials: "HI", bg: "from-pink-400 to-rose-500" },
    { initials: "JK", bg: "from-cyan-400 to-blue-500" },
    { initials: "LM", bg: "from-indigo-400 to-violet-500" },
    { initials: "NO", bg: "from-teal-400 to-emerald-500" },
  ];

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
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]" />
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
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header with Gradient Border */}
          <div className="relative px-6 sm:px-8 py-6 sm:py-10 text-center">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                Realtime Chat
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight bg-gradient-to-r from-white via-white to-cyan-200 bg-clip-text">
              Bem-vindo de volta
            </h1>
            <p className="text-white/50 mt-2 sm:mt-3 text-sm sm:text-base">
              Conecte-se com amigos e comece a conversar
            </p>
          </div>

          <div className="p-4 sm:p-8 pt-0">
            {/* User Profile */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mb-6 sm:mb-8 p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="relative">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
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
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-2 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
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
            </div>

            {/* Online Users */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-lg font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Quem está online
                </h3>
                <span className="text-xs sm:text-sm text-white/40 flex items-center gap-1.5">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full" />
                  247 ativos
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap overflow-hidden">
                {onlineUsers.slice(0, 5).map((user, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${user.bg} p-[2px] cursor-pointer hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                      {user.initials}
                    </div>
                  </div>
                ))}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-[10px] sm:text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0">
                  +242
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 sm:space-y-3">
              <Link
                to="/chat"
                className="group w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 sm:gap-3"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Entrar no Chat</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => setConfirmDialog(true)}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all flex items-center justify-center gap-2 sm:gap-3 border border-white/10 hover:border-white/20"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-sm mt-6">
          Ao entrar, você concorda com nossos termos de uso
        </p>
      </div>
    </div>
  );
}
