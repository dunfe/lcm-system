import './App.css';
import {Steps, Button, message} from "antd";
import Info from "./components/Info";
import * as React from "react";
import {LogoContainer} from "common";
import {Logo} from "common";

const {Step} = Steps;
const {useState} = React;

const steps = [
    {
        title: 'Thông tin cơ bản',
        content: <Info/>,
    },
    {
        title: 'Kỹ năng',
        content: 'Second-content',
    },
    {
        title: 'Hoàn tất',
        content: 'Last-content',
    },
];

function App() {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div className="App">
            <LogoContainer>
                <Logo/>
            </LogoContainer>
            <div className="steps-container">
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
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Hoàn tất
                        </Button>
                    )}
                    {current > 0 && (
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
