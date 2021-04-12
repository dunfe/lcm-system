import * as React from 'react'
import { Tabs, Table } from 'antd'
import { useAPI } from '../../utils/hooks/useAPI'

export interface IData {
    receivedBy: string[]
    point: number
    skill: string[]
    time: number
    status: string
    _id: string
    title: string
    menteeId: string
    menteeName: string
    content: string
    note: string
    createAt: string
    __v: number
}
const { TabPane } = Tabs

const { useEffect, useState } = React

const ListQuestion = () => {
    const instance = useAPI()

    const [data, setData] = useState<IData[]>([])

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    useEffect(() => {
        instance
            .get('/api/users/questions')
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.data.results)
                }
            })
            .catch((error) => console.error(error.message))
    }, [])

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Đang chờ" key="1">
                <Table columns={columns} dataSource={data} rowKey={'_id'} />
            </TabPane>
            <TabPane tab="Đã trả lời" key="2">
                <Table columns={columns} dataSource={data} rowKey={'_id'} />
            </TabPane>
        </Tabs>
    )
}

export default ListQuestion
