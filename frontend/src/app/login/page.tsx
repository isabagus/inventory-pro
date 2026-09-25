"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const DEMO_ACCOUNTS = [
  { role: "Owner",          email: "owner@packsolution.dev" },
  { role: "Manager",        email: "manager@packsolution.dev" },
  { role: "Front Office",   email: "fo@packsolution.dev" },
  { role: "Tim Design",     email: "design@packsolution.dev" },
  { role: "Kepala Produksi",email: "produksi@packsolution.dev" },
  { role: "Quality Control",email: "qc@packsolution.dev" },
  { role: "Staf Gudang",    email: "gudang@packsolution.dev" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const axiosErr = err as {
        response?: { data?: { message?: string; errors?: { email?: string[] } } };
      };
      setError(
        axiosErr.response?.data?.errors?.email?.[0] ||
        axiosErr.response?.data?.message ||
        "Login gagal. Periksa kembali email dan kata sandi Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] dark:bg-[#0F1B2D] text-[#1B2436] dark:text-[#E8ECF3] flex items-center justify-center p-4 sm:p-6 transition-colors duration-200">
      {/* Top Bar for Theme Toggle */}
      <div className="fixed top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          id="login-theme-toggle"
          className="p-2 rounded-lg bg-white dark:bg-[#16223A] border border-[#E2E6ED] dark:border-[#26334D] text-[#6B7684] hover:text-[#1B2436] dark:text-[#8A94A6] dark:hover:text-[#E8ECF3] shadow-sm transition-colors"
          title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="w-full max-w-4xl grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Brand Overview (5 cols) */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-[#16223A] border border-[#E2E6ED] dark:border-[#26334D] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-[#2B5FC7] dark:bg-[#3B6FE0] flex items-center justify-center font-bold text-white text-base shadow-sm">
                PS
              </div>
              <div>
                <div className="font-bold text-[#1B2436] dark:text-[#E8ECF3] text-sm leading-tight">
                  CV Solusi Inovasi Packaging
                </div>
                <div className="text-xs text-[#2B5FC7] dark:text-[#3B6FE0] font-medium">
                  Sistem ERP / CRM Percetakan
                </div>
              </div>
            </div>

            <h1 className="text-xl font-bold text-[#1B2436] dark:text-[#E8ECF3] leading-snug mb-2">
              Pengelolaan Inventori & Pemantauan Produksi
            </h1>
            <p className="text-xs text-[#6B7684] dark:text-[#8A94A6] leading-relaxed mb-6">
              Sistem decoupled terintegrasi untuk 5 brand, 2 lokasi gudang, kalkulator BOM,
              penerbitan SPK, alur inspeksi QC, dan prediksi kurs USD.
            </p>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E2E6ED] dark:border-[#26334D] mb-6 text-center">
              <div>
                <div className="text-lg font-bold text-[#2B5FC7] dark:text-[#3B6FE0]">5</div>
                <div className="text-[11px] text-[#6B7684] dark:text-[#8A94A6]">Brand</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#2B5FC7] dark:text-[#3B6FE0]">2</div>
                <div className="text-[11px] text-[#6B7684] dark:text-[#8A94A6]">Gudang</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#2B5FC7] dark:text-[#3B6FE0]">7</div>
                <div className="text-[11px] text-[#6B7684] dark:text-[#8A94A6]">Role RBAC</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold uppercase text-[#6B7684] dark:text-[#8A94A6] tracking-wider mb-2">
              Akun Demo Cepat
            </div>
            <div className="space-y-1">
              {DEMO_ACCOUNTS.slice(0, 4).map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemo(acc.email)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs bg-[#F4F6FA] hover:bg-[#E2E6ED] dark:bg-[#1B2A44] dark:hover:bg-[#26334D] border border-[#E2E6ED] dark:border-[#26334D] text-[#1B2436] dark:text-[#E8ECF3] transition-colors text-left"
                >
                  <span className="font-medium">{acc.role}</span>
                  <span className="text-[11px] text-[#6B7684] dark:text-[#8A94A6] font-mono">
                    {acc.email}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7684] dark:text-[#8A94A6] mt-2">
              Password semua akun: <code className="font-mono text-[#2B5FC7] dark:text-[#3B6FE0]">password</code>
            </p>
          </div>
        </div>

        {/* Right Side: Login Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-8 rounded-xl bg-white dark:bg-[#16223A] border border-[#E2E6ED] dark:border-[#26334D] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none">
          {/* Mobile Brand Monogram */}
          <div className="flex lg:hidden items-center gap-3 mb-6 pb-4 border-b border-[#E2E6ED] dark:border-[#26334D]">
            <div className="h-9 w-9 rounded-lg bg-[#2B5FC7] dark:bg-[#3B6FE0] flex items-center justify-center font-bold text-white text-sm">
              PS
            </div>
            <div>
              <div className="font-bold text-[#1B2436] dark:text-[#E8ECF3] text-sm">
                Packsolution ERP
              </div>
              <div className="text-xs text-[#2B5FC7] dark:text-[#3B6FE0]">
                CV Solusi Inovasi Packaging
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1B2436] dark:text-[#E8ECF3] tracking-tight">
              Masuk ke Sistem
            </h2>
            <p className="text-xs text-[#6B7684] dark:text-[#8A94A6] mt-1">
              Gunakan kredensial terdaftar untuk mengakses hak akses modul Anda.
            </p>
          </div>

          {/* Mobile Quick Role Selector */}
          <div className="lg:hidden mb-5 p-3 rounded-lg bg-[#F4F6FA] dark:bg-[#1B2A44] border border-[#E2E6ED] dark:border-[#26334D]">
            <div className="text-[11px] font-semibold text-[#1B2436] dark:text-[#E8ECF3] mb-2">
              Pilih Role Akun Demo:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  type="button"
                  key={acc.email}
                  onClick={() => fillDemo(acc.email)}
                  className="px-2 py-1 rounded text-xs bg-white dark:bg-[#16223A] border border-[#E2E6ED] dark:border-[#26334D] text-[#1B2436] dark:text-[#E8ECF3] hover:border-[#2B5FC7]"
                >
                  {acc.role}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#1B2436] dark:text-[#E8ECF3] mb-1.5"
              >
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@packsolution.dev"
                className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#0F1B2D] border border-[#E2E6ED] dark:border-[#26334D] text-[#1B2436] dark:text-[#E8ECF3] placeholder:text-[#6B7684] text-xs focus:outline-none focus:border-[#2B5FC7] dark:focus:border-[#3B6FE0] focus:ring-1 focus:ring-[#2B5FC7] dark:focus:ring-[#3B6FE0] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#1B2436] dark:text-[#E8ECF3] mb-1.5"
              >
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#0F1B2D] border border-[#E2E6ED] dark:border-[#26334D] text-[#1B2436] dark:text-[#E8ECF3] placeholder:text-[#6B7684] text-xs focus:outline-none focus:border-[#2B5FC7] dark:focus:border-[#3B6FE0] focus:ring-1 focus:ring-[#2B5FC7] dark:focus:ring-[#3B6FE0] transition-colors"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 border border-[#FECACA] dark:border-[#7F1D1D]/40 text-[#991B1B] dark:text-[#F87171] text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              id="login-submit-btn"
              className="w-full h-10 px-4 rounded-lg bg-[#2B5FC7] hover:bg-[#1D4FB8] dark:bg-[#3B6FE0] dark:hover:bg-[#2B5FC7] text-white font-medium text-xs shadow-sm active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E2E6ED] dark:border-[#26334D] text-center text-[11px] text-[#6B7684] dark:text-[#8A94A6]">
            CV Solusi Inovasi Packaging · Hak Akses Terenkripsi Sanctum API
          </div>
        </div>
      </div>
    </div>
  );
}
