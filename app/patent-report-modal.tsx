"use client"

import { useState, useEffect, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, FileText, BarChart3, TrendingUp, X } from "lucide-react"
import { PatentBibliographicInfo } from "@/components/patent-bibliographic-info"
import { PatentSummaryInfo } from "@/components/patent-summary-info"
import { PatentRepresentativeClaim } from "@/components/patent-representative-claim"
import { PatentGradeInfo } from "@/components/patent-grade-info"
import { PatentKeywords } from "@/components/patent-keywords"
import { AnnualFeeRecommendation } from "@/components/annual-fee-recommendation"
import { PatentFamily } from "@/components/patent-family"
import { PatentCoreSummary } from "@/components/patent-core-summary"
import { PatentDomesticMarket } from "@/components/patent-domestic-market"
import { PatentOverseasMarket } from "@/components/patent-overseas-market"
import { PatentProductFamily } from "@/components/patent-product-family"
import { PatentTechnologyMaturity } from "@/components/patent-technology-maturity"
import { PatentStandardIndustryClassification } from "@/components/patent-industry-classification"
import { PatentAiIndustryTypeRecommendation } from "@/components/patent-ai-industry-recommendation"
import { PatentRelatedFields } from "@/components/patent-related-fields"
import { PatentRelatedPatents } from "@/components/patent-related-patents"
import { PatentRelatedPatentsAnalysis } from "@/components/patent-related-patents-analysis"
// import { apiFetch } from "@/lib/func"
import type { Patent } from "./patent-types"
// import { ApiPatentNumberWithCountry } from "@/components/ui/country-badge"
// import { PatentStatusBadge } from "@/components/ui/patent-status-badge"

interface PatentReportModalProps {
  isOpen: boolean
  onClose: () => void
  patent: Patent | null
}

