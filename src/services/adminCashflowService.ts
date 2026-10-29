import { authService } from "./authService"

// ─── Types & Interfaces ───────────────────────────────────────────────────────

export type CashFlowType = "TOPUP_RUBY" | "SUBSCRIPTION_PLAN" | "SHOP_PURCHASE"
export type FlowDirection = "IN" | "OUT"
export type CashFlowStatus = "SUCCESS" | "PENDING" | "FAILED"

export interface CashFlowTransaction {
  id: number
  transactionCode: string
  type: CashFlowType
  direction: FlowDirection
  amountVnd: number
  rubyAmount: number
  userId: number
  userName?: string
  userEmail?: string
  status: CashFlowStatus
  paymentMethod: string // "SEPAY" | "RUBY_WALLET" | "MANUAL"
  bankCode?: string
  accountNumber?: string
  accountName?: string
  sepayReferenceCode?: string
  qrCodeUrl?: string
  description: string
  itemDetails?: {
    itemName?: string
    itemCode?: string
    slot?: string
    planCode?: string
    durationDays?: number
    bonusRuby?: number
  }
  createdAt: string
  completedAt?: string | null
}

export interface CashFlowSummary {
  totalRevenueVnd: number
  todayRevenueVnd: number
  pendingRevenueVnd: number
  totalTransactions: number
  successCount: number
  pendingCount: number
  failedCount: number
  rubyMinted: number
  rubySpent: number
  rubyCirculating: number
  conversionRate: number
  revenueBySource: {
    rubyTopupVnd: number
    subscriptionVnd: number
  }
}

export interface CashFlowFilters {
  direction?: "ALL" | "IN" | "OUT"
  type?: "ALL" | CashFlowType
  status?: "ALL" | CashFlowStatus
  searchTerm?: string
  dateRange?: "ALL" | "TODAY" | "7DAYS" | "30DAYS"
}

export interface RubyPackageItem {
  code: string
  name: string
  rubyAmount: number
  priceVnd: number
  bonusRuby: number
  description: string
  isPopular: boolean
  isBestValue: boolean
}

export interface GatewayConfigInfo {
  bankCode: string
  accountNumber: string
  accountName: string
  baseRateVndPerRuby: number
  minTopupVnd: number
  minTopupRuby: number
  webhookUrl: string
  packages: RubyPackageItem[]
}

