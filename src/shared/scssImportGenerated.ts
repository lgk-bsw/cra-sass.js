export const scssCode = {
    "own-lib": {
        "imports": {
            "subs/_general.scss": "body {\r\n    background-color: $body-bg;\r\n    color: $body-color;\r\n}",
            "subs/_variables.scss": "$body-bg: pink;\r\n$body-color: red;"
        },
        "main": "@import \"./subs/variables\";\r\n@import \"./subs/general\";"
    }
}