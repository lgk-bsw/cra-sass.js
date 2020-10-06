const fs = require("fs")

const inputFiles = {
    "blue-react": "./node_modules/blue-react/dist/style.scss"
}

let outputCodeObj = {}

Object.keys(inputFiles).forEach(key => {
    outputCodeObj[key] = fs.readFileSync(inputFiles[key], { encoding: "utf8" })
})

fs.writeFileSync("./src/scssCode.js", `export const scssCode = ${JSON.stringify(outputCodeObj, null, 4)}`)