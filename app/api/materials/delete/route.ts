import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/database"

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { error: "삭제할 자료 ID가 필요합니다." },
        { status: 400 }
      )
    }

    // 파일이 존재하는지 확인
    const selectSql = `
      SELECT id FROM pnu_techfair_materials 
      WHERE id = ? AND is_deleted = FALSE
    `
    
    const materials = await query(selectSql, [parseInt(id)]) as any[]
    
    if (materials.length === 0) {
      return NextResponse.json(
        { error: "해당 자료를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    // 소프트 삭제: 데이터베이스에서 is_deleted = TRUE로 설정
    const updateSql = `
      UPDATE pnu_techfair_materials 
      SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `
    
    const result = await query(updateSql, [parseInt(id)]) as any
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "자료 삭제에 실패했습니다." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "자료가 성공적으로 삭제되었습니다."
    })
    
  } catch (error) {
    console.error('자료 삭제 오류:', error)
    return NextResponse.json(
      { error: "자료 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