interface PatentReport {
  patentInfo: {
    idx: string
    apply_date: string
    apply_number: string
    family: number
    company_idx: string
    register_date?: string
    register_number?: string
    invention_name?: string
    title: string
    researcher: string
    payment_year: string
    sm_grade: string
    now_grade: string
    related_field: string
    signal: number
    payment_deadline: string
    cost: number
    sm_r_grade: string
    sm_t_grade: string
    sm_u_grade: string
    summary: string
    report_idx: number
    market_info: string
    allied_products: string
    keyword: string
    for_market_info: string
    allied_company: string
    allied_for_company: string
    trl_info: string
    tech_class: string
    industry_type: string
    nation: number
    ipc_code: string
    cpc_code: string
    clam_info: string
    years_since: number
    applicant_name?: string
    is_patentdetail: boolean
    clamInfo: string
    familyList: Array<{
      idx: string
      nation: number
      type: number
      state: number
      depth: number
      parent_idx?: string
      is_pct: number
      count: number
      priority_at: number
      apply_at: number
      apply_number: string
      open_at: number
      open_number: string
      register_at: number
      register_number: string
      dp: number
      document_number?: string
    }>
  }
  keyWordSearch: {
    page: number
    count: number
    total_count: number
    last: number
    survey_analysis: {
      data: {
        text_obj: {
          applicant_count_text: string
          count_of_year_text: string
          ipc_text: string
          applicant_ipc_text: string
          applicant_year_count_text: string
          patent_grade_text: string
        }
        newSurvey: {
          patentCntInfo: {
            apply_cnt: number
            register_cnt: number
            give_up_cnt: number
            all: number
          }
          annualPayList: Array<{
            year: number
            cost: number
          }>
          annualApplyCnt: Record<string, { cnt: number }>
          annualRegisterCnt: Record<string, { cnt: number }>
          patentBiblioIdxList: {
            kr: number[]
            us: number[]
          }
        }
        company_list: {
          items: Array<{
            idx: string
            name: string
            quantity: string
            quality: string
            total: string
            ipc_info: Record<string, { cnt: number }>
            tear: number
          }>
        }
        patent_list: {
          items: Array<{
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
        applicant_count: {
          items: Array<{
            apply_cnt: number
            register_cnt: number
            related_people_code: string
            name: string
            nation_name: string
          }>
        }
        number_of_year: {
          items: Array<{
            year: number
            apply_count: number
            register_count: number
            f_apply_count: number
            f_register_count: number
          }>
        }
        ipc_number: {
          items: Array<{
            ipc_code: string
            cnt: number
          }>
        }
        patent_grade_info: {
          items: Array<{
            sm_grade: string
            cnt: number
            tear: number
          }>
        }
        total_count: number
      }
    }
    items: Array<{
      sm_grade: string
      now_grade: string
      nation: string
      invention_name: string
      apply_at: string
      apply_number: string
      register_at: string
      register_number: string
      applicant: string
      document_number: string
      tear: number
      matchRate: number
    }>
    patentApplyNumberList: any[]
    keyword_idx: number
  }
  analysis: {
    data: {
      text_obj: {
        applicant_count_text: string
        count_of_year_text: string
        ipc_text: string
        applicant_ipc_text: string
        applicant_year_count_text: string
        patent_grade_text: string
      }
      newSurvey: {
        patentCntInfo: {
          apply_cnt: number
          register_cnt: number
          give_up_cnt: number
          all: number
        }
        annualPayList: Array<{
          year: number
          cost: number
        }>
        annualApplyCnt: Record<string, { cnt: number }>
        annualRegisterCnt: Record<string, { cnt: number }>
        patentBiblioIdxList: {
          kr: number[]
          us: number[]
        }
      }
      company_list: {
        items: Array<{
          idx: string
          name: string
          quantity: string
          quality: string
          total: string
          ipc_info: Record<string, { cnt: number }>
          tear: number
        }>
      }
      patent_list: {
        items: Array<{
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
      applicant_count: {
        items: Array<{
          apply_cnt: number
          register_cnt: number
          related_people_code: string
          name: string
          nation_name: string
        }>
      }
      number_of_year: {
        items: Array<{
          year: number
          apply_count: number
          register_count: number
          f_apply_count: number
          f_register_count: number
        }>
      }
      ipc_number: {
        items: Array<{
          ipc_code: string
          cnt: number
        }>
      }
      patent_grade_info: {
        items: Array<{
          sm_grade: string
          cnt: number
          tear: number
        }>
      }
      total_count: number
    }
  }
  strPatentSummery: string
  mi: any
  strCpcInfo: string
  flag: string
  resultCode: string
}

export function PatentReportModal({ isOpen, onClose, patent }: PatentReportModalProps) {
  const [report, setReport] = useState<PatentReport | null>(null)
  const [loading, setLoading] = useState(false)


  // 기본 빈 보고서 구조
  const getEmptyReport = (): PatentReport => ({
    patentInfo: {
      idx: '',
      apply_date: '',
      apply_number: '',
      family: 0,
      company_idx: '',
      title: '',
      researcher: '',
      payment_year: '',
      sm_grade: '',
      now_grade: '',
      related_field: '',
      signal: 0,
      payment_deadline: '',
      cost: 0,
      sm_r_grade: '',
      sm_t_grade: '',
      sm_u_grade: '',
      summary: '',
      report_idx: 0,
      market_info: '',
      allied_products: '',
      keyword: '',
      for_market_info: '',
      allied_company: '',
      allied_for_company: '',
      trl_info: '',
      tech_class: '',
      industry_type: '',
      nation: 0,
      ipc_code: '',
      cpc_code: '',
      clam_info: '',
      years_since: 0,
      is_patentdetail: false,
      clamInfo: '',
      familyList: []
    },
    keyWordSearch: {
      page: 0,
      count: 0,
      total_count: 0,
      last: 0,
      survey_analysis: {
        data: {
          text_obj: {
            applicant_count_text: '',
            count_of_year_text: '',
            ipc_text: '',
            applicant_ipc_text: '',
            applicant_year_count_text: '',
            patent_grade_text: ''
          },
          newSurvey: {
            patentCntInfo: { apply_cnt: 0, register_cnt: 0, give_up_cnt: 0, all: 0 },
            annualPayList: [],
            annualApplyCnt: {},
            annualRegisterCnt: {},
            patentBiblioIdxList: { kr: [], us: [] }
          },
          company_list: { items: [] },
          patent_list: { items: [] },
          applicant_count: { items: [] },
          number_of_year: { items: [] },
          ipc_number: { items: [] },
          patent_grade_info: { items: [] },
          total_count: 0
        }
      },
      items: [],
      patentApplyNumberList: [],
      keyword_idx: 0
    },
    analysis: {
      data: {
        text_obj: {
          applicant_count_text: '',
          count_of_year_text: '',
          ipc_text: '',
          applicant_ipc_text: '',
          applicant_year_count_text: '',
          patent_grade_text: ''
        },
        newSurvey: {
          patentCntInfo: { apply_cnt: 0, register_cnt: 0, give_up_cnt: 0, all: 0 },
          annualPayList: [],
          annualApplyCnt: {},
          annualRegisterCnt: {},
          patentBiblioIdxList: { kr: [], us: [] }
        },
        company_list: { items: [] },
        patent_list: { items: [] },
        applicant_count: { items: [] },
        number_of_year: { items: [] },
        ipc_number: { items: [] },
        patent_grade_info: { items: [] },
        total_count: 0
      }
    },
    strPatentSummery: '',
    mi: {},
    strCpcInfo: '',
    flag: '',
    resultCode: ''
  })

  useEffect(() => {
    if (isOpen && patent) {
      const patentInfo = (patent as any)?.patentInfo || (patent as any)
      loadPatentReport(patentInfo?.idx || '')
    }
  }, [isOpen, patent])

  const loadPatentReport = async (patentId: string) => {
    setLoading(true)
    try {
      // patentInfo 객체에서 데이터 추출
      const patentInfo = (patent as any)?.patentInfo || (patent as any)
      const nation = patentInfo?.nation === 0 ? 'KR' : (patentInfo?.countryCode || 'KR')
      const rawApplicationNumber = patentInfo?.apply_number || patentInfo?.applicationNumber || ''
      const applicationNumber = rawApplicationNumber.replace(/[^0-9-]/g, '')
      const url = `https://biznavi.co.kr/api/v1/common/patent/report/dummyPatentReportView?report_idx=${patentInfo?.gpt_idx || 904}&nation=${nation}&apply_number=${applicationNumber}&idx=${patentInfo?.idx || patentInfo?.idx || patentId}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0",
          "x-token": "7d19d75cd5a940a956f6b787ef66b479:15a46d68b7313e541e4c80984e12070e209af7df617badfd6d6aa78560a68cb28ce32cc8b6fd479789850c5420bc0372532b6b4706b12a30f8ffe7c399961c2480c129045cad6d51110459ff622192da4ef7085ffddec730e5d35a420809952bf00d399427f85ba85a2defa0d652009c6022311d8a64e4d6708298f39d215f4d65ad73d95438118e68b26e2bcc3d9411d84a4bbbd05dfbd21d12672e79221c0e78de93f51bf5d7c86e05aae823a2503029c5aa7b6c0eb1b7408f17fcb893067207f40b4fa968f60d3688fcabf4a8b3d47310e4ab1ada96cd55717646b54ad7b8dee1b7a57909299568a789be893a8382952cfcebcd8a6b3c084ce8b3e5a42270049524c645035492860d0d10b8019a7092a923d5e71ef9fb5ae0e702c47e67f6f1d3a070aef54d99b97cdf504dd68ff757f11361f839e6742c3b8968b56ba12e70ed46df1aeb3d8febd9dea27ef24f78",
          "gwtoken": "LMscLs38OgpeA+5gbyYOL2KNR1vQErLl+TxPbWPzBX6uHTavt6LsDlrrbPanQtFyfYUEwsqp3gCKGRDdqZouDbuxM76uL9/jzNWng0c6rJeCzPmONzOpwMCwqT6bwzHYP4v3xfZqRLl9+NTeoczQuUBCpRVJ6zAdcXkbIdhNaKafdfAOz+yYUrPNvGmRna10O94WBZjiRLSprqAHcOyZbIy7HONs9CQ8NIqdG7qxIggk6K7pe6u7cVaRUcb1iZAWZK84rkxiRZ9YksKhLsnPIKSMrXKnhHmyLw2p2/z7cTcu0p4mh7YdpAuxWQMUA+nDw1WirA+3bAVafcyH1qBHQ8i9m5BLcJrqv1syAyg2tmxy5WphCaH48h9Jx1LPNWafgvbXUhm+Mu6k+eUrys9PHndaFyEy4cAkmPfZcqRUvokqmJ3OILtAv28R5Z77JIxix4dsnz5sbbdaTPcj1YuCVTjZe6gpXztJhUlohDu61UreSBsA6e7ENqAXpCHUL0ktKNem7beaF7i7YavDESNxQ==",
        }
      })
      const data = await response.json()

      if (response.ok) {
        // 기본값을 설정하여 undefined 오류 방지
        const safeReport: PatentReport = {
          patentInfo: data.patentInfo || {
            idx: '',
            apply_date: '',
            apply_number: '',
            family: 0,
            company_idx: '',
            title: '',
            researcher: '',
            payment_year: '',
            sm_grade: '',
            now_grade: '',
            related_field: '',
            signal: 0,
            payment_deadline: '',
            cost: 0,
            sm_r_grade: '',
            sm_t_grade: '',
            sm_u_grade: '',
            summary: '',
            report_idx: 0,
            market_info: '',
            allied_products: '',
            keyword: '',
            for_market_info: '',
            allied_company: '',
            allied_for_company: '',
            trl_info: '',
            tech_class: '',
            industry_type: '',
            nation: 0,
            ipc_code: '',
            cpc_code: '',
            clam_info: '',
            years_since: 0,
            is_patentdetail: false,
            clamInfo: '',
            familyList: []
          },
          keyWordSearch: data.keyWordSearch || {
            page: 0,
            count: 0,
            total_count: 0,
            last: 0,
            survey_analysis: {
              data: {
                text_obj: {
                  applicant_count_text: '',
                  count_of_year_text: '',
                  ipc_text: '',
                  applicant_ipc_text: '',
                  applicant_year_count_text: '',
                  patent_grade_text: ''
                },
                newSurvey: {
                  patentCntInfo: { apply_cnt: 0, register_cnt: 0, give_up_cnt: 0, all: 0 },
                  annualPayList: [],
                  annualApplyCnt: {},
                  annualRegisterCnt: {},
                  patentBiblioIdxList: { kr: [], us: [] }
                },
                company_list: { items: [] },
                patent_list: { items: [] },
                applicant_count: { items: [] },
                number_of_year: { items: [] },
                ipc_number: { items: [] },
                patent_grade_info: { items: [] },
                total_count: 0
              }
            },
            items: [],
            patentApplyNumberList: [],
            keyword_idx: 0
          },
          analysis: data.analysis || {
            data: {
              text_obj: {
                applicant_count_text: '',
                count_of_year_text: '',
                ipc_text: '',
                applicant_ipc_text: '',
                applicant_year_count_text: '',
                patent_grade_text: ''
              },
              newSurvey: {
                patentCntInfo: { apply_cnt: 0, register_cnt: 0, give_up_cnt: 0, all: 0 },
                annualPayList: [],
                annualApplyCnt: {},
                annualRegisterCnt: {},
                patentBiblioIdxList: { kr: [], us: [] }
              },
              company_list: { items: [] },
              patent_list: { items: [] },
              applicant_count: { items: [] },
              number_of_year: { items: [] },
              ipc_number: { items: [] },
              patent_grade_info: { items: [] },
              total_count: 0
            }
          },
          strPatentSummery: data.strPatentSummery || '',
          mi: data.mi || {},
          strCpcInfo: data.strCpcInfo || '',
          flag: data.flag || '',
          resultCode: data.resultCode || ''
        }
        console.log(safeReport)
        setReport(safeReport)
      }
    } catch (error) {
      console.error("특허보고서 로딩 오류:", error)
    } finally {
      setLoading(false)
    }
  }



  if (!patent) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8">
      <DialogHeader className="flex-shrink-0">
        <div className="flex items-center gap-2"> 
              <FileText className="h-6 w-6 text-slate-800 dark:text-slate-100 flex-shrink-0" />
              <DialogTitle className="text-xl line-clamp-1">특허활용 보고서</DialogTitle>

              </div>
              <div className="flex justify-between items-start">
            <p className="text-base text-gray-600 dark:text-gray-400"></p>
           
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-blue-200/60 dark:scrollbar-thumb-blue-900/20 scrollbar-track-transparent">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : report ? (
            <>


              {/* 서지사항 */}
              <PatentBibliographicInfo patentInfo={report.patentInfo} />

              {/* 본 특허관련 종합 요약정보 */}
              <PatentSummaryInfo patentInfo={report.patentInfo} />


            {/* 본 특허의 대표 청구항 */}
            <PatentRepresentativeClaim 
                claimInfo={report.patentInfo?.clam_info} 
                clamInfo={report.patentInfo?.clamInfo} 
              />

              {/* 등록건에 대한 특허등급 정보 */}
              <PatentGradeInfo 
                sm_grade={report.patentInfo?.sm_grade}
                sm_r_grade={report.patentInfo?.sm_r_grade}
                sm_t_grade={report.patentInfo?.sm_t_grade}
                sm_u_grade={report.patentInfo?.sm_u_grade}
              />

              {/* 본 특허의 핵심 키워드 */}
              <PatentKeywords keywords={report.patentInfo?.keyword} />

              {/* 연차료 납부 추천 등급 */}
              <AnnualFeeRecommendation />

              {/* Family */}
              <PatentFamily familyList={report.patentInfo?.familyList} />

              {/* 본 특허기술 핵심 요약정보 */}
              <PatentCoreSummary summary={report.patentInfo?.summary} />

              {/* 본 특허기술이 이용되는 국내 시장 정보 */}
              <PatentDomesticMarket marketInfo={report.patentInfo?.market_info} />

              {/* 본 특허기술이 이용되는 해외 시장 정보 */}
              <PatentOverseasMarket forMarketInfo={report.patentInfo?.for_market_info} />

              {/* 본 특허기술을 활용한 제품군 */}
              <PatentProductFamily alliedProducts={report.patentInfo?.allied_products} />

              {/* 본 특허기술의 기술 성숙도 */}
              <PatentTechnologyMaturity trlInfo={report.patentInfo?.trl_info} />

              {/* 본 특허기술에 해당되는 산업분류 기준 업종 */}
              <PatentStandardIndustryClassification tech_class={report.patentInfo?.tech_class} />

              {/* AI가 추천하는 업종 기준 */}
              <PatentAiIndustryTypeRecommendation industry_type={report.patentInfo?.industry_type} />

              {/* 본 특허기술과 관련된 연관 분야 */}
              <PatentRelatedFields related_field={report.patentInfo?.related_field} />

              {/* 본 특허와 관련된 주요특허 정보 */}
              <PatentRelatedPatents patentList={report.analysis?.data?.patent_list?.items} />

              {/* 본 특허와 연관성이 깊은 특허에 대한 분석 정보 */}
              <PatentRelatedPatentsAnalysis 
                applicantCount={report.analysis?.data?.applicant_count?.items}
                numberOfYear={report.analysis?.data?.number_of_year?.items}
                ipcNumber={report.analysis?.data?.ipc_number?.items}
                patentGradeInfo={report.analysis?.data?.patent_grade_info?.items}
              />

            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-12 text-gray-500 dark:text-gray-400">
              <FileText className="h-12 w-12 opacity-50" />
              <p>특허보고서를 불러올 수 없습니다.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
