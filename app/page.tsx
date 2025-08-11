'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, MapPin, Users, Phone, Building } from 'lucide-react'
import Image from 'next/image'
import { PatentTable } from './patent-table'
import { AdminLoginModal } from './admin-login-modal'
import ShowcaseTechList from './showcase-tech-list'
import AdminDashboard from './admin-dashboard'

export default function TechFairPage() {
const [activeTab, setActiveTab] = useState('')
const [isAdmin, setIsAdmin] = useState(false)
const [loginOpen, setLoginOpen] = useState(false)
const [consultationApplications, setConsultationApplications] = useState<any[]>([])

// 참가 신청 폼 상태
const [participantForm, setParticipantForm] = useState({
  companyName: '',
  ceoName: '',
  establishmentDate: '',
  companyPhone: '',
  companyFax: '',
  companyAddress: '',
  businessType: '',
  employeeCount: '',
  contactName: '',
  departmentPosition: '',
  mobilePhone: '',
  email: ''
})

// 기술상담신청 폼 상태
const [technologyForm, setTechnologyForm] = useState({
  companyName: '',
  ceoName: '',
  establishmentDate: '',
  companyPhone: '',
  companyFax: '',
  companyAddress: '',
  businessType: '',
  employeeCount: '',
  contactName: '',
  departmentPosition: '',
  mobilePhone: '',
  email: '',
  desiredTechnology: '',
  technologyRequirements: ''
})

const [isSubmitting, setIsSubmitting] = useState(false)
const [isTechnologySubmitting, setIsTechnologySubmitting] = useState(false)

useEffect(() => {
  // 로그인 상태 확인
  const checkAdminLogin = () => {
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
  
  setIsAdmin(checkAdminLogin())
}, [])

const logout = () => {
  localStorage.removeItem('adminLogin')
  setIsAdmin(false)
}

const handleConsultationSubmit = (consultationData: any) => {
setConsultationApplications((prev) => [...prev, consultationData])
}

// 참가 신청 제출 처리
const handleParticipantSubmit = async () => {
  // 필수 필드 검증
  if (!participantForm.companyName || !participantForm.ceoName || 
      !participantForm.contactName || !participantForm.mobilePhone || !participantForm.email) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }

  setIsSubmitting(true)
  
  try {
    const response = await fetch('/api/participant-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(participantForm),
    })

    const result = await response.json()

    if (result.success) {
      alert('참가 신청이 성공적으로 제출되었습니다!')
      // 폼 초기화
      setParticipantForm({
        companyName: '',
        ceoName: '',
        establishmentDate: '',
        companyPhone: '',
        companyFax: '',
        companyAddress: '',
        businessType: '',
        employeeCount: '',
        contactName: '',
        departmentPosition: '',
        mobilePhone: '',
        email: ''
      })
    } else {
      alert('참가 신청 제출 중 오류가 발생했습니다: ' + result.error)
    }
  } catch (error) {
    console.error('참가 신청 제출 오류:', error)
    alert('참가 신청 제출 중 오류가 발생했습니다.')
  } finally {
    setIsSubmitting(false)
  }
}

// 기술상담신청 제출 처리
const handleTechnologySubmit = async () => {
  // 필수 필드 검증
  if (!technologyForm.companyName || !technologyForm.ceoName || 
      !technologyForm.contactName || !technologyForm.mobilePhone || 
      !technologyForm.email || !technologyForm.desiredTechnology || 
      !technologyForm.technologyRequirements) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }

  setIsTechnologySubmitting(true)
  
  try {
    const response = await fetch('/api/technology-consultations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(technologyForm),
    })

    const result = await response.json()

    if (result.success) {
      alert('기술상담신청이 성공적으로 제출되었습니다!')
      // 폼 초기화
      setTechnologyForm({
        companyName: '',
        ceoName: '',
        establishmentDate: '',
        companyPhone: '',
        companyFax: '',
        companyAddress: '',
        businessType: '',
        employeeCount: '',
        contactName: '',
        departmentPosition: '',
        mobilePhone: '',
        email: '',
        desiredTechnology: '',
        technologyRequirements: ''
      })
    } else {
      alert('기술상담신청 제출 중 오류가 발생했습니다: ' + result.error)
    }
  } catch (error) {
    console.error('기술상담신청 제출 오류:', error)
    alert('기술상담신청 제출 중 오류가 발생했습니다.')
  } finally {
    setIsTechnologySubmitting(false)
  }
}

