import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentRepresentativeClaimProps {
  claimInfo?: string
  clamInfo?: string
}

export function PatentRepresentativeClaim({ claimInfo, clamInfo }: PatentRepresentativeClaimProps) {
  // claimInfo 또는 clamInfo 중 하나를 사용
  const claimText = claimInfo || clamInfo || ''

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-emerald-900/20 border border-emerald-200 dark:border-slate-600">
      <CardHeader className="border-b border-emerald-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허의 대표 청구항
        </CardTitle>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">특허의 핵심 기술을 정의하는 주요 청구항</p>
      </CardHeader>
      <CardContent className="pt-6">
        {claimText ? (
          <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-emerald-100 dark:border-slate-700/50">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {claimText}
            </p>
          </div>
        ) : (
          <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-emerald-100 dark:border-slate-700/50">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
              대표 청구항 정보가 없습니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
