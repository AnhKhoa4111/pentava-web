import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import gsap from "gsap"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import { authService } from "../services/authService"

export default function Login() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLElement | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!pageRef.current) return

    const context = gsap.context(() => {
      gsap.from(".login-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        ease: "power3.out",
      })
    }, pageRef)

    return () => context.revert()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!email.trim() || !password) {
      setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu.")
      return
    }

    setLoading(true)

    try {
      await authService.login(email.trim(), password)
      navigate("/admin")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Đăng nhập thất bại."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main ref={pageRef} className="flex min-h-screen items-center justify-center bg-[#F7FAFF] px-4 pt-28 pb-16 text-black">
        <section className="w-full max-w-[480px]">
          <form
            onSubmit={handleSubmit}
            className="login-reveal rounded-[28px] border-2 border-[#3A8157] bg-white p-7 shadow-[10px_10px_0px_0px_#FFC857] md:p-9"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3A8157] text-white shadow-[4px_4px_0px_0px_#529CFF]">
                <span className="material-symbols-outlined text-[28px]">
                  admin_panel_settings
                </span>
              </span>
              <div>
                <h1 className="text-2xl font-extrabold text-black">Đăng nhập</h1>
                <p className="text-xs font-semibold text-[#727272]">
                  Khu vực quản trị hệ thống PENTAVA
                </p>
              </div>
            </div>

            <label className="mb-5 block">
              <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-[#727272]">
                Tài khoản / Email
              </span>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError("")
                }}
                placeholder="Nhập email hoặc tên tài khoản"
                className="h-14 w-full rounded-[18px] border-2 border-[#D9D9D9] bg-[#F7FAFF] px-5 text-sm font-bold outline-none transition-all focus:border-[#3A8157] focus:bg-white"
                type="text"
                autoComplete="username"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-[#727272]">
                Mật khẩu
              </span>
              <input
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError("")
                }}
                placeholder="Nhập mật khẩu"
                className="h-14 w-full rounded-[18px] border-2 border-[#D9D9D9] bg-[#F7FAFF] px-5 text-sm font-bold outline-none transition-all focus:border-[#3A8157] focus:bg-white"
                type="password"
                autoComplete="current-password"
              />
            </label>

            {error ? (
              <p className="mb-4 rounded-[16px] bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#F25F5C]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mb-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#3A8157] px-6 text-sm font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Đang xác thực...
                </>
              ) : (
                <>
                  Đăng nhập
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </>
              )}
            </button>

            <div className="text-center">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3A8157] hover:underline"
              >
                <span className="material-symbols-outlined text-[19px]">arrow_back</span>
                Quay về trang chủ
              </Link>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}
