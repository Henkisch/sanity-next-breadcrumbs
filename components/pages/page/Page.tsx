import BreadCrumbs from '@/components/shared/Breadcrumbs'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, breadcrumb } = data ?? {}

  return (
    <div>
      <div className="space-y-20 mb-20">
        {breadcrumb && (
          <BreadCrumbs items={breadcrumb.items} />
        )}

        <div className="px-4 md:px-16 lg:px-32">
          {/* Header */}
        <Header title={title} description={overview} />

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
            value={body}
          />
        )}

        </div>
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}

export default Page
