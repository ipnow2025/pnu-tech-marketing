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
      SELECT id, showcase_id, showcase_type, file_name 
      FROM pnu_techfair_materials 
      WHERE id = ?
    `
    
    const materials = await query(selectSql, [parseInt(id)]) as any[]
    
    if (materials.length === 0) {
      return NextResponse.json(
        { error: "해당 자료를 찾을 수 없습니다." },
        { status: 404 }
      )
    }

    const material = materials[0]

    // 하드 삭제: 데이터베이스에서 완전히 제거
    const deleteSql = `
      DELETE FROM pnu_techfair_materials 
      WHERE id = ?
    `
    
    const result = await query(deleteSql, [parseInt(id)]) as any
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "자료 삭제에 실패했습니다." },
        { status: 500 }
      )
    }

    // 삭제 성공 시 응답에 삭제된 자료 정보 포함
    return NextResponse.json({
      success: true,
      message: "자료가 성공적으로 삭제되었습니다.",
      deletedMaterial: {
        id: parseInt(id),
        showcaseId: material.showcase_id,
        showcaseType: material.showcase_type,
        fileName: material.file_name
      }
    })
    
  } catch (error) {
    console.error('자료 삭제 오류:', error)
    return NextResponse.json(
      { error: "자료 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
