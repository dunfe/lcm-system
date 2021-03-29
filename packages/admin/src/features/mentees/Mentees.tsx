import * as React from "react";
import {Table, Space, Modal, Form, Input, Button, message} from "antd";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";

interface IProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

const {useState, useEffect} = React;
const {useForm} = Form;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const Mentees = (props: IProps) => {
    const {visible, setVisible} = props;
    const [data, setData] = useState([]);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [mode, setMode] = useState('add');
    const [updateId, setUpdateId] = useState('');
    const [itemDetail, setItemDetail] = useState({});
    const [form] = useForm();

    const auth = useAuth();
    const instance = axios.create({
        baseURL: 'https://livecoding.me',
        headers: {
            'Authorization': auth?.user?.user.token,
        }
    })
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render(text: string, record: any) {
                return <Space size="middle" key={record._id}>
                    <a onClick={() => onEdit(record._id)}>Edit</a>
                </Space>;
            },
        }
    ]

    const onEdit = (id: string) => {
        setMode('update');
        setUpdateId(id);
        setVisible(true);
    }

    const handleCancel = () => {
        setVisible(false);
        setMode('add');
        setUpdateId('');
    };

    const getData = () => {
        instance.get('/api/admin/users').then((response) => {
            setData(response.data.data);
        }).catch((error) => console.error(error.message));
    };

    const onFinish = (values: any) => {
        setConfirmLoading(true);

        if (mode === 'update' && updateId !== '') {
            instance.put(`/api/admin/users/${updateId}`, values).then((response) => {
                if (response.status === 200) {
                    getData();
                    message.success('Cập nhật thành công').then(() => {
                        setVisible(false);
                    })
                }
            }).catch((error) => message.error(error.message))
        }

        setConfirmLoading(false);
    };

    useEffect(() => {
        if (updateId !== '') {
            instance.get(`/api/admin/users/${updateId}`).then((response) => {
                if (response.status === 200) {
                    setItemDetail(response.data.data);
                }
            })
        }
    }, [updateId]);

    useEffect(() => {
        if (mode === 'update') {
            form.setFieldsValue(itemDetail);
        }
    }, [itemDetail]);

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Modal
                title="Sửa thông tin"
                visible={visible}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    {...layout}
                    name="add"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} rowKey={'_id'} pagination={{
                defaultPageSize: 10,
            }}/>
        </>
    )
}

export default Mentees;
