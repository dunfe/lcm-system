import type { RootState } from './store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
