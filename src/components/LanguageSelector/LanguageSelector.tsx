import { useState } from 'react'
import { Button, Dialog, DialogTitle, makeStyles, List, ListItem, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Locales } from '../../../lib/constants'
import LanguageIcon from '@material-ui/icons/Language'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function LanguageSelector() {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function setLocale(locale: string) {
    document.cookie = `NEXT_LOCALE=${locale}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
  }

  const onSelect = (locale: string) => {
    setLocale(locale)
    setOpen(false)
    console.log()
    router.push(router.asPath, router.asPath, { locale: locale })
  }

  const getLocaleData = (locale?: string) => {
    const data = Locales.find((el) => el.key === locale)
    if (!data) {
      return Locales[0]
    }
    return data
  }

  return (
    <>
      <Button onClick={handleOpen} color="primary">
        <LanguageIcon />
        <Box ml="5px">
          {getLocaleData(locale).language}({getLocaleData(locale).region})
        </Box>
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">
          <Box display="flex" alignItems="center">
            <LanguageIcon />
            <Box ml="5px">{t('selectLocale')}</Box>
          </Box>
        </DialogTitle>
        <List>
          {locales?.map((locale) => (
            <ListItem button onClick={() => onSelect(locale)} key={locale}>
              {getLocaleData(locale).language}({getLocaleData(locale).region})
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  )
}