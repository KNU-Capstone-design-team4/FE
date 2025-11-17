// src/pages/chatbot/DocumentViewer.tsx

import React, { useEffect, useRef } from 'react';
import './DocumentEditor.css'; // 스타일은 그대로 사용합니다.

interface DocumentViewerProps {
  template: string | null;
  data: { [key: string]: string };
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ template, data }) => {
  // div 요소를 직접 참조하기 위해 useRef 사용
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. 템플릿 HTML 렌더링 (template이 바뀔 때만 실행)
  useEffect(() => {
    if (containerRef.current && template) {
      // 템플릿 HTML을 div 내부에 렌더링
      containerRef.current.innerHTML = template;
    }
  }, [template]); // 'template'이 바뀔 때만 실행

  // 2. 데이터 바인딩 (data가 바뀔 때마다 실행)
  useEffect(() => {
    // 렌더링된 HTML이 없으면 중단
    if (!containerRef.current) {
      return;
    }

    // data 객체의 모든 키(key)에 대해 반복
    Object.keys(data).forEach((key) => {
      // 렌더링된 HTML 내에서 'name' 속성이 'key'와 일치하는 요소를 찾음
      const element = containerRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(`[name="${key}"]`);

      if (element) {
        // 찾은 요소의 'value'를 data 객체의 값으로 설정
        element.value = data[key] || '';
      }
    });
  }, [data, template]); // 'data' 또는 'template'이 바뀔 때마다 실행

  // 템플릿이 로드되지 않았을 때의 플레이스홀더
  if (!template) {
    return (
      <div className="document-viewer">
        <div className="document-placeholder">
          <p>
            채팅창에 상황을 입력하시면
            <br />
            문서가 자동으로 생성됩니다!
          </p>
          <div className="document-placeholder-dots">...</div>
        </div>
      </div>
    );
  }

  // ref를 사용하여 div를 생성하고, 템플릿 렌더링과 데이터 바인딩을 수행
  return (
    <div className="document-viewer">
      <div ref={containerRef} className="document-content" />
    </div>
  );
};

export default DocumentViewer;