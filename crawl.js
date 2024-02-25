const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const myURL = new URL(urlString)
    let path = myURL.pathname.endsWith('/') ? myURL.pathname.slice(0, -1) : myURL.pathname
    return `${myURL.hostname}${path}`
    //console.log(`${myURL.hostname}${path}`)
}

function getURLsFromHTML(htmlBody, baseURL) {
    urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll("a")
    for (const link of links) {
        if (link.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`relative url error: ${err.message}`)
            }
        } else {
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`absolute url error: ${err.message}`)
            }
        }
    }
    return urls
}


async function crawlPage(baseURL, currentURL, pages={}) {
    const normalizedURL = normalizeURL(currentURL)

    if (!normalizedURL.startsWith(normalizeURL(baseURL))) {
        return pages
    }
    if (!pages[normalizedURL]) {
        pages[normalizedURL] = (currentURL === baseURL) ? 0 : 1
    } else {
        pages[normalizedURL]++
        return pages
    }

    console.log(`Crawling: ${currentURL}`)

    try {
        const response = await fetch(currentURL)
    if (response.status >= 400) {
        console.log(`Error in status: ${response.status}`)
        return pages
    }
    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Content-Type header '${contentType}' is not 'text/html'`)
        return pages
    }

    const body = await response.text()
    const foundURLs = getURLsFromHTML(body, baseURL)
    
    for (const url of foundURLs) {
        await crawlPage(baseURL, url, pages)
    }
    } catch (error) {
        console.error(`Failed to fetch ${currentURL}`, error.message)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}