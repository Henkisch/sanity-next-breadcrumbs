import Link from 'next/link'

import BreadCrumbs from '@/components/shared/Breadcrumbs'
import { Header } from '@/components/shared/Header'

export function ProjectsPage() {
  // Default to an empty object to allow previews on non-existent documents

  return (
    <div className="space-y-20">
      <BreadCrumbs
        items={[
          {
            "slug": "projects",
            "title": "Projects",
            "_type": "page"
          }
        ]}
      />

      <div className="px-4 md:px-16 lg:px-32">
        {/* Header */}
        <Header title={'Projects'} subTitle={"Note: This page is hardcoded in this demo."} />
        {/* Showcase projects */}
        <ul className="flex flex-col mt-12 gap-4 ml-0 font-bold">
          <li>
            <Link href="/projects/project-x">
              Projext X
            </Link>
          </li>
          <li>
            <Link href="/projects/project-y">
              Projext Y
            </Link>
          </li>
          <li>
            <Link href="/projects/project-z">
              Projext X
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectsPage