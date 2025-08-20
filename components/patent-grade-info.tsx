import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

interface PatentGradeInfoProps {
  sm_grade?: string
  sm_r_grade?: string
  sm_t_grade?: string
  sm_u_grade?: string
}

export function PatentGradeInfo({ sm_grade, sm_r_grade, sm_t_grade, sm_u_grade }: PatentGradeInfoProps) {
  // 등급별 색상 결정 함수
  const getGradeColor = (grade: string) => {
    if (grade === 'AAA' || grade === 'AA' || grade === 'A') return 'bg-blue-500'
    if (grade === 'BBB' || grade === 'BB' || grade === 'B') return 'bg-green-500'
    if (grade === 'CCC' || grade === 'CC' || grade === 'C') return 'bg-orange-400'
    if (grade === 'N') return 'bg-gray-500'
    return 'bg-gray-500'
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-slate-800 dark:to-amber-900/20 border border-amber-200 dark:border-slate-600">
      <CardHeader className="border-b border-amber-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            등록건에 대한 특허등급 정보
          </CardTitle>
        </div>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
          한국발명진흥회 Smart5 특허분석시스템에서 제공하는 특허 등급
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-amber-100 dark:border-slate-700/50">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">특허평가등급</span>
            <Badge className={`${getGradeColor(sm_grade || '')} text-white font-bold px-4 py-2 text-base shadow-sm`}>
              {sm_grade || '-'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">권리성 등급</span>
            <Badge className={`${getGradeColor(sm_r_grade || '')} text-white font-bold`}>
              {sm_r_grade || '-'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">기술성 등급</span>
            <Badge className={`${getGradeColor(sm_t_grade || '')} text-white font-bold`}>
              {sm_t_grade || '-'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">활용성 등급</span>
            <Badge className={`${getGradeColor(sm_u_grade || '')} text-white font-bold`}>
              {sm_u_grade || '-'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
