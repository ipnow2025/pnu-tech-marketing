"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, FileText, Download, ChevronDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { patentData } from "./patent-data"
import type { Patent } from "./patent-types"
import { PatentConsultationModal } from "./patent-consultation-modal"
import { PatentReportModal } from "./patent-report-modal"
import { useEffect } from "react"

interface PatentTableProps {
  onConsultationSubmit?: (consultationData: any) => void
}

export function PatentTable({ onConsultationSubmit }: PatentTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null)
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [filters, setFilters] = useState({ techField: "전체", expiryDate: "전체" })

  const techFieldOptions = ["전체", "화학", "전기/전자", "정보/통신", "기계", "재료", "생명과학", "건설/교통", "보건의료", "기타"]
  const expiryDateOptions = ["전체", "2024년", "2025년"]

  const filteredPatents = patentData.filter((patent) => {
    const matchesSearch = patent.patentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTechField = filters.techField === "전체" || patent.techField === filters.techField
    const matchesExpiryDate =
      filters.expiryDate === "전체" ||
      (filters.expiryDate === "2024년" && patent.expiryDate.includes("2024")) ||
      (filters.expiryDate === "2025년" && patent.expiryDate.includes("2025"))
    return matchesSearch && matchesTechField && matchesExpiryDate
  })

  const showPatentDetail = (patent: Patent) => setSelectedPatent(patent)

  const handleConsultationClick = (patent: Patent, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConsultationModal(true)
  }

  const handleConsultationSubmit = (consultationData: any) => {
    onConsultationSubmit?.(consultationData)
    setShowConsultationModal(false)
    alert("기술상담 신청이 완료되었습니다. 관리자 검토 후 연락드리겠습니다.")
  }

  const resetFilters = () => {
    setFilters({ techField: "전체", expiryDate: "전체" })
    setSearchTerm("")
  }

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowConsultationModal(false)
        setSelectedPatent(null)
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 w-full lg:max-w-md relative">
          <Input placeholder="특허기술명 검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-10" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                기술분야: {filters.techField}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {techFieldOptions.map((option) => (
                <DropdownMenuCheckboxItem key={option} checked={filters.techField === option} onCheckedChange={() => setFilters({ ...filters, techField: option })}>
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                만료일: {filters.expiryDate}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {expiryDateOptions.map((option) => (
                <DropdownMenuCheckboxItem key={option} checked={filters.expiryDate === option} onCheckedChange={() => setFilters({ ...filters, expiryDate: option })}>
                  {option}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" onClick={resetFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            초기화
          </Button>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {filteredPatents.map((p, i) => (
          <Card key={`${p.patentName}-${i}`} onClick={() => showPatentDetail(p)}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{p.techField}</span>
                <span className="text-xs text-gray-500">{p.expiryDate}</span>
              </div>
              <div className="text-base font-semibold text-blue-700 whitespace-normal break-words leading-relaxed">{p.patentName}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-500">출원번호</div>
                  <div className="font-mono text-gray-800">{p.applicationNumber}</div>
                </div>
                <div>
                  <div className="text-gray-500">등록번호</div>
                  <div className="font-mono text-gray-800">{p.registrationNumber}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1" 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleConsultationClick(p, e)
                  }}
                >
                  상담신청
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPatents.length === 0 && <div className="text-center text-sm text-gray-500 py-6">검색 결과가 없습니다.</div>}
      </div>

      <div className="flex-col gap-6 relative hidden sm:flex">
        {/* Table (sm and up) */}
        <div className="w-full">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-[1100px] text-sm">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">기술분야</TableHead>
                    <TableHead className="min-w-[380px]">특허기술명</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">기술료</TableHead>
                    <TableHead className="min-w-[160px] whitespace-nowrap">출원번호</TableHead>
                    <TableHead className="min-w-[160px] whitespace-nowrap">등록번호</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">출원일자</TableHead>
                    <TableHead className="min-w-[120px] whitespace-nowrap">정상납부만료일</TableHead>
                    <TableHead className="min-w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatents.length > 0 ? (
                    filteredPatents.map((patent, index) => (
                      <TableRow
                        key={index}
                        className={`transition-colors ${
                          selectedPatent?.patentName === patent.patentName && !showConsultationModal
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : index % 2 === 0
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <TableCell className="text-center font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium break-keep whitespace-nowrap">{patent.techField}</TableCell>
                        <TableCell className="text-blue-600 hover:underline cursor-pointer font-medium break-keep whitespace-nowrap md:whitespace-normal" onClick={() => showPatentDetail(patent)}>
                          {patent.patentName}
                        </TableCell>
                        <TableCell className="font-semibold text-green-600 whitespace-nowrap">{patent.fee}</TableCell>
                        <TableCell className="text-gray-600 font-mono whitespace-nowrap">{patent.applicationNumber}</TableCell>
                        <TableCell className="text-gray-600 font-mono whitespace-nowrap">{patent.registrationNumber}</TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">{patent.applicationDate}</TableCell>
                        <TableCell className="text-gray-600 whitespace-nowrap">{patent.expiryDate}</TableCell>
                        <TableCell>
                          <Button size="sm" onClick={(e) => handleConsultationClick(patent, e)} className="shrink-0">
                            상담신청
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* 특허 상세 모달 */}
        <PatentReportModal 
          isOpen={!!selectedPatent && !showConsultationModal} 
          onClose={() => setSelectedPatent(null)} 
          patent={selectedPatent} 
        />
      </div>

      {/* 상담신청 모달 */}
      <PatentConsultationModal isOpen={showConsultationModal} onClose={() => setShowConsultationModal(false)} patent={selectedPatent} onSubmit={handleConsultationSubmit} />
    </div>
  )
}
