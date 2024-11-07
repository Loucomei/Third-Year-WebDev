import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementTime, auctionComplete } from "../features/items/timeSlice";
const Timer = ( props ) => {
    const { seconds } = props

    const { 
        timePassed
    } = useSelector((store) => store.timer);

    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => {
            dispatch(incrementTime());
        }, 1000)
    },[])

    const actualTimePassed = timePassed / 20;

    return (
        <span className="countdown font-mono text-2xl">
            <span style={{"--value":5}}></span>h
            <span style={{"--value":24}}></span>m
            <span style={{"--value":1}}></span>s
        </span>
    )
}
export default Timer;