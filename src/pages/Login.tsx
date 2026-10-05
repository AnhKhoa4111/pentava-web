import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import gsap from "gsap"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"

const demoEmail = "admin@pentava.vn"
const demoPassword = "123456"

export default function Login() {
  const navigate = useNavigate()
  const pageRef = useRef<HTMLElement | null>(null)
  const [email, setEmail] = useState(demoEmail)
  const [password, setPassword] = useState(demoPassword)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!pageRef.current) return

    const context = gsap.context(() => {
      gsap.from(".login-reveal", {
        opacity: 0,
        y: 34,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      })
    }, pageRef)

    return () => context.revert()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //test
    if (email.trim() === demoEmail && password === demoPassword) {
      localStorage.setItem("pentava-admin-token", "demo-admin-token")
      navigate("/admin")
      return
    }

    setError("Email hoặc mật khẩu quản trị chưa đúng.")
  }

  return (
    <>
      <Header />

      <main ref={pageRef} className="min-h-screen bg-[#F7FAFF] px-6 pt-32 text-black">
        <section className="mx-auto grid min-h-[680px] max-w-[1180px] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="login-reveal space-y-7">
            <span className="inline-flex rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
              Admin workspace
            </span>

            <div className="space-y-4">
              <h1 className="max-w-[540px] text-[42px] font-extrabold leading-[1.05] md:text-[58px]">
                Quản lý nội dung PENTAVA.
              </h1>
              <p className="max-w-[520px] text-base leading-8 text-[#727272]">
                Đăng nhập để vào khu vực quản trị, nơi admin có thể chuẩn bị dữ liệu
                cho Blog, Cinema, tính năng và các nội dung hiển thị trên website.
              </p>
            </div>

            <div className="grid max-w-[520px] grid-cols-1 gap-4 sm:grid-cols-3">
              {["Blog", "Cinema", "Support"].map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-[#D9D9D9] bg-white p-4 shadow-[0_5px_0px_0px_rgba(0,0,0,0.06)]"
                >
                  <span className="material-symbols-outlined mb-3 text-[26px] text-[#3A8157]">
                    dashboard_customize
                  </span>
                  <p className="text-sm font-extrabold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="login-reveal rounded-[28px] border-2 border-[#3A8157] bg-white p-6 shadow-[10px_10px_0px_0px_#FFC857] md:p-8"
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3A8157] text-white shadow-[4px_4px_0px_0px_#529CFF]">
                <span className="material-symbols-outlined text-[28px]">
                  admin_panel_settings
                </span>
              </span>
              <div>
                <h2 className="text-2xl font-extrabold">Đăng nhập admin</h2>
                <p className="text-sm font-semibold text-[#727272]">
                  Dùng tài khoản demo để vào dashboard.
                </p>
              </div>
            </div>

            <label className="mb-5 block">
              <span className="mb-2 block text-xs font-extrabold uppercase tracking-widest text-[#727272]">
                Email
              </span>
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError("")
                }}
                className="h-14 w-full rounded-[18px] border-2 border-[#D9D9D9] bg-[#F7FAFF] px-5 text-sm font-bold outline-none transition-all focus:border-[#3A8157] focus:bg-white"
                type="email"
                autoComplete="email"
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
              className="mb-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#3A8157] px-6 text-sm font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] transition-all hover:-translate-y-1"
            >
              Vào quản trị
              <span className="material-symbols-outlined text-[20px]">login</span>
            </button>

            <div className="rounded-[18px] border border-[#D9D9D9] bg-[#F7FAFF] p-4 text-sm font-semibold leading-7 text-[#727272]">
              Demo: <span className="font-extrabold text-black">{demoEmail}</span>
              <br />
              Password: <span className="font-extrabold text-black">{demoPassword}</span>
            </div>

            <Link
              to="/home"
              className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#3A8157]"
            >
              <span className="material-symbols-outlined text-[19px]">arrow_back</span>
              Quay về trang chủ
            </Link>
          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}
