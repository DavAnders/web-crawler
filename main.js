const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


function main() {
    if (process.argv.length < 3) {
        console.log('no website provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many arguments provided')
        process.exit(1)
    }
    console.log(`starting crawl at ${process.argv[2]}`)
}

main()
