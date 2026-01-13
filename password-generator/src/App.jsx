//imports
import { useCallback, useEffect, useRef, useState } from "react";
import Background from "./Background";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [symbols, setsymbolAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null);
  const buttonref = useRef(null);

  //memoizes function
  const generatepassword = useCallback(() => {
    let str = "";
    let pass = "";
    if (!numberAllowed && !charAllowed && !symbols) {
      setPassword("Select at least one option");
      return;
    }
    if (numberAllowed) str += "12345678";
    if (charAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefbd25bsiq3wddc";
    if (symbols) str += "!@#$%^&*()_{}|:<>?><</></>";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, symbols, length]);
  // generate password should be declared before
  //automatically runs when function is loaded
  useEffect(() => {
    generatepassword();
  }, [length, numberAllowed, charAllowed]);
  //copy password
  const copypasswordtoclipboard = () => {
    window.navigator.clipboard
      .writeText(password)
      .then(() => {
        
        if (passwordref.current) {
          //select content
        passwordref.current?.select();
        }
        if(buttonref.current){
          //buttonref.current.backgroundColor="green";
          buttonref.current.classList.add("bg-green-500");
          setTimeout(()=>{
            //buttonref.current.style.backgroundColor="";
            buttonref.current.classList.remove("");
          },15);
        }
      })
      .catch((err) => {
        console.error("failed to copy!!");
      });
  };

  return (
    <>
      <Background />
      <div className="flex items-center justify-center min-h-screen z-10 relative" >
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-1 py-2 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="'flex shadow rounded-lg overflow-hidden">
            <div className="flex">
              <input
                type="text"
                value={password}
                placeholder="password"
                className="outline-none w-full px-4 py-2 text-gray-700"
                readOnly
                ref={passwordref}
              />
              <button
                onClick={copypasswordtoclipboard}
                ref={buttonref}
                className="outline-none text-white  px-3 py-0.5 shrink-0 bg-blue-800"
              >
                copy
              </button>
            </div>
          </div>

          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={12}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                name=""
                id=""
              />
              <label htmlFor="number">length {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                name=""
                id=""
              />
              <label htmlFor="number">numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                name=""
                id=""
              />
              <label htmlFor="number">characters</label>
            </div>
            <div className="flex items-center gap-x-1"></div>
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={symbols}
              onChange={() => {
                setsymbolAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="symbols"> symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
