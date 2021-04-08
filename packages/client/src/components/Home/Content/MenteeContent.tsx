import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import AddQuestion from "../../../pages/Add/AddQuestion";
import ListQuestion from "../../../pages/Question/ListQuestion";
import Join from "../../Session/Join";
import {Layout} from "antd";

interface IProps {
    path: string;
    setSelectedKeys: (state: string[]) => void;
}

const {Content} = Layout;

const MenteeContent = (props: IProps) => {
    const {path, setSelectedKeys} = props;

    return (
        <Content style={{margin: '24px 16px 0'}}>
            <Switch>
                <Route exact path={path}>
                    <Dashboard/>
                </Route>
                <div
                    className="site-layout-background"
                    style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
                >
                    <Route path={`/add`}>
                        <AddQuestion setSelectedKeys={setSelectedKeys}/>
                    </Route>
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

export default MenteeContent;
