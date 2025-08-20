import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Info } from "lucide-react"

interface PatentRelatedPatentsProps {
  patentList?: Array<{
    idx: number
    apply_number: string
    sm_grade: string
    now_grade: string
    nation: string
    nation_code: string
    invention_name: string
    apply_at: number
    register_at: number
    apply_date: string
    register_date: string
    applicant: string
    register_detail: string
    claim: string
    sort: number
    payment_year: number
    cost: number
    annual_payment_deadline: number
    money_symbol: string
    beforeApplicant: string
    tear: number
  }>
}

export function PatentRelatedPatents({ patentList }: PatentRelatedPatentsProps) {
  if (!patentList || patentList.length === 0) {
    return null
  }

  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-gray-900/20 border border-slate-200 dark:border-slate-600">
      <CardHeader className="border-b border-slate-200/50 dark:border-slate-600/50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
            본 특허와 관련된 주요특허 정보
          </CardTitle>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">기술적으로 유사한 관련 특허들의 상세 정보</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">국가</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">등록번호</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">등록일</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">출원번호</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">출원일</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">발명의 명칭</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">출원인</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-medium">등급</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patentList.map((patent, index) => (
              <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <TableCell className="text-sm font-medium">
                  {patent.nation === 'KR' ? 'KR' : patent.nation}
                </TableCell>
                <TableCell className="text-sm font-mono">
                  {patent.register_date ? patent.register_detail || '-' : '-'}
                </TableCell>
                <TableCell className="text-sm">
                  {patent.register_date ? patent.register_date : '-'}
                </TableCell>
                <TableCell className="text-sm font-mono">
                  {patent.apply_number}
                </TableCell>
                <TableCell className="text-sm">
                  {patent.apply_date}
                </TableCell>
                <TableCell className="text-sm max-w-xs">
                  <div className="truncate" title={patent.invention_name}>
                    {patent.invention_name}
                  </div>
                </TableCell>
                <TableCell className="text-sm max-w-xs">
                  <div className="truncate" title={patent.applicant}>
                    {patent.applicant}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {patent.sm_grade || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  )
}
