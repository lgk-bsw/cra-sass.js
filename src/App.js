import React from "react"
import logo from "./logo.svg"
import "./App.css"

import { scssCode } from "./scssCode"

const { Sass } = require("./lib/sass")
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
      {scssCode["blue-react"]}
      <button onClick={compile}>Compile</button>
    </div>
  )
}

export default App
