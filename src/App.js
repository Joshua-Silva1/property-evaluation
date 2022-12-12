import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setFormValue] = useState( {zone: "", size: "", flooding: false});

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValue(prevState => ({...prevState, [name]:value, }));
  }

  function handleCheck(e) {
    const {name, checked} = e.target;
    setFormValue(prevState => ({...prevState, [name]:checked, }));
  }

  function handleSubmit(e) {
    clearAnalysis() // clears previous results

    const feedback = document.getElementById("feedbackText")
    const analysisSection = document.getElementById("analysisSection")

    // checks if values are valid, needs to be valid to analyse
    if (form.zone > 0 && form.size > 0 && form.zone <= 3) {
      analyse()
      feedback.innerHTML = "⮟"
      feedback.className = "feedback-valid"
      analysisSection.style.display = "block" // reveal
    }
    else {
      feedback.innerHTML = "Invalid input"
      feedback.className = "feedback-invalid"
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

    displayAnalysis(analysis)
  }

  function clearAnalysis() {
    const verdict = document.getElementById("verdicts")

    // loop over and remove any previous verdicts
    while (verdict.firstChild) {
      verdict.removeChild( verdict.firstChild );
    }
  }

  // displays text for the verdicts of the analysis
  function displayAnalysis(analysis) {
    const verdict = document.getElementById("verdicts")
    const buildingTypes = ["Single dwelling house", "Apartment complex", "Commercial building"]

    // if a building type's value is true in the array, set the text appropriately
    for (let i = 0; i < buildingTypes.length; i++) {
      if (analysis[i]) {
        const v = document.createElement('li')
        v.innerHTML = buildingTypes[i]
        verdict.appendChild(v)
      }
    }
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
        <div className="feedback" id="feedbackText"> </div>

      <hr></hr>
      <div id="analysisSection" hidden>
        <h1>Analysis Results</h1>
        <div>Based on these property facts, the allowed building types are:</div>
        <ul id="verdicts">
        </ul>
      </div>
    </div>
  );
}


export default App;
