export interface ScssCodeLibrary {
    imports: { [path: string]: string }
    main: string
}

export type ScssCode = {
    [library: string]: ScssCodeLibrary
}