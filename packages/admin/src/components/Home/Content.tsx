import {Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import * as React from "react";
import Dashboard from "../../features/dashboard/Dashboard";
import styled from "styled-components/macro";
import Feedbacks from '../../features/feedbacks/Feedbacks'
import Requests from '../../features/requests/Requests'

interface IProps {
    path: string;
    addModalVisible: boolean;
    onAdd: (state: any) => Promise<any>;
    setAddModalVisible: (state: boolean) => void;
}

const {Content} = Layout;

const Skills = React.lazy(() => import('../../features/skills/Skills'))
const Questions = React.lazy(() => import('../../features/questions/Questions'))
const Mentees = React.lazy(() => import('../../features/mentees/Mentees'))
const Mentors = React.lazy(() => import('../../features/mentors/Mentors'))
const Points = React.lazy(() => import('../../features/points/Points'))

const HomeContent = (props: IProps) => {
    const {path, addModalVisible, setAddModalVisible, onAdd} = props;

    return (
        <Content style={{margin: '24px 16px 0'}}>
            <Switch>
                <Route exact path={path}>
                    <Dashboard/>
                </Route>
                <Route exact path={`/requests`}>
                    <ContentWrapper>
                        <Requests />
                    </ContentWrapper>
                </Route>
                <Route path={`/skills`}>
                    <ContentWrapper>
                        <Skills onAdd={onAdd} visible={addModalVisible} setVisible={setAddModalVisible}/>
                    </ContentWrapper>
                </Route>
                <Route path={`/questions`}>
                    <ContentWrapper>
                        <Questions />
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
                        <Feedbacks />
                    </ContentWrapper>
                </Route>
                <Route path={`/points`}>
                    <ContentWrapper>
                        <Points />
                    </ContentWrapper>
                </Route>
            </Switch>
        </Content>
    )
};

const ContentWrapper = styled.div`
    padding: 24px;
    min-height: 360px;
    background-color: white;
`

export default HomeContent;
