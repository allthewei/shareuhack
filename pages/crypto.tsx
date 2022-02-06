import { useEffect, useMemo, useRef } from 'react'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Grid, Box, useTheme } from '@mui/material'
import Spinner from '../src/components/Spinner'
import dynamic from 'next/dynamic'
import { usePriceSet } from '../src/hooks/usePriceSet'
import Card from '../src/components/Card'
import BtcLogo from '../src/assets/btc.svg'
import { useFnG } from '../src/hooks/useFnG'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { CMS_NAME, OG_IMAGE_URL } from '../lib/constants'

declare global {
  interface Window {
    trends?: any
  }
}

const LineChart = dynamic(() => import('../src/components/Chart'), {
  ssr: false,
})

export default function Crypto({}) {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const graphContainer = useRef<HTMLDivElement>(null)
  const BTCPriceSeriesData = usePriceSet('BTC', 1000)
  const FnGSeriesData = useFnG(1000)

  const mappedFnGSeriesData = FnGSeriesData.map((data) => {
    return {
      time: data.time,
      value: data.value,
    }
  })

  const BTCPriceChart = useMemo(() => {
    return BTCPriceSeriesData ? (
      <LineChart
        lineColor="#18A0FB"
        lineSeriesData={BTCPriceSeriesData}
        unit="BTC"
        id="btcPriceChart"
        height={graphContainer?.current?.offsetHeight ?? 280}
        // strikeData={strikeLineData}
      />
    ) : (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Spinner size={60} marginRight="auto" marginLeft="auto" />
      </Box>
    )
  }, [BTCPriceSeriesData])

  const FnGChart = useMemo(() => {
    return BTCPriceSeriesData ? (
      <LineChart
        lineSeriesData={mappedFnGSeriesData}
        unit="BTC"
        id="FnGChart"
        height={graphContainer?.current?.offsetHeight ?? 280}
        lineColor={theme.palette.primary.main}
        // strikeData={strikeLineData}
      />
    ) : (
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <Spinner size={60} marginRight="auto" marginLeft="auto" />
      </Box>
    )
  }, [mappedFnGSeriesData])

  useEffect(() => {
    const div1 = document.getElementById('trendDiv1')
    const div2 = document.getElementById('trendDiv2')

    if (!window.trends) {
      return
    }

    div1.innerHTML = ''
    div2.innerHTML = ''

    window.trends.embed.renderExploreWidgetTo(
      div1,
      'TIMESERIES',
      {
        comparisonItem: [
          { keyword: 'buy bitcoin', geo: '', time: 'today 3-m' },
          { keyword: 'bitcoin crash', geo: '', time: 'today 3-m' },
          { keyword: 'bitcoin usd', geo: '', time: 'today 3-m' },
        ],
        category: 0,
        property: '',
      },
      {
        exploreQuery: 'date=today%203-m&q=buy%20bitcoin,bitcoin%20crash,bitcoin%20usd',
        guestPath: 'https://trends.google.com:443/trends/embed/',
      }
    )

    window.trends.embed.renderExploreWidgetTo(
      div2,
      'TIMESERIES',
      {
        comparisonItem: [
          { keyword: 'binance', geo: '', time: '2021-02-06 2022-02-06' },
          { keyword: 'coinbase', geo: '', time: '2021-02-06 2022-02-06' },
          { keyword: 'FTX', geo: '', time: '2021-02-06 2022-02-06' },
        ],
        category: 0,
        property: '',
      },
      {
        exploreQuery: 'q=binance,coinbase,FTX&date=today 12-m,today 12-m,today 12-m',
        guestPath: 'https://trends.google.com:443/trends/embed/',
      }
    )
  }, [])

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t('crypto')}
        </title>
        <meta name="description" content={t('cryptoDescript')} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${CMS_NAME} | ${t('crypto')}`} />
        <meta property="og:description" content={t('cryptoDescript')} />
        <meta property="twitter:title" content={`${CMS_NAME} | ${t('crypto')}`} />
        <meta property="twitter:description" content={t('cryptoDescript')} />
        <meta property="twitter:card" content="summary" />
        <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2790_RC04/embed_loader.js"></script>
      </Head>
      <Typography fontSize={36} fontWeight={700} component="h1" textAlign="center" mt={24}>
        {t('crypto')}
      </Typography>
      <Typography mt={12} fontSize={16} sx={{ opacity: 0.6 }} textAlign="center">
        {t('cryptoDescript')}
      </Typography>
      <Grid container spacing={30} pt={15}>
        <Grid item xs={12} md={3}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            <Box display="flex" alignItems="center" gap={15}>
              <BtcLogo />
              <Typography fontSize={24} fontWeight={700}>
                BTC Price
              </Typography>
            </Box>

            <Typography fontSize={24} fontWeight={700} mt={18}>
              {`${(+BTCPriceSeriesData[BTCPriceSeriesData.length - 1]?.value).toFixed(2)} USDT`}
            </Typography>
            <Typography fontSize={14} fontWeight={400} sx={{ opacity: 0.5 }}>
              {/* Last Updated at{' '} */}
              {/* {dayjs(BTCPriceSeriesData[BTCPriceSeriesData.length - 1]?.time).format('YYYY-MM-DD HH:mm:ss')} */}
              Update every 5s
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            {BTCPriceChart}
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card padding={30} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              恐懼與貪婪指數 Fear & Greed Index
            </Typography>
            <Typography fontSize={24} fontWeight={700}>
              {FnGSeriesData[FnGSeriesData.length - 1]?.value}
            </Typography>
            <Typography fontSize={24} fontWeight={700} color={theme.palette.error.main}>
              {FnGSeriesData[FnGSeriesData.length - 1]?.classification}
            </Typography>
            <Typography fontSize={14} fontWeight={400} sx={{ opacity: 0.5 }}>
              Last Updated at {dayjs(FnGSeriesData[FnGSeriesData.length - 1]?.time).format('YYYY-MM-DD')}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            {FnGChart}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              趨勢分析：比特幣相關查詢
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              「buy bitcoin」代表新加入市場的數量；「bitcoin
              crash」代表了大眾對市場的猜疑和恐懼，或已發生的事實；「bitcoin usd」代表大眾對比特幣價錢的關注程度
            </Typography>
            <div id="trendDiv1"></div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card padding={15} outlined color={theme.palette.primary.main}>
            <Typography fontSize={24} fontWeight={700}>
              趨勢分析：前三大交易所
            </Typography>
            <Typography mt={12} mb={18} fontSize={16} sx={{ opacity: 0.6 }}>
              交易所關鍵字的搜索量，反映了欲嘗試、剛進入加密貨幣市場的投資者數量
            </Typography>
            <div id="trendDiv2"></div>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
