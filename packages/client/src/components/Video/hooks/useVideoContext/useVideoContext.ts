import { VideoContext } from '../../components/VideoProvider'
import { useContext } from 'react'

export default function useVideoContext() {
    const context = useContext(VideoContext)
    if (!context) {
        throw new Error('useVideoContext must be used within a VideoProvider')
    }
    return context
}
