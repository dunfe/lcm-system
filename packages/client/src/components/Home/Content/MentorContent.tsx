import * as React from "react";
import {Route} from "react-router-dom";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import ListQuestion from "../../../pages/Question/ListQuestion";
import Join from "../../Session/Join";
import Matching from "../../../pages/Matching/Matching";
import "./MentorContent.css";

interface IProps {
    path: string;
}

const MentorContent = (props: IProps) => {
    const {path} = props;

    return (
        <>
            <Route exact path={path}>
                <Dashboard/>
            </Route>
            <Route path={`/matching`}>
                <div className="site-layout-background">
                    {Matching()}
                </div>
            </Route>
            <Route path={`/questions`}>
                <div style={{padding: 24, backgroundColor: "white"}}>
                    <ListQuestion/>
                </div>
            </Route>
            <Route path={`/session`}>
                <div style={{padding: 24, minHeight: 360, backgroundColor: "white"}}>
                    <Join/>
                </div>
            </Route>
            <Route path={`/setting`}>
                <div style={{padding: 24, backgroundColor: "white"}}>
                    <h3>Setting</h3>
                </div>
            </Route>
        </>
    )
};

export default MentorContent;
