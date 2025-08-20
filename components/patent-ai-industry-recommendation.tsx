import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface PatentAiIndustryTypeRecommendationProps {
  industry_type?: string
}

export function PatentAiIndustryTypeRecommendation({ industry_type }: PatentAiIndustryTypeRecommendationProps) {
  if (!industry_type) {
    return null
  }

  // 파이프(|)로 구분된 관련 분야 키워드들을 배열로 변환
  const keywords = industry_type.split('|').filter(Boolean)

  if (keywords.length === 0) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-fuchsia-50 to-pink-100 dark:from-slate-800 dark:to-fuchsia-900/20 border border-fuchsia-200 dark:border-slate-600">
      <CardHeader className="border-b border-fuchsia-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            AI가 추천하는 업종 기준
          </CardTitle>
        </div>
        <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 mt-1">인공지능이 분석한 기술 활용 가능 업종</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-fuchsia-100 dark:border-slate-700/50">
          <div className="flex items-start gap-4">
            <span className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-300 whitespace-nowrap mt-1">관련 분야 키워드:</span>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-800 dark:text-fuchsia-200 px-4 py-2 rounded-full border border-fuchsia-200 dark:border-fuchsia-700/50 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
