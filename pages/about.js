import Head from 'next/head'
import { TYPE } from '../src/theme/index'
import PostBody from '../src/components/Post/PostBody'
import { getPostBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'

export default function About({ post }) {
  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <meta
          name="description"
          content="我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！"
        />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      <TYPE.largeHeader>{post.title}</TYPE.largeHeader>
      <PostBody content={post.content} />
    </>
  )
}

export async function getStaticProps() {
  const post = getPostBySlug('about-us', [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'credentials',
    'recommendations',
    'references',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
