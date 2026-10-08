import { useEffect, useMemo, useState } from "react"
import { adminUserService, type AdminUser } from "../../services/adminUserService"

type VerifyFilter = "ALL" | "VERIFIED" | "UNVERIFIED"
type OnboardingFilter = "ALL" | "COMPLETED" | "INCOMPLETE"

type SearchMode = "KEYWORD" | "ID" | "EMAIL"

export default function UserManager() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchMode, setSearchMode] = useState<SearchMode>("KEYWORD")

  // Filters
  const [verifyFilter, setVerifyFilter] = useState<VerifyFilter>("ALL")
  const [onboardingFilter, setOnboardingFilter] = useState<OnboardingFilter>("ALL")

  // Edit Name Modal State
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [newName, setNewName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // View Detail Modal State
  const [detailUser, setDetailUser] = useState<AdminUser | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  // Error Modal State (Popup lỗi bắt buộc)
  const [errorModal, setErrorModal] = useState<{ title: string; message: string } | null>(null)

  // Toast Notification
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 4000)
  }

  const showErrorModal = (title: string, message: string) => {
    setErrorModal({ title, message })
  }

  // Load all users
  const fetchUsers = async (query?: string) => {
    setLoading(true)
    try {
      const data = await adminUserService.getAllUsers(query)
      setUsers(data)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải danh sách người dùng từ manage-service."
      showErrorModal("Lỗi tải danh sách người dùng", msg)
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
        const userIdNum = parseInt(query, 10)
        if (isNaN(userIdNum)) {
          showErrorModal("Giá trị không hợp lệ", "Vui lòng nhập User ID dạng số nguyên.")
          setLoading(false)
          return
        }
        const user = await adminUserService.getUserById(userIdNum)
        setUsers([user])
      } else if (searchMode === "EMAIL") {
        const user = await adminUserService.getUserByEmail(query)
        setUsers([user])
      } else {
        // Keyword search
        const list = await adminUserService.getAllUsers(query)
        setUsers(list)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tra cứu thông tin người dùng thất bại."
      showErrorModal("Không tìm thấy người dùng", msg)
    } finally {
      setLoading(false)
    }
  }

  // Open Edit Name Modal
  const handleOpenEditName = (u: AdminUser) => {
    setEditingUser(u)
    setNewName(u.name || "")
  }

  // Submit Update Name
  const handleSaveUserName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    if (!newName.trim()) {
      showErrorModal("Thiếu thông tin", "Tên người dùng không được để trống.")
      return
    }

    setIsUpdating(true)
    try {
      const updated = await adminUserService.updateUserName(editingUser.id, newName.trim())
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      if (detailUser && detailUser.id === updated.id) {
        setDetailUser(updated)
      }
      showToast("success", `Cập nhật tên cho người dùng ID ${updated.id} thành công!`)
      setEditingUser(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cập nhật tên người dùng thất bại."
      showErrorModal("Lỗi cập nhật tên người dùng", msg)
    } finally {
      setIsUpdating(false)
    }
  }

  // Open User Detail Modal (Calls getUserById to ensure fresh info)
  const handleOpenDetail = async (u: AdminUser) => {
    setLoadingDetail(true)
    setDetailUser(u)
    try {
      const fresh = await adminUserService.getUserById(u.id)
      setDetailUser(fresh)
    } catch {
      // Dùng dữ liệu hiện tại nếu fetch chi tiết lỗi
    } finally {
      setLoadingDetail(false)
    }
  }

  // Filtered users: CHỈ HIỂN THỊ ROLE_USER
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Bắt buộc chỉ hiển thị ROLE_USER
      if (u.role !== "ROLE_USER") return false

      // Verify filter
      if (verifyFilter === "VERIFIED" && !u.isVerified) return false
      if (verifyFilter === "UNVERIFIED" && u.isVerified) return false

      // Onboarding filter
      if (onboardingFilter === "COMPLETED" && !u.hasCompletedOnboarding) return false
      if (onboardingFilter === "INCOMPLETE" && u.hasCompletedOnboarding) return false

      return true
    })
  }, [users, verifyFilter, onboardingFilter])

  // KPI Counts (Chỉ tính cho ROLE_USER)
  const stats = useMemo(() => {
    const regularUsers = users.filter((u) => u.role === "ROLE_USER")
    const total = regularUsers.length
    const verified = regularUsers.filter((u) => u.isVerified).length
    const onboarded = regularUsers.filter((u) => u.hasCompletedOnboarding).length
    const incompleted = regularUsers.filter((u) => !u.hasCompletedOnboarding).length
    return { total, verified, onboarded, incompleted }
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
        .map((row) =>
          row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(",")
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-users-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (isoString?: string) => {
    if (!isoString) return "—"
    try {
      const d = new Date(isoString)
      return d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return isoString
    }
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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-[20px] border border-[#D9D9D9] bg-white p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#727272]">Tổng người dùng</span>
            <span className="material-symbols-outlined text-[22px] text-[#3A8157]">group</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-black">{stats.total}</p>
        </div>

        <div className="rounded-[20px] border border-emerald-200 bg-[#ECFDF5] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">Đã xác thực</span>
            <span className="material-symbols-outlined text-[22px] text-emerald-600">verified</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-emerald-900">{stats.verified}</p>
        </div>

        <div className="rounded-[20px] border border-blue-200 bg-[#EFF6FF] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800">Đã hoàn tất Onboarding</span>
            <span className="material-symbols-outlined text-[22px] text-blue-600">flag</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-blue-900">{stats.onboarded}</p>
        </div>

        <div className="rounded-[20px] border border-amber-200 bg-[#FFFBEB] p-4 shadow-[0_4px_0px_0px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">Chưa xong Onboarding</span>
            <span className="material-symbols-outlined text-[22px] text-amber-600">pending</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-amber-900">{stats.incompleted}</p>
        </div>
      </div>

      {/* Main Section */}
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
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#3A8157] px-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_#FFC857] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
                refresh
              </span>
              Làm mới
            </button>
          </div>
        </div>

        {/* Search Bar & Mode Selector */}
        <form onSubmit={handleSearchSubmit} className="mb-6 space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search Mode Pill */}
            <div className="flex rounded-full border border-[#D9D9D9] bg-[#F7FAFF] p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSearchMode("KEYWORD")}
                className={`rounded-full px-3 py-1.5 transition ${
                  searchMode === "KEYWORD"
                    ? "bg-[#3A8157] text-white shadow-sm"
                    : "text-[#727272] hover:text-black"
                }`}
              >
                Từ khóa
              </button>
              <button
                type="button"
                onClick={() => setSearchMode("ID")}
                className={`rounded-full px-3 py-1.5 transition ${
                  searchMode === "ID"
                    ? "bg-[#3A8157] text-white shadow-sm"
                    : "text-[#727272] hover:text-black"
                }`}
              >
                User ID
              </button>
              <button
                type="button"
                onClick={() => setSearchMode("EMAIL")}
                className={`rounded-full px-3 py-1.5 transition ${
                  searchMode === "EMAIL"
                    ? "bg-[#3A8157] text-white shadow-sm"
                    : "text-[#727272] hover:text-black"
                }`}
              >
                Email
              </button>
            </div>

            {/* Input field */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-3 text-[20px] text-[#727272]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  searchMode === "ID"
                    ? "Nhập User ID (VD: 14)..."
                    : searchMode === "EMAIL"
                    ? "Nhập Email chính xác (VD: pentava.official@gmail.com)..."
                    : "Tìm theo tên, email, từ khóa..."
                }
                className="h-11 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-11 pr-24 text-sm font-semibold outline-none transition-colors focus:border-[#3A8157] focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1.5 top-1.5 inline-flex h-8 items-center rounded-full bg-[#3A8157] px-4 text-xs font-extrabold text-white hover:bg-[#2F6B47] transition disabled:opacity-60"
              >
                Tìm
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-[#727272]">Lọc:</span>

            {/* Verify Filter */}
            <select
              value={verifyFilter}
              onChange={(e) => setVerifyFilter(e.target.value as VerifyFilter)}
              className="h-8 rounded-lg border border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
            >
              <option value="ALL">Xác thực: Tất cả</option>
              <option value="VERIFIED">Đã xác thực email</option>
              <option value="UNVERIFIED">Chưa xác thực email</option>
            </select>

            {/* Onboarding Filter */}
            <select
              value={onboardingFilter}
              onChange={(e) => setOnboardingFilter(e.target.value as OnboardingFilter)}
              className="h-8 rounded-lg border border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] outline-none focus:border-[#3A8157]"
            >
              <option value="ALL">Onboarding: Tất cả</option>
              <option value="COMPLETED">Đã hoàn tất onboarding</option>
              <option value="INCOMPLETE">Chưa hoàn tất</option>
            </select>

            {(verifyFilter !== "ALL" || onboardingFilter !== "ALL" || searchTerm) && (
              <button
                type="button"
                onClick={() => {
                  setVerifyFilter("ALL")
                  setOnboardingFilter("ALL")
                  setSearchTerm("")
                  fetchUsers()
                }}
                className="text-xs font-bold text-red-500 hover:underline ml-2"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </form>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-[20px] border border-[#E5E7EB]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-black uppercase tracking-wider text-[#727272]">
                <th className="py-3.5 pl-4 pr-2">ID</th>
                <th className="py-3.5 px-3">Người dùng</th>
                <th className="py-3.5 px-3">Email</th>
                <th className="py-3.5 px-3">Xác thực</th>
                <th className="py-3.5 px-3">Onboarding</th>
                <th className="py-3.5 px-3">Ngày tạo</th>
                <th className="py-3.5 pl-3 pr-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-semibold text-[#111827]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#727272]">
                    <div className="inline-flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-[#3A8157]">
                        progress_activity
                      </span>
                      <span>Đang tải danh sách người dùng...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#727272]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[40px] text-gray-300">
                        person_search
                      </span>
                      <p className="font-extrabold text-base">Không tìm thấy người dùng nào</p>
                      <p className="text-xs">Hãy thử thay đổi từ khóa tìm kiếm hoặc đặt lại bộ lọc.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const initial = (user.name || user.email || "?").charAt(0).toUpperCase()
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-[#F9FAFB]">
                      <td className="py-3 pl-4 pr-2 font-mono text-xs text-[#727272]">#{user.id}</td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          {user.avatarUrl ? (
                            <img
                              src={user.avatarUrl}
                              alt={user.name || user.email}
                              className="h-9 w-9 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F3EC] text-xs font-black text-[#3A8157]">
                              {initial}
                            </div>
                          )}
                          <div className="min-w-0 max-w-[160px]">
                            <p className="truncate font-extrabold text-[#111827] text-sm">
                              {user.name || <span className="italic text-gray-400">Chưa đặt tên</span>}
                            </p>
                            {user.bio ? (
                              <p className="truncate text-[11px] text-[#727272]">{user.bio}</p>
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono text-xs text-[#374151]">{user.email}</span>
                      </td>

                      <td className="py-3 px-3">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Đã xác thực
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold text-gray-600">
                            <span className="material-symbols-outlined text-[14px]">cancel</span>
                            Chưa
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        {user.hasCompletedOnboarding ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                            <span className="material-symbols-outlined text-[14px]">task_alt</span>
                            Hoàn tất
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                            <span className="material-symbols-outlined text-[14px]">pending</span>
                            Chưa xong
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-xs text-[#727272]">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="py-3 pl-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditName(user)}
                            className="inline-flex h-8 items-center gap-1 rounded-full border border-[#D9D9D9] bg-white px-2.5 text-xs font-bold text-[#111827] hover:border-[#3A8157] hover:text-[#3A8157] transition"
                            title="Sửa tên người dùng (Đồng bộ sang Onboarding)"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                            Sửa tên
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenDetail(user)}
                            className="inline-flex h-8 items-center gap-1 rounded-full bg-[#E8F3EC] px-2.5 text-xs font-bold text-[#3A8157] hover:bg-[#3A8157] hover:text-white transition"
                            title="Xem chi tiết"
                          >
                            <span className="material-symbols-outlined text-[15px]">visibility</span>
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: SỬA TÊN NGƯỜI DÙNG (PUT /api/manage/users/{id}/name) */}
      {/* ============================================================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 rounded-3xl border-2 border-[#D9D9D9] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#3A8157]">edit</span>
                <h3 className="text-lg font-black text-[#111827]">Cập nhật tên người dùng</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveUserName} className="mt-4 space-y-4">
              <div className="rounded-xl bg-[#F7FAFF] p-3 text-xs border border-[#EEF1F5]">
                <p className="text-[#727272]">
                  User ID: <span className="font-mono font-bold text-[#111827]">#{editingUser.id}</span>
                </p>
                <p className="mt-1 text-[#727272]">
                  Email: <span className="font-mono font-bold text-[#111827]">{editingUser.email}</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold text-[#3A8157]">
                  * Tên mới sẽ được cập nhật trực tiếp vào Onboarding-service qua gRPC.
                </p>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-wider text-[#111827]">
                  Tên người dùng mới <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nhập họ và tên mới..."
                  required
                  className="mt-1 h-11 w-full rounded-2xl border border-[#D9D9D9] bg-[#F7FAFF] px-4 text-sm font-semibold outline-none focus:border-[#3A8157] focus:bg-white transition"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#EEF1F5]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  disabled={isUpdating}
                  className="rounded-full border border-gray-300 px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[#2F6B47] transition disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[16px]">
                        progress_activity
                      </span>
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: CHI TIẾT NGƯỜI DÙNG (GET /api/manage/users/{id})       */}
      {/* ============================================================== */}
      {detailUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg animate-in fade-in zoom-in-95 rounded-3xl border-2 border-[#D9D9D9] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EEF1F5] pb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#3A8157]">
                  account_circle
                </span>
                <h3 className="text-lg font-black text-[#111827]">Chi tiết Người dùng</h3>
              {loadingDetail && (
                <span className="material-symbols-outlined animate-spin text-sm text-[#3A8157]">
                  progress_activity
                </span>
              )}
              </div>
              <button
                type="button"
                onClick={() => setDetailUser(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-4 rounded-2xl bg-[#F7FAFF] p-4 border border-[#E5E7EB]">
                {detailUser.avatarUrl ? (
                  <img
                    src={detailUser.avatarUrl}
                    alt={detailUser.name || detailUser.email}
                    className="h-16 w-16 rounded-full object-cover border-2 border-[#3A8157]"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3EC] text-2xl font-black text-[#3A8157]">
                    {(detailUser.name || detailUser.email || "?").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-extrabold text-[#111827]">
                      {detailUser.name || <span className="italic text-gray-400">Chưa đặt tên</span>}
                    </h4>

                  </div>
                  <p className="font-mono text-xs text-[#727272] mt-0.5">{detailUser.email}</p>
                  {detailUser.bio ? (
                    <p className="text-xs text-gray-600 mt-2 italic bg-white p-2 rounded-lg border border-gray-100">
                      "{detailUser.bio}"
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Detail Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-gray-200 p-3 bg-white">
                  <span className="font-bold text-[#727272]">User ID:</span>
                  <p className="mt-1 font-mono font-bold text-[#111827]">#{detailUser.id}</p>
                </div>

                <div className="rounded-xl border border-gray-200 p-3 bg-white">
                  <span className="font-bold text-[#727272]">Xác thực Email:</span>
                  <p className="mt-1 font-bold">
                    {detailUser.isVerified ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Đã xác thực
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                        Chưa xác thực
                      </span>
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-3 bg-white">
                  <span className="font-bold text-[#727272]">Trạng thái Onboarding:</span>
                  <p className="mt-1 font-bold">
                    {detailUser.hasCompletedOnboarding ? (
                      <span className="text-blue-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">task_alt</span>
                        Đã hoàn tất
                      </span>
                    ) : (
                      <span className="text-amber-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">pending</span>
                        Chưa hoàn tất
                      </span>
                    )}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-3 bg-white">
                  <span className="font-bold text-[#727272]">Ngày tạo tài khoản:</span>
                  <p className="mt-1 font-bold text-[#111827]">{formatDate(detailUser.createdAt)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#EEF1F5]">
                <button
                  type="button"
                  onClick={() => {
                    handleOpenEditName(detailUser)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#3A8157] px-4 py-2 text-xs font-bold text-[#3A8157] hover:bg-[#E8F3EC] transition"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Đổi tên người dùng này
                </button>

                <button
                  type="button"
                  onClick={() => setDetailUser(null)}
                  className="rounded-full bg-gray-900 px-6 py-2 text-xs font-black uppercase text-white hover:bg-black transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* POPUP MODAL BÁO LỖI (THROW LỖI RA MODAL THEO YÊU CẦU)            */}
      {/* ============================================================== */}
      {errorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 rounded-3xl border-2 border-red-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                <span className="material-symbols-outlined text-3xl">error</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">{errorModal.title}</h3>
                <p className="text-xs font-semibold text-red-500">Thao tác không thành công</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-800 border border-red-100 leading-relaxed whitespace-pre-wrap">
              {errorModal.message}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setErrorModal(null)}
                className="rounded-full bg-red-600 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-red-700 transition"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
