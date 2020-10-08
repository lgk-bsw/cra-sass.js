import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"

import { scssCode } from "./scssCode"

const { Sass } = require("./lib/sass")
Sass.setWorkerUrl("sass.worker.js")

const sass = new Sass()
sass.options({
  style: Sass.style.compressed
})

// Object.values(scssCode).forEach((library) => {
//   Object.keys(library.imports).forEach((fileName, code) => {
//     sass.writeFile(fileName, code)
//   })
// })

sass.writeFile("./subs/general.scss", `body {
    background-color: orange;
    color: blue;
}`)

function App() {
  const [result, setResult] = useState(null)
  const scssInput = `@import "./subs/general";`

  useEffect(() => {
    if (result === null) {
      compile()
    }
  }, [result])

  const compile = () => {
    sass.compile(scssInput, result => {
      console.log(result)
      setResult(result)
    })
  }

  return (
    <div className="App">
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `${result && result.text ? result.text : ""}`
        }}
      />

      {(result && result.message) && 
        <div className="alert alert-danger">
          {result.message}
        </div>
      }

      {scssInput}
      <button onClick={compile}>Compile</button>
    </div>
  )
}

export default App
