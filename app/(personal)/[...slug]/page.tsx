import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage } from '@/sanity/loader/loadQuery'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug.join('/')

  const { data: page } = await loadPage(slug)

  return {
    title: page?.title,
    description: page?.overview
      ? toPlainText(page.overview)
      : (await parent).description,
  }
}

export default async function PageSlugRoute({ params }: Props) {
  const slug = params.slug.join('/')
  const initial = await loadPage(slug)

  const newParams = {
    slug: params.slug.join('/'),
    _type: "page"
  }

  if (draftMode().isEnabled) {
    return <PagePreview params={newParams} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
