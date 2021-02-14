// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { useSelector, TypedUseSelectorHook } from 'react-redux';
/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  isAuthenticated: boolean;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
