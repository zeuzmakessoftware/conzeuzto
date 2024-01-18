interface GuessCounterProps {
    guessCounter: number;
}
  
const GuessCounter: React.FC<GuessCounterProps> = ( {guessCounter} ) => {
    return (
        <div>
        <h1 className="text-white text-lg font-semibold text-center">Guesses: {guessCounter}</h1>
        </div>
    );
};
  
export default GuessCounter;