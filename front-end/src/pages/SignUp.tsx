import { Mail, Lock, User, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";

interface SignUpInterface {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpInterface>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      alert("Preencha todos os campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!agreedToTerms) {
      alert("Aceite os termos de uso para continuar");
      return;
    }

    setIsLoading(true);

    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Response não ok");
        return;
      }

      const data = await response.json();
      setAuthUser(data);
      navigate("/welcome");
    } catch (err) {
      console.error(err);
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-cyan-500/15 rounded-full blur-[150px]" />
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

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/3 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-10 text-center">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium tracking-wide uppercase">
                Realtime Chat
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              Criar conta
            </h1>
            <p className="text-white/50 mt-2 text-sm">
              Comece sua jornada conosco
            </p>
          </div>

          <div className="p-8 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full bg-white/2 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-white/2 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/2 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/2 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/30 transition-all"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded bg-white/2 border-white/20 text-cyan-500 focus:ring-cyan-500/30 focus:ring-offset-0 cursor-pointer"
                />
                <label className="ml-3 text-sm text-white/50 leading-relaxed">
                  Aceito os{" "}
                  <Link
                    to="#"
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    to="#"
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    política de privacidade
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Criar conta</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-sm">
                Já tem uma conta?{" "}
                <Link
                  to="/signin"
                  className="text-white hover:text-cyan-400 font-medium transition-colors"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
