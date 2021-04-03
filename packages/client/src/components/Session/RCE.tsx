import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco';

const RCE = () => {
  const handleEditorDidMount = (editor: any) => {
    new MonacoBinding(ytext, /** @type {monaco.editor.ITextModel} */ (editor.getModel()), new Set([editor]), provider.awareness)
  };

  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider('wss://demos.yjs.dev', 'monaco-demo', ydoc)
  const ytext = ydoc.getText('monaco');

  return (
    <MonacoEditor
      height={'90vh'}
      theme={'vs-dark'}
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default RCE;
