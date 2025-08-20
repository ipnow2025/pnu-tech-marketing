import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentStandardIndustryClassificationProps {
  tech_class?: string
}

export function PatentStandardIndustryClassification({ tech_class }: PatentStandardIndustryClassificationProps) {
  if (!tech_class) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-lime-50 to-green-100 dark:from-slate-800 dark:to-lime-900/20 border border-lime-200 dark:border-slate-600">
      <CardHeader className="border-b border-lime-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허기술에 해당되는 산업분류 기준 업종
        </CardTitle>
        <p className="text-sm text-lime-600 dark:text-lime-400 mt-1">표준산업분류에 따른 기술 분류 및 업종 정보</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-xl border border-lime-100 dark:border-slate-700/50">
          <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {tech_class}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
