import * as React from "react";
import {Tabs, Table} from "antd";

const {TabPane} = Tabs;

const ListQuestion = () => {
    const data = [
        {
            key: '1',
            title: 'John Brown',
            point: 32,
            status: 'new',
        },
        {
            key: '2',
            title: 'Jim Green',
            point: 42,
            status: 'doing',
        },
        {
            key: '3',
            title: 'Joe Black',
            point: 32,
            status: 'done',
        },
    ];
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
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'address',
        }
    ];
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Đang chờ" key="1">
                <Table columns={columns} dataSource={data} />
            </TabPane>
            <TabPane tab="Đã trả lời" key="2">
                <Table columns={columns} dataSource={data} />
            </TabPane>
        </Tabs>
    )
};

export default ListQuestion;
