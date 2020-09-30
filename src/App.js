import React from "react"
import logo from "./logo.svg"
import "./App.css"

const {Sass} = require("./lib/sass")
Sass.setWorkerUrl("sass.worker.js")

const sass = new Sass()
sass.options({
  style: Sass.style.compressed
})

function App() {
  const compile = () => {
    sass.compile("$blue: blue; body { background: $blue; }", result => {
      console.log(result)
    })
  }

  return (
    <div className="App">
      <button onClick={compile}>Compile</button>
    </div>
  )
}

export default App