// Thông tin cổng thanh toán SePay mặc định chuẩn theo config backend
export const GATEWAY_CONFIG: GatewayConfigInfo = {
  bankCode: "MBBank",
  accountNumber: "0347616299",
  accountName: "PENTAVA",
  baseRateVndPerRuby: 2000,
  minTopupVnd: 20_000,
  minTopupRuby: 10,
  webhookUrl: "/api/shop/webhook/sepay",
  packages: [
    {
      code: "SMALL",
      name: "Small Pack",
      rubyAmount: 50,
      priceVnd: 100_000,
      bonusRuby: 0,
      description: "Small Pack (50 Ruby) = 100.000 ₫",
      isPopular: false,
      isBestValue: false,
    },
    {
      code: "MEDIUM",
      name: "Medium Pack",
      rubyAmount: 120,
      priceVnd: 220_000,
      bonusRuby: 10,
      description: "Medium Pack (120 Ruby) = 220.000 ₫ — tiết kiệm 20.000 ₫",
      isPopular: true,
      isBestValue: false,
    },
    {
      code: "LARGE",
      name: "Large Pack",
      rubyAmount: 300,
      priceVnd: 540_000,
      bonusRuby: 30,
      description: "Large Pack (300 Ruby) = 540.000 ₫ — tiết kiệm 60.000 ₫",
      isPopular: false,
      isBestValue: true,
    },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAuthHeaders(): HeadersInit {
  const token = authService.getToken()
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = `Lỗi server (${res.status})`
    try {
      const body = await res.json()
      msg = body?.message || body?.error || msg
    } catch {
      // ignore
    }
    throw new Error(msg)
  }
  return res.json() as Promise<T>
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const adminCashflowService = {
  /**
   * Lấy danh sách giao dịch từ backend với bộ lọc đầy đủ.
   * Backend: GET /api/shop/admin/cashflow/transactions
   */
  async getTransactions(filters?: CashFlowFilters): Promise<CashFlowTransaction[]> {
    const params = new URLSearchParams({
      direction: filters?.direction ?? "ALL",
      type: filters?.type ?? "ALL",
      status: filters?.status ?? "ALL",
      dateRange: filters?.dateRange ?? "ALL",
    })
    if (filters?.searchTerm?.trim()) {
      params.set("searchTerm", filters.searchTerm.trim())
    }

    const res = await fetch(`/api/shop/admin/cashflow/transactions?${params.toString()}`, {
      headers: getAuthHeaders(),
    })
    return handleResponse<CashFlowTransaction[]>(res)
  },

  /**
   * Lấy KPI tổng hợp sổ quỹ (dữ liệu thực từ DB).
   * Backend: GET /api/shop/admin/cashflow/summary
   */
  async getCashFlowSummary(): Promise<CashFlowSummary> {
    const res = await fetch("/api/shop/admin/cashflow/summary", {
      headers: getAuthHeaders(),
    })
    return handleResponse<CashFlowSummary>(res)
  },

  /**
   * Duyệt thủ công giao dịch đang PENDING.
   * Backend: POST /api/shop/admin/cashflow/approve/{transactionCode}
   */
  async approveTransaction(transactionCode: string): Promise<CashFlowTransaction> {
    const res = await fetch(
      `/api/shop/admin/cashflow/approve/${encodeURIComponent(transactionCode)}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      }
    )
    return handleResponse<CashFlowTransaction>(res)
  },

  /**
   * Khởi tạo đơn mua gói cước để test luồng bắn log Realtime SSE.
   * Backend: POST /api/shop/subscription/init
   */
  async testInitSubscription(planCode: "BASIC" | "GOLD" | "PREMIUM") {
    const res = await fetch("/api/shop/subscription/init", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ planCode }),
    })
    return handleResponse<{ transactionCode: string; amountVnd: number; qrCodeUrl: string }>(res)
  },

  /**
   * Khởi tạo đơn nạp Ruby để test luồng bắn log Realtime SSE.
   * Backend: POST /api/shop/topup/init
   */
  async testInitTopup(packageCode: "SMALL" | "MEDIUM" | "LARGE") {
    const res = await fetch("/api/shop/topup/init", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ packageCode }),
    })
    return handleResponse<{ transactionCode: string; amountVnd: number; qrCodeUrl: string }>(res)
  },

  /**
   * Lấy thông tin bảng giá nạp Ruby & cấu hình cổng SePay từ backend.
   * Backend: GET /api/shop/topup/packages
   */
  async getGatewayConfig(): Promise<GatewayConfigInfo> {
    try {
      const res = await fetch("/api/shop/topup/packages", {
        headers: getAuthHeaders(),
      })
      if (res.ok) {
        const data = await res.json()
        return {
          ...GATEWAY_CONFIG,
          baseRateVndPerRuby: data.baseRateVndPerRuby ?? GATEWAY_CONFIG.baseRateVndPerRuby,
          minTopupVnd: data.minCustomTopupVnd ?? GATEWAY_CONFIG.minTopupVnd,
          minTopupRuby: data.minCustomTopupRuby ?? GATEWAY_CONFIG.minTopupRuby,
          packages: Array.isArray(data.packages) && data.packages.length > 0
            ? data.packages
            : GATEWAY_CONFIG.packages,
        }
      }
    } catch {
      // Fallback về GATEWAY_CONFIG chuẩn
    }
    return GATEWAY_CONFIG
  },

  /**
   * Lắng nghe luồng giao dịch thời gian thực qua Server-Sent Events.
   * Backend: GET /api/shop/admin/cashflow/stream
   */
  subscribeCashflowStream(
    onTransaction: (tx: CashFlowTransaction) => void,
    onStatusChange?: (status: "CONNECTING" | "CONNECTED" | "ERROR") => void
  ): () => void {
    const token = authService.getToken()
    const streamUrl = `/api/shop/admin/cashflow/stream${token ? `?token=${encodeURIComponent(token)}` : ""}`

    onStatusChange?.("CONNECTING")
    const eventSource = new EventSource(streamUrl)

    eventSource.addEventListener("INIT", () => {
      onStatusChange?.("CONNECTED")
    })

    eventSource.onopen = () => {
      onStatusChange?.("CONNECTED")
    }

    eventSource.addEventListener("CASHFLOW_UPDATE", (event: MessageEvent) => {
      try {
        const tx = JSON.parse(event.data as string) as CashFlowTransaction
        onTransaction(tx)
      } catch (err) {
        console.error("Lỗi parse SSE CASHFLOW_UPDATE:", err)
      }
    })

    eventSource.onerror = (err) => {
      console.warn("SSE Cashflow Stream ngắt kết nối:", err)
      onStatusChange?.("ERROR")
    }

    return () => {
      eventSource.close()
    }
  },

  /**
   * Xuất danh sách giao dịch ra file CSV chuẩn kế toán (UTF-8 BOM).
   */
  exportCsv(transactions: CashFlowTransaction[]) {
    const headers = [
      "Mã giao dịch",
      "Phân loại",
      "Chiều dòng tiền",
      "User ID",
      "Tên người dùng",
      "Email",
      "Số tiền VNĐ",
      "Số Ruby",
      "Phương thức TT",
      "Mã SePay Ref",
      "Trạng thái",
      "Nội dung giao dịch",
      "Thời gian tạo",
      "Thời gian hoàn tất",
    ]

    const TYPE_LABEL: Record<string, string> = {
      TOPUP_RUBY: "Nạp Ruby",
      SUBSCRIPTION_PLAN: "Gói cước",
      SHOP_PURCHASE: "Mua đồ Shop",
    }

    const rows = transactions.map((tx) => [
      tx.transactionCode,
      TYPE_LABEL[tx.type] ?? tx.type,
      tx.direction === "IN" ? "Tiền vào (Thu)" : "Tiền ra (Chi)",
      tx.userId,
      tx.userName ?? "",
      tx.userEmail ?? "",
      tx.amountVnd,
      tx.rubyAmount,
      tx.paymentMethod,
      tx.sepayReferenceCode ?? "",
      tx.status,
      tx.description,
      tx.createdAt,
      tx.completedAt ?? "",
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replaceAll('"', '""')}"`).join(","))
      .join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-cashflow-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  },
}
