import React, { useRef } from 'react';
import './App.css';

function App() {
  const zoneRef = useRef()
  const sizeRef = useRef()
  const floodingRef = useRef()

  function handleSubmit(e) {
    clearAnalysis() // clears previous results

    const zone = Number(zoneRef.current.value)
    const size = Number(sizeRef.current.value)
    const flooding = document.getElementById("floodCheck").checked

    const feedback = document.getElementById("feedbackText")
    const analysisSection = document.getElementById("analysisSection")

    // checks if values are valid, needs to be valid to analyse
    if (zone > 0 && size > 0 && zone <= 3) {
      analyse(zone, size, flooding)
      feedback.innerHTML = "⮟"
      feedback.style = "color: green"
      analysisSection.style.display = "block" // reveal
    }
    else {
      feedback.innerHTML = "Invalid input"
      feedback.style = "color: red"
      analysisSection.style.display = "none" // hide
    }
  }

  // separate these rules checks for more complex data/processing
  function analyse(z, s, f) {
    var analysis = [true, true, true] // building type 1, 2, 3

    // Rule 1 -> assuming apartment counts as a housing type
    if (f) analysis = [false, false, analysis[2]]
    // Rule 2
    if (z === 3) analysis = [false, analysis[1], analysis[2]]
    // Rule 3
    if (z === 1 || s < 500) analysis = [analysis[0], false, analysis[2]]
    // Rule 4
    if (z === 1 || z === 2 || s <= 1000) analysis = [analysis[0], analysis[1], false]
  
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
          <input ref={zoneRef} type="text" id="zoneInput"/>
          <div className="prompts">(1-3)</div>

          <h3>Size</h3>
          <input ref={sizeRef} type="text" id="sizeInput"/>
          <div className="prompts">(Square Meters)</div>

          <h3>Is flooding area?</h3>
          <div className="check">
            <input ref={floodingRef} type="checkbox" id="floodCheck"/>
            <b>Flood area</b>
          </div>
          
        </div>
        <button onClick={handleSubmit} id="submitButton">Submit</button>
        <div id="feedbackText"> </div>

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
