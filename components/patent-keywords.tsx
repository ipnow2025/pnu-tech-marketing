import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentKeywordsProps {
  keywords?: string
}

export function PatentKeywords({ keywords }: PatentKeywordsProps) {
  // 키워드 문자열을 배열로 분리하고 빈 값 제거
  const keywordArray = keywords ? keywords.split('|').filter(Boolean) : []

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-slate-800 dark:to-cyan-900/20 border border-cyan-200 dark:border-slate-600">
      <CardHeader className="border-b border-cyan-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허의 핵심 키워드
        </CardTitle>
        <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-1">특허 기술의 핵심을 나타내는 주요 키워드</p>
      </CardHeader>
      <CardContent className="pt-6">
        {keywordArray.length > 0 ? (
          <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-cyan-100 dark:border-slate-700/50">
            <div className="flex flex-wrap gap-3">
              {keywordArray.map((keyword, index) => (
                <span key={index} className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium border border-cyan-200 dark:border-cyan-700/50">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-cyan-100 dark:border-slate-700/50">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
              핵심 키워드 정보가 없습니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
