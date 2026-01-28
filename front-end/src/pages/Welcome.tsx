import { MessageCircle, Users, Clock, TrendingUp, LogOut } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Welcome() {
  const [isFetching, setIsFetching] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      icon: Users,
      label: "Usuários Online",
      value: "247",
      color: "text-green-400",
    },
    {
      icon: MessageCircle,
      label: "Conversas Ativas",
      value: "89",
      color: "text-blue-400",
    },
    {
      icon: Clock,
      label: "Tempo Médio",
      value: "12min",
      color: "text-purple-400",
    },
    {
      icon: TrendingUp,
      label: "Atividade",
      value: "+23%",
      color: "text-cyan-400",
    },
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

  const { authuser } = useAuth();

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {confirmDialog && (
        <ConfirmDialog
          title="logout"
          onCancel={setConfirmDialog}
          action={handleLogout}
          isFetching={isFetching}
        />
      )}

      <div className="w-full max-w-4xl">
        {/* Card Principal */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-slate-800/80 to-slate-700/80 p-5 text-center border-b border-slate-700/50">
            <h1 className="text-4xl font-light text-slate-100">Bem-vindo</h1>
            <p className="text-slate-400 text-sm">
              Conecte-se com amigos e comece a conversar
            </p>
          </div>

          {/* Informações do Usuário */}
          <div className="p-4 border-b border-slate-700/30">
            <div className="flex items-center gap-6 max-w-2xl mx-auto">
              <img
                className="w-20 h-20 object-cover rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-100 text-2xl font-light shadow-lg"
                // src={authuser?.profilePic}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-light text-slate-100 mb-1">
                  {authuser?.fullname}
                </h2>
                <p className="text-slate-400 text-sm mb-1">{authuser?.email}</p>
                <p className="text-slate-500 text-xs">Membro desde 01</p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="p-4 border-b border-slate-700/30">
            <h3 className="text-lg font-light text-slate-200 mb-3 text-center">
              Estatísticas da Comunidade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-900/40 rounded-xl p-2 border border-slate-700/30 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                    <p className="text-2xl font-light text-slate-100 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usuários Online Recentes */}
          <div className="py-3 px-8 border-b border-slate-700/30">
            <h3 className="text-lg font-light text-slate-200 mb-4 text-center">
              Quem está online agora
            </h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {["AM", "BC", "DE", "FG", "HI", "JK", "LM", "NO"].map(
                (avatar, index) => (
                  <div key={index} className="relative group">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center text-slate-200 text-sm font-light border-2 border-slate-800 hover:border-slate-600 transition-all cursor-pointer">
                      {avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  </div>
                ),
              )}
              <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 text-xs font-light border-2 border-slate-700/50">
                +239
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          <div className="p-4">
            <Link
              to="/chat"
              className="w-full cursor-pointer bg-slate-700 hover:bg-slate-600 text-slate-100 font-light py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Entrar no Chat
            </Link>
            <button
              className="w-full cursor-pointer mt-3 bg-slate-900/50 hover:bg-red-900/30 text-slate-300 hover:text-red-400 font-light py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group border border-slate-700/50 hover:border-red-700/50"
              onClick={() => setConfirmDialog(true)}
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Logout
            </button>
            <p className="text-center text-slate-500 text-xs mt-4">
              Ao entrar, você concorda com nossos termos de uso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
