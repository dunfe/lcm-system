import { useAuth } from './useAuth'

export const useUsername = () => {
    const auth = useAuth()

    return auth.user?.user.data.username
}
