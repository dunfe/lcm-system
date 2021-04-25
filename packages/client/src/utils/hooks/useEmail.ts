import { useAuth } from './useAuth'

export const useEmail = () => {
    const auth = useAuth()

    return auth.user?.user.data.email
}
