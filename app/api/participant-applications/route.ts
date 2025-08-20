import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      companyName,
      ceoName,
      establishmentDate,
      companyPhone,
      companyFax,
      companyAddress,
      businessType,
      employeeCount,
      contactName,
      departmentPosition,
      mobilePhone,
      email,
      patentUtilizationReport,
      patentValueEvaluationReport,
      annualFeeEstimation,
      patentApplicationNumber1,
      patentApplicationNumber2
    } = body;

    // 필수 필드 검증
    if (!companyName || !ceoName || !contactName || !mobilePhone || !email) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // SQL 쿼리 작성
    const sql = `
      INSERT INTO pnu_techfair_participant_applications (
        company_name,
        ceo_name,
        establishment_date,
        company_phone,
        company_fax,
        company_address,
        business_type,
        employee_count,
        contact_name,
        department_position,
        mobile_phone,
        email,
        patent_utilization_report,
        patent_value_evaluation_report,
        annual_fee_estimation,
        patent_application_number1,
        patent_application_number2
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      companyName,
      ceoName,
      establishmentDate || null,
      companyPhone || null,
      companyFax || null,
      companyAddress || null,
      businessType || null,
      employeeCount || null,
      contactName,
      departmentPosition || null,
      mobilePhone,
      email,
      patentUtilizationReport || false,
      patentValueEvaluationReport || false,
      annualFeeEstimation || false,
      patentApplicationNumber1 || null,
      patentApplicationNumber2 || null
    ];

    // 데이터베이스에 저장
    const result = await query(sql, params) as any;

    return NextResponse.json({
      success: true,
      message: '참가 신청이 성공적으로 저장되었습니다.',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('참가 신청 저장 오류:', error);
    return NextResponse.json(
      { error: '참가 신청 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = `
      SELECT * FROM pnu_techfair_participant_applications 
      WHERE is_deleted = FALSE 
      ORDER BY created_at DESC
    `;
    
    const applications = await query(sql);
    
    return NextResponse.json({
      success: true,
      data: applications
    });
    
  } catch (error) {
    console.error('참가 신청 조회 오류:', error);
    return NextResponse.json(
      { error: '참가 신청 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: '삭제할 참가 신청 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 소프트 삭제: is_deleted = TRUE, deleted_at = 현재시간으로 설정
    const sql = `
      UPDATE pnu_techfair_participant_applications 
      SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND is_deleted = FALSE
    `;
    
    const result = await query(sql, [id]) as any;
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: '해당 참가 신청을 찾을 수 없거나 이미 삭제되었습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '참가 신청이 성공적으로 삭제되었습니다.'
    });
    
  } catch (error) {
    console.error('참가 신청 삭제 오류:', error);
    return NextResponse.json(
      { error: '참가 신청 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
