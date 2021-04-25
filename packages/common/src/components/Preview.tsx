import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface IProps {
    content: string
}
const Preview = (props: IProps) => {
    const { content } = props
    const components = {
        code(value) {
            const { inline, className, children, ...props } = value
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                />
            ) : (
                <code className={className} {...props} />
            )
        },
    }

    return <ReactMarkdown components={components}>{content}</ReactMarkdown>
}

export default Preview
