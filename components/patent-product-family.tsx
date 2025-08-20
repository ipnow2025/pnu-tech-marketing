import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface PatentProductFamilyProps {
  alliedProducts?: string
}

export function PatentProductFamily({ alliedProducts }: PatentProductFamilyProps) {
  if (!alliedProducts) {
    return null
  }

  // 파이프(|)로 구분된 제품들을 배열로 변환
  const products = alliedProducts.split('|').filter(Boolean)

  if (products.length === 0) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-orange-50 to-amber-100 dark:from-slate-800 dark:to-orange-900/20 border border-orange-200 dark:border-slate-600">
      <CardHeader className="border-b border-orange-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            본 특허기술을 활용한 제품군
          </CardTitle>
        </div>
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">특허 기술이 적용된 다양한 제품과 서비스</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-orange-100 dark:border-slate-700/50">
          <div className="flex flex-wrap gap-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-700/50 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {product}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
