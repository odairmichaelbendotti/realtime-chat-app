import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../store/useAuth";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router";

interface SignUpInterface {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpInterface>({
    fullname: "Lulito Carlson",
    email: "lulito@gmail.com  ",
    password: "124567",
    confirmPassword: "124567",
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);

    // Tirar o confirmPassword para não enviar junto na requisição (não precisa dele)
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
      return;
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light text-slate-100 mb-2">
              Criar conta
            </h1>
            <p className="text-slate-400 text-sm">Comece sua jornada conosco</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  value={formData.fullname}
                  placeholder="João Silva"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded bg-slate-900 border-slate-700 text-slate-600 focus:ring-slate-600 focus:ring-offset-0"
              />
              <label className="ml-2 text-sm text-slate-400 font-light">
                Aceito os
                <a
                  href="#"
                  className="text-slate-300 hover:text-slate-200 transition-colors"
                >
                  termos de uso
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-slate-200 transition-colors"
                >
                  política de privacidade
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-light py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {isFetching ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 text-sm justify-center">
            <p className="text-slate-400 font-light">Já tem uma conta?</p>
            <Link
              to="/signin"
              className="text-slate-300 hover:text-slate-200 transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
