import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnnualFeeRecommendation() {
  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-slate-800 dark:to-teal-900/20 border border-teal-200 dark:border-slate-600">
      <CardHeader className="border-b border-teal-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          연차료 납부 추천 등급
        </CardTitle>
        <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">연차료 납부에 대한 가이드라인과 권장사항</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-teal-100 dark:border-slate-700/50">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex-shrink-0 mt-1 shadow-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">₩</span>
          </div>
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              <span className="font-semibold text-teal-700 dark:text-teal-300">연차료납부는 비용이 발생합니다.</span> 비용 절감을 위해 검토를 해 보세요.
            </p>
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              연차료 납부 추천은 단순한 참고용입니다.
            </p>
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              귀 기관의 다양한 상황을 고려하여 납부여부를 결정하시기 바랍니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
