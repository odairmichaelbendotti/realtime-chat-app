import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../store/useAuth";

interface SignInInterface {
  email: string | null;
  password: string | null;
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInInterface>({
    email: null,
    password: null,
  });
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      alert("Mínimo 6 caracteres");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        console.log(response.status);
        return;
      }

      const data = await response.json();
      setAuthUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setAuthUser(null);
      return;
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light text-slate-100 mb-2">
              Bem-vindo
            </h1>
            <p className="text-slate-400 text-sm">Entre na sua conta</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubit}>
            <div>
              <label className="block text-sm font-light text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
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
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-slate-600 focus:ring-slate-600 focus:ring-offset-0"
                />
                <span className="ml-2 font-light">Lembrar de mim</span>
              </label>
              <a
                href="#"
                className="text-slate-400 hover:text-slate-300 transition-colors font-light"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-light py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2 justify-center text-sm">
            <p className="text-slate-400 font-light">Não tem uma conta?</p>
            <Link
              to="/signup"
              className="text-slate-300 hover:text-slate-200 transition-colors"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
