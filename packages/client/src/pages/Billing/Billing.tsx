import { useAPI } from '../../utils/hooks/useAPI'
import * as React from 'react'
import {
    Button,
    Col,
    Form,
    Input,
    message,
    Radio,
    Row,
    Table,
    Tabs,
    Tag,
} from 'antd'
import { useTrans } from 'common'
import { useForm } from 'antd/es/form/Form'
import { Breakpoint } from 'antd/es/_util/responsiveObserve'
import dayjs from 'dayjs'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
}

const { TabPane } = Tabs

const { useState, useEffect } = React

const Billing = () => {
    const trans = useTrans()
    const [amountForm] = useForm()
    const [cardForm] = useForm()
    const instance = useAPI()

    const [pointOutData, setPointOutData] = useState([])
    const [pointInData, setPointInData] = useState([])
    const [data, setData] = useState([])
    const [currency, setCurrency] = useState('vnd')

    const paymentHistoryColumn = [
        {
            title: 'No',
            width: '5%',
            render(text: string, record: any, index: number) {
                return index + 1
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Time',
            dataIndex: 'createAt',
            key: 'createAt',
            render(text: string) {
                return dayjs(text).format('LLLL')
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render(text: string) {
                return <Tag>{text}</Tag>
            },
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Money',
            dataIndex: 'money',
            key: 'money',
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            responsive: ['lg'] as Breakpoint[],
        },
        {
            title: 'Before',
            dataIndex: 'pointBefore',
            key: 'pointBefore',
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: 'After',
            dataIndex: 'pointAfter',
            key: 'pointAfter',
            render(text: string, record: any) {
                if (record.type === 'in') {
                    return (
                        <>
                            <ArrowUpOutlined style={{ color: 'green' }} />{' '}
                            {text}
                        </>
                    )
                } else {
                    return (
                        <>
                            <ArrowDownOutlined style={{ color: 'red' }} />{' '}
                            {text}
                        </>
                    )
                }
            },
            responsive: ['sm'] as Breakpoint[],
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            responsive: ['lg'] as Breakpoint[],
        },
    ]

    const onFinish = () => {
        amountForm.validateFields().then((amountValues) => {
            const { amount, currency } = amountValues
            if (currency === 'vnd' && amount < 10000) {
                message.error(trans('Please add at least 10000 vnd'))
                return
            }

            if (currency === 'usd' && amount < 1) {
                message.error(trans('Please add at least 1 usd'))
                return
            }
            cardForm.validateFields().then((cardValues) => {
                const { amount, currency } = amountValues
                const data = { ...cardValues, amount, currency }

                instance
                    .post('/api/users/payment', data)
                    .then((response) => {
                        if (response.status === 200) {
                            message.success(response.data.message)
                            amountForm.resetFields()
                            cardForm.resetFields()
                        }
                    })
                    .catch((error) =>
                        message.error(error.response.data.message)
                    )
            })
        })
    }

    const onAmountChange = (event) => {
        const value = event.target.value

        if (isNaN(parseInt(value))) {
            return
        }

        let point = 0

        if (currency === 'vnd') {
            point = Math.round(parseInt(value) / 100)
        } else {
            point = parseInt(value) * 230
        }

        amountForm.setFieldsValue({
            point,
        })
    }

    const onPointChange = (event) => {
        const value = event.target.value

        if (!value || isNaN(Number(value))) {
            return
        }

        let amount = 0

        if (currency === 'vnd') {
            amount = Math.round(parseInt(value) * 100)
        } else {
            amount = Math.round(parseInt(value) / 230)
        }

        amountForm.setFieldsValue({
            amount,
        })

        amountForm.setFieldsValue({
            amount,
        })
    }

    const onCurrencyChange = (value) => {
        setCurrency(value.target.value)
    }

    useEffect(() => {
        setData([...pointInData, ...pointOutData])
    }, [pointOutData, pointInData])

    useEffect(() => {
        const getExpandPointOutData = () => {
            instance
                .get(`/api/users/pointOut`)
                .then((response) => {
                    const results = response.data.data.results.map(
                        (item: any) => {
                            return {
                                ...item,
                                type: 'out',
                            }
                        }
                    )
                    setPointOutData(results)
                })
                .catch((error) => console.error(error.message))
        }

        const getExpandPointInData = () => {
            instance
                .get(`/api/users/pointIn`)
                .then((response) => {
                    const results = response.data.data.results.map(
                        (item: any) => {
                            return {
                                ...item,
                                type: 'in',
                            }
                        }
                    )
                    setPointInData(results)
                })
                .catch((error) => console.error(error.message))
        }

        getExpandPointInData()
        getExpandPointOutData()
    }, [])

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={trans('Make payment')} key="1">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form
                                    form={amountForm}
                                    name="billing"
                                    className="billing"
                                    onFinish={onFinish}
                                    {...layout}
                                >
                                    <Form.Item
                                        label="Amount"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Form.Item
                                            name="amount"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: trans(
                                                        'You must add some amount'
                                                    ),
                                                },
                                            ]}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                            }}
                                        >
                                            <Input
                                                placeholder={trans('Amount')}
                                                onChange={onAmountChange}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="point"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: trans(
                                                        'You must add some point'
                                                    ),
                                                },
                                            ]}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                                margin: '0 8px',
                                            }}
                                        >
                                            <Input
                                                placeholder={trans('Point')}
                                                onChange={onPointChange}
                                            />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item
                                        name="currency"
                                        label="Currency"
                                        initialValue={'usd'}
                                        rules={[
                                            {
                                                required: true,
                                                message: trans(
                                                    'Please pick a payment method!'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Radio.Group
                                            style={{ width: '100%' }}
                                            value={currency}
                                            onChange={onCurrencyChange}
                                        >
                                            <Radio value="usd">USD</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col span={12}>
                                <Form
                                    form={cardForm}
                                    {...layout}
                                    name="basic"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label={trans('Card Number')}
                                        name="cardNumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: trans(
                                                    'Please input your card number!'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={trans('Card Number')}
                                        />
                                    </Form.Item>

                                    <Form.Item label={trans('Expiration date')}>
                                        <Input.Group compact>
                                            <Form.Item
                                                name={'cardExpMonth'}
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: trans(
                                                            'Month of expiration date is required'
                                                        ),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    style={{ width: '40%' }}
                                                    placeholder="MM"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name={'cardExpYear'}
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: trans(
                                                            'Year of expiration date is required'
                                                        ),
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    style={{ width: '40%' }}
                                                    placeholder="YY"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name={'cardCVC'}
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: trans(
                                                            'CVC is required'
                                                        ),
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
                                        <Input placeholder={trans('Country')} />
                                    </Form.Item>
                                    <Form.Item
                                        label={trans('Postcode')}
                                        name="postalCode"
                                    >
                                        <Input
                                            placeholder={trans('Postcode')}
                                        />
                                    </Form.Item>

                                    <Form.Item {...tailLayout}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            {trans('Submit')}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={trans('Payment history')} key="2">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Table
                                    columns={paymentHistoryColumn}
                                    dataSource={data}
                                    pagination={false}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}

export default Billing
