import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-y-2 gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`transition text-gray-600 hover:text-black`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
        <Link
          className={`transition  text-gray-600 hover:text-black`}
          href={'/projects'}
        >
          Projects
        </Link>
    </div>
  )
}
