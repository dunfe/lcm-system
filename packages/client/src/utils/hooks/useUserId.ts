import { useAuth } from './useAuth'

export const useUserId = () => {
    const auth = useAuth()

    return auth.user?.user.data._id
}
