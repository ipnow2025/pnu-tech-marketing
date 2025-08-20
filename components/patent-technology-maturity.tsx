import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface PatentTechnologyMaturityProps {
  trlInfo?: string
}

export function PatentTechnologyMaturity({ trlInfo }: PatentTechnologyMaturityProps) {
  if (!trlInfo) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-800 dark:to-indigo-900/20 border border-indigo-200 dark:border-slate-600">
      <CardHeader className="border-b border-indigo-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            본 특허기술의 기술 성숙도
          </CardTitle>
        </div>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">기술의 개발 단계와 상용화 수준</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-xl border border-indigo-100 dark:border-slate-700/50">
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {trlInfo}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
