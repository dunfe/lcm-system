import * as React from 'react';
import {Layout} from 'antd';
import HeaderComponent from '../../components/Header/Header';
import {
    useRouteMatch,
} from 'react-router-dom';
import PageHeader from "../../components/Header/PageHeader";
import MenteeContent from "../../components/Home/Content/MenteeContent";
import {useAuth} from "../../utils/hooks/useAuth";
import MentorContent from "../../components/Home/Content/MentorContent";
import MenteeMenu from "../../components/Menu/MenteeMenu";
import MentorMenu from "../../components/Menu/MentorMenu";

const {Sider} = Layout;

const {useState, useEffect} = React;

export function HomePage() {
    //check login
    const auth = useAuth();
    const role = auth.user?.user.data.role;
    const {path} = useRouteMatch();
    const [selectedKeys, setSelectedKeys] = useState([location.pathname]);
    const [pageHeader, setPageHeader] = useState({
        title: '',
        subtitle: ''
    });

    const onSelect = ({selectedKeys}: any) => {
        setSelectedKeys(selectedKeys)
    };

    useEffect(() => {
        if (selectedKeys) {
            switch (selectedKeys[0]) {
                case '/add':
                    setPageHeader({
                        title: 'Tạo câu hỏi',
                        subtitle: 'Tạo một câu hỏi để được giúp đỡ'
                    });
                    break;
                case '/questions':
                    setPageHeader({
                        title: 'Danh sách câu hỏi',
                        subtitle: 'Danh sách những câu hỏi của bạn'
                    });
                    break;
                case '/matching':
                    setPageHeader({
                        title: 'Matching',
                        subtitle: 'Chọn những mentor bạn muốn'
                    });
                    break;
            }
        }
    }, [selectedKeys]);

    return (
        <Layout style={{height: '100vh'}}>
            <HeaderComponent/>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    theme={"light"}
                >
                    {role === 'mentee' ? <MenteeMenu selectedKeys={selectedKeys} onSelect={onSelect}/>
                    : <MentorMenu selectedKeys={selectedKeys} onSelect={onSelect}/>}
                </Sider>
                <Layout>
                    {selectedKeys.filter((item) => item === '/').length <= 0 ?
                        <PageHeader title={pageHeader.title} subTitle={pageHeader.subtitle}/> : null}
                    {role === 'mentee' ? <MenteeContent path={path} setSelectedKeys={setSelectedKeys}/>
                        : <MentorContent path={path}/>}
                </Layout>
            </Layout>
        </Layout>
    );
}
