import * as React from "react";
import {Form, FormInstance, Input, message, Select} from "antd";
import axios from "axios";

interface IProps {
    form: FormInstance<any>;
}

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
};

const { useState, useEffect } = React;
const instance = axios.create({ baseURL: 'https://livecoding.me' })

const Skills = (props: IProps) => {
    const {form} = props;
    const [skills, setSkills] = useState([]);

    const handleChange = (selected: string[]) => {
        console.log(selected);
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
        <Form form={form} style={{paddingTop: 24}} {...layout} name="nest-messages">
            <Form.Item name={['user', 'skills']} label="Chọn kỹ năng" rules={[{required: true, message: 'Vui lòng chọn kỹ năng!'}]}>
                <Select mode="tags" style={{ width: '100%' }}
                        options={skills}
                        placeholder="Chọn kỹ năng" onChange={handleChange}/>
            </Form.Item>
            <Form.Item name={['user', 'cv']} label="Link file CV" rules={[{required: true, message: 'Vui lòng điền link CV'}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'github']} label="Link Github">
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'linkedin']} label="Linkedin">
                <Input/>
            </Form.Item>
        </Form>
    )
};

export default Skills;
