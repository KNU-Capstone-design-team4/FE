import React from 'react';
import DocumentViewer from './DocumentViewer';
import ChatInterface from './ChatInterface';
import './DocumentEditor.css';

const DocumentEditorPage: React.FC = () => {
  return (
    <div className="editor-container">
      <DocumentViewer />
      <ChatInterface />
    </div>
  );
};

export default DocumentEditorPage;