import { useEffect, useState } from "react"
import {
  adminSubscriptionService,
  type CreateFeatureRequest,
  type PlanFeatureItem,
  type SubscriptionFeature,
  type SubscriptionPlan,
  type UpdatePlanFeatureConfigRequest,
  type UpdatePlanInfoRequest,
  type UserSubscriberDetail,
} from "../../services/adminSubscriptionService"

type SubTab = "plans" | "features" | "subscribers"

function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} đ`
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "—"
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return dateStr
  }
}

export default function SubscriptionManager() {
  const [activeTab, setActiveTab] = useState<SubTab>("plans")
  const [loading, setLoading] = useState(true)

  // Data states
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [features, setFeatures] = useState<SubscriptionFeature[]>([])
  const [subscribers, setSubscribers] = useState<UserSubscriberDetail[]>([])

  // Search & Filters
  const [subscriberSearch, setSubscriberSearch] = useState("")

  // Modals state
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [planInfoForm, setPlanInfoForm] = useState<UpdatePlanInfoRequest>({
    name: "",
    priceVnd: 0,
    durationDays: 30,
    description: "",
    badge: "",
    isActive: true,
    displayOrder: 1,
  })

  const [configuringFeaturesPlan, setConfiguringFeaturesPlan] = useState<SubscriptionPlan | null>(null)
  const [featureConfigForm, setFeatureConfigForm] = useState<PlanFeatureItem[]>([])

  const [isCreateFeatureOpen, setIsCreateFeatureOpen] = useState(false)
  const [createFeatureForm, setCreateFeatureForm] = useState<CreateFeatureRequest>({
    featureCode: "",
    name: "",
    description: "",
    defaultValue: "",
    unit: "",
    displayOrder: 1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Error modal state
  const [errorModal, setErrorModal] = useState<{
    visible: boolean
    title: string
    message: string
  }>({
    visible: false,
    title: "",
    message: "",
  })

  // Toast notification
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text })
    setTimeout(() => {
      setToast(null)
    }, 4000)
  }

  const showErrorModal = (title: string, message: string) => {
    setErrorModal({ visible: true, title, message })
  }

  // Load all initial data
  const loadData = async () => {
    setLoading(true)
    try {
      const [plansData, featuresData, subscribersData] = await Promise.all([
        adminSubscriptionService.getAllPlans(),
        adminSubscriptionService.getAllFeatures(),
        adminSubscriptionService.getAllSubscribers(),
      ])
      setPlans(plansData)
      setFeatures(featuresData)
      setSubscribers(subscribersData)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải dữ liệu quản trị gói cước."
      showErrorModal("Lỗi tải dữ liệu", msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // 1. Plan Info Edit
  const handleOpenEditPlan = (plan: SubscriptionPlan) => {
    setEditingPlan(plan)
    setPlanInfoForm({
      name: plan.name,
      priceVnd: plan.priceVnd,
      durationDays: plan.durationDays,
      description: plan.description || "",
      badge: plan.badge || "",
      isActive: plan.isActive,
      displayOrder: plan.displayOrder,
    })
  }

  const handleSavePlanInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPlan) return

    setIsSubmitting(true)
    try {
      const updated = await adminSubscriptionService.updatePlanInfo(editingPlan.id, planInfoForm)
      setPlans((prev) => prev.map((p) => (p.id === editingPlan.id ? updated : p)))
      showToast("success", `Cập nhật thông tin gói "${updated.name}" thành công!`)
      setEditingPlan(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cập nhật gói thất bại."
      showErrorModal("Lỗi cập nhật gói cước", msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 2. Plan Features Config
  const handleOpenConfigureFeatures = async (plan: SubscriptionPlan) => {
    setConfiguringFeaturesPlan(plan)
    setIsSubmitting(true)
    try {
      // 1. Lấy danh mục tất cả tính năng trong hệ thống (nếu chưa có)
      let allSystemFeatures = features
      if (allSystemFeatures.length === 0) {
        allSystemFeatures = await adminSubscriptionService.getAllFeatures()
        setFeatures(allSystemFeatures)
      }

      // 2. Lấy chi tiết mới nhất của gói cước
      const freshPlan = await adminSubscriptionService.getPlanById(plan.id)
      setConfiguringFeaturesPlan(freshPlan)

      // 3. Map đầy đủ tính năng: gói có cấu hình rồi thì lấy, chưa có thì gán mặc định tắt
      const planFeaturesMap = new Map((freshPlan.features || []).map((f) => [f.featureCode, f]))

      const fullFeatureList: PlanFeatureItem[] = allSystemFeatures.map((sf) => {
        const existing = planFeaturesMap.get(sf.featureCode)
        if (existing) {
          const isEnabled = Boolean(existing.isEnabled ?? (existing as any).enabled)
          return {
            ...existing,
            isEnabled,
            enabled: isEnabled,
          }
        }
        return {
          featureId: sf.id,
          featureCode: sf.featureCode,
          name: sf.name,
          description: sf.description,
          isEnabled: false,
          enabled: false,
          paramValue: sf.defaultValue || "",
          displayLabel: sf.name,
          unit: sf.unit,
        }
      })

      setFeatureConfigForm(fullFeatureList)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Không thể tải chi tiết gói."
      showErrorModal("Lỗi tải thông tin", msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleFeature = (featureCode: string) => {
    setFeatureConfigForm((prev) =>
      prev.map((item) => {
        if (item.featureCode === featureCode) {
          const nextVal = !Boolean(item.isEnabled ?? (item as any).enabled)
          return { ...item, isEnabled: nextVal, enabled: nextVal }
        }
        return item
      })
    )
  }

  const handleFeatureParamChange = (featureCode: string, field: "paramValue" | "displayLabel", value: string) => {
    setFeatureConfigForm((prev) =>
      prev.map((item) =>
        item.featureCode === featureCode ? { ...item, [field]: value } : item
      )
    )
  }

  const handleSavePlanFeatures = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!configuringFeaturesPlan) return

    setIsSubmitting(true)
    try {
      const payload: UpdatePlanFeatureConfigRequest = {
        featureConfigs: featureConfigForm.map((f) => {
          const isEnabledVal = Boolean(f.isEnabled ?? (f as any).enabled)
          return {
            featureCode: f.featureCode,
            isEnabled: isEnabledVal,
            enabled: isEnabledVal,
            paramValue: f.paramValue ?? "",
            displayLabel: f.displayLabel ?? "",
          }
        }),
      }
      const updated = await adminSubscriptionService.updatePlanFeatures(configuringFeaturesPlan.id, payload)
      setPlans((prev) => prev.map((p) => (p.id === configuringFeaturesPlan.id ? updated : p)))
      showToast("success", `Lưu cấu hình tính năng cho gói "${updated.name}" thành công!`)
      setConfiguringFeaturesPlan(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Lỗi lưu cấu hình tính năng."
      showErrorModal("Lỗi cấu hình tính năng", msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 3. Create Feature
  const handleCreateFeature = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!createFeatureForm.featureCode || !createFeatureForm.name) {
      showErrorModal("Thiếu thông tin", "Mã tính năng và tên tính năng không được để trống.")
      return
    }

    setIsSubmitting(true)
    try {
      const newFeature = await adminSubscriptionService.createFeature({
        ...createFeatureForm,
        featureCode: createFeatureForm.featureCode.trim().toUpperCase(),
      })
      setFeatures((prev) => [...prev, newFeature])
      showToast("success", `Tạo mới tính năng "${newFeature.name}" thành công!`)
      setIsCreateFeatureOpen(false)
      setCreateFeatureForm({
        featureCode: "",
        name: "",
        description: "",
        defaultValue: "",
        unit: "",
        displayOrder: features.length + 1,
      })
      // Tải lại các gói để đồng bộ cấu hình tính năng mới
      const freshPlans = await adminSubscriptionService.getAllPlans()
      setPlans(freshPlans)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tạo tính năng mới thất bại."
      showErrorModal("Lỗi tạo tính năng", msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const q = subscriberSearch.trim().toLowerCase()
    if (!q) return true
    return (
      String(sub.userId).includes(q) ||
      (sub.planCode && sub.planCode.toLowerCase().includes(q)) ||
      (sub.planName && sub.planName.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3 shadow-xl transition-all ${toast.type === "success"
            ? "border-[#86EFAC] bg-[#F0FDF4] text-[#166534]"
            : "border-[#FECDD3] bg-[#FFF1F2] text-[#9F1239]"
            }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span className="text-sm font-bold">{toast.text}</span>
        </div>
      )}

      {/* Header & Sub-Tabs */}
      <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-[#D97706]">
                workspace_premium
              </span>
              <h2 className="text-2xl font-extrabold text-[#111827]">
                Quản trị Gói cước
              </h2>
            </div>
            {/* <p className="mt-1 text-sm font-semibold text-[#727272]">
              Cấu hình giá bán, tính năng modular (bật/tắt) và theo dõi người dùng đăng ký gói.
            </p> */}
          </div>

          <button
            type="button"
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-[#D9D9D9] bg-[#F7FAFF] px-4 py-2 text-xs font-bold text-[#111827] hover:border-[#3A8157] hover:text-[#3A8157]"
          >
            <span className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}>
              refresh
            </span>
            Làm mới
          </button>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-[#EEF1F5] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "plans"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">loyalty</span>
            Danh sách Gói cước ({plans.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("features")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "features"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">extension</span>
            Danh mục Tính năng ({features.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("subscribers")}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-extrabold transition-all ${activeTab === "subscribers"
              ? "bg-[#3A8157] text-white shadow-sm"
              : "bg-[#F7FAFF] text-[#727272] hover:bg-[#E8F3EC] hover:text-[#3A8157]"
              }`}
          >
            <span className="material-symbols-outlined text-[18px]">card_membership</span>
            Hội viên đăng ký ({subscribers.length})
          </button>
        </div>
      </div>

      {/* TAB 1: PLANS */}
      {activeTab === "plans" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col justify-between rounded-[24px] border border-[#D9D9D9] bg-white p-6 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {plan.code === "PREMIUM" ? "👑" : plan.code === "GOLD" ? "⭐" : "🌱"}
                      </span>
                      <div>
                        <h3 className="text-lg font-extrabold text-[#111827]">{plan.name}</h3>
                        <span className="font-mono text-xs font-bold text-[#727272]">
                          #{plan.code}
                        </span>
                      </div>
                    </div>
                    {plan.badge ? (
                      <span className="rounded-full border border-[#86EFAC] bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-extrabold text-[#166534]">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#3A8157]">
                      {formatVnd(plan.priceVnd)}
                    </span>
                    <span className="text-xs font-semibold text-[#727272]">
                      / {plan.durationDays} ngày
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${plan.isActive
                        ? "bg-[#E8F5E9] text-[#15803D]"
                        : "bg-[#FEE2E2] text-[#991B1B]"
                        }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${plan.isActive ? "bg-[#15803D]" : "bg-[#991B1B]"
                          }`}
                      />
                      {plan.isActive ? "Đang mở bán" : "Tạm ngưng"}
                    </span>
                    {/* <span className="text-xs font-semibold text-[#727272]">
                      Thứ tự: {plan.displayOrder}
                    </span> */}
                  </div>

                  {/* Feature list preview */}
                  {/* <div className="mt-5 rounded-2xl bg-[#F9FAFB] p-3">
                    <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#727272]">
                      <span>Tính năng cấu hình</span>
                      <span className="text-[#3A8157]">
                        {plan.features.filter((f) => f.isEnabled).length}/{plan.features.length} bật
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.features.slice(0, 5).map((f) => (
                        <li key={f.featureId || f.featureCode} className="flex items-center gap-2 text-xs">
                          <span
                            className={`material-symbols-outlined text-[16px] ${f.isEnabled ? "text-[#3A8157]" : "text-[#D1D5DB]"
                              }`}
                          >
                            {f.isEnabled ? "check_circle" : "cancel"}
                          </span>
                          <span
                            className={`truncate ${f.isEnabled ? "font-semibold text-[#111827]" : "text-[#9CA3AF] line-through"
                              }`}
                          >
                            {f.displayLabel || f.name}
                          </span>
                        </li>
                      ))}
                      {plan.features.length > 5 && (
                        <li className="pt-1 text-center text-[11px] font-bold text-[#727272]">
                          + {plan.features.length - 5} tính năng khác
                        </li>
                      )}
                    </ul>
                  </div> */}
                </div>

                {/* Card Actions */}
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditPlan(plan)}
                    className="flex-1 rounded-full border border-[#D9D9D9] py-2 text-xs font-extrabold text-[#111827] hover:border-[#3A8157] hover:bg-[#F7FAFF] hover:text-[#3A8157]"
                  >
                    Sửa thông tin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenConfigureFeatures(plan)}
                    className="flex-1 rounded-full bg-[#3A8157] py-2 text-xs font-extrabold text-white hover:bg-[#2F6B47]"
                  >
                    Cấu hình
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM FEATURES */}
      {activeTab === "features" && (
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-[#111827]">
                Danh mục Tính năng Hệ thống
              </h3>
              <p className="text-xs font-semibold text-[#727272]">
                Các tính năng có thể phân bổ linh hoạt vào các gói cước theo cơ chế Modular.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateFeatureOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#3A8157] px-5 py-2.5 text-xs font-extrabold text-white hover:bg-[#2F6B47]"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm tính năng mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-[#D9D9D9] text-[10px] uppercase tracking-widest text-[#727272]">
                  <th className="px-4 py-3">Mã tính năng</th>
                  <th className="px-4 py-3">Tên hiển thị</th>
                  <th className="px-4 py-3">Mô tả</th>
                  <th className="px-4 py-3">Giá trị mặc định</th>
                  <th className="px-4 py-3">Đơn vị</th>
                  <th className="px-4 py-3">Thứ tự</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5] text-sm">
                {features.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3.5 font-mono text-xs font-extrabold text-[#D97706]">
                      {item.featureCode}
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-[#111827]">{item.name}</td>
                    <td className="px-4 py-3.5 text-xs text-[#727272]">{item.description || "—"}</td>
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                      {item.defaultValue || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-[#727272]">
                      {item.unit || "—"}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-bold text-[#727272]">
                      {item.displayOrder}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIBERS */}
      {activeTab === "subscribers" && (
        <div className="rounded-[24px] border border-[#D9D9D9] bg-white p-5 shadow-[0_6px_0px_0px_rgba(0,0,0,0.06)] md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-extrabold text-[#111827]">
                Danh sách Người dùng Đăng ký Gói cước
              </h3>
              <p className="text-xs font-semibold text-[#727272]">
                Tổng số {subscribers.length} tài khoản có dữ liệu gói cước.
              </p>
            </div>

            <div className="relative w-full max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#727272]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm theo User ID, mã gói..."
                value={subscriberSearch}
                onChange={(e) => setSubscriberSearch(e.target.value)}
                className="h-10 w-full rounded-full border border-[#D9D9D9] bg-[#F7FAFF] pl-10 pr-4 text-xs font-semibold outline-none focus:border-[#3A8157]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-[#D9D9D9] text-[10px] uppercase tracking-widest text-[#727272]">
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Trạng thái gói</th>
                  <th className="px-4 py-3">Gói cước</th>
                  <th className="px-4 py-3">Ngày bắt đầu</th>
                  <th className="px-4 py-3">Ngày kết thúc</th>
                  <th className="px-4 py-3">Còn lại</th>
                  <th className="px-4 py-3">Tính năng kích hoạt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5] text-sm">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.userId} className="hover:bg-[#F9FAFB]">
                    <td className="px-4 py-3.5 font-mono text-xs font-extrabold text-[#111827]">
                      #{sub.userId}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${sub.hasActiveSubscription
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${sub.hasActiveSubscription ? "bg-[#166534]" : "bg-[#6B7280]"
                            }`}
                        />
                        {sub.hasActiveSubscription ? "Đang hiệu lực" : "Hết hạn / Chưa có"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-extrabold text-[#111827]">
                        {sub.planName || sub.planCode || "—"}
                      </p>
                      {sub.badge ? (
                        <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[9px] font-extrabold text-[#92400E]">
                          {sub.badge}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#727272]">
                      {formatDate(sub.startDate)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#727272]">
                      {formatDate(sub.endDate)}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-bold text-[#3A8157]">
                      {sub.daysRemaining > 0 ? `${sub.daysRemaining} ngày` : "—"}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-[#727272]">
                      {sub.activeFeatures ? `${sub.activeFeatures.length} tính năng` : "0"}
                    </td>
                  </tr>
                ))}
                {filteredSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-xs text-[#727272]">
                      Không tìm thấy dữ liệu người dùng đăng ký.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: EDIT PLAN INFO */}
      {editingPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="w-full max-w-[520px] rounded-[24px] border-2 border-[#3A8157] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                  Chỉnh sửa gói cước
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-[#111827]">
                  {editingPlan.name} (#{editingPlan.code})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="material-symbols-outlined text-[#727272] hover:text-[#111827]"
              >
                close
              </button>
            </div>

            <form onSubmit={handleSavePlanInfo} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#111827]">Tên gói cước</label>
                <input
                  type="text"
                  required
                  value={planInfoForm.name}
                  onChange={(e) => setPlanInfoForm({ ...planInfoForm, name: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#111827]">Giá tiền (VNĐ)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={planInfoForm.priceVnd}
                    onChange={(e) =>
                      setPlanInfoForm({ ...planInfoForm, priceVnd: Number(e.target.value) })
                    }
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#111827]">Thời hạn (ngày)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={planInfoForm.durationDays}
                    onChange={(e) =>
                      setPlanInfoForm({ ...planInfoForm, durationDays: Number(e.target.value) })
                    }
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#111827]">Huy hiệu / Badge</label>
                  <input
                    type="text"
                    placeholder="VD: Phổ biến nhất, VIP"
                    value={planInfoForm.badge || ""}
                    onChange={(e) => setPlanInfoForm({ ...planInfoForm, badge: e.target.value })}
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#111827]">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    min="1"
                    value={planInfoForm.displayOrder || 1}
                    onChange={(e) =>
                      setPlanInfoForm({ ...planInfoForm, displayOrder: Number(e.target.value) })
                    }
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827]">Mô tả gói</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt quyền lợi gói..."
                  value={planInfoForm.description || ""}
                  onChange={(e) =>
                    setPlanInfoForm({ ...planInfoForm, description: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#D9D9D9] p-3 text-xs font-semibold outline-none focus:border-[#3A8157]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={planInfoForm.isActive ?? true}
                  onChange={(e) =>
                    setPlanInfoForm({ ...planInfoForm, isActive: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-[#D9D9D9] text-[#3A8157] focus:ring-[#3A8157]"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-extrabold text-[#111827]">
                  Bật mở bán gói này cho người dùng
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="rounded-full border border-[#D9D9D9] px-5 py-2 text-xs font-extrabold text-[#727272] hover:bg-[#F9FAFB]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#3A8157] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#2F6B47] disabled:opacity-50"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIGURE PLAN FEATURES */}
      {configuringFeaturesPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setConfiguringFeaturesPlan(null)}
        >
          <div
            className="w-full max-w-[650px] max-h-[90vh] overflow-hidden rounded-[24px] border-2 border-[#3A8157] bg-white p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between border-b border-[#EEF1F5] pb-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                  Cấu hình tính năng Modular
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-[#111827]">
                  {configuringFeaturesPlan.name} ({configuringFeaturesPlan.code})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConfiguringFeaturesPlan(null)}
                className="material-symbols-outlined text-[#727272] hover:text-[#111827]"
              >
                close
              </button>
            </div>

            <form onSubmit={handleSavePlanFeatures} className="flex-1 overflow-y-auto pr-1 space-y-4">
              <p className="text-xs font-semibold text-[#727272]">
                Bật/tắt các tính năng và điều chỉnh tham số hiển thị cho gói này:
              </p>

              <div className="space-y-3">
                {featureConfigForm.map((item) => {
                  const isEnabled = Boolean(item.isEnabled ?? (item as any).enabled)
                  return (
                    <div
                      key={item.featureId || item.featureCode}
                      className={`rounded-2xl border p-4 transition-all ${isEnabled
                        ? "border-[#86EFAC] bg-[#F0FDF4]"
                        : "border-[#E5E7EB] bg-[#F9FAFB] opacity-75"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-extrabold text-[#111827] text-sm">{item.name}</p>
                          <p className="font-mono text-[11px] text-[#727272]">
                            #{item.featureCode} {item.unit ? `(${item.unit})` : ""}
                          </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => handleToggleFeature(item.featureCode)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3A8157]"></div>
                          <span className="ml-2 text-xs font-extrabold text-[#111827]">
                            {isEnabled ? "Bật" : "Tắt"}
                          </span>
                        </label>
                      </div>

                      {isEnabled && (
                        <div className="mt-3 grid grid-cols-2 gap-3 pt-2 border-t border-[#DCFCE7]">
                          <div>
                            <label className="text-[11px] font-bold text-[#111827]">
                              Tham số / Hạn mức
                            </label>
                            <input
                              type="text"
                              placeholder="VD: 5GB, 2, true..."
                              value={item.paramValue || ""}
                              onChange={(e) =>
                                handleFeatureParamChange(item.featureCode, "paramValue", e.target.value)
                              }
                              className="mt-1 h-9 w-full rounded-xl border border-[#D9D9D9] bg-white px-3 text-xs font-semibold outline-none focus:border-[#3A8157]"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-[#111827]">
                              Nhãn hiển thị trên App
                            </label>
                            <input
                              type="text"
                              placeholder="Nhãn tóm tắt quyền lợi..."
                              value={item.displayLabel || ""}
                              onChange={(e) =>
                                handleFeatureParamChange(item.featureCode, "displayLabel", e.target.value)
                              }
                              className="mt-1 h-9 w-full rounded-xl border border-[#D9D9D9] bg-white px-3 text-xs font-semibold outline-none focus:border-[#3A8157]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#EEF1F5]">
                <button
                  type="button"
                  onClick={() => setConfiguringFeaturesPlan(null)}
                  className="rounded-full border border-[#D9D9D9] px-5 py-2 text-xs font-extrabold text-[#727272] hover:bg-[#F9FAFB]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#3A8157] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#2F6B47] disabled:opacity-50"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu cấu hình"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW FEATURE */}
      {isCreateFeatureOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsCreateFeatureOpen(false)}
        >
          <div
            className="w-full max-w-[500px] rounded-[24px] border-2 border-[#3A8157] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3A8157]">
                  Thêm mới
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-[#111827]">
                  Tạo Tính năng Hệ thống
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateFeatureOpen(false)}
                className="material-symbols-outlined text-[#727272] hover:text-[#111827]"
              >
                close
              </button>
            </div>

            <form onSubmit={handleCreateFeature} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#111827]">
                  Mã tính năng (Feature Code) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: OFFLINE_MODE, AI_SUMMARY..."
                  value={createFeatureForm.featureCode}
                  onChange={(e) =>
                    setCreateFeatureForm({
                      ...createFeatureForm,
                      featureCode: e.target.value.toUpperCase(),
                    })
                  }
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 font-mono text-xs font-extrabold outline-none focus:border-[#3A8157]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827]">Tên tính năng *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Chế độ ngoại tuyến..."
                  value={createFeatureForm.name}
                  onChange={(e) =>
                    setCreateFeatureForm({ ...createFeatureForm, name: e.target.value })
                  }
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#111827]">Giá trị mặc định</label>
                  <input
                    type="text"
                    placeholder="VD: 10GB, true..."
                    value={createFeatureForm.defaultValue || ""}
                    onChange={(e) =>
                      setCreateFeatureForm({ ...createFeatureForm, defaultValue: e.target.value })
                    }
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#111827]">Đơn vị tính</label>
                  <input
                    type="text"
                    placeholder="VD: GB, lần/tháng, boolean"
                    value={createFeatureForm.unit || ""}
                    onChange={(e) =>
                      setCreateFeatureForm({ ...createFeatureForm, unit: e.target.value })
                    }
                    className="mt-1.5 h-10 w-full rounded-xl border border-[#D9D9D9] px-3.5 text-xs font-semibold outline-none focus:border-[#3A8157]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#111827]">Mô tả chi tiết</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tác dụng của tính năng này..."
                  value={createFeatureForm.description || ""}
                  onChange={(e) =>
                    setCreateFeatureForm({ ...createFeatureForm, description: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#D9D9D9] p-3 text-xs font-semibold outline-none focus:border-[#3A8157]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateFeatureOpen(false)}
                  className="rounded-full border border-[#D9D9D9] px-5 py-2 text-xs font-extrabold text-[#727272] hover:bg-[#F9FAFB]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#3A8157] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#2F6B47] disabled:opacity-50"
                >
                  {isSubmitting ? "Đang tạo..." : "Tạo tính năng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ERROR (POPUP MODAL BÁO LỖI KHI GỌI API) */}
      {errorModal.visible && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setErrorModal({ visible: false, title: "", message: "" })}
        >
          <div
            className="w-full max-w-[440px] rounded-[24px] border-2 border-[#E11D48] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1F2] text-[#E11D48]">
                <span className="material-symbols-outlined text-[28px]">error</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-[#111827]">{errorModal.title}</h3>
                <p className="mt-1.5 text-xs font-semibold text-[#727272] whitespace-pre-line leading-relaxed">
                  {errorModal.message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setErrorModal({ visible: false, title: "", message: "" })}
                className="rounded-full bg-[#E11D48] px-6 py-2 text-xs font-extrabold text-white hover:bg-[#BE123C]"
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
