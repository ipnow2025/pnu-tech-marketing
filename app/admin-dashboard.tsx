"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Phone, FileText, BarChart3, Clock, Search, Download, Eye, X, Building, User, RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react'

// 확장된 모의 데이터
const mockApplications = [
  {
    id: 1,
    companyName: "테크솔루션",
    representative: "김철수",
    contact: "010-1234-5678",
    email: "kim@techsol.com",
    appliedAt: "2025-01-20",
    type: "참가신청",
    // 추가 상세 정보
    companyPhone: "02-1234-5678",
    faxPhone: "02-1234-5679",
    establishedDate: "2020-03-15",
    department: "기술개발팀",
    position: "팀장",
    address: "서울시 강남구 테헤란로 123",
    businessType: "소프트웨어 개발",
    employeeCount: "50명",
  },
  {
    id: 2,
    companyName: "이노베이션",
    representative: "이영희",
    contact: "010-2345-6789",
    email: "lee@innovation.com",
    appliedAt: "2025-01-21",
    type: "참가신청",
    companyPhone: "02-2345-6789",
    faxPhone: "02-2345-6790",
    establishedDate: "2018-07-20",
    department: "연구개발부",
    position: "부장",
    address: "부산시 해운대구 센텀로 456",
    businessType: "바이오기술",
    employeeCount: "120명",
  },
  {
    id: 4,
    companyName: "그린에너지",
    representative: "정수진",
    contact: "010-4567-8901",
    email: "jung@greenenergy.com",
    appliedAt: "2025-01-23",
    type: "기술상담",
    technology: "전기화학적 산소 발생 장치",
    companyPhone: "052-4567-8901",
    faxPhone: "052-4567-8902",
    establishedDate: "2021-05-30",
    department: "신사업개발팀",
    position: "차장",
    address: "울산시 남구 삼산로 789",
    businessType: "신재생에너지",
    employeeCount: "200명",
    technologyContent: `수소 생산 효율성 향상을 위한 전기화학적 산소 발생 장치 기술 도입을 검토하고 있습니다.

기술 도입 목적:
- 그린 수소 생산 공정 효율성 개선
- 에너지 소비량 최적화
- 대용량 수소 생산 시설 구축

적용 분야:
- 수전해 수소 생산 플랜트
- 산업용 수소 공급 시스템
- 연료전지 발전소

기대 효과:
- 수소 생산 효율 20% 향상
- 전력 소비량 15% 절감
- 연간 매출 50억원 증대`,
    applicationReason: "탄소중립 정책에 따른 그린 수소 사업 확장",
    expectedBudget: "20억원 ~ 30억원",
    implementationPeriod: "12개월",
  },
  {
    id: 5,
    companyName: "바이오센서텍",
    representative: "김혜진",
    contactPerson: "김혜진",
    contact: "010-5678-9012",
    email: "kim@biosensortech.com",
    appliedAt: "2025-01-24",
    type: "기술상담",
    technology: "중금속 검출용 센서 및 이를 이용한 중금속 동시 검출방법",
    companyPhone: "031-5678-9012",
    faxPhone: "031-5678-9013",
    establishedDate: "2022-03-15",
    department: "기술연구소",
    position: "연구소장",
    address: "경기도 성남시 분당구 판교로 100",
    businessType: "바이오센서 개발",
    employeeCount: "35명",
    // 특허 정보 (특허목록에서 신청한 경우)
    patent: {
      techField: "화학",
      patentName: "중금속 검출용 센서 및 이를 이용한 중금속 동시 검출방법",
      applicationNumber: "10-2013-0037530",
      registrationNumber: "10-2075095",
      fee: "₩5,500,000",
      applicationDate: "2013-04-05",
      expiryDate: "2025-02-03",
    },
    technologyContent: `저희는 식품 안전성 검사를 위한 휴대용 중금속 검출 장비를 개발하고 있습니다.

기술 도입 목적:
- 기존 실험실 기반 검사의 한계 극복
- 현장에서 즉시 검사 가능한 휴대용 장비 개발
- 다중 중금속 동시 검출로 검사 효율성 향상

적용 분야:
- 식품 안전성 검사 (농산물, 수산물)
- 환경 모니터링 (토양, 수질)
- 산업 현장 안전 관리

기대 효과:
- 검사 시간 대폭 단축 (기존 1-2일 → 30분 이내)
- 검사 비용 70% 절감
- 현장 즉시 대응으로 안전성 확보`,
    applicationReason: "식품안전 규제 강화 및 현장 검사 수요 증가",
    expectedBudget: "3억원 ~ 5억원",
    implementationPeriod: "8개월",
  },
  {
    id: 101,
    companyName: "센텀아이디어랩",
    representative: "박민수",
    contactPerson: "박민수",
    contact: "010-9876-5432",
    email: "minsu.park@centumlab.co.kr",
    appliedAt: "2025-08-02",
    type: "기술상담",
    origin: "exhibit",
    companyPhone: "051-123-4567",
    faxPhone: "",
    establishedDate: "",
    department: "사업개발팀",
    position: "팀장",
    address: "부산시 해운대구 센텀동로 45",
    businessType: "드론 보안 솔루션",
    employeeCount: "35명",
    expectedBudget: "1억원 ~ 2억원",
    implementationPeriod: "6개월",
    exhibit: {
      id: 201,
      title: "드론 통신신호 분석을 이용한 드론 탐지 방법 및 장치",
      techField: "정보/통신",
      presenter: "김정창 교수님",
      affiliation: "해양대학교",
      booth: "E-01",
    },
    technology: "드론 통신신호 분석을 이용한 드론 탐지 방법 및 장치",
    technologyContent:
      "자사 드론 탐지 시스템 고도화를 위해 RF 신호 분석 기반 탐지 모듈을 검토합니다.\n주요 관심: 공항/항만 보안 적용, 장거리 탐지 성능, 장치 인증 연계.",
  },
  {
    id: 102,
    companyName: "에너지솔루션즈",
    representative: "이서현",
    contactPerson: "이서현",
    contact: "010-2222-3333",
    email: "sh.lee@energysol.io",
    appliedAt: "2025-08-03",
    type: "기술상담",
    origin: "exhibit",
    companyPhone: "02-555-1234",
    faxPhone: "",
    establishedDate: "",
    department: "R&amp;D본부",
    position: "매니저",
    address: "서울시 강남구 테헤란로 501",
    businessType: "ESS 연구개발",
    employeeCount: "120명",
    expectedBudget: "5억원",
    implementationPeriod: "12개월",
    exhibit: {
      id: 204,
      title: "유동 전지용 다공체 전극의 위치에 따른 성능 평가 시스템",
      techField: "전기/전자",
      presenter: "박희성 교수님",
      affiliation: "창원대학교",
      booth: "E-04",
    },
    technology: "유동 전지용 다공체 전극의 위치에 따른 성능 평가 시스템",
    technologyContent:
      "레독스 유동전지 모듈 성능평가 자동화 장비 도입 검토. 현장 평가 지표 정립 및 파일럿 실증 희망.",
  },
]

