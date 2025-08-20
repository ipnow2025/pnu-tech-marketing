import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatentBibliographicInfoProps {
  patentInfo: {
    apply_number?: string
    register_number?: string
    title?: string
    researcher?: string
    cost?: number
    payment_year?: string
    applicant_name?: string
    apply_date?: string
    register_date?: string
    nation?: number
    payment_deadline?: string
    cpc_code?: string
  }
}

export function PatentBibliographicInfo({ patentInfo }: PatentBibliographicInfoProps) {
  return (
    <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600">
      <CardHeader className="border-b border-blue-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
          서지사항
        </CardTitle>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">특허의 기본 정보와 출원/등록 현황</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="flex items-center gap-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-blue-100 dark:border-slate-700/50">
            <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex-shrink-0 shadow-sm"></span>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-28 flex-shrink-0">특허출원번호</span>
              <span className="text-gray-900 dark:text-gray-100 font-mono bg-gray-50 dark:bg-slate-700 px-3 py-1 rounded-lg">
                {patentInfo?.apply_number || '-'}
              </span>
            </div>
          </div>
         
          <div className="flex items-center gap-4 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-blue-100 dark:border-slate-700/50">
            <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex-shrink-0 shadow-sm"></span>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-28 flex-shrink-0">출원일</span>
              <span className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-700 px-3 py-1 rounded-lg">
                {patentInfo?.apply_date || '-'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">특허등록번호</span>
              <span className="truncate text-gray-900 dark:text-gray-100 font-mono">
                {patentInfo?.register_number || '-'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">등록일</span>
              <span className="truncate text-gray-900 dark:text-gray-100">
                {patentInfo?.register_date || '-'}
              </span>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>
              <div className="flex items-start gap-2 flex-1">
                <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">발명의 명칭</span>
                <span className="text-gray-900 dark:text-gray-100 break-words">
                  {patentInfo?.title || '-'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex items-start gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">발명자</span>
              <span className="text-gray-900 dark:text-gray-100 break-words">
                {patentInfo?.researcher || '-'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">연차료 금액</span>
              <span className="truncate text-gray-900 dark:text-gray-100">
                {patentInfo?.cost ? `${patentInfo.cost.toLocaleString()}원` : '-'}
                {patentInfo?.payment_year && ` (${patentInfo.payment_year}년차)`}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex items-start gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">공동출원인</span>
              <span className="text-gray-900 dark:text-gray-100 break-words">
                {patentInfo?.applicant_name || '-'}
              </span>
            </div>
          </div>
        
      
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">국가</span>
              <span className="truncate text-gray-900 dark:text-gray-100">
                {patentInfo?.nation === 0 ? '한국' : '해외'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            <div className="flex items-center justify-between gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">연차료납부 기한</span>
              <span className="truncate text-gray-900 dark:text-gray-100">
                {patentInfo?.payment_deadline || '-'}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></span>
            <div className="flex items-start gap-2 flex-1">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24 flex-shrink-0">CPC 정보</span>
              <span className="text-gray-900 dark:text-gray-100 font-mono text-xs break-words">
                {patentInfo?.cpc_code || '-'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
