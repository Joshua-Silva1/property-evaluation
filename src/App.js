import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setFormValue] = useState({zone: "", size: "", flooding: false});
  const [isError, setIsError] = useState(true);
  const [results, setResults] = useState([false, false, false]);

  const buildingTypes = ["Single dwelling house", "Apartment complex", "Commercial building"]

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue(prevState => ({...prevState, [name]:value, }));
  }

  function handleCheck(e) {
    const {name, checked} = e.target;
    setFormValue(prevState => ({...prevState, [name]:checked, }));
  }

  function handleSubmit(e) {
    const analysisSection = document.getElementById("analysisSection")

    // checks if values are valid, needs to be valid to analyse
    if (form.zone > 0 && form.size > 0 && form.zone <= 3) {
      setIsError(false)
      analyse()
      analysisSection.style.display = "block" // reveal
    }
    else {
      setIsError(true)
      analysisSection.style.display = "none" // hide
    }
  }

  // separate these rules checks for more complex data/processing
  function analyse(){
    var analysis = [true, true, true]
    // Rule 1
    if (form.flooding) analysis = [false, false, analysis[2]]
    // Rule 2
    if (Number(form.zone) === 3) analysis = [false, analysis[1], analysis[2]]
    // Rule 3
    if (Number(form.zone) === 1 || form.size < 500) analysis = [analysis[0], false, analysis[2]]
    // Rule 4
    if (Number(form.zone) !== 3 || form.size <= 1000) analysis = [analysis[0], analysis[1], false]

    setResults(analysis)
  }

  return (
    
    <div className="App">
      <h1>Property Facts</h1>
        <div className="propertyFacts">
          <h3>Zone</h3>
          <input type="text" id="zoneInput" name="zone" onChange={handleChange} />
          <div className="prompts">(1-3)</div>

          <h3>Size</h3>
          <input type="text" id="sizeInput" name="size" onChange={handleChange}/>
          <div className="prompts">(Square Meters)</div>

          <h3>Is flooding area?</h3>
          <div className="check">
            <input type="checkbox" id="floodCheck" name="flooding" onChange={handleCheck}/>
            <b>Flood area</b>
          </div>
          
        </div>
        <button onClick={handleSubmit} id="submitButton">Submit</button>
        <div className={isError ? "feedback-invalid" : "feedback-valid"} id="feedbackText">{isError ? 'Invalid Input' :'⮟'}</div>

      <hr></hr>
      <div id="analysisSection" hidden>
        <h1>Analysis Results</h1>
        <div>Based on these property facts, the allowed building types are:</div>
        <ul id="verdicts">
          {results.map((value, index) => value && <li>{buildingTypes[index]}</li>)}
        </ul>
      </div>
    </div>
  );
}


export default App;
