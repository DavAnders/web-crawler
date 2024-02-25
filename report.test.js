const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('should sort pages by count in descending order', () => {
    const pages = {
      '/about': 1,
      '/home': 3,
      '/contact': 2,
    }
    const sorted = sortPages(pages)
    const expected = [
      ['/home', 3],
      ['/contact', 2],
      ['/about', 1],
    ]
    expect(sorted).toEqual(expected)
  })

  test('should handle pages with equal count', () => {
    const pages = {
      '/about': 2,
      '/home': 3,
      '/contact': 2,
    }
    const sorted = sortPages(pages)
    const expectedFirst = ['/home', 3]
    expect(sorted[0]).toEqual(expectedFirst)
    expect(sorted[1][1]).toBe(2)
    expect(sorted[2][1]).toBe(2)
  })

  test('should return an empty array for an empty input', () => {
    const pages = {}
    const sorted = sortPages(pages)
    expect(sorted).toEqual([])
  })
