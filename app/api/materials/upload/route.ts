import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

type UploadResponse =
  | { url: string; name: string; size: number; type?: string }
  | { error: string }

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const id = String(form.get("id") || "")
    const file = form.get("file") as File | null
    const showcaseType = String(form.get("showcaseType") || "발표") // 발표 또는 출품

    if (!id || !file) {
      return NextResponse.json<UploadResponse>({ error: "invalid-form" }, { status: 400 })
    }

    // 파일 크기 제한 (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json<UploadResponse>({ error: "file-too-large" }, { status: 400 })
    }

    // 허용된 파일 타입 검증
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/x-hwp',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json<UploadResponse>({ error: "file-type-not-allowed" }, { status: 400 })
    }

    // 기존 파일이 있는지 확인
    const existingFileSql = `
      SELECT id FROM pnu_techfair_materials 
      WHERE showcase_id = ? AND is_deleted = FALSE
    `
    const existingFiles = await query(existingFileSql, [parseInt(id)]) as any[]

    // 기존 파일이 있으면 소프트 삭제
    if (existingFiles.length > 0) {
      const deleteSql = `
        UPDATE pnu_techfair_materials 
        SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
        WHERE showcase_id = ? AND is_deleted = FALSE
      `
      await query(deleteSql, [parseInt(id)])
    }

    // 파일 확장자 추출
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
    
    // 파일을 ArrayBuffer로 변환하여 BLOB으로 저장
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 데이터베이스에 파일 정보 저장 (BLOB 포함)
    const insertSql = `
      INSERT INTO pnu_techfair_materials (
        showcase_id, showcase_type, file_name, file_size, file_type, 
        file_extension, file_data, uploaded_by, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const insertParams = [
      parseInt(id),
      showcaseType,
      file.name,
      file.size,
      file.type,
      fileExtension,
      buffer, // BLOB 데이터
      '관리자', // 업로드한 사용자 (나중에 로그인 시스템과 연동)
      `${showcaseType} 자료 - ${file.name}`
    ]

    const result = await query(insertSql, insertParams) as any

    if (!result.insertId) {
      return NextResponse.json<UploadResponse>({ error: "database-save-failed" }, { status: 500 })
    }

    // 다운로드 URL 생성 (API 엔드포인트)
    const downloadUrl = `/api/materials/download/${result.insertId}`

    return NextResponse.json<UploadResponse>(
      { 
        url: downloadUrl, 
        name: file.name, 
        size: file.size, 
        type: file.type 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('파일 업로드 오류:', error)
    return NextResponse.json<UploadResponse>({ error: "upload-failed" }, { status: 500 })
  }
}
