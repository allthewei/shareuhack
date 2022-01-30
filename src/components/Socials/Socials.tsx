import theme from 'theme/index'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import Link from '../../components/Link/Link'
import { Box } from '@mui/material'

export default function Socials({ primary, size }: { primary?: boolean; size?: 'small' | 'normal' }) {
  return (
    <Box display="flex" alignItems="center" gap="8px">
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://www.facebook.com/shareuhack/"
        title="Facebook"
        disableHover
        target="_blank"
        type="external"
      >
        <FacebookIcon fontSize={size === 'small' ? 'medium' : 'large'} />
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://twitter.com/shareuhack"
        title="Twitter"
        disableHover
        target="_blank"
        type="external"
      >
        <TwitterIcon fontSize={size === 'small' ? 'medium' : 'large'} />
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="https://www.instagram.com/shareuhack/"
        title="Instagram"
        disableHover
        target="_blank"
        type="external"
      >
        <svg
          fill={theme.palette.primary.main}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width={size === 'small' ? '24px' : '35px'}
          height="35px"
        >
          <path d="M 21.580078 7 C 13.541078 7 7 13.544938 7 21.585938 L 7 42.417969 C 7 50.457969 13.544938 57 21.585938 57 L 42.417969 57 C 50.457969 57 57 50.455062 57 42.414062 L 57 21.580078 C 57 13.541078 50.455062 7 42.414062 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 27.029 23 23 27.029 23 32 C 23 36.971 27.029 41 32 41 C 36.971 41 41 36.971 41 32 C 41 27.029 36.971 23 32 23 z" />
        </svg>
      </Link>
      <Link
        color={primary ? theme.palette.primary.main : theme.palette.primary.contrastText}
        href="mailto:c@shareuhack.com"
        title="Email"
        disableHover
        target="_blank"
        type="external"
      >
        <EmailIcon fontSize={size === 'small' ? 'medium' : 'large'} />
      </Link>
    </Box>
  )
}