// mockApplications 선언 후에 다음 코드 추가:
const allApplications = [...mockApplications]

// const handleSendEmail = (application: any) => {
//   alert(`${application.companyName}(${application.email})로 이메일을 발송했습니다.`)
// }

const handleExcelDownload = () => {
  alert("엑셀 파일 다운로드를 시작합니다.")
}

// 상세 정보 모달 컴포넌트
function ApplicationDetailModal({
  application,
  isOpen,
  onClose,
}: {
  application: any
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen || !application) return null

  const isExhibit = application.origin === "exhibit"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mt-0">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {application.type === "참가신청"
              ? "참가신청서 상세정보"
              : isExhibit
              ? "출품기술 상담신청서 상세정보"
              : application.origin === "presentation"
              ? "발표자 기술상담신청서 상세정보"
              : "기술상담신청서 상세정보"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 신청 기본 정보 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold">신청 #{application.id}</div>
              </div>
              <div className="text-sm text-gray-500">신청일: {application.appliedAt ? new Date(application.appliedAt).toISOString().split('T')[0] : (application.created_at ? new Date(application.created_at).toISOString().split('T')[0] : '미입력')}</div>
            </div>
          </div>

          {/* 회사 정보 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              회사 정보
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">회사명</label>
                  <p className="text-sm font-semibold">{application.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">대표자명</label>
                  <p className="text-sm">{application.representative}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">설립일</label>
                  <p className="text-sm">
                    {application.establishedDate 
                      ? new Date(application.establishedDate).toISOString().split('T')[0]
                      : '미입력'
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">사업분야</label>
                  <p className="text-sm">{application.businessType || '미입력'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">회사전화</label>
                  <p className="text-sm">{application.companyPhone || '미입력'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">팩스</label>
                  <p className="text-sm">{application.faxPhone || '미입력'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">직원 수</label>
                  <p className="text-sm">{application.employeeCount || '미입력'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">주소</label>
                  <p className="text-sm">{application.address || '미입력'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 담당자 정보 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              담당자 정보
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">담당자명</label>
                  <p className="text-sm font-semibold">{application.contactPerson || application.contact_name || application.representative}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">부서/직위</label>
                  <p className="text-sm">{application.department_position || (application.department && application.position ? `${application.department} ${application.position}` : '미입력')}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">휴대폰번호</label>
                  <p className="text-sm">{application.contact || application.mobile_phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">이메일</label>
                  <p className="text-sm">{application.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 발표 정보 (발표 상담) */}
          {application.presentation && (
            <div className="border rounded-lg p-4 bg-indigo-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-900">
                <FileText className="w-5 h-5" />
                발표 정보
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">발표명</label>
                  <p className="text-indigo-700 font-semibold">{application.presentation.title}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술분야</label>
                  <p>{application.presentation.techField}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">발표자</label>
                  <p>{application.presentation.presenter}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">소속</label>
                  <p>{application.presentation.affiliation}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">시간</label>
                  <p>{application.presentation.time}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">장소</label>
                  <p>{application.presentation.room}</p>
                </div>
              </div>
            </div>
          )}

          {/* 출품 정보 (출품 상담) */}
          {application.exhibit && (
            <div className="border rounded-lg p-4 bg-emerald-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-900">
                <FileText className="w-5 h-5" />
                출품 정보
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">출품명</label>
                  <p className="text-emerald-700 font-semibold">{application.exhibit.title}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술분야</label>
                  <p>{application.exhibit.techField}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">담당</label>
                  <p>{application.exhibit.presenter}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">소속</label>
                  <p>{application.exhibit.affiliation}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">부스</label>
                  <p>{application.exhibit.booth}</p>
                </div>
              </div>
            </div>
          )}

          {/* 특허 정보 (특허 기반 상담) */}
          {application.patent && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-800">
                <FileText className="w-5 h-5" />
                관련 특허 정보
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">특허명</label>
                  <p className="text-blue-700 font-semibold">{application.patent.patentName}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술분야</label>
                  <p>{application.patent.techField}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">출원번호</label>
                  <p className="font-mono">{application.patent.applicationNumber}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">등록번호</label>
                  <p className="font-mono">{application.patent.registrationNumber}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술료</label>
                  <p className="text-green-600 font-semibold">{application.patent.fee}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">만료일</label>
                  <p>{application.patent.expiryDate ? new Date(application.patent.expiryDate).toISOString().split('T')[0] : '미입력'}</p>
                </div>
              </div>
            </div>
          )}

          {/* 기술상담 내용 (공통) */}
          {(application.type === "기술상담" || application.type === "특허상담") && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                기술상담 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">희망기술명</label>
                  <p className="text-sm font-semibold text-blue-600">
                    {application.technology || application.desired_technology || application.patent?.patentName || '내용이 없습니다.'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">수요기술 내용</label>
                  <div className="text-sm bg-gray-50 p-3 rounded border whitespace-pre-line max-h-60 overflow-y-auto">
                    {application.technologyContent || application.technology_requirements || '내용이 없습니다.'}
                  </div>
                </div>

              </div>
            </div>
          )}

           {/* 사전등록기업 특별혜택 정보 */}
           {(application.patentUtilizationReport ||
            application.patentValueEvaluationReport ||
            application.annualFeeEstimation) && (
            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-800">
                <CheckCircle className="w-5 h-5" />
                사전등록기업 특별혜택 신청 현황
              </h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    {application.patentUtilizationReport ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${application.patentUtilizationReport ? "text-green-700" : "text-gray-500"}`}
                    >
                      특허활용보고서
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {application.patentValueEvaluationReport ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${application.patentValueEvaluationReport ? "text-green-700" : "text-gray-500"}`}
                    >
                      특허가치평가보고서
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {application.annualFeeEstimation ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${application.annualFeeEstimation ? "text-green-700" : "text-gray-500"}`}
                    >
                      연차료 예상비용 측정
                    </span>
                  </div>
                </div>

                {/* 특허출원번호 정보 */}
                {(application.patentApplicationNumber1 || application.patentApplicationNumber2) && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">제출된 특허출원번호</h4>
                    <div className="space-y-2">
                      {application.patentApplicationNumber1 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">특허활용보고서</span>
                          <span className="text-sm font-mono">{application.patentApplicationNumber1}</span>
                        </div>
                      )}
                      {application.patentApplicationNumber2 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            특허가치평가보고서
                          </span>
                          <span className="text-sm font-mono">{application.patentApplicationNumber2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}

// 삭제 확인 모달 컴포넌트
function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mt-0">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">삭제 확인</h3>
          </div>
          <p className="text-gray-600 mb-6">
            <span className="font-medium">"{itemName}"</span>을(를) 삭제하시겠습니까?
            <br />
            <span className="text-sm text-red-600">이 작업은 되돌릴 수 없습니다.</span>
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AdminDashboardProps {
  consultationApplications?: any[]
}

export default function AdminDashboard({ consultationApplications = [] }: AdminDashboardProps) {
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  
  // 삭제 관련 상태 추가
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any>(null)
  
  // 참가신청 데이터 상태
  const [participantApplications, setParticipantApplications] = useState<any[]>([])
  const [technologyConsultations, setTechnologyConsultations] = useState<any[]>([])
  const [patentConsultations, setPatentConsultations] = useState<any[]>([])
  const [presentationConsultations, setPresentationConsultations] = useState<any[]>([])
  const [exhibitConsultations, setExhibitConsultations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTechnologyLoading, setIsTechnologyLoading] = useState(false)
  const [isPatentLoading, setIsPatentLoading] = useState(false)
  const [isPresentationLoading, setIsPresentationLoading] = useState(false)
  const [isExhibitLoading, setIsExhibitLoading] = useState(false)
  
  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const loginData = localStorage.getItem('adminLogin')
    if (!loginData) return false
    
    try {
      const parsed = JSON.parse(loginData)
      const now = new Date().getTime()
      
      // 만료 시간 확인
      if (now > parsed.expiresAt) {
        localStorage.removeItem('adminLogin')
        return false
      }
      
      return true
    } catch {
      localStorage.removeItem('adminLogin')
      return false
    }
  }
  
  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('adminLogin')
    window.location.reload()
  }

  const allApplications = [...consultationApplications, ...participantApplications, ...technologyConsultations, ...patentConsultations, ...presentationConsultations, ...exhibitConsultations]
  const filteredApplications = allApplications.filter(
    (app) =>
      app.companyName?.toLowerCase?.().includes(searchTerm.toLowerCase()) ||
      app.representative?.toLowerCase?.().includes(searchTerm.toLowerCase()) ||
      (app.contactPerson && app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.exhibit?.title && app.exhibit.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.presentation?.title && app.presentation.title.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleViewDetail = (application: any) => {
    setSelectedApplication(application)
    setShowDetailModal(true)
  }

  // 삭제 처리 함수들
  const handleDelete = (item: any, type: string) => {
    setItemToDelete({ item, type })
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    const { item, type } = itemToDelete
    let endpoint = ''
    
    switch (type) {
      case 'participant':
        endpoint = `/api/participant-applications?id=${item.id}`
        break
      case 'technology':
        endpoint = `/api/technology-consultations?id=${item.id}`
        break
      case 'patent':
        endpoint = `/api/patent-consultations?id=${item.id}`
        break
      case 'presentation':
        endpoint = `/api/presentation-consultations?id=${item.id}`
        break
      case 'exhibit':
        endpoint = `/api/exhibit-consultations?id=${item.id}`
        break
      default:
        break
    }

    try {
      const response = await fetch(endpoint, { method: 'DELETE' })
      if (response.ok) {
        // 성공적으로 삭제된 경우 해당 목록에서 제거
        switch (type) {
          case 'participant':
            setParticipantApplications(prev => prev.filter(app => app.id !== item.id))
            break
          case 'technology':
            setTechnologyConsultations(prev => prev.filter(app => app.id !== item.id))
            break
          case 'patent':
            setPatentConsultations(prev => prev.filter(app => app.id !== item.id))
            break
          case 'presentation':
            setPresentationConsultations(prev => prev.filter(app => app.id !== item.id))
            break
          case 'exhibit':
            setExhibitConsultations(prev => prev.filter(app => app.id !== item.id))
            break
        }
        alert('성공적으로 삭제되었습니다.')
      } else {
        alert('삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('삭제 오류:', error)
      alert('삭제 중 오류가 발생했습니다.')
    } finally {
      setShowDeleteModal(false)
      setItemToDelete(null)
    }
  }

  // 참가신청 데이터 가져오기
  const fetchParticipantApplications = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/participant-applications')
      const result = await response.json()
      console.log(result.data)
      if (result.success) {
        // 데이터 형식을 통일
        const formattedData = result.data.map((app: any) => ({
          ...app,
          id: app.id,
          companyName: app.company_name,
          representative: app.ceo_name,
          contact: app.mobile_phone,
          email: app.email,
          appliedAt: app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : app.created_at,
          type: "참가신청",
          // 추가 상세 정보
          companyPhone: app.company_phone,
          faxPhone: app.company_fax,
          establishedDate: app.establishment_date,
          address: app.company_address,
          businessType: app.business_type,
          employeeCount: app.employee_count,
          department: app.department_position?.split(' ')[0] || '',
          position: app.department_position?.split(' ').slice(1).join(' ') || '',
          contactPerson: app.contact_name,
          // 추가 서비스 정보
          patentUtilizationReport: app.patent_utilization_report || false,
          patentValueEvaluationReport: app.patent_value_evaluation_report || false,
          annualFeeEstimation: app.annual_fee_estimation || false,
          patentApplicationNumber1: app.patent_application_number1 || '',
          patentApplicationNumber2: app.patent_application_number2 || '',
        }))
        setParticipantApplications(formattedData)
      }
    } catch (error) {
      console.error('참가신청 데이터 가져오기 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 기술상담 데이터 가져오기
  const fetchTechnologyConsultations = async () => {
    setIsTechnologyLoading(true)
    try {
      const response = await fetch('/api/technology-consultations')
      const result = await response.json()
      
      if (result.success) {
        // 데이터 형식을 통일
        const formattedData = result.data.map((app: any) => ({
          ...app,
          id: app.id,
          companyName: app.company_name,
          representative: app.ceo_name,
          contact: app.mobile_phone,
          email: app.email,
          appliedAt: app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : app.created_at,
          type: "기술상담",
          // 추가 상세 정보
          companyPhone: app.company_phone,
          faxPhone: app.company_fax,
          establishedDate: app.establishment_date,
          address: app.company_address,
          businessType: app.business_type,
          employeeCount: app.employee_count,
          department: app.department_position?.split(' ')[0] || '',
          position: app.department_position?.split(' ').slice(1).join(' ') || '',
          contactPerson: app.contact_name,
          // 기술상담 특화 정보
          technology: app.desired_technology,
          technologyContent: app.technology_requirements,
          // 추가 서비스 정보
          patentUtilizationReport: app.patent_utilization_report || false,
          patentValueEvaluationReport: app.patent_value_evaluation_report || false,
          annualFeeEstimation: app.annual_fee_estimation || false,
          patentApplicationNumber1: app.patent_application_number1 || '',
          patentApplicationNumber2: app.patent_application_number2 || '',
        }))
        setTechnologyConsultations(formattedData)
      }
    } catch (error) {
      console.error('기술상담 데이터 가져오기 오류:', error)
    } finally {
      setIsTechnologyLoading(false)
    }
  }

  // 발표자 상담신청 데이터 가져오기
  const fetchPresentationConsultations = async () => {
    setIsPresentationLoading(true)
    try {
      const response = await fetch('/api/presentation-consultations')
      const result = await response.json()
      
      if (result.success) {
        // 데이터 형식을 통일
        const formattedData = result.data.map((app: any) => ({
          ...app,
          id: app.id,
          companyName: app.company_name,
          representative: app.representative_name,
          contact: app.mobile_phone,
          email: app.email,
          appliedAt: app.applied_at || (app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : null),
          type: "기술상담",
          origin: "presentation",
          // 추가 상세 정보
          companyPhone: app.company_phone,
          faxPhone: app.fax_phone,
          establishedDate: app.established_date,
          address: app.company_address,
          businessType: app.business_type,
          employeeCount: app.employee_count,
          department: app.department,
          position: app.position,
          contactPerson: app.contact_person,
          // 발표 정보
          presentation: {
            id: app.presentation_id,
            title: app.presentation_title,
            techField: app.presentation_tech_field,
            presenter: app.presentation_presenter,
            affiliation: app.presentation_affiliation,
            time: app.presentation_time,
            room: app.presentation_room,
          },
          technology: app.presentation_title,
          technologyContent: app.technology_content,
          // 추가 서비스 정보
          patentUtilizationReport: app.patent_utilization_report || false,
          patentValueEvaluationReport: app.patent_value_evaluation_report || false,
          annualFeeEstimation: app.annual_fee_estimation || false,
          patentApplicationNumber1: app.patent_application_number1 || '',
          patentApplicationNumber2: app.patent_application_number2 || '',
        }))
        setPresentationConsultations(formattedData)
      }
    } catch (error) {
      console.error('발표자 상담신청 데이터 가져오기 오류:', error)
    } finally {
      setIsPresentationLoading(false)
    }
  }

  // 출품기술 상담신청 데이터 가져오기
  const fetchExhibitConsultations = async () => {
    setIsExhibitLoading(true)
    try {
      const response = await fetch('/api/exhibit-consultations')
      const result = await response.json()
      
      if (result.success) {
        // 데이터 형식을 통일
        const formattedData = result.data.map((app: any) => ({
          ...app,
          id: app.id,
          companyName: app.company_name,
          representative: app.representative_name,
          contact: app.mobile_phone,
          email: app.email,
          appliedAt: app.applied_at || (app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : null),
          type: "기술상담",
          origin: "exhibit",
          // 추가 상세 정보
          companyPhone: app.company_phone,
          faxPhone: app.fax_phone,
          establishedDate: app.established_date,
          address: app.company_address,
          businessType: app.business_type,
          employeeCount: app.employee_count,
          department: app.department,
          position: app.position,
          contactPerson: app.contact_person,
          // 출품 정보
          exhibit: {
            id: app.exhibit_id,
            title: app.exhibit_title,
            techField: app.exhibit_tech_field,
            presenter: app.exhibit_presenter,
            affiliation: app.exhibit_affiliation,
            booth: app.exhibit_booth,
          },
          technology: app.exhibit_title,
          technologyContent: app.technology_content,
          // 추가 서비스 정보
          patentUtilizationReport: app.patent_utilization_report || false,
          patentValueEvaluationReport: app.patent_value_evaluation_report || false,
          annualFeeEstimation: app.annual_fee_estimation || false,
          patentApplicationNumber1: app.patent_application_number1 || '',
          patentApplicationNumber2: app.patent_application_number2 || '',
        }))
        setExhibitConsultations(formattedData)
      }
    } catch (error) {
      console.error('출품기술 상담신청 데이터 가져오기 오류:', error)
    } finally {
      setIsExhibitLoading(false)
    }
  }

  // 특허 상담신청 데이터 가져오기
  const fetchPatentConsultations = async () => {
    setIsPatentLoading(true)
    try {
      const response = await fetch('/api/patent-consultations')
      const result = await response.json()
      
      if (result.success) {
        // 데이터 형식을 통일
        const formattedData = result.data.map((app: any) => ({
          ...app,
          id: app.id,
          companyName: app.company_name,
          representative: app.representative_name,
          contact: app.mobile_phone,
          email: app.email,
          appliedAt: app.applied_at || (app.created_at ? new Date(app.created_at).toISOString().split('T')[0] : null),
          type: "특허상담",
          // 추가 상세 정보
          companyPhone: app.company_phone,
          faxPhone: app.fax_phone,
          establishedDate: app.established_date,
          address: app.company_address,
          businessType: app.business_type,
          employeeCount: app.employee_count,
          department: app.department,
          position: app.position,
          contactPerson: app.contact_person,
          // 특허 정보
          technology: app.patent_name,
          technologyContent: app.technology_content,
          patent: {
            techField: app.patent_tech_field,
            patentName: app.patent_name,
            applicationNumber: app.patent_application_number,
            registrationNumber: app.patent_registration_number,
            fee: app.patent_fee,
            applicationDate: app.patent_application_date,
            expiryDate: app.patent_expiry_date,
          },
          // 추가 서비스 정보
          patentUtilizationReport: app.patent_utilization_report || false,
          patentValueEvaluationReport: app.patent_value_evaluation_report || false,
          annualFeeEstimation: app.annual_fee_estimation || false,
          patentApplicationNumber1: app.patent_application_number1 || '',
          patentApplicationNumber2: app.patent_application_number2 || '',
        }))
        setPatentConsultations(formattedData)
      }
    } catch (error) {
      console.error('특허 상담신청 데이터 가져오기 오류:', error)
    } finally {
      setIsPatentLoading(false)
    }
  }

  // 컴포넌트 마운트 시 로그인 상태 확인 및 데이터 가져오기
  useEffect(() => {
    // 로그인 상태 확인
    if (!checkLoginStatus()) {
      alert('로그인이 필요합니다.')
      window.location.href = '/'
      return
    }
    
    fetchParticipantApplications()
    fetchTechnologyConsultations()
    fetchPatentConsultations()
    fetchPresentationConsultations()
    fetchExhibitConsultations()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">관리자 대시보드</h2>
        <div className="text-sm text-gray-500">마지막 업데이트: {new Date().toLocaleString("ko-KR")}</div>
      </div>

      {/* 관리자 탭 네비게이션 */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: "dashboard", label: "대시보드", icon: BarChart3 },
            { id: "special-benefits", label: "특별혜택 신청현황", icon: CheckCircle },
            { id: "exhibit-management", label: "출품기술 기업관리", icon: Building },
            { id: "patent-consultations", label: "특허목록 상담신청", icon: FileText },
            { id: "applications", label: "참가신청관리", icon: Users },
            { id: "consultations", label: "기술상담관리", icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeAdminTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* 대시보드 탭 */}
      {activeAdminTab === "dashboard" && (
        <div className="space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 신청</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {participantApplications.length + technologyConsultations.length + patentConsultations.length + presentationConsultations.length + exhibitConsultations.length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-2 text-sm text-blue-600">전체 신청 현황</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 참가신청</p>
                    <p className="text-2xl font-bold text-gray-900">{participantApplications.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-2 text-sm text-green-600">실시간 업데이트</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">기술상담신청</p>
                    <p className="text-2xl font-bold text-gray-900">{technologyConsultations.length}</p>
                  </div>
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-2 text-sm text-green-600">실시간 업데이트</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">특허목록 상담</p>
                    <p className="text-2xl font-bold text-gray-900">{patentConsultations.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-2 text-sm text-blue-600">특허 기반 상담</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">특별혜택 신청</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {allApplications.filter(app => 
                        app.patentUtilizationReport || app.patentValueEvaluationReport || app.annualFeeEstimation
                      ).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="mt-2 text-sm text-yellow-600">사전등록 혜택</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">발표자 상담</p>
                    <p className="text-2xl font-bold text-gray-900">{presentationConsultations.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="mt-2 text-sm text-indigo-600">발표 기반 상담</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">출품기술 상담</p>
                    <p className="text-2xl font-bold text-gray-900">{exhibitConsultations.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="mt-2 text-sm text-emerald-600">출품 기반 상담</div>
              </CardContent>
            </Card>

            

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">이번 주 신청</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div className="mt-2 text-sm text-green-600">+25% 지난주 대비</div>
              </CardContent>
            </Card> */}
            
            
          </div>

          {/* 최근 활동 */}
          {/* <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>최근 참가신청</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{app.companyName}</div>
                        <div className="text-sm text-gray-600">{app.representative}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{app.appliedAt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>기술분야별 상담신청</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { field: "정보/통신", count: 8, color: "bg-blue-500" },
                    { field: "화학", count: 6, color: "bg-green-500" },
                    { field: "전기/전자", count: 4, color: "bg-purple-500" },
                    { field: "기계", count: 3, color: "bg-orange-500" },
                    { field: "재료", count: 2, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.field} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm font-medium">{item.field}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.count}건</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>출품기술 상담신청</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={() => setActiveAdminTab("exhibit-management")}
                >
                  전체 보기
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exhibitConsultations.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-emerald-900 truncate">{app.companyName}</div>
                        <div className="text-xs text-emerald-700 truncate" title={app.exhibit?.title || app.technology}>
                          {app.exhibit?.title || app.technology}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gray-500">{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</div>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white"
                            onClick={() => {
                              setSelectedApplication(app)
                              setShowDetailModal(true)
                            }}
                          >
                            상세
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {exhibitConsultations.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-6">출품기술 목록에서 신청된 상담이 없습니다.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      )}

      {/* 특별혜택 신청현황 탭 */}
      {activeAdminTab === "special-benefits" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">사전등록기업 특별혜택 신청현황</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="회사명 또는 대표자명 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-64"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {/* <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={handleExcelDownload}
              >
                <Download className="w-4 h-4" />
                특별혜택 현황 다운로드
              </Button> */}
            </div>
          </div>

          {/* 특별혜택 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">총 신청건수</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {allApplications.filter(app => 
                        app.patentUtilizationReport || app.patentValueEvaluationReport || app.annualFeeEstimation
                      ).length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">특허활용보고서</p>
                    <p className="text-2xl font-bold text-green-600">
                      {allApplications.filter(app => app.patentUtilizationReport).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">특허가치평가보고서</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {allApplications.filter(app => app.patentValueEvaluationReport).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">연차료 예상비용 측정</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {allApplications.filter(app => app.annualFeeEstimation).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>번호</TableHead>
                    <TableHead>회사명</TableHead>
                    <TableHead>담당자</TableHead>
                    <TableHead>신청유형</TableHead>
                    <TableHead>특허활용보고서</TableHead>
                    <TableHead>특허가치평가보고서</TableHead>
                    <TableHead>연차료 예상비용</TableHead>
                    <TableHead>신청일</TableHead>
                    <TableHead>관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allApplications
                    .filter(
                      (app) =>
                        app.patentUtilizationReport || app.patentValueEvaluationReport || app.annualFeeEstimation,
                    )
                    .map((app, index) => (
                      <TableRow key={`${app.type}-${app.origin || 'default'}-${app.id}`}  className="hover:bg-gray-50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{app.companyName}</TableCell>
                        <TableCell>{app.contactPerson || app.representative}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              app.type === "참가신청" 
                                ? "bg-blue-100 text-blue-800" 
                                : app.type === "특허상담"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.type === "기술상담"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                           {app.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {app.patentUtilizationReport ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            {app.patentApplicationNumber1 && (
                              <span className="text-xs font-mono bg-gray-100 px-1 rounded">
                                {app.patentApplicationNumber1}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {app.patentValueEvaluationReport ? (
                              <CheckCircle className="w-4 h-4 text-purple-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            {app.patentApplicationNumber2 && (
                              <span className="text-xs font-mono bg-gray-100 px-1 rounded">
                                {app.patentApplicationNumber2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {app.annualFeeEstimation ? (
                            <CheckCircle className="w-4 h-4 text-orange-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-400" />
                          )}
                        </TableCell>
                        <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  {allApplications.filter(
                    (app) => app.patentUtilizationReport || app.patentValueEvaluationReport || app.annualFeeEstimation,
                  ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-gray-500">
                        특별혜택을 신청한 기업이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 참가신청 관리 탭 */}
      {activeAdminTab === "applications" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">참가신청관리</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="회사명 또는 대표자명 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-64"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-transparent" 
                onClick={fetchParticipantApplications}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isLoading ? '새로고침 중...' : '새로고침'}
              </Button>
              {/* <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleExcelDownload}>
                <Download className="w-4 h-4" />
                엑셀 다운로드
              </Button> */}
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[200px]">회사명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">대표자</TableHead>
                    <TableHead className="min-w-[140px] whitespace-nowrap">연락처</TableHead>
                    <TableHead className="min-w-[200px]">이메일</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap text-center">특별혜택</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">신청일</TableHead>
                    <TableHead className="min-w-[120px] text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : participantApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        등록된 참가신청이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    participantApplications
                      .filter((app) => 
                        app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.representative?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((app, index) => (
                        <TableRow key={app.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="font-medium">{app.companyName}</TableCell>
                          <TableCell>{app.representative}</TableCell>
                          <TableCell>{app.contact}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-center">
                              {app.patentUtilizationReport && (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              )}
                              {app.patentValueEvaluationReport && (
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                              )}
                              {app.annualFeeEstimation && (
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                              )}
                              {!app.patentUtilizationReport &&
                                !app.patentValueEvaluationReport &&
                                !app.annualFeeEstimation && <span className="text-xs text-gray-500">없음</span>}
                            </div>
                          </TableCell>
                          <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => handleDelete(app, 'participant')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 기술상담 관리 탭 (일반, 특허 제외) */}
      {activeAdminTab === "consultations" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">기술상담관리</h3>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-transparent" 
                onClick={fetchTechnologyConsultations}
                disabled={isTechnologyLoading}
              >
                {isTechnologyLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isTechnologyLoading ? '새로고침 중...' : '새로고침'}
              </Button>
              {/* <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleExcelDownload}>
                <Download className="w-4 h-4" />
                상담 현황 다운로드
              </Button> */}
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[200px]">회사명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">담당자</TableHead>
                    <TableHead className="min-w-[300px]">희망기술</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap text-center">특별혜택</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">신청일</TableHead>
                    <TableHead className="min-w-[120px] text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isTechnologyLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : technologyConsultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        등록된 기술상담신청이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    technologyConsultations
                      .filter((app) => 
                        app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.representative?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.technology?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((app, index) => (
                        <TableRow key={app.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="font-medium">{app.companyName}</TableCell>
                          <TableCell>{app.contactPerson || app.representative}</TableCell>
                          <TableCell className="max-w-xs truncate" title={app.technology}>
                            {app.technology}
                          </TableCell>
                          <TableCell>
                          <div className="flex items-center gap-1 justify-center">
                            {app.patentUtilizationReport && (
                              <CheckCircle className="w-3 h-3 text-green-600" title="특허활용보고서" />
                            )}
                            {app.patentValueEvaluationReport && (
                              <CheckCircle className="w-3 h-3 text-purple-600" title="특허가치평가보고서" />
                            )}
                            {app.annualFeeEstimation && (
                              <CheckCircle className="w-3 h-3 text-orange-600" title="연차료 예상비용 측정" />
                            )}
                            {!app.patentUtilizationReport &&
                              !app.patentValueEvaluationReport &&
                              !app.annualFeeEstimation && <span className="text-xs text-gray-500">없음</span>}
                          </div>
                        </TableCell>
                          <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => handleDelete(app, 'technology')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

            {/* 특허목록 상담신청 관리 탭 */}
      {activeAdminTab === "patent-consultations" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">특허목록 상담신청</h3>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-transparent" 
                onClick={fetchPatentConsultations}
                disabled={isPatentLoading}
              >
                {isPatentLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isPatentLoading ? '새로고침 중...' : '새로고침'}
              </Button>
              {/* <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleExcelDownload}>
                <Download className="w-4 h-4" />
                특허상담 현황 다운로드
              </Button> */}
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[180px]">회사명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">담당자</TableHead>
                    <TableHead className="min-w-[300px]">특허명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">기술분야</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">기술료</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap text-center">특별혜택</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">신청일</TableHead>
                    <TableHead className="min-w-[120px] text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPatentLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : patentConsultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        등록된 특허 상담신청이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    patentConsultations
                      .filter((app) => 
                        app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.representative?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.patent?.patentName?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((app, index) => (
                        <TableRow key={app.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="font-medium">{app.companyName}</TableCell>
                          <TableCell>{app.contactPerson || app.representative}</TableCell>
                          <TableCell className="max-w-xs truncate" title={app.patent?.patentName}>
                            {app.patent?.patentName}
                          </TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {app.patent?.techField}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">{app.patent?.fee}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-center">
                              {app.patentUtilizationReport && (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              )}
                              {app.patentValueEvaluationReport && (
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                              )}
                              {app.annualFeeEstimation && (
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                              )}
                              {!app.patentUtilizationReport &&
                                !app.patentValueEvaluationReport &&
                                !app.annualFeeEstimation && <span className="text-xs text-gray-500">없음</span>}
                            </div>
                          </TableCell>
                          <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => handleDelete(app, 'patent')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 출품기술 관리 탭: 발표/출품을 한 페이지에서 분리 표시 */}
      {activeAdminTab === "exhibit-management" && (
        <div className="space-y-8">
          {/* 공통 검색/액션 */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">출품기술 기업관리</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="회사명/담당자/출품명/발표명 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {/* <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleExcelDownload}>
                <Download className="w-4 h-4" />
                엑셀 다운로드
              </Button> */}
            </div>
          </div>

          {/* 발표자 기술목록 상담신청 리스트 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>발표자 기술목록 상담신청</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-gray-500">{presentationConsultations.length}건</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[180px]">회사명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">담당자</TableHead>
                    <TableHead className="min-w-[300px]">발표명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">시간</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap text-center">특별혜택</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">신청일</TableHead>
                    <TableHead className="min-w-[120px] text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPresentationLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : presentationConsultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                        발표자 기술목록에서 신청된 상담이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    presentationConsultations
                      .filter((app) => 
                        app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.presentation?.title?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((app, index) => (
                        <TableRow key={app.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="font-medium">{app.companyName}</TableCell>
                          <TableCell>{app.contactPerson || app.representative}</TableCell>
                          <TableCell className="max-w-xs truncate" title={app.presentation?.title || app.technology}>
                            {app.presentation?.title || app.technology}
                          </TableCell>
                          <TableCell>{app.presentation?.time || "-"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-center">
                              {app.patentUtilizationReport && (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              )}
                              {app.patentValueEvaluationReport && (
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                              )}
                              {app.annualFeeEstimation && (
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                              )}
                              {!app.patentUtilizationReport &&
                                !app.patentValueEvaluationReport &&
                                !app.annualFeeEstimation && <span className="text-xs text-gray-500">없음</span>}
                            </div>
                          </TableCell>
                          <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => handleDelete(app, 'presentation')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 출품기술 상담신청 리스트 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>출품기술 상담신청</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-gray-500">{exhibitConsultations.length}건</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[180px]">회사명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">담당자</TableHead>
                    <TableHead className="min-w-[300px]">출품명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">기술분야</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap text-center">특별혜택</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">신청일</TableHead>
                    <TableHead className="min-w-[120px] text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isExhibitLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-2 text-gray-500">데이터를 불러오는 중...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : exhibitConsultations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                        출품기술 목록에서 신청된 상담이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    exhibitConsultations
                      .filter((app) => 
                        app.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.exhibit?.title?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((app, index) => (
                        <TableRow key={app.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="font-medium">{app.companyName}</TableCell>
                          <TableCell>{app.contactPerson || app.representative}</TableCell>
                          <TableCell className="max-w-xs truncate" title={app.exhibit?.title || app.technology}>
                            {app.exhibit?.title || app.technology}
                          </TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                              {app.exhibit?.techField}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 justify-center">
                              {app.patentUtilizationReport && (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              )}
                              {app.patentValueEvaluationReport && (
                                <CheckCircle className="w-3 h-3 text-purple-600" />
                              )}
                              {app.annualFeeEstimation && (
                                <CheckCircle className="w-3 h-3 text-orange-600" />
                              )}
                              {!app.patentUtilizationReport &&
                                !app.patentValueEvaluationReport &&
                                !app.annualFeeEstimation && <span className="text-xs text-gray-500">없음</span>}
                            </div>
                          </TableCell>
                          <TableCell>{app.appliedAt ? new Date(app.appliedAt).toISOString().split('T')[0] : '미입력'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetail(app)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                onClick={() => handleDelete(app, 'exhibit')}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 상세 정보 모달 */}
      <ApplicationDetailModal
        application={selectedApplication}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setItemToDelete(null)
        }}
        onConfirm={confirmDelete}
        itemName={itemToDelete ? `${itemToDelete.item.companyName} - ${itemToDelete.item.type || '상담신청'}` : ''}
      />
    </div>
  )
}
