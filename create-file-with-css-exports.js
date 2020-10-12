const fs = require("fs")
const path = require("path")

const inputFiles = {
    "own-lib": "own-css-lib\\own-css-lib.scss"
    // "blue-react": "./node_modules/blue-react/dist/style.scss"
}

function loopDir(dirName, libraryEntry, mainFile, rootDirName) {
    const files = fs.readdirSync(dirName)

    files.forEach(file => {
        const filePath = path.join(dirName, file)
        const relativeFilePath = path.relative(rootDirName, filePath).replace(/\\/g, "/")
        console.log(filePath)
        const stat = fs.statSync(filePath)

        if (stat.isFile()) {
            console.log("is file")
            if (file.endsWith(".scss") && filePath !== mainFile) {
                libraryEntry.imports[relativeFilePath] = fs.readFileSync(filePath, { encoding: "utf8" })
            }
        }

        if (stat.isDirectory()) {
            loopDir(filePath, libraryEntry, mainFile, rootDirName)
        }
    })
    return libraryEntry
}

function main() {
    let outputCodeObj = {}

    Object.keys(inputFiles).forEach((key) => {
        let libraryEntry = {
            imports: {},
            main: ""
        }

        const mainFile = inputFiles[key]

        libraryEntry.main = fs.readFileSync(mainFile, { encoding: "utf8" })

        const dirName = path.dirname(mainFile)
        libraryEntry = loopDir(dirName, libraryEntry, mainFile, dirName)
        // const files = fs.readdirSync(dirName)

        // files.forEach(file => {
        //     const filePath = path.join(dirName, file)
        //     console.log(filePath)
        //     const stat = fs.statSync(filePath)

        //     if (stat.isFile()) {
        //         console.log("is file")
        //     }

        //     if (stat.isDirectory()) {
        //         console.log("is directory")
        //     }
        // })

        outputCodeObj[key] = libraryEntry
    })

    console.log(outputCodeObj)

    fs.writeFileSync("./src/shared/scssImportGenerated.ts", `export const scssCode = ${JSON.stringify(outputCodeObj, null, 4)}`)
}

main()