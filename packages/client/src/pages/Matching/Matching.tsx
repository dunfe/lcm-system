import * as React from "react";
import { useSprings, animated} from "react-spring";
import { useDrag } from "react-use-gesture";
import { Descriptions } from "antd";
import axios from "axios";
import {useAuth} from "../../utils/hooks/useAuth";
import "./Matching.css";

interface IQuestion {
    receivedBy: string[];
    point: number;
    skill: string[];
    timeAvailableFrom: number;
    timeAvailableTo: number;
    status: string;
    _id: string;
    time: number;
    title: string;
    menteeId: string;
    menteeName: string;
    content: string;
    note: string;
    createAt: string;
    __v: number;
}

const instance = axios.create({baseURL: 'https://livecoding.me'});

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform

const {useState, useEffect} = React;

const Matching = () => {
    const auth = useAuth();
    const [cards, setCards] = useState<JSX.Element[]>([]);
    const [data, setData] = useState<IQuestion[]>([]);
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(cards.length, (i) => ({ ...to(i), from: from() })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        set((i) => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        if (!down && gone.size === cards.length) {
            // @ts-ignore
            setTimeout(() => gone.clear() || set((i) => to(i)), 600)
        }
    });

    useEffect(() => {
        if (data) {
            const _cards = data.map((item, index) => {
                return (
                    <Descriptions title={item.title} key={index} className={'matching-description'}>
                        <Descriptions.Item label="Người hỏi">{item.menteeName}</Descriptions.Item>
                        <Descriptions.Item label="Point">{item.point}</Descriptions.Item>
                        <Descriptions.Item label="Kỹ năng">{item.skill.join(',')}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{item.status}</Descriptions.Item>
                        <Descriptions.Item label="Nội dung">{item.content}</Descriptions.Item>
                        <Descriptions.Item label="Từ">
                            {item.createAt}
                        </Descriptions.Item>
                    </Descriptions>
                )
            });

            setCards(_cards);
        }
    }, [data]);

    useEffect(() => {
        instance.get('/api/mentor/listQuestionForMentor', {
            headers: {
                'Authorization': auth.user?.user.token
            }
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.data.results);
            }
        }).catch((error) => console.error(error));
    }, []);
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div {...bind(i)}>
                {cards[i]}
            </animated.div>
        </animated.div>
    ))
};

export default Matching;
