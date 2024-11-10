import { useEffect, useState } from "react";
const Timer = (props) => {
  const { timer } = props;
  var time = timer;

  console.log(props)

  const [hours, setHours] = useState(Math.floor(time / 3600));
  time -= hours * 3600;

  const [minutes, setMinutes] = useState(Math.floor(time / 60));
  time -= minutes * 60;

  const [seconds, setSeconds] = useState(Math.floor(time));

  const [auctionComplete, setAuctionComplete] = useState(false);

  const updateVar = () => {
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      setAuctionComplete(true);
      clearInterval(cd);
    } else if (minutes <= 0 && seconds <= 0) {
      setHours((hours) => {
        return hours - 1;
      });
      setMinutes(60);
      setSeconds(60);
    } else if (seconds <= 0) {
      setMinutes((minutes) => {
        return minutes - 1;
      });
      setSeconds(60);
    }
  };

  const countdown = () => {
    setSeconds((seconds) => {
      return seconds - 1;
    });
  };

  useEffect(() => {
    const cd = setInterval(() => {
      countdown(seconds);
    }, 1000);
  }, []);

  return (
    <>
      {updateVar()}
      <span className="countdown font-mono text-2xl">
        <span style={{ "--value": hours }}></span>h
        <span style={{ "--value": minutes }}></span>m
        <span style={{ "--value": seconds }}></span>s
      </span>
    </>
  );
};
export default Timer;
