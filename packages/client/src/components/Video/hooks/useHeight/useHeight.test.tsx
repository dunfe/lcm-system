import useHeight from './useHeight'
import { act, renderHook } from '@testing-library/react-hooks'

describe('the useHeight hook', () => {
    it('should return window.innerHeight', () => {
        // @ts-ignore
        window.innerHeight = 140
        const { result } = renderHook(useHeight)
        expect(result.current).toBe('54px')

        act(() => {
            // @ts-ignore
            window.innerHeight = 150
            window.dispatchEvent(new Event('resize'))
        })

        expect(result.current).toBe('64px')
    })

    it('should take window.visualViewport.scale into account', () => {
        // @ts-ignore
        window.innerHeight = 100

        // @ts-ignore
        window.visualViewport = {
            scale: 2,
        }

        const { result } = renderHook(useHeight)
        expect(result.current).toBe('114px')

        act(() => {
            // @ts-ignore
            window.innerHeight = 150
            window.dispatchEvent(new Event('resize'))
        })

        expect(result.current).toBe('214px')
    })
})
