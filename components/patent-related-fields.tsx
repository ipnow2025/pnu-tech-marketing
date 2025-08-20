import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentRelatedFieldsProps {
  related_field?: string
}

export function PatentRelatedFields({ related_field }: PatentRelatedFieldsProps) {
  if (!related_field) {
    return null
  }

  // 파이프(|)로 구분된 연관 분야들을 배열로 변환
  const fields = related_field.split('|').filter(Boolean)

  if (fields.length === 0) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-800 dark:to-blue-900/20 border border-blue-200 dark:border-slate-600">
      <CardHeader className="border-b border-blue-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허기술과 관련된 연관 분야
        </CardTitle>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">기술적으로 연관된 분야와 응용 가능 영역</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-blue-100 dark:border-slate-700/50">
          <div className="flex flex-wrap gap-3">
            {fields.map((field, index) => (
              <div
                key={index}
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700/50 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {field}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
