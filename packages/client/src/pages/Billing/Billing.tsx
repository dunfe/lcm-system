import * as React from 'react'
import { Button, Col, Form, Input, Radio, Row } from 'antd'
import { useTrans } from 'common'
import { useForm } from 'antd/es/form/Form'

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
}

const Billing = () => {
    const trans = useTrans()
    const [form] = useForm()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const onAmountChange = (event) => {
        const value = event.target.value

        if (isNaN(parseInt(value))) {
            return
        }

        form.setFieldsValue({
            point: parseInt(value) * 10,
        })
    }

    const onPointChange = (event) => {
        const value = event.target.value

        if (!value || isNaN(Number(value))) {
            return
        }

        form.setFieldsValue({
            amount: parseInt(value) / 10,
        })
    }

    return (
        <Row gutter={24}>
            <Col span={12}>
                <Form
                    form={form}
                    name="billing"
                    className="billing"
                    onFinish={onFinish}
                    {...layout}
                >
                    <Form.Item label="Amount" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: trans('You must add some amount'),
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <Input
                                placeholder="Amount"
                                onChange={onAmountChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="point"
                            rules={[
                                {
                                    required: true,
                                    message: trans('You must add some point'),
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Input
                                placeholder="Point"
                                onChange={onPointChange}
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="Currency"
                        initialValue={'vnd'}
                        rules={[
                            {
                                required: true,
                                message: 'Please pick a payment method!',
                            },
                        ]}
                    >
                        <Radio.Group style={{ width: '100%' }}>
                            <Radio value="vnd">VND</Radio>
                            <Radio value="usd">USD</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="method"
                        label="Payment method"
                        initialValue={'visa'}
                        rules={[
                            {
                                required: true,
                                message: 'Please pick a payment method!',
                            },
                        ]}
                    >
                        <Radio.Group style={{ width: '100%' }}>
                            <Radio.Button
                                value="visa"
                                style={{ width: 'calc(50% - 4px)' }}
                            >
                                Visa
                            </Radio.Button>
                            <Radio.Button
                                value="mastercard"
                                style={{ width: 'calc(50% + 4px)' }}
                            >
                                Mastercard
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            {trans('Add')}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={12}>
                <Form {...layout} name="basic" onFinish={onFinish}>
                    <Form.Item
                        label={trans('Card Number')}
                        name="cardnumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your card number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={'Expiration date'}>
                        <Input.Group compact>
                            <Form.Item
                                name={['card', 'mm']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Month of expiration date is required',
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: '40%' }}
                                    placeholder="MM"
                                />
                            </Form.Item>
                            <Form.Item
                                name={['card', 'yy']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Year of expiration date is required',
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: '40%' }}
                                    placeholder="YY"
                                />
                            </Form.Item>
                            <Form.Item
                                name={['card', 'cvc']}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: 'CVC is required',
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: '20%' }}
                                    placeholder="CVC"
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item label={'Country'} name="country">
                        <Input placeholder="Country" />
                    </Form.Item>
                    <Form.Item label={'Postcode'} name="postcode">
                        <Input placeholder="Postcode" />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {trans('Submit')}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default Billing
