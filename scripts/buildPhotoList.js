const fs = require('fs')
const contentful = require('contentful')
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'hn94000t32hs',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'ydX_8Tk4Oo1OqobDA2xi7MKYjbwwpofL9RThn5g7uh8',
})

// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client
  .getEntries({
    content_type: 'photo',
  })
  .then((galleries) => {
    const output = galleries.items.map(({ fields: { name, images } }) => {
      return {
        name,
        images: images.map(buildImage),
      }
    })

    fs.writeFileSync(
      'components/galleries.json',
      JSON.stringify(output, null, 2)
    )
  })
  .catch((err) => console.log(err))

function buildImage({ fields, sys }) {
  const { title, file } = fields
  const { url, details } = file
  const {
    image: { width, height },
  } = details
  const src = `https:${url}`

  const screenSizes = [640, 768, 1024, 1366, 1600, 1920]
  const sizes = screenSizes.map((size) => {
    return `(min-width: ${size}px) ${size}px`
  })

  sizes.push('100vw')

  return {
    key: sys.id,
    title,
    url: src,
    src: `${src}?q=80&fm=webp&w=500`,
    width,
    height,
  }
}
