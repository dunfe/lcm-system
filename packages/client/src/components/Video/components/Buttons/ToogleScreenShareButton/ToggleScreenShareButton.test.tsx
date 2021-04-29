import ToggleScreenShareButton, {
    SCREEN_SHARE_TEXT,
} from './ToggleScreenShareButton'
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext'
import React from 'react'
import { mount, shallow } from 'enzyme'

import { Button } from 'antd'

jest.mock('../../../hooks/useScreenShareParticipant/useScreenShareParticipant')
jest.mock('../../../hooks/useVideoContext/useVideoContext')

const mockUseVideoContext = useVideoContext as jest.Mock<any>

const mockToggleScreenShare = jest.fn()
mockUseVideoContext.mockImplementation(() => ({
    toggleScreenShare: mockToggleScreenShare,
}))

Object.defineProperty(navigator, 'mediaDevices', {
    value: {
        getDisplayMedia: () => {},
    },
    configurable: true,
})

describe('the ToggleScreenShareButton component', () => {
    it('should render correctly when screenSharing is allowed', () => {
        const wrapper = mount(<ToggleScreenShareButton />)
        expect(wrapper.text()).toBe(SCREEN_SHARE_TEXT)
    })

    it('should call the correct toggle function when clicked', () => {
        const wrapper = shallow(<ToggleScreenShareButton />)
        wrapper.find(<Button />).simulate('click')
        expect(mockToggleScreenShare).toHaveBeenCalled()
    })

    it('should render the screenshare button with the correct messaging if screensharing is not supported', () => {
        Object.defineProperty(navigator, 'mediaDevices', {
            value: { getDisplayMedia: undefined },
        })
        const wrapper = mount(<ToggleScreenShareButton />)
        expect(wrapper.find(Button).prop('disabled')).toBe(true)
    })
})
