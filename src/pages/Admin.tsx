import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import ContactManager from "../components/admin/ContactManager"
import SubscriptionManager from "../components/admin/SubscriptionManager"
import UserManager from "../components/admin/UserManager"
import { authService } from "../services/authService"

type ModuleKey = "contacts" | "subscriptions" | "users"

type AdminRecord = {
  id: number
  primary: string
  secondary: string
  status?: string
  detail: Record<string, string>
  searchable: string
}

type AdminModule = {
  key: ModuleKey
  label: string
  table: string
  icon: string
  color: string
  description: string
  columns: string[]
  records: AdminRecord[]
}


const modules: AdminModule[] = [
  {
    key: "users",
    label: "Người dùng",
    table: "users",
    icon: "group",
    color: "#3A8157",
    description: "Theo dõi tài khoản, trạng thái xác thực và onboarding.",
    columns: ["Người dùng", "Xác thực", "Onboarding", "Provider", "Ngày tạo"],
    records: [],
  },
  {
    key: "subscriptions",
    label: "Gói cước",
    table: "subscriptions",
    icon: "workspace_premium",
    color: "#D97706",
    description: "Quản trị các gói hội viên, cấu hình modular tính năng và theo dõi thuê bao.",
    columns: ["Gói cước", "Giá tiền", "Thời hạn", "Trạng thái", "Tính năng"],
    records: [],
  },
  {
    key: "contacts",
    label: "Yêu cầu liên hệ",
    table: "contacts",
    icon: "contact_mail",
    color: "#3A8157",
    description: "Quản lý và cập nhật trạng thái các yêu cầu hỗ trợ từ khách hàng.",
    columns: ["Người gửi", "Tiêu đề", "Trạng thái", "Ngày gửi", "Ghi chú admin"],
    records: [],
  },
]

