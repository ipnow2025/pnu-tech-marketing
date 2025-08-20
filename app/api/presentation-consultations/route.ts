import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 필수 필드 검증
    const requiredFields = [
      'presentationId', 'presentationTitle', 'presentationTechField', 
      'presentationPresenter', 'presentationAffiliation', 'companyName', 
      'representativeName', 'contactPerson', 'mobilePhone', 'email', 
      'technologyContent'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `필수 필드가 누락되었습니다: ${field}` },
          { status: 400 }
        )
      }
    }

    // 현재 날짜를 YYYY-MM-DD 형식으로 설정
    const today = new Date().toISOString().split('T')[0]

    // SQL 쿼리 작성
    const sql = `
      INSERT INTO pnu_techfair_presentation_consultations (
        presentation_id, presentation_title, presentation_tech_field, 
        presentation_presenter, presentation_affiliation, presentation_time, 
        presentation_room, company_name, representative_name, established_date, 
        company_phone, fax_phone, company_address, business_type, employee_count, 
        contact_person, department, position, mobile_phone, email, 
        technology_content, patent_utilization_report, patent_value_evaluation_report,
        annual_fee_estimation, patent_application_number1, patent_application_number2,
        consultation_type, status, applied_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const params = [
      body.presentationId,
      body.presentationTitle,
      body.presentationTechField,
      body.presentationPresenter,
      body.presentationAffiliation,
      body.presentationTime || null,
      body.presentationRoom || null,
      body.companyName,
      body.representativeName,
      body.establishedDate || null,
      body.companyPhone || null,
      body.faxPhone || null,
      body.companyAddress || null,
      body.businessType || null,
      body.employeeCount || null,
      body.contactPerson,
      body.department || null,
      body.position || null,
      body.mobilePhone,
      body.email,
      body.technologyContent,
      body.patentUtilizationReport || false,
      body.patentValueEvaluationReport || false,
      body.annualFeeEstimation || false,
      body.patentApplicationNumber1 || null,
      body.patentApplicationNumber2 || null,
      '발표상담',
      '대기',
      today
    ]

    const result = await query(sql, params) as any

    return NextResponse.json({
      success: true,
      id: result.insertId,
      message: '발표자 상담신청이 성공적으로 제출되었습니다.'
    })

  } catch (error) {
    console.error('발표자 상담신청 저장 오류:', error)
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const sql = `
      SELECT 
        id, presentation_id, presentation_title, presentation_tech_field, 
        presentation_presenter, presentation_affiliation, presentation_time, 
        presentation_room, company_name, representative_name, established_date, 
        company_phone, fax_phone, company_address, business_type, employee_count, 
        contact_person, department, position, mobile_phone, email, 
        technology_content, patent_utilization_report, patent_value_evaluation_report,
        annual_fee_estimation, patent_application_number1, patent_application_number2, consultation_type, status, applied_at,
        created_at, updated_at
      FROM pnu_techfair_presentation_consultations 
      WHERE is_deleted = FALSE 
      ORDER BY created_at DESC
    `

    const results = await query(sql)

    return NextResponse.json({
      success: true,
      data: results
    })

  } catch (error) {
    console.error('발표자 상담신청 데이터 가져오기 오류:', error)
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: '삭제할 발표자 상담신청 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // 소프트 삭제: is_deleted = TRUE, deleted_at = 현재시간으로 설정
    const sql = `
      UPDATE pnu_techfair_presentation_consultations 
      SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND is_deleted = FALSE
    `
    
    const result = await query(sql, [id]) as any
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: '해당 발표자 상담신청을 찾을 수 없거나 이미 삭제되었습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '발표자 상담신청이 성공적으로 삭제되었습니다.'
    })
    
  } catch (error) {
    console.error('발표자 상담신청 삭제 오류:', error)
    return NextResponse.json(
      { success: false, error: '발표자 상담신청 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
