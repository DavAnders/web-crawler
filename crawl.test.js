const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

'https://blog.boot.dev/path/'
'https://blog.boot.dev/path'
'http://blog.boot.dev/path/'
'http://blog.boot.dev/path'
'http://BLOG.BOOT.dev/path'

test('normalizeUrl capitalized strip http', () => {
    const input = 'http://BLOG.BOOT.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http and trailing', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip https', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip https and trailing', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

