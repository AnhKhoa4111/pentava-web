import { authService } from "./authService"

export type ContactStatus = "PENDING" | "IN_PROGRESS" | "RESOLVED" | "SPAM"

export interface CreateContactRequest {
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactInquiry {
  id: number
  fullName: string
  email: string
  phone?: string | null
  subject: string
  message: string
  status: ContactStatus
  adminNote?: string | null
  createdAt: string
  updatedAt: string
}

export interface UpdateContactStatusRequest {
  status: ContactStatus
  adminNote?: string
}

export const STATUS_META: Record<
  ContactStatus,
  { label: string; bg: string; text: string; border: string; badgeClass: string }
> = {
  PENDING: {
    label: "Chờ xử lý",
    bg: "#FFF4D8",
    text: "#B45309",
    border: "#FCD34D",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
  },
  IN_PROGRESS: {
    label: "Đang xử lý",
    bg: "#E8F3FF",
    text: "#1D4ED8",
    border: "#93C5FD",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
  },
  RESOLVED: {
    label: "Đã giải quyết",
    bg: "#E8F5E9",
    text: "#15803D",
    border: "#86EFAC",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  SPAM: {
    label: "Spam",
    bg: "#FFE4E6",
    text: "#BE123C",
    border: "#FDA4AF",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
  },
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
      errorDetail = errJson.message || errJson.error || errorDetail
    } catch {
      // Use fallback
    }
    if (response.status === 401) {
      throw new Error("Phiên làm việc admin đã hết hạn hoặc không có quyền. Vui lòng đăng nhập lại.")
    }
    throw new Error(errorDetail)
  }

  // Handle empty 204 or void response
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T
  }
  return {} as T
}

export const contactService = {
  /**
   * Khách gửi form liên hệ từ Landing Page (Public)
   * POST /api/manage/contacts
   */
  async submitContact(data: CreateContactRequest): Promise<ContactInquiry> {
    const response = await fetch("/api/manage/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return handleResponse<ContactInquiry>(response)
  },

  /**
   * Lấy danh sách liên hệ (Admin, có thể lọc theo status)
   * GET /api/manage/contacts?status=...
   */
  async getContacts(status?: ContactStatus | ""): Promise<ContactInquiry[]> {
    const url = status
      ? `/api/manage/contacts?status=${encodeURIComponent(status)}`
      : "/api/manage/contacts"

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    const data = await handleResponse<ContactInquiry[] | { value?: ContactInquiry[] }>(response)
    if (Array.isArray(data)) {
      return data
    }
    if (data && Array.isArray(data.value)) {
      return data.value
    }
    return []
  },

  /**
   * Xem chi tiết một yêu cầu liên hệ (Admin)
   * GET /api/manage/contacts/{id}
   */
  async getContactById(id: number): Promise<ContactInquiry> {
    const response = await fetch(`/api/manage/contacts/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    return handleResponse<ContactInquiry>(response)
  },

  /**
   * Cập nhật trạng thái và ghi chú xử lý liên hệ (Admin)
   * PUT /api/manage/contacts/{id}/status
   */
  async updateStatus(id: number, data: UpdateContactStatusRequest): Promise<ContactInquiry> {
    const response = await fetch(`/api/manage/contacts/${id}/status`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    return handleResponse<ContactInquiry>(response)
  },

  /**
   * Xóa thông tin liên hệ (Admin)
   * DELETE /api/manage/contacts/{id}
   */
  async deleteContact(id: number): Promise<void> {
    const response = await fetch(`/api/manage/contacts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })

    await handleResponse<void>(response)
  },
}
