import * as cheerio from 'cheerio'

export function validateHtml(html: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const $ = cheerio.load(html)

  if (!$('html').length) errors.push('Missing <html> tag')
  if (!$('head').length) errors.push('Missing <head> tag')
  // cheerio auto-adds body, so check raw HTML
  if (!/<body/i.test(html)) errors.push('Missing <body> tag')

  const doctype = html.trim().startsWith('<!DOCTYPE') || html.trim().startsWith('<!doctype')
  if (!doctype) errors.push('Missing DOCTYPE')

  return { valid: errors.length === 0, errors }
}

export function stripDangerousContent(html: string): string {
  const $ = cheerio.load(html)

  // Remove all script tags
  $('script').remove()

  // Strip dangerous attributes
  const dangerousAttrs = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
    'onfocus', 'onblur', 'onchange', 'onsubmit', 'onkeydown',
    'onkeyup', 'onkeypress', 'ondblclick', 'oncontextmenu',
  ]

  $('*').each((_, el) => {
    if (el.type !== 'tag') return
    for (const attr of dangerousAttrs) {
      $(el).removeAttr(attr)
    }
    const href = $(el).attr('href')
    if (href?.trim().toLowerCase().startsWith('javascript:')) {
      $(el).removeAttr('href')
    }
  })

  return $.html()
}

export function injectMetaComment(html: string, meta: Record<string, string>): string {
  const metaStr = `<!-- META ${JSON.stringify(meta)} -->`
  if (html.includes('<!DOCTYPE') || html.includes('<!doctype')) {
    const idx = html.search(/<!DOCTYPE/i)
    const after = html.indexOf('>', idx) + 1
    return html.slice(0, after) + '\n' + metaStr + html.slice(after)
  }
  return metaStr + '\n' + html
}
