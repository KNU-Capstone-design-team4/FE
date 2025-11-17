// src/pages/chatbot/DocumentViewer.tsx

import React, { useEffect, useRef } from 'react';
import './DocumentEditor.css'; // 스타일은 그대로 사용합니다.

interface DocumentViewerProps {
  template: string | null;
  data: { [key: string]: string };
  onFieldUpdate: (fieldId: string, value: string) => void; // 👇 [추가] 자동 저장 prop
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  template, 
  data, 
  onFieldUpdate // 👇 [추가]
}) => {
  // div 요소를 직접 참조하기 위해 useRef 사용
  const containerRef = useRef<HTMLDivElement>(null);

  // [수정] 1. 템플릿 HTML 렌더링 + onBlur 이벤트 리스너 부착
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. 템플릿 HTML 렌더링
    if (template) {
      container.innerHTML = template;
    }

    // 2. [추가] onBlur 이벤트 핸들러 (이벤트 위임)
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const fieldId = target.name;
        
        // 체크박스일 경우 값 처리 (true/false)
        let value: string | boolean = target.value;
        if ((target as HTMLInputElement).type === 'checkbox') {
           value = (target as HTMLInputElement).checked;
        }
        
        if (fieldId) {
          // 부모에게 fieldId와 value(string으로 변환)를 전달
          onFieldUpdate(fieldId, String(value));
        }
      }
    };

    // 3. [추가] 컨테이너에 blur 이벤트 리스너 추가 (캡처링 사용)
    // 'true' (useCapture) 옵션으로 자식 요소의 blur 이벤트를 감지
    container.addEventListener('blur', handleBlur, true);

    // 4. [추가] 클린업 함수: 컴포넌트가 사라질 때 이벤트 리스너 제거
    return () => {
      container.removeEventListener('blur', handleBlur, true);
    };

  }, [template, onFieldUpdate]); // 👈 onFieldUpdate를 의존성 배열에 추가


  // [유지] 2. 데이터 바인딩 (data가 바뀔 때마다 실행)
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
        // [유지] 체크박스 로직
        if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'checkbox') {
          
          const dataValue = data[key];
          
          // data[key] 값을 boolean으로 변환하여 .checked 속성에 할당
          (element as HTMLInputElement).checked = 
              dataValue === true || 
              dataValue === 'true' || 
              dataValue === 'on' || 
              (dataValue as any) === 1; // 👈 (any) 캐스팅은 원본 코드 유지

        } else {
          // [수정] 체크박스가 아닌 경우 + onBlur 충돌 방지
          // 현재 포커스된(사용자가 입력 중인) 요소가 아닐 때만 값을 덮어쓰기
          if (document.activeElement !== element) {
            element.value = data[key] || '';
          }
        }      
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