import { authService } from "./authService"

export type CashFlowType = "TOPUP_RUBY" | "SUBSCRIPTION_PLAN" | "SHOP_PURCHASE" | "REFUND"
export type FlowDirection = "IN" | "OUT"
export type CashFlowStatus = "SUCCESS" | "PENDING" | "FAILED" | "REFUNDED"

export interface CashFlowTransaction {
  id: string | number
  transactionCode: string // Ví dụ: PENTAVA849201
  type: CashFlowType
  direction: FlowDirection // "IN" (Tiền vào) | "OUT" (Tiền ra / Tiêu thụ)
  amountVnd: number
  rubyAmount: number
  userId: number
  userName?: string
  userEmail?: string
  status: CashFlowStatus
  paymentMethod: string // "SEPAY" | "RUBY_WALLET" | "MANUAL"
  bankCode?: string // "MBBank"
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
  rubyMinted: number // Tổng Ruby đã nạp vào
  rubySpent: number // Tổng Ruby đã tiêu dùng
  rubyCirculating: number // Lượng Ruby còn trong ví người dùng
  conversionRate: number // % đơn thành công
  revenueBySource: {
    rubyTopupVnd: number
    subscriptionVnd: number
  }
}

export interface GatewayConfigInfo {
  bankCode: string
  accountNumber: string
  accountName: string
  baseRateVndPerRuby: number
  minTopupVnd: number
  minTopupRuby: number
  webhookUrl: string
  packages: Array<{
    code: string
    name: string
    rubyAmount: number
    priceVnd: number
    bonusRuby: number
    description: string
    isPopular: boolean
    isBestValue: boolean
  }>
}

export interface CashFlowFilters {
  direction?: "ALL" | "IN" | "OUT"
  type?: "ALL" | CashFlowType
  status?: "ALL" | CashFlowStatus
  searchTerm?: string
  dateRange?: "ALL" | "TODAY" | "7DAYS" | "30DAYS"
}