function exportCsv(module: AdminModule, records: AdminRecord[]) {
  const header = ["id", ...module.columns]
  const rows = records.map((record) => [record.id, record.primary, record.secondary, record.status ?? "", ...Object.values(record.detail).slice(1)])
  const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n")
  const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }))
  const link = document.createElement("a")
  link.href = url
  link.download = `${module.table}-admin.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState<ModuleKey>("users")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("Tất cả")
  const [selected, setSelected] = useState<AdminRecord | null>(null)
  const activeModule = modules.find((item) => item.key === activeKey) ?? modules[0]

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase()
    return activeModule.records.filter((record) => {
      const matchesSearch = !query || record.searchable.toLowerCase().includes(query)
      const matchesStatus = statusFilter === "Tất cả" || record.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [activeModule, search, statusFilter])

  const statuses = [...new Set(activeModule.records.map((record) => record.status).filter(Boolean))] as string[]
  const handleModuleChange = (key: ModuleKey) => {
    setActiveKey(key)
    setSearch("")
    setStatusFilter("Tất cả")
    setSelected(null)
  }

  const handleLogout = () => {
    authService.removeToken()
    navigate("/login")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7FAFF] px-4 pt-28 text-black md:px-6">
        <section className="mx-auto max-w-[1260px] py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <span className="mb-4 inline-flex rounded-full border-2 border-[#FFC857] bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157] shadow-[3px_3px_0px_0px_#FFC857]">
                PENTAVA admin
              </span>
              <h1 className="text-[36px] font-extrabold leading-tight md:text-[52px]">Quản trị hệ thống</h1>
              <p className="mt-3 max-w-[700px] text-sm leading-7 text-[#727272]">
                Xem và quản lý các yêu cầu liên hệ, cấu hình các gói cước dịch vụ và dữ liệu người dùng PENTAVA.
              </p>
            </div>
            <div className="flex gap-3">
              {activeKey !== "contacts" && activeKey !== "subscriptions" && activeKey !== "users" && (
                <button
                  type="button"
                  onClick={() => exportCsv(activeModule, filteredRecords)}
                  className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-[#3A8157] bg-white px-5 text-xs font-extrabold uppercase tracking-widest text-[#3A8157] hover:bg-[#E8F3EC]"
                >
                  <span className="material-symbols-outlined text-[19px]">download</span> Xuất CSV
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-5 text-xs font-extrabold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#FFC857] hover:-translate-y-1"
              >
                Đăng xuất <span className="material-symbols-outlined text-[19px]">logout</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            <aside className="h-fit rounded-[24px] border border-[#D9D9D9] bg-white p-3 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)]">
              <p className="px-3 pb-3 pt-2 text-[10px] font-extrabold uppercase tracking-widest text-[#727272]">
                Danh mục quản lý
              </p>
              <nav className="space-y-1">
                {modules.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleModuleChange(item.key)}
                    className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left text-sm font-extrabold transition-colors ${activeKey === item.key
                      ? "bg-[#E8F3EC] text-[#3A8157]"
                      : "text-[#727272] hover:bg-[#F7FAFF]"
                      }`}
                  >
                    <span className="material-symbols-outlined text-[21px]" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.key === "contacts" || item.key === "subscriptions" || item.key === "users" ? (
                      <span className="rounded-full bg-[#3A8157] px-2 py-0.5 text-[9px] font-extrabold text-white">
                        LIVE
                      </span>
                    ) : (
                      <span className="text-xs">{item.records.length}</span>
                    )}
                  </button>
                ))}
              </nav>
            </aside>

            <section className="min-w-0">
              {activeKey === "contacts" ? (
                <ContactManager />
              ) : activeKey === "subscriptions" ? (
                <SubscriptionManager />
              ) : activeKey === "users" ? (
                <UserManager />
              ) : (
                <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-4 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
                  <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: activeModule.color }}>
                          {activeModule.icon}
                        </span>
                        <h2 className="text-2xl font-extrabold">{activeModule.label}</h2>
                      </div>
                      <p className="text-sm font-semibold text-[#727272]">
                        {activeModule.description} <span className="font-mono text-xs">({activeModule.table})</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-[#F7FAFF] px-3 py-2 text-xs font-extrabold text-[#727272]">
                      {filteredRecords.length} bản ghi
                    </span>
                  </div>
                  <div className="mb-5 flex flex-col gap-3 md:flex-row">
                    <label className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-4 top-3 text-[21px] text-[#727272]">
                        search
                      </span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Tìm theo tên, email, trạng thái..."
                        className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#3A8157]"
                      />
                    </label>
                    {statuses.length > 0 && (
                      <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="h-11 rounded-full border border-[#D9D9D9] bg-white px-4 text-sm font-bold outline-none focus:border-[#3A8157]"
                      >
                        <option>Tất cả</option>
                        {statuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                      <thead>
                        <tr className="border-b border-[#D9D9D9] text-[10px] uppercase tracking-widest text-[#727272]">
                          <th className="px-3 py-3">Thông tin chính</th>
                          {activeModule.columns.slice(1).map((column) => (
                            <th key={column} className="px-3 py-3">{column}</th>
                          ))}
                          <th className="px-3 py-3"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRecords.map((record) => (
                          <tr key={record.id} className="border-b border-[#EEF1F5] text-sm hover:bg-[#F7FAFF]">
                            <td className="px-3 py-4">
                              <p className="font-extrabold">{record.primary}</p>
                              <p className="mt-1 text-xs font-semibold text-[#727272]">{record.secondary}</p>
                            </td>
                            <td className="px-3 py-4">
                              {record.status ? (
                                <span className="rounded-full bg-[#E8F3EC] px-3 py-1.5 text-xs font-extrabold text-[#3A8157]">
                                  {record.status}
                                </span>
                              ) : "—"}
                            </td>
                            <td className="px-3 py-4 text-xs font-semibold text-[#727272]">
                              {Object.values(record.detail)[3] ?? "—"}
                            </td>
                            <td className="px-3 py-4 text-xs font-semibold text-[#727272]">
                              {Object.values(record.detail)[4] ?? "—"}
                            </td>
                            <td className="px-3 py-4">
                              <button
                                type="button"
                                onClick={() => setSelected(record)}
                                className="rounded-full border border-[#3A8157] px-3 py-1.5 text-xs font-extrabold text-[#3A8157] hover:bg-[#3A8157] hover:text-white"
                              >
                                Chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredRecords.length === 0 && (
                      <div className="py-14 text-center">
                        <span className="material-symbols-outlined text-[38px] text-[#D9D9D9]">search_off</span>
                        <p className="mt-2 font-extrabold">Không tìm thấy dữ liệu phù hợp</p>
                        <p className="text-sm text-[#727272]">Thử đổi từ khóa hoặc bộ lọc.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>
      </main>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 md:items-center" onClick={() => setSelected(null)}>
          <div className="w-full max-w-[520px] rounded-[24px] border-2 border-[#3A8157] bg-white p-6 shadow-[8px_8px_0px_0px_#FFC857]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157]">Chi tiết bản ghi #{selected.id}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{selected.primary}</h3>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="material-symbols-outlined text-[#727272]">close</button>
            </div>
            <dl className="divide-y divide-[#EEF1F5]">
              {Object.entries(selected.detail).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="font-bold text-[#727272]">{key}</dt>
                  <dd className="text-right font-extrabold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
