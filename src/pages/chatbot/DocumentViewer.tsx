// src/pages/chatbot/DocumentViewer.tsx

import React, { useEffect, useRef } from 'react';
import './DocumentEditor.css'; // 스타일은 그대로 사용합니다.

interface DocumentViewerProps {
  template: string | null;
  data: { [key: string]: string };
  onFieldUpdate: (fieldId: string, value: string) => void; // [유지] 자동 저장 prop
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  template, 
  data, 
  onFieldUpdate 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 👇 1. [수정] 템플릿 렌더링(innerHTML)은 *오직* template이 바뀔 때만 실행
  useEffect(() => {
    if (containerRef.current && template) {
      containerRef.current.innerHTML = template;
    }
  }, [template]); // 👈 의존성 배열에서 onFieldUpdate 제거

  // 👇 2. [추가] onBlur 이벤트 리스너 부착
  // (이 훅은 onFieldUpdate 함수가 새로 생성될 때마다 리스너를 교체)
  useEffect(() => {
    const container = containerRef.current;
    // 템플릿이 아직 렌더링되지 않았으면(container가 비어있으면) 중단
    if (!container) return; 

    // [유지] onBlur 이벤트 핸들러
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const fieldId = target.name;
        
        let value: string | boolean = target.value;
        if ((target as HTMLInputElement).type === 'checkbox') {
           value = (target as HTMLInputElement).checked;
        }
        
        if (fieldId) {
          onFieldUpdate(fieldId, String(value));
        }
      }
    };

    container.addEventListener('blur', handleBlur, true);

    // 클린업 함수: 리스너 제거
    return () => {
      container.removeEventListener('blur', handleBlur, true);
    };
  }, [onFieldUpdate]); // 👈 이 훅은 onFieldUpdate 함수에만 의존

  // 👇 3. [유지] 데이터 바인딩 (깜빡임 방지 로직 제거, 원본으로 복구)
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    Object.keys(data).forEach((key) => {
      const element = containerRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(`[name="${key}"]`);

      if (element) {
        // [유지] 체크박스 로직
        if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'checkbox') {
          const dataValue = data[key];
          (element as HTMLInputElement).checked = 
              (dataValue as any) === true ||   // boolean 체크 (빌드 오류 해결됨)
              dataValue === 'true' ||          // string "true"
              dataValue === 'on' ||            // string "on"
              (dataValue as any) === 1 ||      // number 1 (혹시 모를 숫자 타입 대비)
              dataValue === '1';               // string "1"
        } else {
          // [유지] onBlur 충돌 방지 로직
          if (document.activeElement !== element) {
            element.value = data[key] || '';
          }
        }      
      }
    });
  }, [data, template]); // 👈 prevData 의존성 제거


  // [유지] 템플릿이 로드되지 않았을 때의 플레이스홀더
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

  // [유지] ref를 사용하여 div를 생성
  return (
    <div className="document-viewer">
      <div ref={containerRef} className="document-content" />
    </div>
  );
};

export default DocumentViewer;