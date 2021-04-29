import React, { useCallback } from 'react'
import { inputLabels } from '../../state/settings/settingsReducer'
import { RenderDimensions } from '../../state/settings/renderDimensions'
import { useAppState } from '../../state'
import useRoomState from '../../hooks/useRoomState/useRoomState'
import { Input, Modal, Select, Typography } from 'antd'
import { useTrans } from 'common'

const withDefault = (val?: string) =>
    typeof val === 'undefined' ? 'default' : val

const { Text } = Typography
const { Option } = Select

const RenderDimensionItems = RenderDimensions.map(({ label, value }) => (
    <Option value={value} key={value}>
        {label}
    </Option>
))

export default function ConnectionOptionsDialog({
    open,
    onClose,
}: {
    open: boolean
    onClose: () => void
}) {
    const { settings, dispatchSetting } = useAppState()
    const roomState = useRoomState()
    const trans = useTrans()
    const isDisabled = roomState !== 'disconnected'

    const handleChange = useCallback(
        (value) => {
            dispatchSetting({
                name: value,
                value: value,
            })
        },
        [dispatchSetting]
    )

    const handleNumberChange = useCallback(
        (e: React.ChangeEvent<{ value: unknown; name?: string }>) => {
            if (!/[^\d]/.test(e.target.value as string)) handleChange(e)
        },
        [handleChange]
    )

    return (
        <Modal
            visible={open}
            onCancel={onClose}
            onOk={onClose}
            title={trans('Connection Settings')}
        >
            {isDisabled ? (
                <Text>
                    These settings cannot be changed when connected to a room.
                </Text>
            ) : null}

            <Input id={inputLabels.dominantSpeakerPriority}>
                Dominant Speaker Priority:
            </Input>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.dominantSpeakerPriority)}
                onChange={handleChange}
            >
                <Option value="low">Low</Option>
                <Option value="standard">Standard</Option>
                <Option value="high">High</Option>
                <Option value="default">Server Default</Option>
            </Select>

            <Text id={inputLabels.trackSwitchOffMode}>
                Track Switch Off Mode:
            </Text>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.trackSwitchOffMode)}
                onChange={handleChange}
            >
                <Option value="predicted">Predicted</Option>
                <Option value="detected">Detected</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="default">Server Default</Option>
            </Select>

            <Text id={inputLabels.bandwidthProfileMode}>Mode:</Text>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.bandwidthProfileMode)}
                onChange={handleChange}
            >
                <Option value="grid">Grid</Option>
                <Option value="collaboration">Collaboration</Option>
                <Option value="presentation">Presentation</Option>
                <Option value="default">Server Default</Option>
            </Select>

            <Input
                disabled={isDisabled}
                id={inputLabels.maxTracks}
                placeholder="Max Tracks"
                name={inputLabels.maxTracks}
                value={withDefault(settings.maxTracks)}
                onChange={handleNumberChange}
            />

            <Input
                disabled={isDisabled}
                id={inputLabels.maxAudioBitrate}
                placeholder="Max Audio Bitrate"
                name={inputLabels.maxAudioBitrate}
                value={withDefault(settings.maxAudioBitrate)}
                onChange={handleNumberChange}
            />
            <Text id={inputLabels.renderDimensionLow}>
                Render Dimension (Low Priority):
            </Text>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.renderDimensionLow)}
                onChange={handleChange}
            >
                {RenderDimensionItems}
            </Select>

            <Text id={inputLabels.renderDimensionStandard}>
                Render Dimension (Standard Priority):
            </Text>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.renderDimensionStandard)}
                onChange={handleChange}
            >
                {RenderDimensionItems}
            </Select>

            <Text id={inputLabels.renderDimensionHigh}>
                Render Dimension (High Priority):
            </Text>
            <Select
                disabled={isDisabled}
                value={withDefault(settings.renderDimensionHigh)}
                onChange={handleChange}
            >
                {RenderDimensionItems}
            </Select>
        </Modal>
    )
}
