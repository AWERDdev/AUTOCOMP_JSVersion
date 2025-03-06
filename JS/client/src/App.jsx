import './App.css'
import NavBar from './components/NavBar'
import Result from './components/Result'
import {useState} from 'react'

function App() {
  const [warningMessage, setWarningMessage] = useState('')
  const [Input, setInput] = useState('')
  const [countedWords, setCountedWords] = useState('')
  const [correctedText, setCorrectedText] = useState('')

  const handleInputData = async () => {
    console.log('function called')
    try {
      if (!Input.trim()) {
        setWarningMessage("Please don't leave this field empty");
        return;
      } else if (Input.length > 1000) {
        setWarningMessage("Please don't input more than 1000 characters");
        return;
      }
  
      const response = await fetch(`http://localhost:3500/GetData?data=${Input}`);
      const data = await response.json();
  
      setWarningMessage('');
  
      // Convert object to a string instead of an array
      const wordString = Object.entries(data.data)
        .map(([word, count]) => `${word}: ${count}`)
        .join(', ');
  
      setCountedWords(wordString);
    } catch (error) {
      console.log(`Failed to send data in count text function ${error}`);
    }
  };
  
  const correcteText = async () => {
    console.log('function called')
    try {
      const response = await fetch(`http://localhost:3500/CorrectText?text=${Input}`);
      const data = await response.json(); 
  
      setCorrectedText(JSON.stringify(data.data)); // Convert object to string
    } catch (error) {
      console.log(`Failed to send data in corrected text function ${error}`);
    }
  };
  
  const handleFuntions = ()=>{
    handleInputData()
    correcteText()
  }
  

  return (
    <>
    <main className="h-screen  bg-gradient-to-b from-blue-100 to-white px-4 pt-20 overflow-auto">
    {/* Navigation */}
    <NavBar />
    {/* Title Section */}
    <div className="flex flex-col items-center text-center mt-5">
      <h1 className="text-3xl md:text-5xl text-blue-600 font-bold">AutoCOMP</h1>
      <p className="text-gray-600 text-lg md:text-xl mt-2">
        Complete text and count how many letters
      </p>
    </div>
  
    {/* Scraper Form */}
    <div className="flex justify-center  mt-5 md:mt-5">
      <div className="bg-white w-full max-w-[90%] md:max-w-[50vw] p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold">Start Typing</h2>
        <p className="text-gray-600 mt-1">Enter text to begin using</p>
  
        <div className="mt-4">
          <textarea
            id='InputBar'
            type="url"
            className="w-full min-h-[7vh] max-h-[50vh] p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
            placeholder="Start typing"
            onChange={(e)=> setInput(e.target.value)}
          />
        </div>
          <div className="warninLabel"><p className="Warning text-red-500">{warningMessage}</p></div>
        <button
          className="w-full mt-4 h-12 bg-[#0D1117] text-white rounded-md hover:bg-gray-800 transition-all duration-300"
          onClick={handleFuntions}
        >
          Start
        </button>
      </div>
    </div>
  
    {/* Results */}
    <div className="flex justify-center mt-10 ">
          <Result
          countedWords={countedWords}
          correctedWords={correctedText}
          />
    </div>
  </main>
      </>
  )
}

export default App
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia reprehenderit tenetur nostrum adipisci debitis vero cumque delectus, aliquam minus necessitatibus quia neque odit obcaecati cum, sequi eligendi! Recusandae, animi sint!
// Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quaerat unde, repellat distinctio at corporis molestias obcaecati. Corrupti, aperiam quia voluptatibus sequi fugit facilis, nostrum, totam voluptatum nulla alias modi.
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt obcaecati libero earum deleniti vitae vero aliquid minus at repudiandae, quidem deserunt iure expedita. Ipsum qui omnis illo fuga alias impedit?
// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum tenetur, architecto reprehenderit amet ullam ducimus cum laborum quos iure deleniti, assumenda sint. Animi recusandae quisquam eius, ut tenetur dignissimos? Ipsum.