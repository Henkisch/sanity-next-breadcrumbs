import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { client } from '@/sanity/lib/client'

async function asyncSlugifier(input: any) {
  const parentQuery = '*[_id == $id][0]'
  const parentQueryParams = {
    id: input.doc.parent?._ref || '',
  }

  const parent = await client.fetch(parentQuery, parentQueryParams)

  const parentSlug = parent?.slug?.current ? `${parent.slug.current}/` : ''

  const pageSlug = input.doc.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 200)
  return `${parentSlug}${pageSlug}`
}

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'shortTitle',
      title: 'Short title',
      description: "Used when a shorter title is appropriate."
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      title: 'Parent page',
      weak: true,
      description:
        "If added, bases this page's slug on the selected parent when clicking 'generate' on slug field.",
      to: [{ type: 'page' }],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      description: (
        <>
          URL this page will be available on: &nbsp;
          <code>
            /<b>slug</b>
          </code>
          .
        </>
      ),
      options: {
        // @ts-ignore
        source: (doc, options) => ({ doc, options }),
        slugify: asyncSlugifier,
      },
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      description:
        "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
      of: [
        // Paragraphs
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
        // Custom blocks
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
