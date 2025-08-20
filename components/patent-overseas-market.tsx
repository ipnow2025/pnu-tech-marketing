import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface PatentOverseasMarketProps {
  forMarketInfo?: string
}

export function PatentOverseasMarket({ forMarketInfo }: PatentOverseasMarketProps) {
  if (!forMarketInfo) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-800 dark:to-sky-900/20 border border-sky-200 dark:border-slate-600">
      <CardHeader className="border-b border-sky-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            본 특허기술이 이용되는 해외 시장 정보
          </CardTitle>
        </div>
        <p className="text-sm text-sky-600 dark:text-sky-400 mt-1">해외 시장에서의 기술 활용 현황과 글로벌 시장성</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-xl border border-sky-100 dark:border-slate-700/50">
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {forMarketInfo}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
