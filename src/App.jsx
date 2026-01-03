import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";

function App() {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];
 

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("// some comment");

  const ai = new GoogleGenAI({apiKey:"AIzaSyBdCupZOIaP3Dzhiw7urhUYoGiOoklxsUs"});
  const [loading,setLoading]=useState(false);
  const [response, setResponse]=useState("");

  async function reviewCode() {
    setLoading(true);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}`,
  });
   console.log(response.text);
   setResponse(response.text)
   setLoading(false);
}

    const handleLanguageChange = (option) => {
    setSelectedOption(option);
     };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      borderColor: "#27272a",
      color: "white",
      width: "240px",
      minHeight: "38px",
      borderRadius: "8px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      width: "240px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b",
      color: "white",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
  };

  return (
    <>
      <Navbar />
      <div
        className="main flex  justify-between" style={{ height: "calc(100vh - 90px)" }}>
        <div className="left h-[87%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center justify-end gap-3 mb-4">
            <Select
              value={selectedOption}
              onChange={handleLanguageChange}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">
               Fix Code
            </button>
            <button onClick={()=>{
              if(code===""){
                alert("please enter the code first!")
              }
              else{
                reviewCode();
              }
            }} className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">
              Review
            </button>
          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
        <div className="right !p-[10px] bg-zinc-900 w-[50%] h-[100%] ">
          <div className="topTap border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
              <p className="font-[700] text-[17px]">Response</p>
      </div>
      {loading && <RingLoader color="#9333ea"/>}
       <Markdown>{response}</Markdown>
        </div>
      </div>
    </>
  );
}

export default App;
