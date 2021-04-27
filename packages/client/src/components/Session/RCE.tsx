import * as React from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import { useAuth } from '../../utils/hooks/useAuth'
import Editor from '@monaco-editor/react'

interface IProps {
    id: string
}
const RCE = (props: IProps) => {
    const auth = useAuth()
    const { id } = props

    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('wss://y.livecoding.me', id, ydoc)
    const ytext = ydoc.getText('monaco')

    const awareness = provider.awareness

    awareness.setLocalStateField('user', {
        name: auth.user?.user.data.fullname,
        color: '#27ae60',
    })

    const handleEditorDidMount = (editor) => {
        new MonacoBinding(
            ytext,
            /** @type {monaco.editor.ITextModel} */ editor.getModel(),
            new Set([editor]),
            awareness
        )
    }

    return (
        <Editor
            onMount={handleEditorDidMount}
            theme={'vs-dark'}
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
        />
    )
}

export default RCE
