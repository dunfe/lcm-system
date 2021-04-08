import * as React from "react";
import {Menu} from "antd";
import {AppstoreAddOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface IProps {
    selectedKeys: string[];
    onSelect: (state: any) => void;
}

const MenteeMenu = (props: IProps) => {
    const {onSelect, selectedKeys} = props;

    return (
        <Menu theme="light" mode="inline" selectedKeys={selectedKeys} onSelect={onSelect}>
            <Menu.Item key="/" icon={<UserOutlined/>}>
                <Link to={`/`}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/add" icon={<AppstoreAddOutlined/>}>
                <Link to={`/add`}>Thêm câu hỏi</Link>
            </Menu.Item>
            <Menu.Item key="/questions" icon={<UnorderedListOutlined/>}>
                <Link to={`/questions`}>Danh sách câu hỏi</Link>
            </Menu.Item>
            <Menu.Item key="/session" icon={<TeamOutlined/>}>
                <Link to={`/session`}>Session</Link>
            </Menu.Item>
        </Menu>
    )
};

export default MenteeMenu;
