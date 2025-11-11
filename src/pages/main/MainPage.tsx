import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoDocumentTextOutline, // 근로계약서 등 문서 아이콘
  IoLaptopOutline,      // 개발/IT 관련 아이콘 (가칭)
  IoEarthOutline,       // 외국인 등록 아이콘 (지구 모양)
  IoLayersOutline,      // 카테고리/폴더 아이콘 (가칭)
  IoRibbonOutline,      // ADR 아이콘 (가칭)
  IoSettingsOutline,    // JetStream setup 아이콘 (가칭)
  IoMegaphoneOutline,   // Objectives 아이콘 (가칭)
} from 'react-icons/io5';
import apiClient from '../../api/api';

interface MainPageProps {
  isLoggedIn: boolean;
}

// 개별 템플릿 카드 컴포넌트
interface TemplateCardProps {
  category: string;
  icon: React.ElementType; // 카드 내부의 메인 아이콘
  iconColor: string;      // 메인 아이콘 색상
  title: string;          // 카드 메인 제목 (예: 근로계약서)
  lastEditedInfo?: string; // "Last edited 1h ago by you" 같은 정보
  profileImgSrc?: string; // 프로필 이미지 URL (선택 사항)
  onClick: () => void;
  isComingSoon?: boolean; // 준비 중인 카드인지 여부
}

/**
 * 이미지(스크린샷 2025-11-11 170417.png)를 참조한 템플릿 카드 컴포넌트
 * 불필요한 설명란을 제거하여 작고 컴팩트하게 만듦
 */
const TemplateCard: React.FC<TemplateCardProps> = ({ 
  category, 
  icon: MainIcon, 
  iconColor, 
  title, 
  lastEditedInfo, 
  profileImgSrc, 
  onClick, 
  isComingSoon 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm p-5 border border-gray-100 
                  ${isComingSoon 
                    ? 'cursor-not-allowed opacity-60' 
                    : 'hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group'}`}
    >
      {/* "In Engineering" 부분 */}
      <div className="flex items-center text-xs text-gray-500 mb-4">
        <IoLayersOutline className="w-3 h-3 mr-1.5 text-gray-400" />
        {category}
      </div>
      
      {/* 아이콘 + 제목 (예: "Development") */}
      <div className="flex items-center space-x-2.5 mb-8">
        <MainIcon className={`w-5 h-5 ${iconColor}`} />
        <h2 className={`text-base font-semibold text-gray-800 ${!isComingSoon && 'group-hover:text-gray-900'}`}>
          {title}
        </h2>
      </div>
      
      {/* 수정 정보 (프로필 이미지 + Last edited 텍스트) */}
      {lastEditedInfo && (
        <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
          {profileImgSrc && (
            <img 
              src={profileImgSrc} 
              alt="Profile" 
              className="w-5 h-5 rounded-full mr-2" 
            />
          )}
          <span>{lastEditedInfo}</span>
        </div>
      )}
    </div>
  );
};


const MainPage: React.FC<MainPageProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  /**
   * 템플릿 카드를 클릭했을 때 실행되는 핸들러.
   */
  const handleCreateDocument = async (templateType: string) => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }

    try {
      // "근로계약서" 타입으로 문서를 생성하도록 요청
      const res = await apiClient.post(
        '/api/contracts',
        { contract_type: templateType }
      );
      // 생성된 문서의 채팅방으로 즉시 이동
      navigate(`/ChatInterface/${res.data.id}`);
    } catch (err) {
      console.error("새 문서 생성 실패:", err);
      alert("문서 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    // inspiration image(image_bfea31.png)와 유사한 배경 및 패딩 적용
    <div className="w-full min-h-screen p-8 md:p-12 bg-gray-50 relative overflow-hidden">
      
      {/* inspiration image의 은은한 그라데이션 효과 */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-yellow-100/30 to-transparent -z-0 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-transparent -z-0 rounded-full mix-blend-multiply filter blur-3xl"></div>

      {/* --- ❗️[핵심 수정] ---
          컨텐츠 전체를 max-w-7xl mx-auto로 감싸서 중앙에 정렬시키고
          화면이 커져도 카드 크기가 과도하게 늘어나지 않도록 제한합니다.
      */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* 헤더 텍스트 */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-900">Jump back in</h1>
          <p className="text-base text-gray-600 mt-2">Your recently edited spaces</p>
        </div>

        {/* 템플릿 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* === 카드 1: 근로계약서 === */}
          <TemplateCard
            category="표준 양식"
            icon={IoDocumentTextOutline}
            iconColor="text-blue-600"
            title="근로계약서"
            lastEditedInfo="Last edited 1h ago by you"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user1"
            onClick={() => handleCreateDocument('근로계약서')}
            isComingSoon={false}
          />

          {/* === 카드 2: 외국인 등록 === */}
          <TemplateCard
            category="출입국/관공서"
            icon={IoEarthOutline}
            iconColor="text-orange-500"
            title="외국인 등록"
            lastEditedInfo="Last edited 23h ago by Addison Schultz"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user2"
            onClick={() => alert('외국인 등록 템플릿은 현재 준비 중입니다.')}
            isComingSoon={true}
          />

          {/* === 카드 3: 사업자 등록 === */}
          <TemplateCard
            category="사업/세금"
            icon={IoRibbonOutline}
            iconColor="text-yellow-600"
            title="사업자 등록"
            lastEditedInfo="Last edited 1d ago by Nolan Press"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user3"
            onClick={() => alert('사업자 등록 템플릿은 현재 준비 중입니다.')}
            isComingSoon={true}
          />

          {/* === 카드 4: 주택 임대차 === */}
          <TemplateCard
            category="부동산"
            icon={IoLaptopOutline}
            iconColor="text-gray-600"
            title="주택 임대차 계약서"
            lastEditedInfo="Last edited 1d ago by you"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user4"
            onClick={() => alert('주택 임대차 계약서 템플릿은 현재 준비 중입니다.')}
            isComingSoon={true}
          />

          {/* === 카드 5: NDA === */}
          <TemplateCard
            category="법률/일반"
            icon={IoMegaphoneOutline}
            iconColor="text-blue-500"
            title="NDA (기밀 유지 계약서)"
            lastEditedInfo="Last edited 1d ago by Davis Baptista"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user5"
            onClick={() => alert('NDA 템플릿은 현재 준비 중입니다.')}
            isComingSoon={true}
          />

          {/* === 카드 6: 맞춤형 템플릿 === */}
          <TemplateCard
            category="맞춤형"
            icon={IoSettingsOutline}
            iconColor="text-purple-600"
            title="맞춤형 템플릿"
            lastEditedInfo="Last edited 1d ago by Paityn Vetrove"
            profileImgSrc="https://api.dicebear.com/7.x/pixel-art/svg?seed=user6"
            onClick={() => alert('맞춤형 템플릿 기능은 현재 준비 중입니다.')}
            isComingSoon={true}
          />
          
        </div>
      </div>
    </div>
  );
};

export default MainPage;