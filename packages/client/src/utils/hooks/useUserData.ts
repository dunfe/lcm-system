import { useAuth } from './useAuth'

export const useUserData = () => {
    const auth = useAuth()

    return auth.user?.user.data
}
