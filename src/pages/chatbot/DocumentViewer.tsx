import React from 'react';
import './DocumentEditor.css';

// 부모로부터 받을 props 타입 정의
interface DocumentViewerProps {
  template: string | null; // 템플릿 HTML (또는 null)
  data: { [key: string]: string }; // 채워진 데이터
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ template, data }) => {
  // 1. 실시간으로 템플릿의 {{placeholder}}를 data 값으로 치환하는 함수
  const renderFilledTemplate = () => {
    if (!template) return { __html: '' };

    let processedHtml = template;

    // data 객체의 모든 키(placeholder)에 대해 치환 수행
    Object.keys(data).forEach((key) => {
      const placeholder = `{{${key}}}`; // 예: {{rent_amount}}
      const value = data[key];
      // CSS로 하이라이트하기 위해 span 태그로 감싸서 삽입
      const highlightedValue = `<span class="filled-data">${value}</span>`;
      
      // 정규식을 사용하여 해당 placeholder를 모두 찾아서 교체
      processedHtml = processedHtml.replace(
        new RegExp(placeholder, 'g'),
        highlightedValue
      );
    });

    // 아직 채워지지 않은 다른 {{placeholder}}들은 회색으로 표시
    processedHtml = processedHtml.replace(
      /\{\{([a-zA-Z0-9_]+)\}\}/g,
      '<span class="empty-placeholder">...</span>'
    );

    return { __html: processedHtml };
  };

  return (
    <div className="document-viewer">
      {/* 2. template 값이 있으면 치환된 템플릿을, 없으면 플레이스홀더를 렌더링 */}
      {template ? (
        <div
          className="document-content"
          dangerouslySetInnerHTML={renderFilledTemplate()}
        />
      ) : (
        <div className="document-placeholder">
          <p>
            채팅창에 상황을 입력하시면
            <br />
            문서가 자동으로 생성됩니다!
          </p>
          <div className="document-placeholder-dots">...</div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;