import { useAuth } from './useAuth'

export const usePhoneNumber = () => {
    const auth = useAuth()

    return auth.user?.user.data.detail.phone
}
