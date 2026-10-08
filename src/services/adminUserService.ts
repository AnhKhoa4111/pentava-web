import { authService } from "./authService"

export interface AdminUser {
  id: number
  email: string
  name: string
  role: string
  avatarUrl?: string | null
  bio?: string | null
  isVerified: boolean
  hasCompletedOnboarding: boolean
  createdAt: string
}

export interface UpdateUserNameRequest {
  name: string
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
        if (errJson.details && typeof errJson.details === "object") {
          const detailMsgs = Object.values(errJson.details).filter(
            (v): v is string => typeof v === "string" && v.length > 0
          )
          if (detailMsgs.length > 0) {
            errorDetail = detailMsgs.join("\n")
          }
        } else if (typeof errJson.message === "string" && errJson.message.trim().length > 0) {
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
    if (response.status === 404) {
      throw new Error(errorDetail || "Không tìm thấy người dùng trong hệ thống.")
    }

    throw new Error(errorDetail)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T
  }
  return {} as T
}

function normalizeUser(raw: any): AdminUser {
  return {
    id: raw.id,
    email: raw.email || "",
    name: raw.name || "",
    role: raw.role || "ROLE_USER",
    avatarUrl: raw.avatarUrl || null,
    bio: raw.bio || null,
    isVerified: Boolean(raw.isVerified ?? raw.verified),
    hasCompletedOnboarding: Boolean(raw.hasCompletedOnboarding),
    createdAt: raw.createdAt || "",
  }
}

export const adminUserService = {
  /**
   * Lấy toàn bộ danh sách người dùng (Dành cho Admin Web, có thể tìm kiếm theo từ khóa)
   * GET /api/manage/users hoặc /api/manage/users/all
   */
  async getAllUsers(search?: string): Promise<AdminUser[]> {
    const query = search && search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""
    const response = await fetch(`/api/manage/users${query}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    const list = await handleResponse<any[]>(response)
    return (list || []).map(normalizeUser)
  },

  /**
   * Xem thông tin người dùng theo User ID
   * GET /api/manage/users/{userId}
   */
  async getUserById(userId: number): Promise<AdminUser> {
    const response = await fetch(`/api/manage/users/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    const raw = await handleResponse<any>(response)
    return normalizeUser(raw)
  },

  /**
   * Xem thông tin người dùng theo Email
   * GET /api/manage/users/by-email?email=...
   */
  async getUserByEmail(email: string): Promise<AdminUser> {
    const response = await fetch(`/api/manage/users/by-email?email=${encodeURIComponent(email.trim())}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    const raw = await handleResponse<any>(response)
    return normalizeUser(raw)
  },

  /**
   * Cập nhật tên người dùng (Đồng bộ trực tiếp sang onboarding-service qua gRPC)
   * PUT /api/manage/users/{userId}/name
   */
  async updateUserName(userId: number, name: string): Promise<AdminUser> {
    const response = await fetch(`/api/manage/users/${userId}/name`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: name.trim() }),
    })
    const raw = await handleResponse<any>(response)
    return normalizeUser(raw)
  },
}
