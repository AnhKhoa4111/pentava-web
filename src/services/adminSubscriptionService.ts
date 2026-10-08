import { authService } from "./authService"

export interface PlanFeatureItem {
  featureId: number
  featureCode: string
  name: string
  description?: string | null
  isEnabled: boolean
  enabled?: boolean
  paramValue?: string | null
  displayLabel?: string | null
  unit?: string | null
}

export interface SubscriptionPlan {
  id: number
  code: string
  name: string
  priceVnd: number
  durationDays: number
  description?: string | null
  badge?: string | null
  isActive: boolean
  active?: boolean
  displayOrder: number
  features: PlanFeatureItem[]
}

export interface UpdatePlanInfoRequest {
  name: string
  priceVnd: number
  durationDays: number
  description?: string | null
  badge?: string | null
  isActive?: boolean
  active?: boolean
  displayOrder?: number
}

export interface FeatureConfigItem {
  featureCode: string
  isEnabled?: boolean
  enabled?: boolean
  paramValue?: string | null
  displayLabel?: string | null
}

export interface UpdatePlanFeatureConfigRequest {
  featureConfigs: FeatureConfigItem[]
}

export interface SubscriptionFeature {
  id: number
  featureCode: string
  name: string
  description?: string | null
  defaultValue?: string | null
  unit?: string | null
  displayOrder: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateFeatureRequest {
  featureCode: string
  name: string
  description?: string
  defaultValue?: string
  unit?: string
  displayOrder?: number
}

export interface UserSubscriberDetail {
  userId: number
  hasActiveSubscription: boolean
  planCode?: string | null
  planName?: string | null
  badge?: string | null
  startDate?: string | null
  endDate?: string | null
  daysRemaining: number
  activeFeatures: PlanFeatureItem[]
}

function getAuthHeaders(): HeadersInit {
  const token = authService.getToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorDetail = `Lỗi yêu cầu (${response.status})`
    try {
      const errJson = await response.json()
      if (errJson && typeof errJson === "object") {
        if (typeof errJson.message === "string" && errJson.message.trim().length > 0) {
          errorDetail = errJson.message
        } else if (typeof errJson.error === "string" && errJson.error.trim().length > 0) {
          errorDetail = errJson.error
        } else {
          const messages = Object.values(errJson).filter(
            (v): v is string => typeof v === "string" && v.length > 0
          )
          if (messages.length > 0) {
            errorDetail = messages.join("\n")
          }
        }
      }
    } catch {
      // Fallback
    }

    if (response.status === 401) {
      throw new Error("Phiên làm việc quản trị đã hết hạn. Vui lòng đăng nhập lại.")
    }
    if (response.status === 403) {
      throw new Error("Tài khoản của bạn không có quyền Quản trị viên (ROLE_ADMIN) để thực hiện thao tác này.")
    }

    throw new Error(errorDetail)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T
  }
  return {} as T
}

function normalizePlan(plan: any): SubscriptionPlan {
  if (!plan) return plan
  return {
    ...plan,
    isActive: plan.isActive ?? plan.active ?? true,
    features: (plan.features || []).map((f: any) => ({
      ...f,
      isEnabled: Boolean(f.isEnabled ?? f.enabled),
      enabled: Boolean(f.isEnabled ?? f.enabled),
    })),
  }
}

export const adminSubscriptionService = {
  /**
   * Lấy danh sách tất cả các gói cước trong hệ thống kèm cấu hình tính năng
   * GET /api/shop/admin/subscription/plans
   */
  async getAllPlans(): Promise<SubscriptionPlan[]> {
    const response = await fetch("/api/shop/admin/subscription/plans", {
      method: "GET",
      headers: getAuthHeaders(),
    })
    const raw = await handleResponse<any[]>(response)
    return (raw || []).map(normalizePlan)
  },

  /**
   * Xem chi tiết một gói cước theo ID
   * GET /api/shop/admin/subscription/plans/{planId}
   */
  async getPlanById(planId: number): Promise<SubscriptionPlan> {
    const response = await fetch(`/api/shop/admin/subscription/plans/${planId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    const raw = await handleResponse<any>(response)
    return normalizePlan(raw)
  },

  /**
   * Cập nhật thông tin cơ bản của gói cước
   * PUT /api/shop/admin/subscription/plans/{planId}
   */
  async updatePlanInfo(planId: number, data: UpdatePlanInfoRequest): Promise<SubscriptionPlan> {
    const payload = {
      ...data,
      active: data.isActive ?? data.active ?? true,
      isActive: data.isActive ?? data.active ?? true,
    }
    const response = await fetch(`/api/shop/admin/subscription/plans/${planId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    const raw = await handleResponse<any>(response)
    return normalizePlan(raw)
  },

  /**
   * Cập nhật cấu hình tính năng của gói cước
   * PUT /api/shop/admin/subscription/plans/{planId}/features
   */
  async updatePlanFeatures(
    planId: number,
    data: UpdatePlanFeatureConfigRequest
  ): Promise<SubscriptionPlan> {
    // Send both 'enabled' and 'isEnabled' for dual compatibility with backend Jackson
    const payload = {
      featureConfigs: data.featureConfigs.map((fc) => {
        const flag = Boolean(fc.enabled ?? fc.isEnabled)
        return {
          featureCode: fc.featureCode,
          enabled: flag,
          isEnabled: flag,
          paramValue: fc.paramValue ?? "",
          displayLabel: fc.displayLabel ?? "",
        }
      }),
    }
    const response = await fetch(`/api/shop/admin/subscription/plans/${planId}/features`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    const raw = await handleResponse<any>(response)
    return normalizePlan(raw)
  },

  /**
   * Lấy danh mục tất cả tính năng có thể cấu hình trong hệ thống
   * GET /api/shop/admin/subscription/features
   */
  async getAllFeatures(): Promise<SubscriptionFeature[]> {
    const response = await fetch("/api/shop/admin/subscription/features", {
      method: "GET",
      headers: getAuthHeaders(),
    })
    return handleResponse<SubscriptionFeature[]>(response)
  },

  /**
   * Tạo thêm một tính năng mới vào danh mục hệ thống
   * POST /api/shop/admin/subscription/features
   */
  async createFeature(data: CreateFeatureRequest): Promise<SubscriptionFeature> {
    const response = await fetch("/api/shop/admin/subscription/features", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return handleResponse<SubscriptionFeature>(response)
  },

  /**
   * Lấy danh sách tất cả người dùng đã từng hoặc đang đăng ký gói cước
   * GET /api/shop/admin/subscription/subscribers
   */
  async getAllSubscribers(): Promise<UserSubscriberDetail[]> {
    const response = await fetch("/api/shop/admin/subscription/subscribers", {
      method: "GET",
      headers: getAuthHeaders(),
    })
    return handleResponse<UserSubscriberDetail[]>(response)
  },
}
