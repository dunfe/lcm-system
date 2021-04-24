import { Steps, Button, message } from 'antd'
import * as React from 'react'
import { useForm } from 'antd/es/form/Form'
import { LogoContainer, SelectLocale, useTrans } from 'common'
import Info from '../../components/BecomeMentor/Info'
import Skills from '../../components/BecomeMentor/Skills'
import Results from '../../components/BecomeMentor/Results'
import './BecomeMentor.css'
import { useAPI } from '../../utils/hooks/useAPI'

const { Step } = Steps
const { useState } = React

const BecomeMentor = () => {
    const [current, setCurrent] = useState(0)
    const [finish, setFinish] = useState({
        info: false,
        skill: false,
    })
    const [info] = useForm()
    const [skill] = useForm()
    const trans = useTrans()
    const instance = useAPI()

    const onInfoFinish = () => {
        info.validateFields()
            .then((values) => {
                delete values.email
                instance
                    .put('/api/users', values)
                    .then((response) => {
                        if (response.status === 200) {
                            message.success(trans('Updated'))
                        }
                    })
                    .catch((error) =>
                        message.error(error.response.data.message ?? 'Failed')
                    )
            })
            .then(() => {
                setFinish({ ...finish, info: true })
                setCurrent(current + 1)
            })
            .catch((error) => message.error(error.message))
    }

    const onSkillFinish = () => {
        skill
            .validateFields()
            .then((values) => {
                instance
                    .post('/api/users/mentor/register', values)
                    .then((response) => {
                        if (response.status === 200) {
                            setFinish({ ...finish, skill: true })
                            setCurrent(current + 1)
                        }
                    })
                    .catch((error) =>
                        message.error(error.response.data.message)
                    )
            })
            .catch((error) => message.error(error.response.data.message))
    }

    const steps = [
        {
            title: trans('Basic information'),
            content: <Info form={info} />,
        },
        {
            title: trans('Skills'),
            content: <Skills form={skill} />,
        },
        {
            title: trans('Done'),
            content: <Results />,
        },
    ]

    const next = () => {
        switch (current) {
            case 0:
                onInfoFinish()
                break
            case 1:
                onSkillFinish()
                break
            case 2:
                if (finish.info && finish.skill) {
                    setCurrent(current + 1)
                }
        }
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    return (
        <div className="become-mentor">
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: 10,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    right: 12,
                }}
            >
                <SelectLocale />
            </div>
            <div className="steps-container">
                <LogoContainer />
                <Steps className="steps" current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            {trans('Next')}
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary">
                            <a href={'https://livecoding.me'}>
                                {trans('Finish')}
                            </a>
                        </Button>
                    )}
                    {current > 0 && current < 2 && (
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => prev()}
                        >
                            {trans('Previous')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BecomeMentor
