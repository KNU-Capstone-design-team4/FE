import React from 'react';
import Card from './Card';

// isLoggedIn prop을 받기 위한 interface 정의
interface FeaturesProps {

  isLoggedIn: boolean;

}

const Features: React.FC<FeaturesProps> = ({ isLoggedIn }) => {
  return (
    <section className="features">
      <Card
        title="근로계약서"
        description="표준 근로계약서 양식을 기반으로 쉽게 작성할 수 있습니다. 회사 정보와 근로 조건만 입력하면 나만의 근로계약서를 자동으로 생성해줍니다."
        onClickType="근로계약서"
        //to="/chatbot?type=근로계약서"
        isLoggedIn={isLoggedIn} 
      />
      <Card
        title="통합신청서"
        description="LAWBOT이 통합신청서 작성에 필요한 항목을 차례대로 안내해드립니다. 단계별 안내에 따라 쉽고 빠르게 작성하세요."
        onClickType="통합신청서"
        isLoggedIn={isLoggedIn} 
      />
     <Card
        title="위임장"
        description="간단한 정보만 입력하면 위임장을 자동으로 작성해 드립니다. 법률 문서 양식을 바탕으로 정확한 위임장을 만들어보세요."
        onClickType="위임장"
        isLoggedIn={isLoggedIn} 
      
      />
      <Card
        title="임대차계약서"
        description="주택이나 상가 임대차 계약을 쉽게 작성할 수 있습니다. 임대인/임차인 정보와 계약 조건만 입력하면 바로 사용 가능한 계약서를 생성합니다."
        onClickType="임대차계약서"
        isLoggedIn={isLoggedIn} 
      />
    </section>
  );
};

export default Features;