// Danh sách mock ban đầu phong phú, bám sát nghiệp vụ thực tế của Pentava Backend
const INITIAL_TRANSACTIONS: CashFlowTransaction[] = [
  {
    id: "tx-101",
    transactionCode: "PENTAVA892101",
    type: "TOPUP_RUBY",
    direction: "IN",
    amountVnd: 220000,
    rubyAmount: 120,
    userId: 1,
    userName: "Đặng Thanh Hải",
    userEmail: "haidang@pentava.online",
    status: "SUCCESS",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    sepayReferenceCode: "MBB.20261011.892101",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=220000&des=PENTAVA892101&template=compact",
    description: "Nạp Medium Pack (120 Ruby = 220.000 VNĐ)",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
  },
  {
    id: "tx-102",
    transactionCode: "PENTAVA651290",
    type: "SUBSCRIPTION_PLAN",
    direction: "IN",
    amountVnd: 199000,
    rubyAmount: 0,
    userId: 2,
    userName: "Vũ Thái An",
    userEmail: "anvt@pentava.online",
    status: "SUCCESS",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    sepayReferenceCode: "MBB.20261011.651290",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=199000&des=PENTAVA651290&template=compact",
    description: "Đăng ký Gói PREMIUM (199.000 VNĐ / 30 ngày)",
    itemDetails: {
      planCode: "PREMIUM",
      durationDays: 30,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
  },
  {
    id: "tx-103",
    transactionCode: "PENTAVA774219",
    type: "TOPUP_RUBY",
    direction: "IN",
    amountVnd: 100000,
    rubyAmount: 50,
    userId: 3,
    userName: "Nguyễn Anh Khoa",
    userEmail: "khoana@pentava.online",
    status: "PENDING",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=100000&des=PENTAVA774219&template=compact",
    description: "Nạp Small Pack (50 Ruby = 100.000 VNĐ) - Đang chờ quét QR",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    completedAt: null,
  },
  {
    id: "tx-104",
    transactionCode: "PENTAVA318204",
    type: "SHOP_PURCHASE",
    direction: "OUT",
    amountVnd: 0,
    rubyAmount: 40,
    userId: 1,
    userName: "Đặng Thanh Hải",
    userEmail: "haidang@pentava.online",
    status: "SUCCESS",
    paymentMethod: "RUBY_WALLET",
    description: "Mua skin [Mũ nồi thám tử] trong Shop bằng Ruby",
    itemDetails: {
      itemName: "Mũ nồi thám tử",
      itemCode: "detective_hat",
      slot: "HEAD",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "tx-105",
    transactionCode: "PENTAVA991823",
    type: "SUBSCRIPTION_PLAN",
    direction: "IN",
    amountVnd: 99000,
    rubyAmount: 0,
    userId: 4,
    userName: "Trần Minh Quang",
    userEmail: "quangtm@pentava.online",
    status: "SUCCESS",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    sepayReferenceCode: "MBB.20261011.991823",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=99000&des=PENTAVA991823&template=compact",
    description: "Đăng ký Gói GOLD (99.000 VNĐ / 30 ngày)",
    itemDetails: {
      planCode: "GOLD",
      durationDays: 30,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 119).toISOString(),
  },
  {
    id: "tx-106",
    transactionCode: "PENTAVA441092",
    type: "TOPUP_RUBY",
    direction: "IN",
    amountVnd: 540000,
    rubyAmount: 300,
    userId: 5,
    userName: "Lê Hoàng Phúc",
    userEmail: "phuclh@pentava.online",
    status: "SUCCESS",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    sepayReferenceCode: "MBB.20261010.441092",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=540000&des=PENTAVA441092&template=compact",
    description: "Nạp Large Pack (300 Ruby = 540.000 VNĐ)",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 20 + 45000).toISOString(),
  },
  {
    id: "tx-107",
    transactionCode: "PENTAVA102938",
    type: "SHOP_PURCHASE",
    direction: "OUT",
    amountVnd: 0,
    rubyAmount: 20,
    userId: 5,
    userName: "Lê Hoàng Phúc",
    userEmail: "phuclh@pentava.online",
    status: "SUCCESS",
    paymentMethod: "RUBY_WALLET",
    description: "Mua skin [Khăn quàng vàng] trong Shop bằng Ruby",
    itemDetails: {
      itemName: "Khăn quàng vàng",
      itemCode: "yellow_scarf",
      slot: "NECK",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "tx-108",
    transactionCode: "PENTAVA559281",
    type: "TOPUP_RUBY",
    direction: "IN",
    amountVnd: 60000,
    rubyAmount: 30,
    userId: 6,
    userName: "Hoàng Thùy Linh",
    userEmail: "linhht@pentava.online",
    status: "PENDING",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=60000&des=PENTAVA559281&template=compact",
    description: "Nạp lẻ 30 Ruby = 60.000 VNĐ (Chờ chuyển khoản)",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    completedAt: null,
  },
  {
    id: "tx-109",
    transactionCode: "PENTAVA882190",
    type: "SUBSCRIPTION_PLAN",
    direction: "IN",
    amountVnd: 49000,
    rubyAmount: 0,
    userId: 7,
    userName: "Phạm Quốc Dũng",
    userEmail: "dungpq@pentava.online",
    status: "SUCCESS",
    paymentMethod: "SEPAY",
    bankCode: "MBBank",
    accountNumber: "0123456789",
    accountName: "PENTAVA",
    sepayReferenceCode: "MBB.20261009.882190",
    qrCodeUrl: "https://qr.sepay.vn/img?acc=0123456789&bank=MBBank&amount=49000&des=PENTAVA882190&template=compact",
    description: "Đăng ký Gói BASIC (49.000 VNĐ / 30 ngày)",
    itemDetails: {
      planCode: "BASIC",
      durationDays: 30,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48 + 30000).toISOString(),
  },
  {
    id: "tx-110",
    transactionCode: "PENTAVA201948",
    type: "SHOP_PURCHASE",
    direction: "OUT",
    amountVnd: 0,
    rubyAmount: 50,
    userId: 2,
    userName: "Vũ Thái An",
    userEmail: "anvt@pentava.online",
    status: "SUCCESS",
    paymentMethod: "RUBY_WALLET",
    description: "Mua skin [Kính cận tri thức] trong Shop bằng Ruby",
    itemDetails: {
      itemName: "Kính cận tri thức",
      itemCode: "nerd_glasses",
      slot: "EYES",
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
]

// Lưu trữ in-memory trong phiên chạy để các hành động Duyệt thủ công, thêm mới phản hồi ngay lập tức
let transactionsStore: CashFlowTransaction[] = [...INITIAL_TRANSACTIONS]

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

export const adminCashflowService = {
  /**
   * Lấy thông tin cấu hình cổng SePay và chính sách tỷ giá hiện tại
   */
  async getGatewayConfig(): Promise<GatewayConfigInfo> {
    try {
      const response = await fetch("/api/shop/topup/packages", {
        headers: getAuthHeaders(),
      })
      if (response.ok) {
        const data = await response.json()
        return {
          bankCode: "MBBank",
          accountNumber: "0123456789",
          accountName: "PENTAVA",
          baseRateVndPerRuby: data.baseRateVndPerRuby || 2000,
          minTopupVnd: data.minCustomTopupVnd || 20000,
          minTopupRuby: data.minCustomTopupRuby || 10,
          webhookUrl: "https://pentava.online/api/shop/webhook/sepay",
          packages: data.packages || [],
        }
      }
    } catch {
      // Fallback khi chạy độc lập
    }

    return {
      bankCode: "MBBank",
      accountNumber: "0123456789",
      accountName: "PENTAVA",
      baseRateVndPerRuby: 2000,
      minTopupVnd: 20000,
      minTopupRuby: 10,
      webhookUrl: "https://pentava.online/api/shop/webhook/sepay",
      packages: [
        {
          code: "SMALL",
          name: "Small Pack",
          rubyAmount: 50,
          priceVnd: 100000,
          bonusRuby: 0,
          description: "Small Pack (50 ruby) = 100.000 VNĐ",
          isPopular: false,
          isBestValue: false,
        },
        {
          code: "MEDIUM",
          name: "Medium Pack",
          rubyAmount: 120,
          priceVnd: 220000,
          bonusRuby: 10,
          description: "Medium Pack (120 ruby) = 220.000 VNĐ (Tặng 10 Ruby)",
          isPopular: true,
          isBestValue: false,
        },
        {
          code: "LARGE",
          name: "Large Pack",
          rubyAmount: 300,
          priceVnd: 540000,
          bonusRuby: 30,
          description: "Large Pack (300 ruby) = 540.000 VNĐ (Tặng 30 Ruby)",
          isPopular: false,
          isBestValue: true,
        },
      ],
    }
  },

  /**
   * Lấy danh sách giao dịch có hỗ trợ bộ lọc và tìm kiếm từ Backend API
   */
  async getTransactions(filters?: CashFlowFilters): Promise<CashFlowTransaction[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.direction && filters.direction !== "ALL") params.append("direction", filters.direction)
      if (filters?.type && filters.type !== "ALL") params.append("type", filters.type)
      if (filters?.status && filters.status !== "ALL") params.append("status", filters.status)
      if (filters?.searchTerm && filters.searchTerm.trim()) params.append("searchTerm", filters.searchTerm.trim())
      if (filters?.dateRange && filters.dateRange !== "ALL") params.append("dateRange", filters.dateRange)

      const url = `/api/shop/admin/cashflow/transactions${params.toString() ? `?${params.toString()}` : ""}`
      const response = await fetch(url, {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          transactionsStore = data
          return data
        }
      }
    } catch {
      // Fallback khi backend chưa khởi động
    }

    let list = [...transactionsStore]

    if (!filters) {
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    if (filters.direction && filters.direction !== "ALL") {
      list = list.filter((item) => item.direction === filters.direction)
    }

    if (filters.type && filters.type !== "ALL") {
      list = list.filter((item) => item.type === filters.type)
    }

    if (filters.status && filters.status !== "ALL") {
      list = list.filter((item) => item.status === filters.status)
    }

    if (filters.searchTerm) {
      const q = filters.searchTerm.trim().toLowerCase()
      list = list.filter(
        (item) =>
          item.transactionCode.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.userName && item.userName.toLowerCase().includes(q)) ||
          (item.userEmail && item.userEmail.toLowerCase().includes(q)) ||
          (item.sepayReferenceCode && item.sepayReferenceCode.toLowerCase().includes(q)) ||
          String(item.userId) === q
      )
    }

    if (filters.dateRange && filters.dateRange !== "ALL") {
      const now = Date.now()
      if (filters.dateRange === "TODAY") {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)
        list = list.filter((item) => new Date(item.createdAt).getTime() >= startOfDay.getTime())
      } else if (filters.dateRange === "7DAYS") {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
        list = list.filter((item) => new Date(item.createdAt).getTime() >= sevenDaysAgo)
      } else if (filters.dateRange === "30DAYS") {
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
        list = list.filter((item) => new Date(item.createdAt).getTime() >= thirtyDaysAgo)
      }
    }

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  /**
   * Tính toán các chỉ số tổng quan sổ quỹ & KPI dòng tiền từ Backend API
   */
  async getCashFlowSummary(): Promise<CashFlowSummary> {
    try {
      const response = await fetch("/api/shop/admin/cashflow/summary", {
        headers: getAuthHeaders(),
      })
      if (response.ok) {
        const data = await response.json()
        return data as CashFlowSummary
      }
    } catch {
      // Fallback tính toán từ local store
    }

    const list = transactionsStore

    let totalRevenueVnd = 0
    let todayRevenueVnd = 0
    let pendingRevenueVnd = 0
    let successCount = 0
    let pendingCount = 0
    let failedCount = 0
    let rubyTopupVnd = 0
    let subscriptionVnd = 0
    let rubyMinted = 0
    let rubySpent = 0

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const startOfTodayMs = startOfToday.getTime()

    for (const item of list) {
      const itemTime = new Date(item.createdAt).getTime()

      if (item.status === "SUCCESS") {
        successCount++
        if (item.direction === "IN") {
          totalRevenueVnd += item.amountVnd
          if (itemTime >= startOfTodayMs) {
            todayRevenueVnd += item.amountVnd
          }
          if (item.type === "TOPUP_RUBY") {
            rubyTopupVnd += item.amountVnd
            rubyMinted += item.rubyAmount
          } else if (item.type === "SUBSCRIPTION_PLAN") {
            subscriptionVnd += item.amountVnd
          }
        } else if (item.direction === "OUT") {
          if (item.type === "SHOP_PURCHASE") {
            rubySpent += item.rubyAmount
          }
        }
      } else if (item.status === "PENDING") {
        pendingCount++
        if (item.direction === "IN") {
          pendingRevenueVnd += item.amountVnd
        }
      } else if (item.status === "FAILED") {
        failedCount++
      }
    }

    const totalInflowAttempts = successCount + pendingCount + failedCount
    const conversionRate = totalInflowAttempts > 0 ? Math.round((successCount / totalInflowAttempts) * 1000) / 10 : 100

    return {
      totalRevenueVnd,
      todayRevenueVnd,
      pendingRevenueVnd,
      totalTransactions: list.length,
      successCount,
      pendingCount,
      failedCount,
      rubyMinted,
      rubySpent,
      rubyCirculating: Math.max(0, rubyMinted - rubySpent),
      conversionRate,
      revenueBySource: {
        rubyTopupVnd,
        subscriptionVnd,
      },
    }
  },

  /**
   * Duyệt thủ công hoặc kích hoạt mock-confirm một giao dịch đang PENDING
   */
  async approveTransaction(transactionCode: string): Promise<CashFlowTransaction> {
    try {
      const response = await fetch(`/api/shop/admin/cashflow/approve/${encodeURIComponent(transactionCode)}`, {
        method: "POST",
        headers: getAuthHeaders(),
      })
      if (response.ok) {
        const updated = await response.json()
        transactionsStore = transactionsStore.map((t) =>
          t.transactionCode === updated.transactionCode ? updated : t
        )
        return updated as CashFlowTransaction
      }
    } catch {
      // Fallback local approve
    }

    const tx = transactionsStore.find(
      (item) => item.transactionCode.toUpperCase() === transactionCode.trim().toUpperCase()
    )

    if (!tx) {
      throw new Error(`Không tìm thấy mã giao dịch: ${transactionCode}`)
    }

    if (tx.status === "SUCCESS") {
      return tx
    }

    // Thử gọi backend endpoint mock-confirm tương ứng nếu kết nối được
    try {
      if (tx.type === "TOPUP_RUBY") {
        await fetch(`/api/shop/topup/mock-confirm/${encodeURIComponent(tx.transactionCode)}`, {
          method: "POST",
          headers: getAuthHeaders(),
        })
      } else if (tx.type === "SUBSCRIPTION_PLAN") {
        await fetch(`/api/shop/subscription/mock-confirm/${encodeURIComponent(tx.transactionCode)}`, {
          method: "POST",
          headers: getAuthHeaders(),
        })
      }
    } catch {
      // Backend offline hoặc proxy lỗi, tiếp tục cập nhật store local
    }

    // Cập nhật trạng thái trong store
    tx.status = "SUCCESS"
    tx.completedAt = new Date().toISOString()
    tx.sepayReferenceCode = `MBB.MANUAL.${Math.floor(100000 + Math.random() * 900000)}`

    return { ...tx }
  },

  /**
   * Lắng nghe luồng dữ liệu thanh toán thời gian thực Server-Sent Events (SSE)
   * Trả về hàm cleanup () => void để ngắt kết nối khi rời trang
   */
  subscribeCashflowStream(
    onTransaction: (tx: CashFlowTransaction) => void,
    onStatusChange?: (status: "CONNECTING" | "CONNECTED" | "ERROR") => void
  ): () => void {
    const token = authService.getToken()
    const streamUrl = `/api/shop/admin/cashflow/stream${token ? `?token=${encodeURIComponent(token)}` : ""}`

    onStatusChange?.("CONNECTING")
    const eventSource = new EventSource(streamUrl)

    eventSource.onopen = () => {
      onStatusChange?.("CONNECTED")
    }

    eventSource.addEventListener("CASHFLOW_UPDATE", (event: MessageEvent) => {
      try {
        const tx = JSON.parse(event.data) as CashFlowTransaction
        const index = transactionsStore.findIndex((t) => t.transactionCode === tx.transactionCode)
        if (index >= 0) {
          transactionsStore[index] = tx
        } else {
          transactionsStore.unshift(tx)
        }
        onTransaction(tx)
      } catch (err) {
        console.error("Lỗi parse dữ liệu SSE Cashflow:", err)
      }
    })

    eventSource.addEventListener("INIT", () => {
      onStatusChange?.("CONNECTED")
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
   * Xuất danh sách giao dịch sang file CSV chuẩn định dạng kế toán
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

    const rows = transactions.map((tx) => [
      tx.transactionCode,
      tx.type === "TOPUP_RUBY"
        ? "Nạp Ruby"
        : tx.type === "SUBSCRIPTION_PLAN"
          ? "Gói cước"
          : tx.type === "SHOP_PURCHASE"
            ? "Mua đồ Shop"
            : "Hoàn tiền",
      tx.direction === "IN" ? "Tiền vào (Thu)" : "Tiền ra (Chi)",
      tx.userId,
      tx.userName || "",
      tx.userEmail || "",
      tx.amountVnd,
      tx.rubyAmount,
      tx.paymentMethod,
      tx.sepayReferenceCode || "",
      tx.status,
      tx.description,
      tx.createdAt,
      tx.completedAt || "",
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replaceAll('"', '""')}"`).join(","))
      .join("\n")

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pentava-cashflow-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  },
}
