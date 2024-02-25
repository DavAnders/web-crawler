function printReport(pages) {
    console.log('Starting report...')
    const sortedPages = sortPages(pages)
    sortedPages.forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`)
    })
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages)
    // This could be a fat arrow function
    // written out longer to easier follow the logic
    function comparePages(a, b) {
        const countA = a[1]
        const countB = b[1]
        if (countA > countB) {
            return -1
        } else if (countA < countB) {
            return 1
        } else {
            return 0
        }
    }
    pagesArray.sort(comparePages)
    return pagesArray
}

module.exports = { printReport, sortPages }
