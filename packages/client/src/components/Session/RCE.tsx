import * as React from 'react'

import { useAuth } from '../../utils/hooks/useAuth'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { Select } from 'antd'

interface IProps {
    id: string
}
const RCE = (props: IProps) => {
    const auth = useAuth()
    const { id } = props
    const [language, setLanguage] = useState('Javascript')

    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('wss://y.livecoding.me', id, ydoc)

    provider.on('change', (evt) => {
        console.log(evt)
        setLanguage(evt)
    })

    const onLanguageChange = (value) => {
        provider.emit('change', [value])
        setLanguage(value)
    }

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

    const options = [
        {
            label: 'Javascript',
            value: 'javascript',
        },
        {
            label: 'Java',
            value: 'java',
        },
        {
            label: 'TypeScript',
            value: 'typescript',
        },
        {
            label: 'CSS',
            value: 'css',
        },
        {
            label: 'JSON',
            value: 'json',
        },
        {
            label: 'HTML',
            value: 'html',
        },
        {
            label: 'C#',
            value: 'c#',
        },
        {
            label: 'Python',
            value: 'python',
        },
        {
            label: 'PHP',
            value: 'php',
        },
    ]

    return (
        <>
            <Editor
                onMount={handleEditorDidMount}
                theme={'vs-dark'}
                height="90vh"
                language={language}
                defaultLanguage="javascript"
                defaultValue="// some comment"
            />
            <Select
                options={options}
                style={{
                    width: 120,
                }}
                value={language}
                onChange={onLanguageChange}
            />
        </>
    )
}

export default RCE
