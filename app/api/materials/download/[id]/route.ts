import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    if (!id) {
      return NextResponse.json(
        { error: "파일 ID가 필요합니다." },
        { status: 400 }
      )
    }

    // 데이터베이스에서 파일 정보 조회
    const sql = `
      SELECT file_name, file_size, file_type, file_data 
      FROM pnu_techfair_materials 
      WHERE id = ?
    `
    
    const materials = await query(sql, [parseInt(id)]) as any[]
    
    if (materials.length === 0) {
      return NextResponse.json(
        { error: "파일을 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    const material = materials[0]

    // BLOB 데이터를 Buffer로 변환
    const fileBuffer = Buffer.from(material.file_data)

    // 응답 헤더 설정
    const headers = new Headers()
    headers.set('Content-Type', material.file_type || 'application/octet-stream')
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(material.file_name)}"`)
    headers.set('Content-Length', material.file_size.toString())
    headers.set('Cache-Control', 'no-cache')

    // 파일 데이터 반환
    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    })
    
  } catch (error) {
    console.error('파일 다운로드 오류:', error)
    return NextResponse.json(
      { error: "파일 다운로드 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