return (
<div className="min-h-screen bg-white">
  {/* Header */}
  <header className="bg-white border-b">
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
        {/* Left: logos */}
        <div className="flex items-center min-w-0">
          <Image
            src="/images/pnu-logo.png"
            alt="부산대학교 산학협력단 - Research and Business Development Foundation, PNU"
            width={400}
            height={80}
            className="h-12 sm:h-14 md:h-16 w-auto"
            priority
          />
          <a
            href="https://techpresso.kr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Techpresso 바로가기"
            title="Techpresso 바로가기"
            className="ml-3 sm:ml-4 inline-block shrink-0 hidden sm:inline-block"
          >
            {/* External banner kept as <img> to avoid next/image domain config */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sPuLhZo3Pp3BT6kID9m7NxFhN4yAa0.png"
              alt="Techpresso 테크프레소 배너 - 기술이 비즈니스가 되는 공간, 오픈 기술 플랫폼"
              loading="lazy"
              className="h-14 md:h-16 w-auto object-contain rounded-md shadow-sm hover:shadow transition-all"
            />
          </a>
        </div>

        {/* Right: nav + auth */}
        <div className="flex flex-col items-end gap-2 grow basis-full sm:basis-auto w-full md:w-auto">
          <div
            className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-4 lg:gap-6 text-sm w-full md:w-auto"
            role="navigation"
            aria-label="주요 메뉴"
          >
            <button
              onClick={() => setActiveTab('')}
              className={`transition-colors duration-200 ${
                !activeTab ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => setActiveTab('program')}
              className={`transition-colors duration-200 ${
                activeTab === 'program' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              프로그램 일정
            </button>
            <button
              onClick={() => setActiveTab('showcase')}
              className={`transition-colors duration-200 ${
                activeTab === 'showcase' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              발표/출품 기술목록
            </button>
            <button
              onClick={() => setActiveTab('technology')}
              className={`transition-colors duration-200 ${
                activeTab === 'technology' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              특허목록
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`transition-colors duration-200 ${
                activeTab === 'application' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              참가/상담신청
            </button>
            <button
              onClick={() => setActiveTab('directions')}
              className={`transition-colors duration-200 ${
                activeTab === 'directions' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              오시는길
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`transition-colors duration-200 ${
                  activeTab === 'admin' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                관리자
              </button>
            )}

            {!isAdmin ? (
              <button
                onClick={() => setLoginOpen(true)}
                className="transition-colors duration-200 text-gray-600 hover:text-blue-500 shrink-0"
              >
                로그인
              </button>
            ) : (
              <button
                onClick={logout}
                className="transition-colors duration-200 text-gray-600 hover:text-blue-500 shrink-0"
              >
                로그아웃
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>

  {/* Main */}
  <main className="container mx-auto px-4 py-8">
    {/* Home banner */}
    {!activeTab && (
      <div className="space-y-8">
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/images/home-banner.png"
            alt="2025 기술사업화 유망기술 - PNU 디지털테크 대학 기술사업화 유망기술 설명회 / 상담회"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    )}

    {/* Program */}
    {activeTab === 'program' && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                2025년 8월 26일 (화)
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">대학 기술사업화 유망기술 설명회</h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                University Technology Commercialization Promising Technology Briefing
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
          {/* 행사 개요 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">행사 개요</h2>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">일시</div>
                      <div className="text-lg font-semibold text-gray-900">2025.08.26.(화) 13:30 ~</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">장소</div>
                      <div className="text-lg font-semibold text-gray-900">부산 벡스코(BEXCO) 2전시장 3층 회의실</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 md:p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-700 mb-3">주최</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      부산광역시, 과학기술사업화진흥원, 한국연구재단, 연구개발특구진흥재단
                    </div>
                  </div>
                  <div className="p-5 md:p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm font-semibold text-gray-700 mb-3">주관</div>
                    <div className="text-sm text-gray-600 leading-relaxed">부산대학교 산학협력단, 부산대학교기술지주㈜</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 추진일정 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">추진일정</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">시간</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">내용</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">13:30 - 14:00</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">참석자 등록</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">행사장 입구</td>
                  </tr>
                  <tr className="bg-blue-50 border-b border-gray-100 hover:bg-blue-100 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">14:00 - 16:00</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">기술발표 세션</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">4개 기술발표 (각 20분)</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">15:00 - 17:00</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">연구자-기업 1:1 매칭 상담</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">기업별 20분 상담</td>
                  </tr>
                  <tr className="bg-blue-50 border-b border-gray-100 hover:bg-blue-100 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">17:00 - 17:30</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">폐회</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">행사 마무리</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 발표시간 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 md:px-8 py-5 md:py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">발표시간</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">시간</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">발표제목</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">발표자</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">소속</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">14:00 - 14:20</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">기술이전·사업화 지원제도 소개</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">정해림 차장</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">기술보증기금</td>
                  </tr>
                  <tr className="bg-blue-50 border-b border-gray-100 hover:bg-blue-100 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">14:20 - 14:40</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">스마트팩토리, 클라우드 보안</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">최윤호 교수</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">부산대학교</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">14:40 - 15:00</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">컴퓨터비전, 멀티모달 기반 영상 처리 및 생성</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">전상률 교수</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">부산대학교</td>
                  </tr>
                  <tr className="bg-blue-50 border-b border-gray-100 hover:bg-blue-100 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">15:00 - 15:20</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">
                      안티드론 시스템 (드론 통신 신호 분석 및 드론 탐지/식별기술)
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">김정창 교수</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">국립한국해양대학교</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">15:20 - 15:40</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">AI 원천 및 응용기술, 해양 AI 특화 등</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-700">김민호 교수</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">국립한국해양대학교</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-lg">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative px-6 md:px-8 py-10 md:py-12 text-center text-white">
              <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">참가 신청 및 문의</h2>
                <p className="text-base md:text-xl text-blue-100">
                  기술사업화 유망기술에 대한 상세한 정보와 상담을 원하시면 지금 신청하세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-8 py-3 text-lg font-semibold"
                    onClick={() => setActiveTab('application')}
                  >
                    참가 신청하기
                  </Button>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">문의: 070-4618-6739 | 이메일: dypark@gooditl.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Showcase */}
    {activeTab === 'showcase' && (
      <ShowcaseTechList isAdmin={isAdmin} onConsultationSubmit={handleConsultationSubmit} />
    )}

    {/* Technology (patents) */}
    {activeTab === 'technology' && (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">특허목록</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <PatentTable onConsultationSubmit={handleConsultationSubmit} />
      </div>
    )}

    {/* Application forms */}
    {activeTab === 'application' && (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">참가/상담신청</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 참가신청 폼 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>참가신청</span>
              </CardTitle>
              <CardDescription>2025 대학 기술사업화 유망기술 설명회 참가를 신청하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">회사 정보</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">회사명 *</label>
                    <Input 
                      placeholder="회사명을 입력하세요" 
                      required 
                      value={participantForm.companyName}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">대표자명 *</label>
                    <Input 
                      placeholder="대표자명을 입력하세요" 
                      required 
                      value={participantForm.ceoName}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, ceoName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">설립일</label>
                    <Input 
                      type="date" 
                      value={participantForm.establishmentDate}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value)
                        const minDate = new Date('1800-01-01')
                        const maxDate = new Date('2099-12-31')
                        
                        if (selectedDate < minDate) {
                          alert('설립일은 1800년 1월 1일 이후로 입력해주세요.')
                          return
                        }
                        if (selectedDate > maxDate) {
                          alert('설립일은 2099년 12월 31일 이전으로 입력해주세요.')
                          return
                        }
                        
                        setParticipantForm(prev => ({ ...prev, establishmentDate: e.target.value }))
                      }}
                      min="1800-01-01"
                      max="2099-12-31"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">회사전화</label>
                    <Input 
                      placeholder="02-1234-5678" 
                      value={participantForm.companyPhone}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, companyPhone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">팩스전화</label>
                    <Input 
                      placeholder="02-1234-5679" 
                      value={participantForm.companyFax}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, companyFax: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">직원수</label>
                    <Input 
                      placeholder="예: 50명" 
                      value={participantForm.employeeCount}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, employeeCount: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">사업분야</label>
                    <Input 
                      placeholder="예: 소프트웨어 개발업" 
                      value={participantForm.businessType}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, businessType: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">주소</label>
                    <Input 
                      placeholder="회사 주소를 입력하세요" 
                      value={participantForm.companyAddress}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, companyAddress: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">담당자 정보</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">담당자명 *</label>
                    <Input 
                      placeholder="담당자명을 입력하세요" 
                      required 
                      value={participantForm.contactName}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, contactName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">부서(직위)</label>
                    <Input 
                      placeholder="예: 기술개발팀 과장" 
                      value={participantForm.departmentPosition}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, departmentPosition: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">휴대폰번호 *</label>
                    <Input 
                      placeholder="010-1234-5678" 
                      required 
                      value={participantForm.mobilePhone}
                      onChange={(e) => setParticipantForm(prev => ({ ...prev, mobilePhone: e.target.value }))}
                    />
                  </div>
                                      <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">이메일 *</label>
                      <Input 
                        type="email" 
                        placeholder="example@company.com" 
                        required 
                        value={participantForm.email}
                        onChange={(e) => setParticipantForm(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                onClick={handleParticipantSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '참가신청'}
              </Button>
            </CardContent>
          </Card>

          {/* 기술상담신청 폼 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>기술상담신청</span>
              </CardTitle>
              <CardDescription>관심 기술에 대한 상담을 신청하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">회사 정보</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">회사명 *</label>
                    <Input 
                      placeholder="회사명을 입력하세요" 
                      required 
                      value={technologyForm.companyName}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">대표자명 *</label>
                    <Input 
                      placeholder="대표자명을 입력하세요" 
                      required 
                      value={technologyForm.ceoName}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, ceoName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">설립일</label>
                    <Input 
                      type="date" 
                      value={technologyForm.establishmentDate}
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value)
                        const minDate = new Date('1800-01-01')
                        const maxDate = new Date('2099-12-31')
                        
                        if (selectedDate < minDate) {
                          alert('설립일은 1800년 1월 1일 이후로 입력해주세요.')
                          return
                        }
                        if (selectedDate > maxDate) {
                          alert('설립일은 2099년 12월 31일 이전으로 입력해주세요.')
                          return
                        }
                        
                        setTechnologyForm(prev => ({ ...prev, establishmentDate: e.target.value }))
                      }}
                      min="1800-01-01"
                      max="2099-12-31"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">회사전화</label>
                    <Input 
                      placeholder="02-1234-5678" 
                      value={technologyForm.companyPhone}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, companyPhone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">팩스전화</label>
                    <Input 
                      placeholder="02-1234-5679" 
                      value={technologyForm.companyFax}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, companyFax: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">직원수</label>
                    <Input 
                      placeholder="예: 50명" 
                      value={technologyForm.employeeCount}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, employeeCount: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">사업분야</label>
                    <Input 
                      placeholder="예: 소프트웨어 개발업" 
                      value={technologyForm.businessType}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, businessType: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">주소</label>
                    <Input 
                      placeholder="회사 주소를 입력하세요" 
                      value={technologyForm.companyAddress}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, companyAddress: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">담당자 정보</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">담당자명 *</label>
                    <Input 
                      placeholder="담당자명을 입력하세요" 
                      required 
                      value={technologyForm.contactName}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, contactName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">부서(직위)</label>
                    <Input 
                      placeholder="예: 기술개발팀 과장" 
                      value={technologyForm.departmentPosition}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, departmentPosition: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">휴대폰번호 *</label>
                    <Input 
                      placeholder="010-1234-5678" 
                      required 
                      value={technologyForm.mobilePhone}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, mobilePhone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">이메일 *</label>
                    <Input 
                      type="email" 
                      placeholder="example@company.com" 
                      required 
                      value={technologyForm.email}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">기술상담 정보</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">희망기술명 *</label>
                    <Input 
                      placeholder="상담받고 싶은 기술명을 입력하세요" 
                      required 
                      value={technologyForm.desiredTechnology}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, desiredTechnology: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">수요기술 내용 *</label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                      placeholder="기술 도입 목적, 적용 분야, 기대 효과 등을 구체적으로 작성해주세요"
                      required
                      value={technologyForm.technologyRequirements}
                      onChange={(e) => setTechnologyForm(prev => ({ ...prev, technologyRequirements: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                onClick={handleTechnologySubmit}
                disabled={isTechnologySubmitting}
              >
                {isTechnologySubmitting ? '제출 중...' : '기술상담신청'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                <strong>문의:</strong> 070-4618-6739 |<strong className="ml-4">이메일:</strong> dypark@gooditl.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Directions */}
    {activeTab === 'directions' && (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">오시는길</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>행사장 정보</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <div className="font-medium">부산 벡스코(BEXCO)</div>
                  <div className="text-sm text-gray-600">2전시장 3층 회의실(325호)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <div className="font-medium">주소</div>
                  <div className="text-sm text-gray-600">
                    부산광역시 해운대구 APEC로 55
                    <br />
                    부산전시컨벤션센터(BEXCO)
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <div className="font-medium">문의전화</div>
                  <div className="text-sm text-gray-600">070-4618-6738</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>교통편 안내</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">🚗 자가용 이용시</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 경부고속도로 → 부산IC → 해운대 방면</li>
                  <li>• 남해고속도로 → 서부산IC → 해운대 방면</li>
                  <li>• 벡스코 주차장 이용 가능</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚌 대중교통 이용시</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 지하철 2호선 센텀시티역 3번 출구</li>
                  <li>• 버스: 1003, 139, 140, 239번 등</li>
                  <li>• 벡스코 정류장 하차</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚄 KTX 이용시</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 부산역 → 지하철 1호선 → 서면역 → 2호선 환승 → 센텀시티역</li>
                  <li>• 소요시간: 약 40분</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floor plan image above the map */}
        <Card>
          <CardHeader>
            <CardTitle>벡스코 전시장 안내도</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-lg border">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rw67xpqd7kJuzokx5B81nnAy22Dg9b.png"
                alt="벡스코 제2전시장 3F 안내도: 5A~5E홀, 로비 및 부스 위치"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </CardContent>
        </Card>

        {/* Map placeholder
        <Card>
          <CardHeader>
            <CardTitle>위치 지도</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="font-medium">지도가 여기에 표시됩니다</p>
                <p className="text-sm">부산 벡스코(BEXCO) 2전시장</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    )}

    {/* Admin */}
    {activeTab === 'admin' && isAdmin && (
      <AdminDashboard consultationApplications={consultationApplications} />
    )}
  </main>

  {/* Login modal */}
  <AdminLoginModal
    isOpen={loginOpen}
    onClose={() => setLoginOpen(false)}
    onLogin={() => {
      setIsAdmin(true)
    }}
  />
</div>
)
}
