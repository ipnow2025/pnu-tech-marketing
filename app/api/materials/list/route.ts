import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

type MaterialItem = {
  id: number
  name: string
  size: number
  type?: string
  url: string
  extension?: string
  uploadedBy?: string
  description?: string
  createdAt: string
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ items: [] as MaterialItem[] }, { status: 200 })
    }

    // 데이터베이스에서 파일 목록 조회 (BLOB 데이터 제외)
    const sql = `
      SELECT 
        id, file_name, file_size, file_type, file_extension,
        uploaded_by, description, created_at
      FROM pnu_techfair_materials 
      WHERE showcase_id = ?
      ORDER BY created_at DESC
    `
    
    const materials = await query(sql, [parseInt(id)]) as any[]

    const items: MaterialItem[] = materials.map((m) => ({
      id: m.id,
      name: m.file_name,
      size: m.file_size,
      type: m.file_type,
      url: `/api/materials/download/${m.id}`, // 다운로드 API URL
      extension: m.file_extension,
      uploadedBy: m.uploaded_by,
      description: m.description,
      createdAt: m.created_at
    }))

    return NextResponse.json({ items }, { status: 200 })
    
  } catch (error) {
    console.error('자료 목록 조회 오류:', error)
    return NextResponse.json({ items: [] as MaterialItem[] }, { status: 200 })
  }
}
