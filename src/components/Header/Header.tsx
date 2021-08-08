import { Link, makeStyles, Box } from '@material-ui/core'
import Container from '../Container/Container'
import theme, { TYPE } from 'theme/index'
import { NavLinks, Routes } from '../../../lib/constants'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles({
  root: {
    // height: 260,
    paddingTop: 30,
  },
  navlink: {
    fontSize: 16,
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '&:after': {
      position: 'absolute',
      content: '""',
      height: 3,
      bottom: -4,
      margin: '0 auto',
      left: 0,
      right: 0,
      width: '100%',
      background: theme.palette.primary.main,
      transition: '.5s',
    },
    '&:hover:after': {
      width: '80%',
      background: theme.palette.primary.main,
    },
  },
})

export default function Header() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  return (
    <div className={classes.root}>
      <Container>
        <TYPE.brand textAlign="center">
          <Link href="/" color="inherit" underline="none">
            Shareuhack
          </Link>
        </TYPE.brand>
        <Box display="flex" height="80px" alignItems="center" justifyContent="center" gridColumnGap="16px">
          {NavLinks.map((link) => (
            <Link key={link.key} className={classes.navlink} href={link.link}>
              {t(`${link.key}`).toUpperCase()}
            </Link>
          ))}
        </Box>
      </Container>
    </div>
  )
}
