import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    shortTitle,
    "slug": slug.current,
    "breadcrumb": {
      "items": [
        select(defined(parent->parent->) => {
          "_type": parent->parent->_type,
          "title": parent->parent->title,
          "slug": parent->parent->slug.current
        }),
        select(defined(parent) => {
          "_type": parent->_type,
          "title": parent->title,
          "slug": parent->slug.current
        }),
        {
          _type,
          title,
          "slug": slug.current
        },
      ],
    },
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
    "breadcrumb": {
      "items": [
        // Provide a parent item for each project so we can navigate back.
        {
          "_type": "page",
          "slug": "projects",
          "title": "Projects"
        },
        {
          _type,
          title,
          "slug": slug.current
        },
      ],
    },
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
