const fs = require("fs")

const inputFiles = {
    "own-lib": "./own-css-lib/own-css-lib.scss"
    // "blue-react": "./node_modules/blue-react/dist/style.scss"
}

let outputCodeObj = {}

Object.keys(inputFiles).forEach(key => {
    let libraryEntry = {
        imports: {},
        main: ""
    }

    libraryEntry.main = fs.readFileSync(inputFiles[key], { encoding: "utf8" })

    outputCodeObj[key] = libraryEntry
})

console.log(outputCodeObj)

// fs.writeFileSync("./src/shared/scssImportGenerated.ts", `export const scssCode = ${JSON.stringify(outputCodeObj, null, 4)}`)