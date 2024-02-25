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


module.exports = {
    normalizeURL,
    getURLsFromHTML}