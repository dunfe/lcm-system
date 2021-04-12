import {useAuth} from "./useAuth";

export const useAvatar = () => {
    const auth = useAuth();

    return auth.user?.user.data.detail.avatar;
}
