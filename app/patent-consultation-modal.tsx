"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, FileText, Building, User } from 'lucide-react'
import type { Patent } from "./patent-types"

interface PatentConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  // 특허 기반 상담일 경우 전달 (출품/특허목록)
  patent: Patent | null
  // 특허가 아닐 때(발표 등) 선택 항목의 제목을 전달 (예: 발표 제목)
  selectionTitle?: string
  // 발표자 정보 (발표 상담일 경우)
  presentation?: {
    id: number
    title: string
    techField: string
    presenter: string
    affiliation: string
    time?: string
    room?: string
  } | null
  // 출품 기술 정보 (출품 상담일 경우)
  exhibit?: {
    id: number
    title: string
    techField: string
    presenter: string
    affiliation: string
    booth?: string
    applicationNumber?: string
  } | null
  onSubmit: (consultationData: any) => void
}

export function PatentConsultationModal({
  isOpen,
  onClose,
  patent,
  onSubmit,
  selectionTitle,
  presentation,
  exhibit,
}: PatentConsultationModalProps) {
  const [formData, setFormData] = useState({
    // 회사 정보
    companyName: "",
    representative: "",
    establishedDate: "",
    companyPhone: "",
    faxPhone: "",
    address: "",
    businessType: "",
    employeeCount: "",

    // 담당자 정보
    contactPerson: "",
    department: "",
    position: "",
    contact: "",
    email: "",

    // 상담 내용
    technologyContent: "",
  })

  // 특허가 없어도(발표 상담 등) 열릴 수 있도록 변경
  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 필수 필드 검증
    if (!formData.companyName || !formData.representative || !formData.contactPerson || 
        !formData.contact || !formData.email || !formData.technologyContent) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    try {
      let apiEndpoint = ''
      let consultationData = {}

      // 상담 유형에 따라 API 엔드포인트와 데이터 구조 결정
      if (presentation) {
        // 발표자 상담신청
        apiEndpoint = '/api/presentation-consultations'
        consultationData = {
          // 발표 정보
          presentationId: presentation.id,
          presentationTitle: presentation.title,
          presentationTechField: presentation.techField,
          presentationPresenter: presentation.presenter,
          presentationAffiliation: presentation.affiliation,
          presentationTime: presentation.time,
          presentationRoom: presentation.room,
          
          // 회사 정보
          companyName: formData.companyName,
          representativeName: formData.representative,
          establishedDate: formData.establishedDate,
          companyPhone: formData.companyPhone,
          faxPhone: formData.faxPhone,
          companyAddress: formData.address,
          businessType: formData.businessType,
          employeeCount: formData.employeeCount,
          
          // 담당자 정보
          contactPerson: formData.contactPerson,
          department: formData.department,
          position: formData.position,
          mobilePhone: formData.contact,
          email: formData.email,
          
          // 상담 내용
          technologyContent: formData.technologyContent
        }
      } else if (exhibit) {
        // 출품 기술 상담신청
        apiEndpoint = '/api/exhibit-consultations'
        consultationData = {
          // 출품 정보
          exhibitId: exhibit.id,
          exhibitTitle: exhibit.title,
          exhibitTechField: exhibit.techField,
          exhibitPresenter: exhibit.presenter,
          exhibitAffiliation: exhibit.affiliation,
          exhibitBooth: exhibit.booth,
          
          // 회사 정보
          companyName: formData.companyName,
          representativeName: formData.representative,
          establishedDate: formData.establishedDate,
          companyPhone: formData.companyPhone,
          faxPhone: formData.faxPhone,
          companyAddress: formData.address,
          businessType: formData.businessType,
          employeeCount: formData.employeeCount,
          
          // 담당자 정보
          contactPerson: formData.contactPerson,
          department: formData.department,
          position: formData.position,
          mobilePhone: formData.contact,
          email: formData.email,
          
          // 상담 내용
          technologyContent: formData.technologyContent
        }
      } else if (patent) {
        // 특허 상담신청
        apiEndpoint = '/api/patent-consultations'
        consultationData = {
          // 특허 정보
          patentTechField: patent.techField || null,
          patentName: patent.patentName || null,
          patentApplicationNumber: patent.applicationNumber || null,
          patentRegistrationNumber: patent.registrationNumber || null,
          patentFee: patent.fee || null,
          patentApplicationDate: patent.applicationDate || null,
          patentExpiryDate: patent.expiryDate || null,
          
          // 회사 정보
          companyName: formData.companyName,
          representativeName: formData.representative,
          establishedDate: formData.establishedDate,
          companyPhone: formData.companyPhone,
          faxPhone: formData.faxPhone,
          companyAddress: formData.address,
          businessType: formData.businessType,
          employeeCount: formData.employeeCount,
          
          // 담당자 정보
          contactPerson: formData.contactPerson,
          department: formData.department,
          position: formData.position,
          mobilePhone: formData.contact,
          email: formData.email,
          
          // 상담 내용
          technologyContent: formData.technologyContent
        }
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      })

      const result = await response.json()

      if (result.success) {
        const typeText = presentation ? '발표자 상담신청' : exhibit ? '출품 기술 상담신청' : '특허 상담신청'
        alert(`${typeText}이 성공적으로 제출되었습니다!`)
        onClose()
        
        // 폼 초기화
        setFormData({
          companyName: "",
          representative: "",
          establishedDate: "",
          companyPhone: "",
          faxPhone: "",
          address: "",
          businessType: "",
          employeeCount: "",
          contactPerson: "",
          department: "",
          position: "",
          contact: "",
          email: "",
          technologyContent: "",
        })
      } else {
        alert(`상담신청 제출에 실패했습니다: ${result.error}`)
      }
    } catch (error) {
      console.error('상담신청 제출 오류:', error)
      alert('상담신청 제출 중 오류가 발생했습니다.')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">기술상담 신청</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">


          {/* 발표자 정보: 발표 상담일 때만 표시 */}
          {presentation && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-800">
                <FileText className="w-5 h-5" />
                선택된 발표 정보
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">발표명</label>
                  <p className="text-indigo-700 font-semibold">{presentation.title}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술분야</label>
                  <p>{presentation.techField}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">발표자</label>
                  <p>{presentation.presenter}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">소속</label>
                  <p>{presentation.affiliation}</p>
                </div>
                {presentation.time && (
                  <div>
                    <label className="font-medium text-gray-600">발표시간</label>
                    <p>{presentation.time}</p>
                  </div>
                )}
                {presentation.room && (
                  <div>
                    <label className="font-medium text-gray-600">발표장소</label>
                    <p>{presentation.room}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 출품 기술 정보: 출품 상담일 때만 표시 */}
          {exhibit && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-800">
                <FileText className="w-5 h-5" />
                선택된 출품 기술 정보
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">출품명</label>
                  <p className="text-emerald-700 font-semibold">{exhibit.title}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">기술분야</label>
                  <p>{exhibit.techField}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">담당</label>
                  <p>{exhibit.presenter}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">소속</label>
                  <p>{exhibit.affiliation}</p>
                </div>
                {exhibit.booth && (
                  <div>
                    <label className="font-medium text-gray-600">부스</label>
                    <p>{exhibit.booth}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 회사 정보 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              회사 정보
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">회사명 *</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="회사명을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">대표자명 *</label>
                <Input
                  value={formData.representative}
                  onChange={(e) => handleInputChange("representative", e.target.value)}
                  placeholder="대표자명을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">설립일</label>
                <Input
                  type="date"
                  value={formData.establishedDate}
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
                    
                    handleInputChange("establishedDate", e.target.value)
                  }}
                  min="1800-01-01"
                  max="2099-12-31"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">회사전화</label>
                <Input
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                  placeholder="02-1234-5678"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">팩스전화</label>
                <Input
                  value={formData.faxPhone}
                  onChange={(e) => handleInputChange("faxPhone", e.target.value)}
                  placeholder="02-1234-5679"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">직원수</label>
                <Input
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                  placeholder="예: 50명"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">사업분야</label>
                <Input
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  placeholder="예: 소프트웨어 개발업"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">주소</label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="회사 주소를 입력하세요"
                />
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">담당자명 *</label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  placeholder="담당자명을 입력하세요"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">부서</label>
                <Input
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  placeholder="예: 기술개발팀"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">직위</label>
                <Input
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="예: 팀장"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">휴대폰번호 *</label>
                <Input
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  placeholder="010-1234-5678"
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">이메일 *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@company.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* 기술상담 내용 */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">기술상담 내용</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">기술 도입 목적 및 적용 분야 *</label>
                <textarea
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  value={formData.technologyContent}
                  onChange={(e) => handleInputChange("technologyContent", e.target.value)}
                  placeholder="기술 도입 목적, 적용 분야, 기대 효과 등을 구체적으로 작성해주세요"
                  required
                />
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              상담신청 제출
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
