import { ChatContext } from '../../components/ChatProvider'
import { useContext } from 'react'

export default function useChatContext() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider')
    }
    return context
}
