import React, { useEffect, useRef } from 'react';
import './DocumentEditor.css'; 

interface DocumentViewerProps {
  template: string | null;
  data: { [key: string]: string };
  onFieldUpdate: (fieldId: string, value: string) => void; 
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  template, 
  data, 
  onFieldUpdate 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. [유지] 템플릿 렌더링
  useEffect(() => {
    if (containerRef.current && template) {
      containerRef.current.innerHTML = template;
    }
  }, [template]); 

  // 👇 2. [수정] 이벤트 리스너 (blur + change 추가)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; 

    // (1) 텍스트 입력창용: 포커스 잃을 때(Blur) 저장
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      
      // 체크박스가 아닌 경우에만 blur에서 처리
      if ((target.tagName === 'INPUT' && (target as HTMLInputElement).type !== 'checkbox') || target.tagName === 'TEXTAREA') {
        const fieldId = target.name;
        const value = target.value;
        
        if (fieldId) {
          onFieldUpdate(fieldId, value);
        }
      }
    };

    // (2) 체크박스용: 값이 변경될 때(Change) 즉시 저장
    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;

      // 체크박스인 경우에만 change에서 처리
      if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        const fieldId = target.name;
        // 체크되면 "true", 해제되면 "false" 문자열로 변환하여 저장
        const value = String(target.checked); 
        
        if (fieldId) {
          console.log(`Checkbox Changed: ${fieldId} -> ${value}`); // 디버깅용 로그
          onFieldUpdate(fieldId, value);
        }
      }
    };

    // 리스너 등록
    container.addEventListener('blur', handleBlur, true);
    container.addEventListener('change', handleChange, true); // 👈 change 이벤트 추가

    // 클린업
    return () => {
      container.removeEventListener('blur', handleBlur, true);
      container.removeEventListener('change', handleChange, true);
    };
  }, [onFieldUpdate]); 

  // 👇 3. [수정] 데이터 바인딩 (서버 데이터를 화면에 표시)
  useEffect(() => {
    if (!containerRef.current) return;

    Object.keys(data).forEach((key) => {
      const element = containerRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(`[name="${key}"]`);

      if (element) {
        // [수정] 체크박스 데이터 바인딩 로직 강화
        if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'checkbox') {
          const dataValue = data[key];
          
          // 데이터가 'true', 'on', '1', 1, true 인 경우 체크 처리
          const isChecked = 
              (dataValue as any) === true || 
              dataValue === 'true' || 
              dataValue === 'on' || 
              (dataValue as any) === 1 || 
              dataValue === '1';
              dataValue === '☑' ||   // 👈 AI가 보내는 체크 문자 (핵심!)
              dataValue === 'O' ||    // 👈 "O" 표시 대응
              dataValue === 'Y';      // 👈 "Y" 값 대응
          
          (element as HTMLInputElement).checked = isChecked;
          
          // 체크박스는 value 속성이 아닌 checked 속성으로 제어해야 하므로 value 설정은 건너뜀
        } else {
          // 텍스트 인풋 등은 기존 값 유지 (포커스 상태가 아닐 때만)
          if (document.activeElement !== element) {
            element.value = data[key] || '';
          }
        }      
      }
    });
  }, [data, template]); 

  if (!template) {
    return (
      <div className="document-viewer">
        <div className="document-placeholder">
          <p>
            채팅창에 상황을 입력하시면<br />
            문서가 자동으로 생성됩니다!
          </p>
          <div className="document-placeholder-dots">...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="document-viewer">
      <div ref={containerRef} className="document-content" />
    </div>
  );
};

export default DocumentViewer;