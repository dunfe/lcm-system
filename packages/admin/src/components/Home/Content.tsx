import {Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import * as React from "react";
import ListManager from "../../features/list/ListManager";
import Skills from "../../features/skills/Skills";
import Mentees from "../../features/mentees/Mentees";
import Mentors from "../../features/mentors/Mentors";
import Dashboard from "../../features/dashboard/Dashboard";
import styled from "styled-components/macro";

interface IProps {
    path: string;
    addModalVisible: boolean;
    onAdd: (state: any) => Promise<any>;
    setAddModalVisible: (state: boolean) => void;
}

const {Content} = Layout;

const HomeContent = (props: IProps) => {
    const {path, addModalVisible, setAddModalVisible, onAdd} = props;
    return (
        <Content style={{margin: '24px 16px 0'}}>
            <Switch>
                <Route exact path={path}>
                    <Dashboard/>
                </Route>
                <Route path={`/skills`}>
                    <ContentWrapper>
                        <Skills onAdd={onAdd} visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </ContentWrapper>
                </Route>
                <Route path={`/mentees`}>
                    <ContentWrapper>
                        <Mentees visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </ContentWrapper>
                </Route>
                <Route path={`/mentors`}>
                    <ContentWrapper>
                        <Mentors visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </ContentWrapper>
                </Route>
                <Route path={`/feedbacks`}>
                    <ContentWrapper>
                        <ListManager visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </ContentWrapper>
                </Route>
            </Switch>
        </Content>
    )
};

const ContentWrapper = styled.div`
    padding: 24;
    minHeight: 360;
    background-color: white;
`

export default HomeContent;
