import { useNavigate } from "react-router-dom";
import lawbotLogo from '../../assets/lawbot_logo.svg';

export default function LoginIntroPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* 1. 로고: 왼쪽 상단에 작게 배치 */}
      <div className="absolute top-6 left-6">
        <img
          src={lawbotLogo}
          alt="LawBot Logo"
          style={{ height: '32px', width: 'auto' }}
        />
      </div>

      {/* 2. 중앙 컨텐츠: 페이지 중앙에 배치 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl bg-white max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-2">법률 문서를 쉽게 작성하세요!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            복잡한 법률 문서 작성, 이제 인공지능이 도와드립니다. 전문 변호사의 도움 없이도 필요한 서류를 쉽고 빠르게 준비하세요.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}