import {Route, Switch} from "react-router-dom";
import Skills from "../../features/skills/Skills";
import {Layout} from "antd";
import * as React from "react";

interface IProps {
    path: string;
    addModalVisible: boolean;
    onAdd: (state: any) => Promise<any>;
    setAddModalVisible: (state: boolean) => void;
}
const {Content} = Layout;

const HomeContent = (props: IProps) => {
    const { path, addModalVisible, setAddModalVisible, onAdd } = props;
    return (
        <Content style={{margin: '24px 16px 0'}}>
            <div
                className="site-layout-background"
                style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
            >
                <Switch>
                    <Route exact path={path}>
                        <h3>Dashboard</h3>
                    </Route>
                    <Route path={`/skills`}>
                        <Skills onAdd={onAdd} visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </Route>
                    <Route path={`/mentees`}>
                        <h3>Quản lí Mentee</h3>
                    </Route>
                    <Route path={`/mentors`}>
                        <h3>Quản lí Mentor</h3>
                    </Route>
                    <Route path={`/feedbacks`}>
                        <h3>Quản lí Feedback</h3>
                    </Route>
                </Switch>
            </div>
        </Content>
    )
}

export default HomeContent;
