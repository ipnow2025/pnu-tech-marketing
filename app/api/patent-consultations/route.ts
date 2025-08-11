import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      // 특허 정보
      patentTechField,
      patentName,
      patentApplicationNumber,
      patentRegistrationNumber,
      patentFee,
      patentApplicationDate,
      patentExpiryDate,
      
      // 회사 정보
      companyName,
      representativeName,
      establishedDate,
      companyPhone,
      faxPhone,
      companyAddress,
      businessType,
      employeeCount,
      
      // 담당자 정보
      contactPerson,
      department,
      position,
      mobilePhone,
      email,
      
      // 상담 내용
      technologyContent
    } = body;

    // 필수 필드 검증
    if (!companyName || !representativeName || !contactPerson || !mobilePhone || !email || !technologyContent) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // SQL 쿼리 작성
    const sql = `
      INSERT INTO pnu_techfair_patent_consultations (
        patent_tech_field,
        patent_name,
        patent_application_number,
        patent_registration_number,
        patent_fee,
        patent_application_date,
        patent_expiry_date,
        company_name,
        representative_name,
        established_date,
        company_phone,
        fax_phone,
        company_address,
        business_type,
        employee_count,
        contact_person,
        department,
        position,
        mobile_phone,
        email,
        technology_content,
        applied_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      patentTechField || null,
      patentName || null,
      patentApplicationNumber || null,
      patentRegistrationNumber || null,
      patentFee || null,
      patentApplicationDate || null,
      patentExpiryDate || null,
      companyName,
      representativeName,
      establishedDate || null,
      companyPhone || null,
      faxPhone || null,
      companyAddress || null,
      businessType || null,
      employeeCount || null,
      contactPerson,
      department || null,
      position || null,
      mobilePhone,
      email,
      technologyContent,
      new Date().toISOString().split('T')[0]
    ];

    // 데이터베이스에 저장
    const result = await query(sql, params) as any;

    return NextResponse.json({
      success: true,
      message: '특허 상담신청이 성공적으로 저장되었습니다.',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('특허 상담신청 저장 오류:', error);
    return NextResponse.json(
      { error: '특허 상담신청 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sql = `
      SELECT * FROM pnu_techfair_patent_consultations 
      WHERE is_deleted = FALSE 
      ORDER BY created_at DESC
    `;
    
    const consultations = await query(sql);
    
    return NextResponse.json({
      success: true,
      data: consultations
    });
    
  } catch (error) {
    console.error('특허 상담신청 조회 오류:', error);
    return NextResponse.json(
      { error: '특허 상담신청 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
