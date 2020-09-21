import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Gallery from '@browniebroke/gatsby-image-gallery'
import { graphql } from 'gatsby'
import '@browniebroke/gatsby-image-gallery/dist/style.css'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

function Caption({ exif, cameraModel }) {
  const shutterSpeed = (1 / exif.ExposureTime) > 1 ? `1/${1 / exif.ExposureTime}` : `${exif.ExposureTime} sec`

  return (
    <div>
      <div><strong>ISO</strong>: {exif.ISO}</div>
      <div><strong>Shutter Speed</strong>: {shutterSpeed}</div>
      <div><strong>Focal Length</strong>: {exif.FocalLength}mm</div>
      <div><strong>FStop</strong>: {exif.FNumber}</div>
      <div><strong>Lens</strong>: {exif.LensModel}</div>
      <div><strong>Camers</strong>: {cameraModel}</div>
    </div>
  )
}

class GalleryTemplate extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata
    const { data } = this.props

    const images = data.images.edges.map(({ node }) => {
      const { thumb, full, fields } = node.childImageSharp
      const exif = get(fields, 'exif.raw.exif')
      const cameraModel = get(fields, 'exif.raw.image.Model')
      const date = new Date(get(fields, 'exif.raw.image.ModifyDate'))

      return {
        date,
        thumb,
        full,
        caption: <Caption exif={exif} cameraModel={cameraModel} />,
      }
    })

    const sortImages = images.sort((a, b) => b.date - a.date)

    return (
      <Layout>
        <div>
          <Helmet title={`Gallery - ${title}`} />
          <Sidebar {...this.props} />
          <div>
            <h1>Gallery</h1>
            <Gallery images={sortImages} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default GalleryTemplate

export const pageQuery = graphql`
  query GalleryPage {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          childImageSharp {
            thumb: fluid(maxWidth: 270, maxHeight: 270) {
              ...GatsbyImageSharpFluid
            }
            full: fluid(maxWidth: 1024) {
              ...GatsbyImageSharpFluid
            }
            fields {
                exif {
                    raw {
                        exif {
                            ISO
                            ExposureTime
                            FocalLength
                            FNumber
                            LensModel
                            DateTimeOriginal
                        }
                        image {
                            Model
                            ModifyDate
                        }
                    }
                }
            }
          }
        }
      }
    }

  }
`
