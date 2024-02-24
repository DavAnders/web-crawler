function normalizeURL(urlString) {
    const myURL = new URL(urlString)
    let path = myURL.pathname.endsWith('/') ? myURL.pathname.slice(0, -1) : myURL.pathname
    return `${myURL.hostname}${path}`
    //console.log(`${myURL.hostname}${path}`)
}


module.exports = {
    normalizeURL}