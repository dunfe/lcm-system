import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import ListQuestion from "../../../pages/Question/ListQuestion";
import Join from "../../Session/Join";
import {Layout} from "antd";
import Matching from "../../../pages/Matching/Matching";
import "./MentorContent.css";

interface IProps {
    path: string;
}

const {Content} = Layout;

const MentorContent = (props: IProps) => {
    const {path} = props;

    return (
        <Content style={{margin: '24px 16px 0'}}>
            <Switch>
                <Route exact path={path}>
                    <Dashboard/>
                </Route>
                <div
                    className="site-layout-background"
                >
                    <Route path={`/matching`}>
                        {Matching()}
                    </Route>
                </div>
                <div
                    className="site-layout-background"
                    style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
                >
                    <Route path={`/questions`}>
                        <ListQuestion/>
                    </Route>
                    <Route path={`/session`}>
                        <Join/>
                    </Route>
                </div>
            </Switch>
        </Content>
    )
};

export default MentorContent;
