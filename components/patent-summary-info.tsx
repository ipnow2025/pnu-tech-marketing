import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentSummaryInfoProps {
  patentInfo: {
    apply_date?: string
    register_date?: string
    payment_year?: string
    keyword?: string
    sm_grade?: string
  }
}

export function PatentSummaryInfo({ patentInfo }: PatentSummaryInfoProps) {
  // Smart5 등급 색상 계산
  const getSmart5GradeColor = (smGrade: string) => {
    if (smGrade === 'AAA' || smGrade === 'AA' || smGrade === 'A') return 'Blue'
    if (smGrade === 'BBB' || smGrade === 'BB' || smGrade === 'B') return 'Green'
    if (smGrade === 'CCC' || smGrade === 'CC' || smGrade === 'C') return 'Orange'
    if (smGrade === 'N') return 'Gray'
    return 'Red'
  }

  // IPNOW 스마트 연차료 추천 등급 계산
  const getIpnnowGrade = (smGrade: string) => {
    if (smGrade === 'AAA' || smGrade === 'AA' || smGrade === 'A') return 'Blue'
    if (smGrade === 'BBB' || smGrade === 'BB' || smGrade === 'B') return 'Green'
    if (smGrade === 'CCC' || smGrade === 'CC' || smGrade === 'C') return 'Orange'
    if (smGrade === 'N') return 'Gray'
    return 'Red'
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-800 dark:to-purple-900/20 border border-purple-200 dark:border-slate-600">
      <CardHeader className="border-b border-purple-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          본 특허관련 종합 요약정보
        </CardTitle>
        <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">특허의 핵심 정보와 등급 분석 결과</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          <li className="text-sm flex items-start gap-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-purple-100 dark:border-slate-700/50">
            <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-1 flex-shrink-0 shadow-sm"></span>
            <span className="text-gray-800 dark:text-gray-200 leading-relaxed">
              본 특허는 <span className="font-semibold text-purple-700 dark:text-purple-300">{patentInfo?.apply_date || '-'}</span>에 출원되었고 <span className="font-semibold text-purple-700 dark:text-purple-300">{patentInfo?.register_date || '-'}</span>에 등록된 특허임.
            </span>
          </li>
          <li className="text-sm flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-800 dark:text-gray-200">
              {new Date().getFullYear()}년 올해는 <span className="font-bold">{patentInfo?.payment_year || '-'}년차</span> 연차료 지급해임.
            </span>
          </li>
          <li className="text-sm flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-800 dark:text-gray-200">
              본 특허의 핵심 키워드는 {patentInfo?.keyword?.split('|').join(', ') || '-'}임
            </span>
          </li>
          <li className="text-sm flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-800 dark:text-gray-200">
              특허의 청구항의 복잡도, family의 수, 출원 경과사항, 소송이력, 기술분야등의 정보를 종합한 결과 본 특허의 SMART5 등급은{' '}
              <span className={`rounded px-2 py-1 font-bold ${
                getSmart5GradeColor(patentInfo?.sm_grade || '') === 'Blue' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : getSmart5GradeColor(patentInfo?.sm_grade || '') === 'Green'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : getSmart5GradeColor(patentInfo?.sm_grade || '') === 'Orange'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : getSmart5GradeColor(patentInfo?.sm_grade || '') === 'Gray'
                  ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {patentInfo?.sm_grade || '-'}
              </span>{' '}
              임
            </span>
          </li>
          <li className="text-sm flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-800 dark:text-gray-200">
              본 특허에 대한 IPNOW 스마트 연차료 추천 등급은{' '}
              <span className={`rounded px-2 py-1 font-bold ${
                getIpnnowGrade(patentInfo?.sm_grade || '') === 'Blue' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : getIpnnowGrade(patentInfo?.sm_grade || '') === 'Green'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : getIpnnowGrade(patentInfo?.sm_grade || '') === 'Orange'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  : getIpnnowGrade(patentInfo?.sm_grade || '') === 'Gray'
                  ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
              }`}>
                {getIpnnowGrade(patentInfo?.sm_grade || '')}
              </span>{' '}
              등급임
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
