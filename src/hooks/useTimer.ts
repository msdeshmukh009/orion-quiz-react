import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useTimer = (setShowModal: Dispatch<SetStateAction<boolean>>) => {
  const [sec, setSec] = useState(30);
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (sec === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          setShowModal(true);
        } else {
          setMinutes(minutes - 1);
          setSec(59);
        }
      } else {
        setSec(sec - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [sec, minutes, setShowModal]);

  return { sec, minutes };
};

export { useTimer };
