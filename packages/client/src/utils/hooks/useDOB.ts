import { useAuth } from './useAuth'

export const useDOB = () => {
    const auth = useAuth()

    return auth.user?.user.data.detail.dob
}
