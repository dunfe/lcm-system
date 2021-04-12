import {useAuth} from "./useAuth";

export const useFullname = () => {
    const auth = useAuth();

    return auth.user?.user.data.fullname;
};
