export const getHeadings = (source: string) => {
  const regexH2 = new RegExp(/<h2\b[^>]*>(.*?)<\/h2>/g)

  if (source.match(regexH2)) {
    return source.match(regexH2).map((heading: string) => {
      const regex = new RegExp(/<([^\s]+).*?id="([^"]*?)".*?>(.+?)<\/\1>/gi)
      const result = regex.exec(heading)

      return {
        text: result[3],
        link: '#' + result[2],
      }
    })
  }

  return []
}
