"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ArrowDownToLine, ArrowUpToLine, UploadCloud, FileIcon, Download } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { PatentConsultationModal } from "./patent-consultation-modal"
import type { Patent } from "./patent-types"

type ShowcaseType = "발표" | "출품"

interface ShowcaseItem {
  id: number
  title: string
  type: ShowcaseType
  techField: string
  presenter: string
  affiliation: string
  summary: string
  time?: string
  room?: string
  booth?: string
  image: string
  applicationNumber?: string
}

interface MaterialItem {
  name: string
  size: number
  type?: string
  url?: string
  local?: boolean
  data?: Blob
}

// 샘플 데이터
const data: ShowcaseItem[] = [
  { id: 1, title: "기술이전·사업화 지원제도 소개", type: "발표", techField: "기타", presenter: "정해림 차장", affiliation: "기술보증기금", summary: "기술이전·사업화 지원제도 전반 및 기업 활용 방법.", time: "14:00 - 14:20", room: "세션룸 A", image: "/placeholder.svg?height=240&width=480" },
  { id: 2, title: "스마트팩토리, 클라우드 보안", type: "발표", techField: "정보/통신", presenter: "최윤호 교수", affiliation: "부산대학교", summary: "클라우드 보안 아키텍처 및 적용 방안.", time: "14:20 - 14:40", room: "세션룸 A", image: "/placeholder.svg?height=240&width=480" },
  { id: 3, title: "컴퓨터비전, 멀티모달 기반 영상 처리 및 생성", type: "발표", techField: "정보/통신", presenter: "전상률 교수", affiliation: "부산대학교", summary: "멀티모달 학습과 응용.", time: "14:40 - 15:00", room: "세션룸 A", image: "/placeholder.svg?height=240&width=480" },
  { id: 4, title: "안티드론 시스템", type: "발표", techField: "정보/통신", presenter: "김정창 교수", affiliation: "국립한국해양대학교", summary: "RF 신호 분석 기반 탐지/식별.", time: "15:00 - 15:20", room: "세션룸 A", image: "/placeholder.svg?height=240&width=480" },
  { id: 5, title: "AI 원천 및 응용기술, 해양 AI 특화 등", type: "발표", techField: "정보/통신", presenter: "김민호 교수", affiliation: "국립한국해양대학교", summary: "해양 특화 데이터/모델.", time: "15:20 - 15:40", room: "세션룸 A", image: "/placeholder.svg?height=240&width=480" },
  { id: 206, title: "광역 재귀 반사 필름의 불량 탐지를 위한 인공지능 비전 시스템 및 방법", type: "출품", techField: "정보/통신", presenter: "최윤호 교수님", affiliation: "부산대학교", summary: "광역 재귀반사 필름 불량 탐지 인공지능 비전 시스템", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2022-0133393" },
  { id: 201, title: "드론 통신신호 분석을 이용한 드론 탐지 방법 및 장치", type: "출품", techField: "정보/통신", presenter: "김정창 교수님", affiliation: "해양대학교", summary: "RF 통신신호 구조/프로토콜 분석 기반 드론 탐지·식별", booth: "E-01", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2024-0094859" },
  { id: 202, title: "인공신경망 기반 집중도분석 및 학습 집중도 모니터링 시스템", type: "출품", techField: "정보/통신", presenter: "김민호 교수님", affiliation: "해양대학교", summary: "생체/환경 신호 기반 집중도 분석 및 학습 모니터링", booth: "E-02", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2025-0025674" },
  { id: 203, title: "저해상도 기후 예측 소프트웨어의 로컬 설치 방법", type: "출품", techField: "기타", presenter: "정성욱 교수님", affiliation: "창원대학교", summary: "로컬 디바이스에서 동작하는 경량 기후 예측 시스템", booth: "E-03", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2021-0146196" },
  { id: 205, title: "NFT를 활용한 블루투스 장치 인증 방법 및 시스템", type: "출품", techField: "정보/통신", presenter: "정성욱 교수님", affiliation: "창원대학교", summary: "NFT/블록체인 기반 분산형 장치 인증", booth: "E-05", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2022-0072129" },
  { id: 204, title: "유동 전지용 다공체 전극의 위치에 따른 성능 평가 시스템", type: "출품", techField: "전기/전자", presenter: "박희성 교수님", affiliation: "창원대학교", summary: "유동전지 환경 모사 및 전극 위치별 성능 정밀 평가", booth: "E-04", image: "/placeholder.svg?height=240&width=480", applicationNumber: "10-2022-0086729" },
]

// 출품 자료 텍스트(샘플)
const EXHIBIT_DOCS: Record<number, string> = {
  201: `드론 통신신호 분석 기반 드론 탐지 방법 및 장치 - 소개 자료`,
  202: `인공신경망 기반 집중도 분석 및 학습 모니터링 시스템 - 소개 자료`,
  203: `저해상도 기후 예측 소프트웨어의 로컬 설치 방법 - 소개 자료`,
  204: `유동 전지용 다공체 전극의 위치에 따른 성능 평가 시스템 - 소개 자료`,
  205: `NFT를 활용한 블루투스 장치 인증 방법 및 시스템 - 소개 자료`,
}

const LOCAL_KEY_PREFIX = "materials-local-"

async function getLocalMaterials(id: number): Promise<MaterialItem[]> {
  try {
    const { get } = await import("idb-keyval")
    return ((await get<MaterialItem[]>(LOCAL_KEY_PREFIX + id)) as MaterialItem[] | undefined) || []
  } catch {
    return []
  }
}
async function addLocalMaterial(id: number, file: File): Promise<MaterialItem[]> {
  const { get, set } = await import("idb-keyval")
  const list = ((await get<MaterialItem[]>(LOCAL_KEY_PREFIX + id)) as MaterialItem[] | undefined) || []
  list.push({ name: file.name, size: file.size, type: file.type, local: true, data: file })
  await set(LOCAL_KEY_PREFIX + id, list)
  return list
}
function kb(size: number) {
  return `${Math.max(1, Math.round(size / 1024))} KB`
}

export default function ShowcaseTechList({
  isAdmin = false,
  onConsultationSubmit,
}: {
  isAdmin?: boolean
  onConsultationSubmit?: (data: any) => void
}) {
  const topRef = useRef<HTMLDivElement | null>(null)
  const presentationsRef = useRef<HTMLDivElement | null>(null)
  const exhibitsRef = useRef<HTMLDivElement | null>(null)

  const [presentSearch, setPresentSearch] = useState("")
  const [exhibitSearch, setExhibitSearch] = useState("")

  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null)
  const [selectionTitle, setSelectionTitle] = useState<string | undefined>(undefined)
  const [selectedExhibit, setSelectedExhibit] = useState<ShowcaseItem | null>(null)
  const [selectedPresentation, setSelectedPresentation] = useState<ShowcaseItem | null>(null)

  const [materials, setMaterials] = useState<Record<number, MaterialItem[]>>({})
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const uploadTargetIdRef = useRef<number | null>(null)

  const presentations = useMemo(() => {
    const list = data.filter((d) => d.type === "발표")
    if (!presentSearch) return list
    const q = presentSearch.toLowerCase()
    return list.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.presenter.toLowerCase().includes(q) ||
        d.affiliation.toLowerCase().includes(q) ||
        (d.time || "").toLowerCase().includes(q),
    )
  }, [presentSearch])

  const exhibits = useMemo(() => {
    const list = data.filter((d) => d.type === "출품")
    if (!exhibitSearch) return list
    const q = exhibitSearch.toLowerCase()
    return list.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.presenter.toLowerCase().includes(q) ||
        d.affiliation.toLowerCase().includes(q) ||
        (d.booth || "").toLowerCase().includes(q),
    )
  }, [exhibitSearch])

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const load = async () => {
      const next: Record<number, MaterialItem[]> = {}
      for (const p of data) {
        let remote: MaterialItem[] = []
        try {
          const res = await fetch(`/api/materials/list?id=${p.id}`, { cache: "no-store" })
          if (res.ok) {
            const json = (await res.json()) as { items: MaterialItem[] }
            remote = json.items || []
          }
        } catch {}
        const local = await getLocalMaterials(p.id)
        next[p.id] = [...remote, ...local]
      }
      
      setMaterials(next)
    }
    load()
  }, [])

  const openUpload = (id: number) => {
    uploadTargetIdRef.current = id
    fileInputRef.current?.click()
  }

  const onUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.currentTarget.value = ""
    const id = uploadTargetIdRef.current
    if (!file || !id) return

    // 해당 항목의 타입 확인
    const item = data.find(d => d.id === id)
    if (!item) return

    let added: MaterialItem | null = null
    try {
      const form = new FormData()
      form.append("id", String(id))
      form.append("file", file)
      form.append("showcaseType", item.type) // 발표 또는 출품 타입 전달
      
      const res = await fetch("/api/materials/upload", { method: "POST", body: form })
      if (res.ok) {
        const d = (await res.json()) as { url: string; name: string; size: number; type?: string }
        added = { name: d.name, size: d.size, type: d.type, url: d.url }
      } else {
        const errorData = await res.json()
        if (errorData.error === "file-too-large") {
          alert("파일 크기가 너무 큽니다. 50MB 이하의 파일만 업로드 가능합니다.")
          return
        } else if (errorData.error === "file-type-not-allowed") {
          alert("지원하지 않는 파일 형식입니다.")
          return
        } else {
          alert("업로드에 실패했습니다.")
          return
        }
      }
    } catch {}

    if (!added) {
      const list = await addLocalMaterial(id, file)
      setMaterials((prev) => ({ ...prev, [id]: list }))
      alert("원격 업로드가 미구성/실패하여 브라우저에 로컬로 저장했습니다.")
      return
    }

    // 업로드 성공 시 자료 목록 새로고침
    try {
      const res = await fetch(`/api/materials/list?id=${id}`, { cache: "no-store" })
      if (res.ok) {
        const json = (await res.json()) as { items: MaterialItem[] }
        const remote = json.items || []
        const local = await getLocalMaterials(id)
        setMaterials((prev) => ({ ...prev, [id]: [...remote, ...local] }))
      }
    } catch {}

    alert("업로드 완료! 기존 파일이 교체되었습니다.")
  }

  const downloadMaterial = (m: MaterialItem) => {
    if (m.url) {
      const a = document.createElement("a")
      a.href = m.url
      a.download = m.name
      document.body.appendChild(a)
      a.click()
      a.remove()
      return
    }
    if (m.local && m.data) {
      const url = URL.createObjectURL(m.data)
      const a = document.createElement("a")
      a.href = url
      a.download = m.name
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }
  const downloadFirst = (id: number) => {
    const files = materials[id] || []
    if (files.length > 0) downloadMaterial(files[0])
  }
  const downloadExhibitDoc = (item: ShowcaseItem) => {
    const content = EXHIBIT_DOCS[item.id]
    if (!content) {
      alert("다운로드할 자료가 없습니다.")
      return
    }
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    const safeName = item.title.replace(/[\\/:*?"<>|]/g, "_")
    a.download = `${safeName}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function exhibitToPatent(item: ShowcaseItem): Patent {
    return {
      techField: "",
      patentName: item.title,
      transfer: true,
      exclusive: false,
      normal: false,
      fee: "",
      applicationNumber: item.applicationNumber || "",
      registrationNumber: "",
      applicationDate: "",
      expiryDate: "",
    }
  }

  const openExhibitConsultation = (item: ShowcaseItem) => {
    setSelectedPresentation(null)
    setSelectedExhibit(item)
    setSelectedPatent(exhibitToPatent(item))
    setSelectionTitle(item.title)
    setShowConsultationModal(true)
  }
  const openPresentationConsultation = (item: ShowcaseItem) => {
    setSelectedExhibit(null)
    setSelectedPatent(null)
    setSelectedPresentation(item)
    setSelectionTitle(item.title)
    setShowConsultationModal(true)
  }

  const handleConsultationSubmitInternal = (consultationData: any) => {
    const enriched = {
      ...consultationData,
      ...(selectedExhibit
        ? {
            origin: "exhibit",
            exhibit: {
              id: selectedExhibit.id,
              title: selectedExhibit.title,
              techField: selectedExhibit.techField,
              presenter: selectedExhibit.presenter,
              affiliation: selectedExhibit.affiliation,
              booth: selectedExhibit.booth,
            },
          }
        : {}),
      ...(selectedPresentation
        ? {
            origin: "presentation",
            presentation: {
              id: selectedPresentation.id,
              title: selectedPresentation.title,
              techField: selectedPresentation.techField,
              presenter: selectedPresentation.presenter,
              affiliation: selectedPresentation.affiliation,
              time: selectedPresentation.time,
              room: selectedPresentation.room,
            },
          }
        : {}),
    }

    onConsultationSubmit?.(enriched)
    setShowConsultationModal(false)
    alert("기술상담 신청이 완료되었습니다. 관리자 검토 후 연락드리겠습니다.")
  }

  return (
    <div ref={topRef} className="space-y-8">
      {/* 헤딩 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 break-keep">발표/출품 기술목록</h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
      </div>

      {/* 섹션 내비게이션 */}
      <Card className="sticky top-2 z-10">
        <CardContent className="p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => scrollTo(presentationsRef)}>
              <ArrowDownToLine className="w-4 h-4 mr-1" />
              발표자 기술목록
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => scrollTo(exhibitsRef)}>
              <ArrowDownToLine className="w-4 h-4 mr-1" />
              출품 기술목록
            </Button>
          </div>

          {isAdmin && (
            <input
              ref={fileInputRef}
              type="file"
              accept=".ppt,.pptx,.hwp,.hwpx,.pdf,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/x-hwp"
              className="hidden"
              onChange={onUploadChange}
            />
          )}

          <Button size="sm" variant="ghost" onClick={() => scrollTo(topRef)}>
            <ArrowUpToLine className="w-4 h-4 mr-1" />
            맨 위로
          </Button>
        </CardContent>
      </Card>

      {/* 발표자 기술목록 */}
      <div ref={presentationsRef} id="presentations" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold break-keep">발표자 기술목록</h3>
          <div className="relative w-full max-w-md">
            <Input
              value={presentSearch}
              onChange={(e) => setPresentSearch(e.target.value)}
              placeholder="시간, 소속, 발표자, 기술명 검색"
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 sm:hidden">
          {presentations.map((item) => {
            const files = materials[item.id] || []
            return (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white border-transparent">발표</Badge>
                    <span className="text-xs text-gray-600">{item.time}</span>
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">
                    <span className="font-medium text-gray-800">{item.presenter}</span>{" "}
                    <span className="mx-1">·</span>
                    <span>{item.affiliation}</span>
                  </div>
                  <div className="text-base font-semibold text-gray-900 whitespace-normal break-words leading-relaxed">
                    {item.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {files.length === 0 ? (
                      <span className="text-xs text-gray-500">자료 없음</span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => downloadMaterial(files[0])}
                      >
                        <FileIcon className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-xs">{files[0].name}</span>
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openPresentationConsultation(item)} className="flex-1">
                      상담신청
                    </Button>
                    {files.length > 0 && (
                      <Button size="sm" variant="outline" className="bg-transparent flex-1" onClick={() => downloadFirst(item.id)}>
                        <Download className="w-4 h-4 mr-1" />
                        다운받기
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {presentations.length === 0 && <div className="text-center text-sm text-gray-500 py-6">검색 결과가 없습니다.</div>}
        </div>

        {/* Desktop/tablet table */}
        <div className="hidden sm:block border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px] text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                  <TableHead className="min-w-[160px] whitespace-nowrap">시간</TableHead>
                  <TableHead className="min-w-[180px] whitespace-nowrap">소속</TableHead>
                  <TableHead className="min-w-[140px] whitespace-nowrap">발표자</TableHead>
                  <TableHead className="min-w-[360px]">기술명</TableHead>
                  <TableHead className="min-w-[240px]">자료</TableHead>
                  <TableHead className="min-w-[220px] text-center pr-6">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {presentations.map((item, idx) => {
                  const files = materials[item.id] || []
                  return (
                    <TableRow key={item.id} className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}>
                      <TableCell className="text-center">{idx + 1}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{item.time}</TableCell>
                      <TableCell className="text-gray-700 break-keep whitespace-nowrap">{item.affiliation}</TableCell>
                      <TableCell className="text-gray-700 break-keep whitespace-nowrap">{item.presenter}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-0">
                          <Badge className="bg-blue-600 text-white border-transparent shrink-0 whitespace-nowrap">발표</Badge>
                          <span className="text-gray-900 font-medium break-keep whitespace-nowrap md:whitespace-normal">{item.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2 items-center">
                          {files.length === 0 && <span className="text-xs text-gray-500">자료 없음</span>}
                          {files.length > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                              onClick={() => downloadMaterial(files[0])}
                              title={`${files[0].name} (${kb(files[0].size)})`}
                            >
                              <FileIcon className="w-3.5 h-3.5 mr-2" />
                              <span className="max-w-[140px] truncate">{files[0].name}</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          {files.length > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => downloadFirst(item.id)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              다운받기
                            </Button>
                          )}
                          <Button size="sm" onClick={() => openPresentationConsultation(item)} className="shrink-0">
                            상담신청
                          </Button>
                          {isAdmin && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0" onClick={() => openUpload(item.id)}>
                              <UploadCloud className="w-4 h-4 mr-1" />
                              업로드
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {presentations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 출품 기술목록 */}
      <div ref={exhibitsRef} id="exhibits" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="text-2xl font-bold break-keep">출품 기술목록</h3>
          <div className="relative w-full md:w-72">
            <Input
              value={exhibitSearch}
              onChange={(e) => setExhibitSearch(e.target.value)}
              placeholder="기술명, 담당, 소속, 부스 검색"
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 sm:hidden">
          {exhibits.map((item) => {
            const files = materials[item.id] || []
            return (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-600 text-white border-transparent">출품</Badge>
                    {item.booth && <span className="text-xs text-gray-600">부스 {item.booth}</span>}
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">
                    <span className="font-medium text-gray-800">{item.presenter}</span>{" "}
                    <span className="mx-1">·</span>
                    <span>{item.affiliation}</span>
                  </div>
                  <div className="text-base font-semibold text-gray-900 whitespace-normal break-words leading-relaxed">
                    {item.title}
                  </div>
                  {item.summary && <div className="text-sm text-gray-600 whitespace-normal break-words">{item.summary}</div>}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openExhibitConsultation(item)} className="flex-1">
                      상담신청
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent flex-1"
                      onClick={() => {
                        if (files.length === 0) downloadExhibitDoc(item)
                        else downloadFirst(item.id)
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      다운받기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {exhibits.length === 0 && <div className="text-center text-sm text-gray-500 py-6">검색 결과가 없습니다.</div>}
        </div>

        {/* Desktop/tablet table */}
        <div className="hidden sm:block border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-[780px] text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="min-w-[60px] w-[60px] text-center">번호</TableHead>
                  <TableHead className="min-w-[360px]">기술명</TableHead>
                  <TableHead className="min-w-[140px] whitespace-nowrap">담당</TableHead>
                  <TableHead className="min-w-[180px] whitespace-nowrap">소속</TableHead>
                  <TableHead className="min-w-[220px] text-center pr-6">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exhibits.map((item, idx) => {
                  const files = materials[item.id] || []
                  return (
                    <TableRow key={item.id} className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}>
                      <TableCell className="text-center">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-600 text-white border-transparent shrink-0 whitespace-nowrap">출품</Badge>
                          <span className="text-gray-900 font-medium break-keep whitespace-nowrap md:whitespace-normal">{item.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 hidden sm:block">{item.summary}</div>
                      </TableCell>
                      <TableCell className="text-gray-700 break-keep whitespace-nowrap">{item.presenter}</TableCell>
                      <TableCell className="text-gray-700 break-keep whitespace-nowrap">{item.affiliation}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          {files.length > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent"
                              onClick={() => downloadFirst(item.id)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              다운받기
                            </Button>
                          )}
                          <Button size="sm" onClick={() => openExhibitConsultation(item)} className="shrink-0">
                            상담신청
                          </Button>
                          {isAdmin && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0" onClick={() => openUpload(item.id)}>
                              업로드
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {exhibits.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* 상담신청 모달 */}
      <PatentConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
        patent={selectedPatent}
        selectionTitle={selectionTitle}
        presentation={selectedPresentation}
        exhibit={selectedExhibit}
        onSubmit={handleConsultationSubmitInternal}
      />
    </div>
  )
}
