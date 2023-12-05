import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem } from '@/types'
interface BreadCrumbsProps {
  items: MenuItem[];
  rootLabel?: string;
  prefixItems?: MenuItem[];
}

export default function BreadCrumbs({ items, prefixItems = [], rootLabel = "Home" }: BreadCrumbsProps) {
  if (!items) return;

  let allItems: MenuItem[]

  if (prefixItems.length > 0) {
    allItems = [...prefixItems, ...items]
    items.concat(prefixItems)
  } else {
    allItems = items;
  }

  const Separator = () => (
    <span aria-hidden="true" className="text-gray-600">
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
      </svg>
    </span>
  )

  return (
    <nav aria-label="Breadcrumb navigation" className={`px-4 md:px-16 lg:px-32 py-3 bg-gray-50/60`}>
      <ol className={'flex items-center gap-1 text-sm list-none	m-0'}>
        <li className={'text-gray-600 transition hover:text-gray-900'}><Link href={'/'}>{rootLabel}</Link></li>

        {allItems && (
          <Separator />
        )}

        {allItems.map((link, index: number) => {

          if(!link) return;

          const isLast = allItems.length === index + 1;
          const href = resolveHref(link?._type, link?.slug)

          if (!href) {
            return null
          }

          return (
            <>
              <li className="" key={link.slug}>

                <Link
                  className={`transition ${isLast && 'text-gray-900 transition hover:text-gray-600'} ${!isLast && 'text-gray-600 hover:text-gray-900'}`}
                  href={href}
                  aria-current={isLast ? 'page' : 'false'}
                >
                  {link.title}
                </Link>
            </li>

            {!isLast && (
              <Separator />
            )}
            </>
        )
        })}
      </ol>
    </nav>
  )
}