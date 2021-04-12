import { useAuth } from './useAuth'

export const useRole = () => {
    const auth = useAuth()

    return auth.user?.user.data.role
}
