import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import ContactManager from "../components/admin/ContactManager"
import SubscriptionManager from "../components/admin/SubscriptionManager"
import UserManager from "../components/admin/UserManager"
import CashFlowManager from "../components/admin/CashFlowManager"
import AdminDashboard from "../components/admin/AdminDashboard"
import { authService } from "../services/authService"

export type ModuleKey = "dashboard" | "cashflow" | "users" | "subscriptions" | "contacts"

interface AdminModuleItem {
  key: ModuleKey
  label: string
  icon: string
  color: string
}

const MODULES: AdminModuleItem[] = [
  {
    key: "dashboard",
    label: "Bảng điều khiển",
    icon: "dashboard",
    color: "#3A8157",
  },
  {
    key: "cashflow",
    label: "Dòng tiền",
    icon: "payments",
    color: "#3A8157",
  },
  {
    key: "users",
    label: "Người dùng",
    icon: "group",
    color: "#3A8157",
  },
  {
    key: "subscriptions",
    label: "Gói cước",
    icon: "workspace_premium",
    color: "#D97706",
  },
  {
    key: "contacts",
    label: "Yêu cầu liên hệ",
    icon: "contact_mail",
    color: "#3A8157",
  },
]

export default function Admin() {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState<ModuleKey>("dashboard")

  const handleLogout = () => {
    authService.removeToken()
    navigate("/login")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7FAFF] px-4 pt-28 text-black md:px-6">
        <section className="mx-auto max-w-[1260px] py-8 md:py-10">
          {/* Top Banner Header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-8">
            <div>
              <span className="mb-3 inline-flex rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                PENTAVA admin
              </span>
              <h1 className="text-3xl font-extrabold leading-tight md:text-[48px]">
                Quản trị hệ thống
              </h1>
              <p className="mt-2 max-w-[700px] text-xs font-medium leading-6 text-[#727272] md:text-sm">
                Giám sát dòng tiền thời gian thực, quản lý tài khoản người dùng, cấu hình gói cước dịch vụ và hỗ trợ khách hàng PENTAVA.
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-xs font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Đăng xuất
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>

          {/* Layout Grid: Responsive Horizontal Nav trên Mobile/Tablet, Sticky Sidebar trên Desktop */}
          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            <aside className="h-fit rounded-[24px] border border-[#D9D9D9] bg-white p-3 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] lg:sticky lg:top-28">
              <p className="hidden px-3 pb-3 pt-2 text-[10px] font-extrabold uppercase tracking-widest text-[#727272] lg:block">
                Danh mục quản lý
              </p>
              <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:pb-0">
                {MODULES.map((item) => {
                  const isActive = activeKey === item.key
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveKey(item.key)}
                      className={`flex shrink-0 items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-left text-xs font-extrabold transition-colors lg:w-full lg:gap-3 lg:px-3 lg:py-3 lg:text-sm ${isActive
                          ? "bg-[#E8F3EC] text-[#3A8157]"
                          : "text-[#727272] hover:bg-[#F7FAFF] hover:text-black"
                        }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px] lg:text-[21px]"
                        style={{ color: item.color }}
                      >
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap lg:flex-1">{item.label}</span>
                      <span className="hidden rounded-full bg-[#3A8157] px-2 py-0.5 text-[9px] font-extrabold text-white lg:inline-block">
                        LIVE
                      </span>
                    </button>
                  )
                })}
              </nav>
            </aside>

            <section className="min-w-0">
              {activeKey === "dashboard" && <AdminDashboard onNavigate={setActiveKey} />}
              {activeKey === "cashflow" && <CashFlowManager />}
              {activeKey === "users" && <UserManager />}
              {activeKey === "subscriptions" && <SubscriptionManager />}
              {activeKey === "contacts" && <ContactManager />}
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
