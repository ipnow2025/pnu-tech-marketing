import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface PatentDomesticMarketProps {
  marketInfo?: string
}

export function PatentDomesticMarket({ marketInfo }: PatentDomesticMarketProps) {
  if (!marketInfo) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-800 dark:to-green-900/20 border border-green-200 dark:border-slate-600">
      <CardHeader className="border-b border-green-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            본 특허기술이 이용되는 국내 시장 정보
          </CardTitle>
        </div>
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">국내 시장에서의 기술 활용 현황과 시장성</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-xl border border-green-100 dark:border-slate-700/50">
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {marketInfo}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
