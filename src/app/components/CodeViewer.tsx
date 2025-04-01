'use client';

import React from 'react';

interface CodeViewerProps {
  code: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  if (!code) {
    return <div className="p-4 bg-slate-700 rounded text-slate-400">No hay código para mostrar</div>;
  }
  
  return (
    <div className="relative">
      <pre className="p-4 bg-slate-700 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-sm text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeViewer; 