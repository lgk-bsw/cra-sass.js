import React, { useEffect, useState } from "react"
import "./App.css"
import { scssCode } from "./shared/scssImportGenerated"
import { ScssCodeLibrary } from "./shared/scssImportTypes"

const { Sass } = require("./lib/sass")
Sass.setWorkerUrl("sass.worker.js")

const sass = new Sass()
sass.options({
    style: Sass.style.compressed
})

interface SassJsResult {
    files?: string[]
    map?: { [key: string]: any }
    message?: string
    status: number
    text: string | null
}

Object.values(scssCode).forEach((library: ScssCodeLibrary) => {
    Object.keys(library.imports).forEach((path: string, i: number) => {
        sass.writeFile(path, library.imports[path])
    })
})

function App() {
    const [result, setResult] = useState<SassJsResult | null>(null)
    const scssInput = `@import "./subs/general";`

    useEffect(() => {
        if (result === null) {
            compile()
        }
    }, [result])

    const compile = () => {
        sass.compile(scssInput, (result: SassJsResult) => {
            console.log(result)
            setResult(result)
        })
    }

    return (
        <div className="App">
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html: `${result !== null && result.text ? result.text : ""}`
                }}
            />

            {(result !== null && result.message) &&
                <div className="alert alert-danger">
                    {result!.message}
                </div>
            }

            {scssInput}
            <button onClick={compile}>Compile</button>
        </div>
    )
}

export default App
