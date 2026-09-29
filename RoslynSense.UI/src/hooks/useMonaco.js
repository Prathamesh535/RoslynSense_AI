// import { useEffect, useRef } from 'react';
// import * as monaco from 'monaco-editor';

// export const useMonaco = (containerRef, file, onContentChange) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current || !file) return;

//     // Initialize Monaco Editor
//     editorRef.current = monaco.editor.create(containerRef.current, {
//       value: file.content || '',
//       language: file.language || 'csharp',
//       theme: 'vs-dark',
//       automaticLayout: true,
//       readOnly: true,
//       fontSize: 14,
//       lineNumbers: 'on',
//       minimap: { enabled: true },
//       scrollBeyondLastLine: false,
//       wordWrap: 'on',
//     });

//     // Listen for content changes
//     const disposable = editorRef.current.onDidChangeModelContent(() => {
//       if (onContentChange) {
//         onContentChange(editorRef.current.getValue());
//       }
//     });

//     // Highlight line
//     if (file.line) {
//       editorRef.current.revealLineInCenter(file.line);
//       const decorations = editorRef.current.deltaDecorations([], [{
//         range: new monaco.Range(file.line, 1, file.line, 1),
//         options: {
//           isWholeLine: true,
//           className: 'editor-line-highlight',
//           inlineClassName: 'editor-line-highlight'
//         }
//       }]);
//     }

//     return () => {
//       disposable.dispose();
//       if (editorRef.current) {
//         editorRef.current.dispose();
//       }
//     };
//   }, [file, containerRef]);

//   return editorRef;
// };