const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')


async function main() {
    if (process.argv.length < 3) {
        console.log('no website provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('too many arguments provided')
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`starting crawl at ${baseURL}`)

    try {
        const pages = await crawlPage(baseURL, baseURL, {})
        console.log('Crawled page and link counts:', pages)
    } catch (error) {
        console.error('Error during crawl:', error.message)
    }
    
}

main()
