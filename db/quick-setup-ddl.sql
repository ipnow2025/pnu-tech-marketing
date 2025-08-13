-- 참가 신청 테이블 생성
CREATE TABLE IF NOT EXISTS `pnu_techfair_participant_applications` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '참가 신청 ID',
  
  -- 회사 정보
  `company_name` VARCHAR(255) NOT NULL COMMENT '회사명',
  `ceo_name` VARCHAR(100) NOT NULL COMMENT '대표자명',
  `establishment_date` DATE NULL COMMENT '설립일',
  `company_phone` VARCHAR(20) NULL COMMENT '회사전화',
  `company_fax` VARCHAR(20) NULL COMMENT '팩스전화',
  `company_address` TEXT NULL COMMENT '회사주소',
  `business_type` VARCHAR(255) NULL COMMENT '사업분야',
  `employee_count` VARCHAR(50) NULL COMMENT '직원수',
  
  -- 담당자 정보
  `contact_name` VARCHAR(100) NOT NULL COMMENT '담당자명',
  `department_position` VARCHAR(100) NULL COMMENT '부서(직위)',
  `mobile_phone` VARCHAR(20) NOT NULL COMMENT '휴대폰번호',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_company_name` (`company_name`),
  INDEX `idx_contact_name` (`contact_name`),
  INDEX `idx_email` (`email`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='참가 신청 정보';

-- 기술상담신청 테이블 생성
CREATE TABLE IF NOT EXISTS `pnu_techfair_technology_consultations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '기술상담신청 ID',
  
  -- 회사 정보
  `company_name` VARCHAR(255) NOT NULL COMMENT '회사명',
  `ceo_name` VARCHAR(100) NOT NULL COMMENT '대표자명',
  `establishment_date` DATE NULL COMMENT '설립일',
  `company_phone` VARCHAR(20) NULL COMMENT '회사전화',
  `company_fax` VARCHAR(20) NULL COMMENT '팩스전화',
  `company_address` TEXT NULL COMMENT '회사주소',
  `business_type` VARCHAR(255) NULL COMMENT '사업분야',
  `employee_count` VARCHAR(50) NULL COMMENT '직원수',
  
  -- 담당자 정보
  `contact_name` VARCHAR(100) NOT NULL COMMENT '담당자명',
  `department_position` VARCHAR(100) NULL COMMENT '부서(직위)',
  `mobile_phone` VARCHAR(20) NOT NULL COMMENT '휴대폰번호',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일',
  
  -- 기술상담 정보
  `desired_technology` VARCHAR(255) NOT NULL COMMENT '희망기술명',
  `technology_requirements` TEXT NOT NULL COMMENT '수요기술 내용',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_company_name` (`company_name`),
  INDEX `idx_contact_name` (`contact_name`),
  INDEX `idx_email` (`email`),
  INDEX `idx_desired_technology` (`desired_technology`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='기술상담신청 정보';

-- 특허 상담신청 테이블 생성
CREATE TABLE IF NOT EXISTS `pnu_techfair_patent_consultations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '특허 상담신청 ID',
  
  -- 특허 정보 (선택된 특허)
  `patent_tech_field` VARCHAR(100) NULL COMMENT '특허 기술분야',
  `patent_name` VARCHAR(500) NULL COMMENT '특허명',
  `patent_application_number` VARCHAR(50) NULL COMMENT '출원번호',
  `patent_registration_number` VARCHAR(50) NULL COMMENT '등록번호',
  `patent_fee` VARCHAR(50) NULL COMMENT '기술료',
  `patent_application_date` DATE NULL COMMENT '출원일자',
  `patent_expiry_date` DATE NULL COMMENT '만료일',
  
  -- 회사 정보
  `company_name` VARCHAR(255) NOT NULL COMMENT '회사명',
  `representative_name` VARCHAR(100) NOT NULL COMMENT '대표자명',
  `established_date` DATE NULL COMMENT '설립일',
  `company_phone` VARCHAR(20) NULL COMMENT '회사전화',
  `fax_phone` VARCHAR(20) NULL COMMENT '팩스전화',
  `company_address` TEXT NULL COMMENT '회사주소',
  `business_type` VARCHAR(255) NULL COMMENT '사업분야',
  `employee_count` VARCHAR(50) NULL COMMENT '직원수',
  
  -- 담당자 정보
  `contact_person` VARCHAR(100) NOT NULL COMMENT '담당자명',
  `department` VARCHAR(100) NULL COMMENT '부서',
  `position` VARCHAR(100) NULL COMMENT '직위',
  `mobile_phone` VARCHAR(20) NOT NULL COMMENT '휴대폰번호',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일',
  
  -- 상담 내용
  `technology_content` TEXT NOT NULL COMMENT '기술 도입 목적 및 적용 분야',
  
  -- 상담 상태
  `consultation_type` VARCHAR(50) DEFAULT '기술상담' COMMENT '상담유형',
  `status` VARCHAR(20) DEFAULT '대기' COMMENT '상담상태',
  `applied_at` DATE NOT NULL COMMENT '신청일자',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_patent_name` (`patent_name`),
  INDEX `idx_company_name` (`company_name`),
  INDEX `idx_contact_person` (`contact_person`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_applied_at` (`applied_at`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='특허 상담신청 정보';

-- 발표자 상담신청 테이블 생성
CREATE TABLE IF NOT EXISTS `pnu_techfair_presentation_consultations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '발표자 상담신청 ID',
  
  -- 발표 정보 (선택된 발표)
  `presentation_id` INT NOT NULL COMMENT '발표 ID',
  `presentation_title` VARCHAR(500) NOT NULL COMMENT '발표명',
  `presentation_tech_field` VARCHAR(100) NOT NULL COMMENT '발표 기술분야',
  `presentation_presenter` VARCHAR(100) NOT NULL COMMENT '발표자',
  `presentation_affiliation` VARCHAR(255) NOT NULL COMMENT '발표자 소속',
  `presentation_time` VARCHAR(50) NULL COMMENT '발표시간',
  `presentation_room` VARCHAR(100) NULL COMMENT '발표장소',
  
  -- 회사 정보
  `company_name` VARCHAR(255) NOT NULL COMMENT '회사명',
  `representative_name` VARCHAR(100) NOT NULL COMMENT '대표자명',
  `established_date` DATE NULL COMMENT '설립일',
  `company_phone` VARCHAR(20) NULL COMMENT '회사전화',
  `fax_phone` VARCHAR(20) NULL COMMENT '팩스전화',
  `company_address` TEXT NULL COMMENT '회사주소',
  `business_type` VARCHAR(255) NULL COMMENT '사업분야',
  `employee_count` VARCHAR(50) NULL COMMENT '직원수',
  
  -- 담당자 정보
  `contact_person` VARCHAR(100) NOT NULL COMMENT '담당자명',
  `department` VARCHAR(100) NULL COMMENT '부서',
  `position` VARCHAR(100) NULL COMMENT '직위',
  `mobile_phone` VARCHAR(20) NOT NULL COMMENT '휴대폰번호',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일',
  
  -- 상담 내용
  `technology_content` TEXT NOT NULL COMMENT '기술 도입 목적 및 적용 분야',
  
  -- 상담 상태
  `consultation_type` VARCHAR(50) DEFAULT '발표상담' COMMENT '상담유형',
  `status` VARCHAR(20) DEFAULT '대기' COMMENT '상담상태',
  `applied_at` DATE NOT NULL COMMENT '신청일자',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_presentation_id` (`presentation_id`),
  INDEX `idx_presentation_title` (`presentation_title`),
  INDEX `idx_presentation_presenter` (`presentation_presenter`),
  INDEX `idx_company_name` (`company_name`),
  INDEX `idx_contact_person` (`contact_person`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_applied_at` (`applied_at`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='발표자 상담신청 정보';

-- 출품 기술 상담신청 테이블 생성
CREATE TABLE IF NOT EXISTS `pnu_techfair_exhibit_consultations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '출품 기술 상담신청 ID',
  
  -- 출품 기술 정보 (선택된 출품)
  `exhibit_id` INT NOT NULL COMMENT '출품 ID',
  `exhibit_title` VARCHAR(500) NOT NULL COMMENT '출품명',
  `exhibit_tech_field` VARCHAR(100) NOT NULL COMMENT '출품 기술분야',
  `exhibit_presenter` VARCHAR(100) NOT NULL COMMENT '담당',
  `exhibit_affiliation` VARCHAR(255) NOT NULL COMMENT '소속',
  `exhibit_booth` VARCHAR(50) NULL COMMENT '부스',
  
  -- 회사 정보
  `company_name` VARCHAR(255) NOT NULL COMMENT '회사명',
  `representative_name` VARCHAR(100) NOT NULL COMMENT '대표자명',
  `established_date` DATE NULL COMMENT '설립일',
  `company_phone` VARCHAR(20) NULL COMMENT '회사전화',
  `fax_phone` VARCHAR(20) NULL COMMENT '팩스전화',
  `company_address` TEXT NULL COMMENT '회사주소',
  `business_type` VARCHAR(255) NULL COMMENT '사업분야',
  `employee_count` VARCHAR(50) NULL COMMENT '직원수',
  
  -- 담당자 정보
  `contact_person` VARCHAR(100) NOT NULL COMMENT '담당자명',
  `department` VARCHAR(100) NULL COMMENT '부서',
  `position` VARCHAR(100) NULL COMMENT '직위',
  `mobile_phone` VARCHAR(20) NOT NULL COMMENT '휴대폰번호',
  `email` VARCHAR(255) NOT NULL COMMENT '이메일',
  
  -- 상담 내용
  `technology_content` TEXT NOT NULL COMMENT '기술 도입 목적 및 적용 분야',
  
  -- 상담 상태
  `consultation_type` VARCHAR(50) DEFAULT '출품상담' COMMENT '상담유형',
  `status` VARCHAR(20) DEFAULT '대기' COMMENT '상담상태',
  `applied_at` DATE NOT NULL COMMENT '신청일자',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_exhibit_id` (`exhibit_id`),
  INDEX `idx_exhibit_title` (`exhibit_title`),
  INDEX `idx_exhibit_presenter` (`exhibit_presenter`),
  INDEX `idx_company_name` (`company_name`),
  INDEX `idx_contact_person` (`contact_person`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_applied_at` (`applied_at`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='출품 기술 상담신청 정보';

-- 발표/출품 자료 업로드 테이블 생성 (BLOB 방식)
CREATE TABLE IF NOT EXISTS `pnu_techfair_materials` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '자료 ID',
  
  -- 자료 연결 정보
  `showcase_id` INT NOT NULL COMMENT '발표/출품 ID',
  `showcase_type` ENUM('발표', '출품') NOT NULL COMMENT '발표/출품 구분',
  
  -- 파일 정보
  `file_name` VARCHAR(255) NOT NULL COMMENT '파일명',
  `file_size` BIGINT UNSIGNED NOT NULL COMMENT '파일 크기 (bytes)',
  `file_type` VARCHAR(100) NULL COMMENT '파일 MIME 타입',
  `file_extension` VARCHAR(20) NULL COMMENT '파일 확장자',
  
  -- 파일 데이터 (BLOB)
  `file_data` LONGBLOB NOT NULL COMMENT '파일 데이터',
  
  -- 메타데이터
  `uploaded_by` VARCHAR(100) NULL COMMENT '업로드한 사용자',
  `description` TEXT NULL COMMENT '자료 설명',
  
  -- 기본 필드
  `is_deleted` BOOLEAN DEFAULT FALSE COMMENT '삭제 여부',
  `deleted_at` TIMESTAMP NULL COMMENT '삭제 시간',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시간',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시간',
  
  -- 인덱스
  INDEX `idx_showcase_id` (`showcase_id`),
  INDEX `idx_showcase_type` (`showcase_type`),
  INDEX `idx_file_name` (`file_name`),
  INDEX `idx_file_type` (`file_type`),
  INDEX `idx_uploaded_by` (`uploaded_by`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='발표/출품 자료 파일 정보 (BLOB 저장)';
