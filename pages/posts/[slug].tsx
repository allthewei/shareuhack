import { Grid, Box } from '@material-ui/core'
import Link from 'next/link'
import StyledLink from '../../src/components/Link/Link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../src/components/Post/PostBody'
import CoverImage from '../../src/components/Image/CoverImage'
import { getPostBySlug, getAllPosts, getAllPostPaths } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME, Category, Categories, SubCategory, SubCategories } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { TYPE } from '../../src/theme/index'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'
import { formattedDate } from '../../src/utils'
// import Disqus from '../../src/components/Disqus/Disqus'
import Breadcrumbs from '../../src/components/Breadcrumbs/Breadcrumbs'
import { useTranslation } from 'next-i18next'

export default function Post({ post, morePosts, preview, category, subCategory }) {
  const router = useRouter()
  const { locale, locales } = router
  const { matches } = useBreakpoint()
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/posts/${post.slug}`
  const { t } = useTranslation('common')
  const { t: subCategoryTrans } = useTranslation('subCategory')

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const Shares = () => {
    return (
      <Box display="flex" gridColumnGap="10px" justifyContent={matches ? 'center' : 'flex-start'}>
        <EmailShareButton
          subject={`Shareuhack: ${post.title}`}
          body={`Shareuhack: ${post.title}`}
          separator=" --- "
          url={url}
        >
          <EmailIcon fontSize="large" />
        </EmailShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon fontSize="large" />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon fontSize="large" />
        </TwitterShareButton>
      </Box>
    )
  }

  return (
    <>
      {router.isFallback ? (
        <TYPE.largeHeader>Loading…</TYPE.largeHeader>
      ) : (
        <>
          <Head>
            <title>
              {CMS_NAME} | {post.title}
            </title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:image" content={post.ogImage.url} />
            {locales.map((locale) => (
              <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/posts/${post.slug}`}
              />
            ))}
            <link rel="canonical" href={url} />
          </Head>
          <CoverImage title={post.title} src={post.coverImage} height={627} width={1200} />
          {category && subCategory && (
            <Breadcrumbs>
              <Link href={category?.link} locale={locale} passHref>
                <StyledLink>{t(category?.key)}</StyledLink>
              </Link>
              <Link href={subCategory?.link} locale={locale} passHref>
                <StyledLink>{subCategoryTrans(subCategory?.key)}</StyledLink>
              </Link>
            </Breadcrumbs>
          )}

          <TYPE.largeHeader mt={category && subCategory ? 0 : '15px'} as="h2">
            {post.title}
          </TYPE.largeHeader>
          <TYPE.primary mb="15px">Updated at {formattedDate(post.date)}</TYPE.primary>
          <Grid container>
            <Grid item sm={3} xs={12}>
              <Box mr={matches ? '0px' : '45px'} pt={matches ? '0px' : '15px'}>
                {post.credentials && post.credentials.length > 0 && (
                  <InfoCard>
                    <TYPE.bold mb="5px">{t('beforewriting')}</TYPE.bold>
                    <ol>
                      {post.credentials?.map((credential, idx) => (
                        <li key={idx}>{credential}</li>
                      ))}
                    </ol>
                  </InfoCard>
                )}
                {!matches && (
                  <>
                    {post.recommendations && post.recommendations.length > 0 && (
                      <InfoCard>
                        <TYPE.bold mb="5px">{t('Recommendations')}</TYPE.bold>
                        <ol>
                          {post.recommendations?.map((recommendation, idx) => (
                            <li key={idx}>
                              {recommendation.title}
                              <br />
                              <Link href={recommendation.link} passHref>
                                <StyledLink target="_blank">{` → ${recommendation.src}`}</StyledLink>
                              </Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    {post.references && post.references.length > 0 && (
                      <InfoCard>
                        <TYPE.bold mb="5px">{t('References')}</TYPE.bold>
                        <ol>
                          {post.references?.map((reference, idx) => (
                            <li key={idx}>
                              <Link href={reference.link} passHref>
                                <StyledLink target="_blank">{reference.title}</StyledLink>
                              </Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    <Divider />
                    <TYPE.body mt="15px" mb="10px">
                      {t('sharePost')}
                    </TYPE.body>
                    <Shares />
                  </>
                )}
                {/* <a href="https://www.books.com.tw/exep/assp.php/cwhuang0523/products/0010825895?utm_source=cwhuang0523&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202109">
                  <img src="https://ap.books.com.tw/web/apProductStick/0010825895/blue/0/7" />
                </a> */}
              </Box>
            </Grid>
            <Grid item sm={9}>
              <PostBody content={post.content} />

              {!matches && (
                <>
                  {/* <TYPE.primary mt="48px">Welcome to share your hack！</TYPE.primary>
                  <Disqus {...post} /> */}
                </>
              )}
            </Grid>
          </Grid>
          {matches && (
            <>
              {post.recommendations && post.recommendations.length > 0 && (
                <InfoCard>
                  <TYPE.bold mb="5px">{t('Recommendations')}</TYPE.bold>
                  <ol>
                    {post.recommendations?.map((recommendation, idx) => (
                      <li key={idx}>
                        {recommendation.title}
                        <br />
                        <Link href={recommendation.link} passHref>
                          <StyledLink target="_blank">{` → ${recommendation.src}`}</StyledLink>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}

              {post.references && post.references.length > 0 && (
                <InfoCard>
                  <TYPE.bold mb="5px">{t('References')}</TYPE.bold>
                  <ol>
                    {post.references?.map((reference, idx) => (
                      <li key={idx}>
                        <Link href={reference.link} passHref>
                          <StyledLink target="_blank">{reference.title}</StyledLink>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}
              {/* <TYPE.primary mt="20px">Welcome to share your hack！</TYPE.primary>
              <Disqus {...post} /> */}

              {/*
              <Shares />
              <TYPE.body mt="5px" mb="10px" textAlign="center">
                分享這篇文章
              </TYPE.body> */}

              {/* )} */}
            </>
          )}
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(
    params.slug,
    [
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
      'category',
      'subCategory',
      'excerpt',
      'widget',
    ],
    locale
  )
  const content = await markdownToHtml(post.content || '')
  const category = Categories.find((category) => category.key === Category[post.category]) || null
  const subCategory = SubCategories.find((subCategory) => subCategory.key === SubCategory[post.subCategory]) || null

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'subCategory'])),
      post: {
        ...post,
        content,
      },
      category: category,
      subCategory: subCategory,
    },
  }
}

export async function getStaticPaths({ locales }) {
  const paths = getAllPostPaths(locales)

  return {
    paths,
    fallback: false,
  }
}
