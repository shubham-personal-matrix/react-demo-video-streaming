import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import App from './App'
import './theme.css'  // MUI theme + --app-* tokens
import '@core/main'  // Register <video-stream-player> custom element

/**
 * MUI dark theme — single source of truth for all colours.
 *
 * The GlobalStyles block below maps palette values to --app-* CSS custom
 * properties on :root.  Because CSS custom properties are inherited,
 * <video-stream-player>'s shadow DOM reads them automatically — no prop
 * drilling or direct component coupling required.
 *
 * To change button colours everywhere (including inside the web component),
 * edit palette.primary / palette.error here.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1976d2' },   // MUI default blue
    error:   { main: '#d32f2f' },   // MUI default red
    background: {
      default: '#0a0d12',
      paper:   '#13181f',
    },
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})

/**
 * Bridge MUI palette → --app-* tokens consumed by <video-stream-player>.
 *
 * This is the ONLY place where app-level CSS tokens are defined.
 * Changing the MUI theme above automatically updates the web component.
 */
const appTokens = {
  '--app-btn-primary':        theme.palette.primary.main,
  '--app-btn-primary-hover':  theme.palette.primary.dark,
  '--app-btn-danger':         theme.palette.error.main,
  '--app-btn-danger-hover':   theme.palette.error.dark,
  '--app-btn-text':           '#ffffff',
  '--app-btn-radius':         `${theme.shape.borderRadius}px`,
  '--app-canvas-bg':          theme.palette.background.default,
  '--app-surface':            theme.palette.background.paper,
  '--app-border-color':       theme.palette.divider,
  '--app-text-color':         theme.palette.text.primary,
  '--app-text-muted':         theme.palette.text.secondary,
  '--app-font-family':        theme.typography.fontFamily,
  '--app-radius':             `${theme.shape.borderRadius}px`,
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Inject --app-* tokens onto :root so the web component can inherit them */}
      <GlobalStyles styles={{ ':root': appTokens }} />
      <App />
    </ThemeProvider>
  </StrictMode>
)

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )

