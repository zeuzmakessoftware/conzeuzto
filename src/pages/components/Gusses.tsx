import { useState, useEffect } from "react";

interface GussesProps {
  left: string;
  right: string;
  alreadyGuessed?: boolean;
}

const Gusses: React.FC<GussesProps> = ({left, right, alreadyGuessed}) => {
    const rightNumber = parseFloat(right);
    const perc = Math.max(Math.exp(Math.log(0.5) / 800 * rightNumber) * 100, 4);
    const [colorNum, setColorNum] = useState(0);

    useEffect(() => {
        if (rightNumber < 250) {
        setColorNum(0);
        }
        else if (rightNumber < 1500) {
        setColorNum(1);
        }
        else {
        setColorNum(2);
        }
    }, [right]);


    const colors = ["#19b055", "#ed7315", "#d11d38"]

    if (left == "") {
        return null;
    }

    if (alreadyGuessed == false) {
    return (
        <div className="flex justify-center items-center my-3">
        <div className="h-10 w-80 rounded-md text-l text-white font-semibold border-2 flex items-center justify-between" 
            style={{background: `linear-gradient(90deg, ${colors[colorNum]} ${perc}%, #1e2732 ${perc}%, #1e2732 100%)`}}>
            <h4 className="pl-3">{left}</h4>
            <h4 className="pr-3">{right}</h4>
        </div>
        </div>
    );
    }
    else {
    return (
        <div className="flex justify-center items-center my-5">
        <h3 className="text-white text-xl font-semibold">You already guessed this word!</h3>
        </div>
    );
    }
};

export default Gusses;