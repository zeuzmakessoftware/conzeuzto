import WordTyper from "./WordTyper";
import Gusses from "./Guesses";
import GuessCounter from "./GuessCounter";
import YouWin from "./YouWin";
import ClosestWordsModal from "./ClosestWordsModal";
import { useState, useEffect } from "react";
import axios from 'axios';

interface WordData {
    word: string;
}

interface WordMap {
    [key: string]: number;
  }

const Application = () => {

  const word = "pizza";

  const [inputValue, setInputValue] = useState('');
  const [guesses, setGuesses] = useState<[string, number][]>([]);
  const [wordMap, setWordMap] = useState<WordMap>({[word]: 1});
  const [currentGuess, setCurrentGuess] = useState<[string, number]>(["", 0]);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);
  const [guessCounter, setGuessCounter] = useState(0);
  const [colorCatagory, setColorCatagory] = useState([0,0,0]);
  const [gameOver, setGameOver] = useState(false);
  const [CWMactive, setCWMactive] = useState(false);

  const apiUrl = `https://api.datamuse.com/words?ml=${word}&max=1000&md=f=1`;
  
  useEffect(() => {
  axios.get(apiUrl)
    .then(response => {
      const words = response.data;
      const updatedWordMap = {...wordMap};

      let counter = 2;
      words.forEach((wordData: WordData) => {
        const word = wordData.word;
        
        if (!word.includes(' ') && !word.endsWith('s')) {
          updatedWordMap[word] = counter;
          counter++;
        }
      });

      setWordMap(updatedWordMap);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.toLowerCase());
  };

  const handleEnterPress = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' && inputValue !== "") {
    const cleanedInput = inputValue.replace(/\s/g, '');

    const isAlreadyGuessed = guesses.some(guess => guess[0] === cleanedInput);

    if (!isAlreadyGuessed) {
      setAlreadyGuessed(false);
      let guessNum: number;
      if (cleanedInput == word) {
          guessNum = 1;
          setGameOver(true);
      }
      else if (wordMap.hasOwnProperty(cleanedInput)) {
          guessNum = wordMap[cleanedInput];
      }
      else {
          guessNum = Math.floor(Math.random() * 10000) + 1000;
      }
      setGuessCounter(guessCounter + 1);

      if (guessNum < 250) {
        setColorCatagory(prev => {
          let updated = [...prev];
          updated[0] += 1;
          return updated;
        });
      }
      else if (guessNum < 1500) {
        setColorCatagory(prev => {
          let updated = [...prev];
          updated[1] += 1;
          return updated;
        });
      }
      else {
        setColorCatagory(prev => {
          let updated = [...prev];
          updated[2] += 1;
          return updated;
        });
      }
      

      setGuesses(prevItems => {
        const newItems: [string, number][] = [[cleanedInput, guessNum], ...prevItems];
        return newItems.sort((a, b) => a[1] - b[1]);
      });

      setCurrentGuess([cleanedInput, guessNum]);
      setInputValue('');
    } 
    
    else {
      setAlreadyGuessed(true);
    }
  }
};
  
  return(
    <div>
      <ClosestWordsModal closestWords={wordMap} CWMactive={CWMactive} setCWMactive={setCWMactive}/>
      <h1 className="text-white text-4xl font-black text-center m-8">conzeuzto</h1>
      <YouWin guesses={guessCounter} colorCatagory={colorCatagory} rank={currentGuess[1]} setCWMactive={setCWMactive} />
      <GuessCounter guessCounter={guessCounter} />
      <WordTyper inputValue={inputValue} handleInputChange={handleInputChange} handleEnterPress={handleEnterPress} />
      <Gusses left={currentGuess[0]} right={currentGuess[1].toString()} alreadyGuessed={alreadyGuessed}/>
      {guesses.map(guess => <Gusses key={guess[0]} left={guess[0]} right={guess[1].toString()} alreadyGuessed={false}/>)}
    </div>
  );
};

export default Application;