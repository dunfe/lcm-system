import './App.css';
import {Steps, Button} from "antd";
import Info from "./components/Info";
import * as React from "react";
import Skills from "./components/Skills";
import Results from "./components/Results";
import {useForm} from "antd/es/form/Form";
import { LogoContainer } from 'common'

const {Step} = Steps;
const {useState} = React;

const App = () => {
    const [current, setCurrent] = useState(0);
    const [finish, setFinish] = useState({
        info: false,
        skill: false
    })
    const [info] = useForm();
    const [skill] = useForm();

    const onInfoFinish = () => {
        info.validateFields().then(() => {
            setFinish({...finish, info: true});
            setCurrent(current + 1);
        });
    }

    const onSkillFinish = () => {
        skill.validateFields().then(() => {
            setFinish({...finish, skill: true})
            setCurrent(current + 1);
        })
    }

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: <Info form={info}/>,
        },
        {
            title: 'Kỹ năng',
            content: <Skills form={skill}/>,
        },
        {
            title: 'Hoàn tất',
            content: <Results/>,
        },
    ];

    const next = () => {
        switch (current) {
            case 0:
                onInfoFinish();
                break;
            case 1:
                onSkillFinish();
                break;
            case 2:
                if (finish.info && finish.skill) {
                    setCurrent(current + 1);
                }
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    return (
        <div className="App">
            <div className="steps-container">
                <LogoContainer/>
                <Steps className="steps" current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Tiếp theo
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary">
                            <a href={"https://livecoding.me"}>Hoàn tất</a>
                        </Button>
                    )}
                    {current > 0 && current < 2 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Trước
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
