import React from 'react'

interface TextMessageProps {
    body: string
    isLocalParticipant: boolean
}

export default function TextMessage({
    body,
    isLocalParticipant,
}: TextMessageProps) {
    return (
        <div>
            <div
                style={{
                    borderRadius: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5em 0.8em 0.6em',
                    margin: '0.3em 0 0',
                    wordBreak: 'break-word',
                    backgroundColor: isLocalParticipant ? '#CCE4FF' : '#E1E3EA',
                    hyphens: 'auto',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <div>{body}</div>
            </div>
        </div>
    )
}
