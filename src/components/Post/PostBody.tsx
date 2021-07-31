import { makeStyles } from '@material-ui/core'
import theme from 'theme'

const useStyles = makeStyles({
  markdown: {
    '& blockquote': {
      color: theme.textColor.text2,
      borderLeft: `3px solid ${theme.textColor.text2}`,
      paddingLeft: 9,
      margin: 0,
    },
    '& p': {
      fontSize: 18,
      lineHeight: '26px',
      opacity: 0.9,
    },
    '& h3': {
      fontSize: 18,
      lineHeight: '26px',
      // fontWeight: 700,
      opacity: 0.9,
    },
    '& * a': {
      color: theme.textColor.text1,
      fontWeight: 400,
      textDecoration: 'underline',
    },
    '& * a:hover': {
      color: theme.palette.primary.main,
    },
    '& hr': {
      width: '60%',
      height: 3,
      backgroundColor: theme.textColor.text3,
      border: 'none',
      margin: '50px auto',
    },
    '& p img': {
      width: '100%',
    },
    '& ul,ol': {
      margin: 0,
      paddingLeft: 18,
      fontSize: 18,
      lineHeight: '26px',
      opacity: 0.9,
    },
  },
})

export default function PostBody({ content }: { content: string }) {
  const classes = useStyles()
  return <div className={classes.markdown} dangerouslySetInnerHTML={{ __html: content }} />
}
