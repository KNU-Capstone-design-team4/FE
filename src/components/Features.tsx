import React from 'react';
import Card from './Card';

// isLoggedIn prop을 받기 위한 interface 정의
interface FeaturesProps {
<<<<<<< HEAD
  isLoggedIn: boolean;
=======
  onNavigate: () => void;
>>>>>>> origin/develop
}

const Features: React.FC<FeaturesProps> = ({ isLoggedIn }) => {
  return (
    <section className="features">
      <Card
        title="템플릿으로 시작하기"
        description="준비된 템플릿을 바로 제공하며 시작됩니다. 법률 문서 템플릿 양식을 채우며 나만의 문서를 완성해보세요! 막히는 부분은 LAWBOT이 도와줍니다."
        to="#"
        isLoggedIn={isLoggedIn} // 이 카드에도 전달은 하지만, 사용되지는 않습니다.
      />
      <Card
        title="채팅으로 시작하기"
        description="채팅을 통해 어떤 법률 문서가 필요한지 확인 후 템플릿을 제공합니다! LAWBOT과 대화하며 쉽게 법률문서를 작성해보세요."
        to="/chatbot"
        isLoggedIn={isLoggedIn} // 챗봇 카드에 로그인 상태를 전달합니다.
      />
    </section>
  );
};

export default Features;