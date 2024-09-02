import type { PageContext } from '@/renderer/types'
import { NewsService } from '@/services'

export const onBeforeRender = async (pageContext: PageContext): Promise<{ pageContext: Partial<PageContext> }> => {
  const { slug } = pageContext.routeParams as { slug: string }

  try {
    const data = await NewsService.bySlugSsr(pageContext, slug)

    if (data.slug !== slug)
      return {
        pageContext: {
          redirectTo: `news/${data.slug}`,
        },
      }

    return {
      pageContext: {
        pageProps: {
          data: {
            ...data,
            slug,
          },
        },
        documentProps: {
          title: data.title,
          description: data.description,
          image: data.titleImageUrl,
        },
      },
    }
  } catch (err) {
    return {
      pageContext: {
        redirectTo: `news`,
      },
    }
  }
}
