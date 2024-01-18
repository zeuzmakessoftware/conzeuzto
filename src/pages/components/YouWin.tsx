import { useState, useEffect } from "react";

interface YouWinProps {
  guesses: number;
  colorCatagory: number[];
  rank: number;
  setCWMactive: React.Dispatch<React.SetStateAction<boolean>>;
}

const YouWin: React.FC<YouWinProps> = ( {guesses, colorCatagory, rank, setCWMactive} ) => {  
  const [youWin, setYouWin] = useState(false);

  const openCWMModal = () => {
    setCWMactive(true);
  }

  useEffect(() => {
    if (rank == 1) {
      setYouWin(true);
    }
  }, [rank])

  if (youWin == true) {
  return (
    <div className="flex items-center justify-center m-4">
      <div className="bg-cyan-900 w-80 h-96 rounded-lg">
      <h2 className="text-white font-semibold text-xl m-6 text-center">Wowzers!</h2>
      <h3 className="text-white font-semibold text-xl text-center">You got the word</h3>
        <h3 className="text-white font-semibold text-xl text-center m-4">in {guesses} guesses!</h3>
        <h3 className="text-white text-xl text-center ">{colorCatagory[0]} 🟩🟩🟩</h3>
        <h3 className="text-white text-xl text-center">{colorCatagory[1]} 🟨🟨🟨</h3>
        <h3 className="text-white text-xl text-center">{colorCatagory[2]} 🟥🟥🟥</h3>
        <div className="flex justify-center items-center m-4">
      <button className="text-white font-semibold text-xl bg-sky-500 w-40 h-12 rounded-md" onClick={openCWMModal}>Closest Words</button>
    </div>
  </div>
</div>
  );
  }
  else {
    return null;
  }
};

export default YouWin;