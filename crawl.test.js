const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')


test('normalizeUrl', () => {
    const input = ''
    const actual = normalizeURL(input)
    const expected = ''
    expect(actual).toEqual(expected)
})