import React from 'react';
// 사용자가 업로드한 문서 이미지를 import 합니다.
// 'path/to/your/image.png' 부분은 실제 이미지 경로로 수정해주세요.
import documentImage from '../../assets/document_image.png';
import './DocumentEditor.css';

const DocumentViewer: React.FC = () => {
  return (
    <div className="document-viewer">
      <img
        src={documentImage}
        alt="Standard Labor Contract"
        className="document-image"
      />
    </div>
  );
};

export default DocumentViewer;