import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

interface PatentFamilyProps {
  familyList?: Array<{
    idx: string
    nation: number
    type: number
    state: number
    depth: number
    parent_idx?: string
    is_pct: number
    count: number
    priority_at: number
    apply_at: number
    apply_number: string
    open_at: number
    open_number: string
    register_at: number
    register_number: string
    dp: number
    document_number?: string
  }>
}

export function PatentFamily({ familyList }: PatentFamilyProps) {
  if (!familyList || familyList.length === 0) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-violet-50 to-purple-100 dark:from-slate-800 dark:to-violet-900/20 border border-violet-200 dark:border-slate-600">
      <CardHeader className="border-b border-violet-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Family
        </CardTitle>
        <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">동일 기술의 해외 출원 및 우선권 정보</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {familyList.map((family, index) => (
            <div key={index} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 flex items-center justify-between border border-violet-100 dark:border-slate-700/50 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {family.nation === 0 ? 'KR' : 'US'}
                  </span>
                  <span className="text-sm">🇰🇷</span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-mono text-gray-800 dark:text-gray-200">
                    {family.apply_number}
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    {new Date(family.apply_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
