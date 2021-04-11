import * as React from "react";
import {Route} from "react-router-dom";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import AddQuestion from "../../../pages/Add/AddQuestion";
import ListQuestion from "../../../pages/Question/ListQuestion";
import Join from "../../Session/Join";
import Setting from "../../Setting/Setting";

interface IProps {
    path: string;
    setSelectedKeys: (state: string[]) => void;
}

const MenteeContent = (props: IProps) => {
    const {path, setSelectedKeys} = props;

    return (
        <>
            <Route exact path={path}>
                <Dashboard/>
            </Route>
            <Route path={`/add`}>
                <div
                    style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
                >
                    <AddQuestion setSelectedKeys={setSelectedKeys}/>
                </div>
            </Route>
            <Route path={`/questions`}>
                <div
                    style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
                >
                    <ListQuestion/>
                </div>
            </Route>
            <Route path={`/session`}>
                <div
                    style={{padding: 24, minHeight: 360, backgroundColor: "white"}}
                >
                    <Join/>
                </div>
            </Route>
            <Route path={`/setting`}>
                <div style={{padding: 24, backgroundColor: "white"}}>
                    <Setting/>
                </div>
            </Route>
        </>
    )
};

export default MenteeContent;
