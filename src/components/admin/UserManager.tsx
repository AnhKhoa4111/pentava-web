import { useEffect, useMemo, useState } from "react"
import { adminUserService, type AdminUser } from "../../services/adminUserService"
import UserStatsCards from "./user/UserStatsCards"
import UserFilterBar, {
  type OnboardingFilter,
  type SearchMode,
  type VerifyFilter,
} from "./user/UserFilterBar"
import UserTable from "./user/UserTable"
import UserDetailModal from "./user/UserDetailModal"
import UserErrorModal from "./user/UserErrorModal"

export default function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>("KEYWORD")

  // Filters
  const [verifyFilter, setVerifyFilter] = useState<VerifyFilter>("ALL")
  const [onboardingFilter, setOnboardingFilter] = useState<OnboardingFilter>("ALL")

  // Unified User Modal State
  const [activeUser, setActiveUser] = useState<AdminUser | null>(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editNameInput, setEditNameInput] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)

  // Error & Toast
  const [errorModal, setErrorModal] = useState<{ title: string; message: string } | null>(null)
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 4000)
  }

  // Load all users
  const fetchUsers = async (query?: string) => {
    setLoading(true)
    try {
      const data = await adminUserService.getAllUsers(query)
      setUsers(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải danh sách người dùng từ manage-service."
      setErrorModal({ title: "Lỗi tải danh sách người dùng", message: msg })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle Search submit
  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const query = searchTerm.trim()
    if (!query) {
      fetchUsers()
      return
    }

    setLoading(true)
    try {
      if (searchMode === "ID") {
        const idNum = parseInt(query, 10)
        if (isNaN(idNum)) {
          setErrorModal({ title: "Giá trị không hợp lệ", message: "Vui lòng nhập User ID dạng số nguyên." })
          setLoading(false)
          return
        }
        const user = await adminUserService.getUserById(idNum)
        setUsers([user])
      } else if (searchMode === "EMAIL") {
        const user = await adminUserService.getUserByEmail(query)
        setUsers([user])
      } else {
        const list = await adminUserService.getAllUsers(query)
        setUsers(list)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tra cứu thông tin người dùng thất bại."
      setErrorModal({ title: "Không tìm thấy người dùng", message: msg })
    } finally {
      setLoading(false)
    }
  }

  // Modal Handlers
  const handleOpenDetail = async (u: AdminUser) => {
    setActiveUser(u)
    setIsEditingName(false)
    setEditNameInput(u.name || "")
    setLoadingDetail(true)
    try {
      const fresh = await adminUserService.getUserById(u.id)
      setActiveUser(fresh)
      setEditNameInput(fresh.name || "")
    } catch {
      // Giữ data cũ nếu lỗi
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleOpenEditName = (u: AdminUser) => {
    setActiveUser(u)
    setIsEditingName(true)
    setEditNameInput(u.name || "")
  }

  const handleCloseModal = () => {
    setActiveUser(null)
    setIsEditingName(false)
    setEditNameInput("")
  }

  // Save Name
  const handleSaveUserName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeUser) return
    if (!editNameInput.trim()) {
      setErrorModal({ title: "Thiếu thông tin", message: "Tên người dùng không được để trống." })
      return
    }

    setIsUpdating(true)
    try {
      const updated = await adminUserService.updateUserName(activeUser.id, editNameInput.trim())
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      setActiveUser(updated)
      setIsEditingName(false)
      showToast("success", `Cập nhật tên cho người dùng ID ${updated.id} thành công!`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cập nhật tên người dùng thất bại."
      setErrorModal({ title: "Lỗi cập nhật tên người dùng", message: msg })
    } finally {
      setIsUpdating(false)
    }
  }

  // Filter & Stats: Chỉ tính ROLE_USER
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (u.role !== "ROLE_USER") return false
      if (verifyFilter === "VERIFIED" && !u.isVerified) return false
      if (verifyFilter === "UNVERIFIED" && u.isVerified) return false
      if (onboardingFilter === "COMPLETED" && !u.hasCompletedOnboarding) return false
      if (onboardingFilter === "INCOMPLETE" && u.hasCompletedOnboarding) return false
      return true
    })
  }, [users, verifyFilter, onboardingFilter])

  const stats = useMemo(() => {
    const regular = users.filter((u) => u.role === "ROLE_USER")
    return {
      total: regular.length,
      verified: regular.filter((u) => u.isVerified).length,
      onboarded: regular.filter((u) => u.hasCompletedOnboarding).length,
      incompleted: regular.filter((u) => !u.hasCompletedOnboarding).length,
    }
  }, [users])

  // Export CSV
  const handleExportCsv = () => {
    const header = [
      "User ID",
      "Tên người dùng (Onboarding)",
      "Email (Auth)",
      "Xác thực Email",
      "Hoàn tất Onboarding",
      "Tiểu sử (Bio)",
      "Ngày tạo tài khoản",
    ]
    const rows = filteredUsers.map((u) => [
      u.id,
      u.name || "",
      u.email,
      u.isVerified ? "Đã xác thực" : "Chưa xác thực",
      u.hasCompletedOnboarding ? "Hoàn tất" : "Chưa xong",
      u.bio || "",
      u.createdAt || "",
    ])
    const csvContent =
      "\ufeff" +
      [header, ...rows]
        .map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(","))
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-users-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border-2 px-5 py-4 shadow-xl transition-all ${
            toast.type === "success"
              ? "border-[#3A8157] bg-white text-[#3A8157]"
              : "border-red-500 bg-white text-red-600"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="text-sm font-extrabold">{toast.text}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <UserStatsCards stats={stats} />

      {/* Main Container — Đồng bộ 100% với ContactManager */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        {/* Header Actions */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-[#3A8157]">
                manage_accounts
              </span>
              <h2 className="text-2xl font-extrabold text-black">Quản lý Tài khoản & Người dùng</h2>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#727272]">
              Tên người dùng được đồng bộ trực tiếp từ Onboarding-service qua gRPC và Auth-service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#3A8157] bg-white px-4 text-xs font-extrabold text-[#3A8157] transition-colors hover:bg-[#E8F3EC]"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất CSV
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("")
                fetchUsers()
              }}
              disabled={loading}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                refresh
              </span>
              Làm mới
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <UserFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          verifyFilter={verifyFilter}
          setVerifyFilter={setVerifyFilter}
          onboardingFilter={onboardingFilter}
          setOnboardingFilter={setOnboardingFilter}
          loading={loading}
          onSearchSubmit={handleSearchSubmit}
          onResetFilters={() => {
            setVerifyFilter("ALL")
            setOnboardingFilter("ALL")
            setSearchTerm("")
            fetchUsers()
          }}
        />

        {/* User Table */}
        <UserTable
          users={filteredUsers}
          loading={loading}
          onOpenDetail={handleOpenDetail}
          onOpenEditName={handleOpenEditName}
        />
      </div>

      {/* Unified User Detail & Edit Modal */}
      {activeUser && (
        <UserDetailModal
          user={activeUser}
          isEditingName={isEditingName}
          setIsEditingName={setIsEditingName}
          editNameInput={editNameInput}
          setEditNameInput={setEditNameInput}
          isUpdating={isUpdating}
          loadingDetail={loadingDetail}
          onClose={handleCloseModal}
          onSaveName={handleSaveUserName}
        />
      )}

      {/* Error Modal */}
      {errorModal && (
        <UserErrorModal
          error={errorModal}
          onClose={() => setErrorModal(null)}
        />
      )}
    </div>
  )
}
