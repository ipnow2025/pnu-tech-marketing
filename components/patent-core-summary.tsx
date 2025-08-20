import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentCoreSummaryProps {
  summary?: string
}

export function PatentCoreSummary({ summary }: PatentCoreSummaryProps) {
  if (!summary) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-rose-50 to-pink-100 dark:from-slate-800 dark:to-rose-900/20 border border-rose-200 dark:border-slate-600">
      <CardHeader className="border-b border-rose-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허기술 핵심 요약정보
        </CardTitle>
        <p className="text-sm text-rose-600 dark:text-rose-400 mt-1">특허 기술의 핵심 내용과 주요 특징</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-xl border border-rose-100 dark:border-slate-700/50">
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {summary}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
