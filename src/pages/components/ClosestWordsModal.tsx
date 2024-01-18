import Gusses from "./Gusses";

interface ClosestWordsModalProps {
    closestWords: {
      [key: string]: number;
    };
    CWMactive: boolean;
    setCWMactive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClosestWordsModal: React.FC<ClosestWordsModalProps> = ({ closestWords, CWMactive, setCWMactive }) => {

  const closeModal = () => {
    setCWMactive(false);
  }
  
  if (CWMactive) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-cyan-800 rounded-lg w-80 h-2/3 overflow-y-auto">
          <div className="p-2">
            <div className="justify-between">
              <button className="text-white float-right relative top-2 right-2 w-6 h-6 bg-neutral-400 rounded-lg" onClick={closeModal}>X</button>
              <h2 className="text-white p-2">Closest Words</h2>
            </div>
            {Object.keys(closestWords).map((word) => (
            <div key={word}>
                <Gusses left={word} right={closestWords[word].toString()} alreadyGuessed={false}/>   
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  }
  else {
    return null;
  }
};

export default ClosestWordsModal;