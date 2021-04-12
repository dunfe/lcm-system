import {useAuth} from "./useAuth";

export const useToken = () => {
    const auth = useAuth();

    return auth.user?.user.token;
}
