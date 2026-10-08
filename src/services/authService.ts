const TOKEN_KEY = "pentava-admin-token"
const USER_KEY = "pentava-admin-user"

export interface LoginResponseData {
  accessToken: string
  email: string
  role?: string
  message?: string
  hasCompletedOnboarding?: boolean
}

export interface LoginApiResponse {
  success?: boolean
  message?: string
  data?: LoginResponseData
  accessToken?: string
}

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken())
  },

  getUser(): { email?: string; role?: string } | null {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  },

  async login(email: string, password: string): Promise<LoginResponseData> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      let errorMessage = "Đăng nhập thất bại"
      try {
        const errorJson = await response.json()
        errorMessage = errorJson.message || errorJson.error || errorMessage
      } catch {
        errorMessage = `Lỗi hệ thống (${response.status})`
      }
      throw new Error(errorMessage)
    }

    const result = (await response.json()) as LoginApiResponse

    const token = result.data?.accessToken || result.accessToken
    if (!token) {
      throw new Error("Không nhận được token từ hệ thống xác thực.")
    }

    const userData: LoginResponseData = {
      accessToken: token,
      email: result.data?.email || email,
      role: result.data?.role || "ROLE_ADMIN",
    }

    this.setToken(token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))

    return userData
  },
}
