import * as React from "react";
import {Form, Input, Select, Button, message, DatePicker, TimePicker, InputNumber} from "antd";
import axios from "axios";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const {useState, useEffect} = React;

const instance = axios.create({ baseURL: 'https://livecoding.me' });
const AddQuestion = () => {
    const [skills, setSkills] = useState([]);
    const onFinish = (values: any) => {
        console.log(values);
    };

    useEffect(() => {
        instance.get('/api/admin/skills', {
            method: 'get',
            url: 'https://livecoding.me/api/admin/skills?page=1',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwNTBhOGU4YTAxYzljMjdmMDNhZDk4NiIsInVzZXJuYW1lIjoiYWRtaW4xIn0sImlhdCI6MTYxNTg5OTc2MX0.GqyRhTl1HqKCsKrvEcX0PYI97AHKqep5021xmdJP_14',
                'Cookie': '__cfduid=d1c45d61df14ee4fba5626e3f01fbf95e1617212993'
            }
        }).then((response) => {
            if (response.status === 200) {
                const options = response.data.skill.map((item: any) => {
                    return {
                        label: item.name,
                        value: item._id
                    }
                });
                if (options) {
                    setSkills(options);
                }
            }
        }).catch((error) => message.error(error.message));
    })

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
            <Form.Item name={'title'} label="Tiêu đề" rules={[{ required: true }]}>
                <Input placeholder={'Tiêu đề'}/>
            </Form.Item>
            <Form.Item name={'content'} label="Nội dung" rules={[{ required: true }]}>
                <Input.TextArea placeholder={'Nội dung'}/>
            </Form.Item>
            <Form.Item name={'skills'} label="Chọn kỹ năng" rules={[{required: true, message: 'Vui lòng chọn kỹ năng!'}]}>
                <Select mode="tags" style={{ width: '100%' }}
                        options={skills}
                        placeholder="Chọn kỹ năng"/>
            </Form.Item>
            <Form.Item name={'time'} label="Thời lượng">
                <InputNumber placeholder={"Phút"} defaultValue={15} style={{width: '20%'}}/> phút
            </Form.Item>
            <Form.Item name={'point'} label="Giá tiền">
                <InputNumber placeholder={"Giá tiền"} defaultValue={0} style={{width: '20%'}}/> point
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Tạo
                </Button>
            </Form.Item>
        </Form>
    )
};

export default AddQuestion;
