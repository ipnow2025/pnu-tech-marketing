"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface PatentRelatedPatentsAnalysisProps {
  applicantCount?: Array<{
    apply_cnt: number
    register_cnt: number
    related_people_code: string
    name: string
    nation_name: string
  }>
  numberOfYear?: Array<{
    year: number
    apply_count: number
    register_count: number
    f_apply_count: number
    f_register_count: number
  }>
  ipcNumber?: Array<{
    ipc_code: string
    cnt: number
  }>
  patentGradeInfo?: Array<{
    sm_grade: string
    cnt: number
    tear: number
  }>
}

const COLORS = ['#8884d8', '#82ca9d', '#fb923c', '#f97316', '#8dd1e1', '#d084d0']

export function PatentRelatedPatentsAnalysis({
  applicantCount = [],
  numberOfYear = [],
  ipcNumber = [],
  patentGradeInfo = []
}: PatentRelatedPatentsAnalysisProps) {
  // 1. 특허권자별 특허 건수 차트 데이터
  const applicantChartData = applicantCount.map(item => ({
    name: item.name,
    출원건수: item.apply_cnt,
    등록건수: item.register_cnt
  }))

  // 2. 연도별 특허 건수 차트 데이터
  const yearChartData = numberOfYear.map(item => ({
    year: item.year.toString(),
    출원건수: item.apply_count,
    등록건수: item.register_count
  }))

  // 3. IPC 분포 현황 차트 데이터 (10개 이하면 전체, 초과시 상위 10개)
  const ipcChartData = ipcNumber
    .sort((a, b) => b.cnt - a.cnt) // 건수 기준 내림차순 정렬
    .slice(0, ipcNumber.length <= 10 ? ipcNumber.length : 10) // 10개 이하면 전체, 초과시 상위 10개
    .map(item => ({
      name: item.ipc_code,
      value: item.cnt
    }))

  // 4. 연도별 국내&해외기업 특허 건수 차트 데이터
  const domesticOverseasData = numberOfYear.map(item => ({
    year: item.year.toString(),
    국내: item.apply_count,
    해외: item.f_apply_count
  }))

  // 5. 등록건에 대한 특허 등급 정보 차트 데이터
  const gradeChartData = patentGradeInfo.map(item => ({
    grade: item.sm_grade,
    등록건수: item.cnt
  }))

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-red-200/50 dark:border-slate-600/50 pb-4">
        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart className="h-5 w-5 text-red-600 dark:text-red-400" />
          본 특허와 연관성이 깊은 특허에 대한 분석 정보
        </CardTitle>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">연관 특허들의 통계적 분석과 시각화</p>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {/* 1. 특허권자별 특허 건수 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
            <div className="w-2 h-4 bg-red-400 rounded-full"></div>
            특허권자별 특허 건수
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="출원건수" fill="#1e40af" />
                <Bar dataKey="등록건수" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. 연도별 특허 건수 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
            <div className="w-2 h-4 bg-red-400 rounded-full"></div>
            연도별 특허 건수
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="출원건수" fill="#1e40af" />
                <Bar dataKey="등록건수" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. IPC 분포 현황 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
            <div className="w-2 h-4 bg-red-400 rounded-full"></div>
            IPC 분포 현황
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ipcChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ipcChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. 연도별 국내&해외기업 특허 건수 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
            <div className="w-2 h-4 bg-red-400 rounded-full"></div>
            연도별 국내&해외기업 특허 건수
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={domesticOverseasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="국내" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="해외" stroke="#60a5fa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. 등록건에 대한 특허 등급 정보 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
            <div className="w-2 h-4 bg-red-400 rounded-full"></div>
            등록건에 대한 특허 등급 정보
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="등록건수" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
