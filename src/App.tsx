import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import VideocamIcon from '@mui/icons-material/Videocam'

// Teach TypeScript about the custom element so JSX is valid.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'video-stream-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string; autoconnect?: boolean },
        HTMLElement
      >
    }
  }
}

/**
 * Default WebSocket stream URL.
 * The web component pre-fills its URL input with this value.
 * Each camera can have its own URL — just pass a different `url` prop.
 */
const DEFAULT_STREAM_URL = 'ws://192.168.28.155:8086/stream-001B09130330?token=b9ea15b7f6724a17abaa1b3e3d5f5e87'

/**
 * Style applied to every <video-stream-player>.
 *
 * You can pass any CSS custom property here to override the theme
 * for that specific player instance, without affecting others.
 *
 * `width: 100%` makes the player fill its grid cell.
 */
const playerStyle: React.CSSProperties = {
  width: '100%',
}

interface CameraTile {
  id:    number
  label: string
  url:   string
}

const DEFAULT_TILES: CameraTile[] = [
  { id: 1, label: 'Camera 1', url: DEFAULT_STREAM_URL },
  { id: 2, label: 'Camera 2', url: DEFAULT_STREAM_URL },
  { id: 3, label: 'Camera 3', url: DEFAULT_STREAM_URL },
  { id: 4, label: 'Camera 4', url: DEFAULT_STREAM_URL },
]

const MAX_TILES = 64  // 8 × 8 grid

export default function App() {
  const [tiles, setTiles] = useState<CameraTile[]>(DEFAULT_TILES)

  function addTile() {
    if (tiles.length >= MAX_TILES) return
    setTiles(prev => [
      ...prev,
      { id: Date.now(), label: `Camera ${prev.length + 1}`, url: DEFAULT_STREAM_URL },
    ])
  }

  function removeTile(id: number) {
    setTiles(prev => prev.filter(t => t.id !== id))
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* ── App bar ─────────────────────────────────────────── */}
      <AppBar position="static" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense">
          <VideocamIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, fontSize: 16 }}>
            Video Stream Player
          </Typography>

          <Chip
            label={`${tiles.length} / ${MAX_TILES}`}
            size="small"
            variant="outlined"
            sx={{ mr: 1.5, fontSize: 11 }}
          />

          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={addTile}
            disabled={tiles.length >= MAX_TILES}
          >
            Add Camera
          </Button>
        </Toolbar>
      </AppBar>

      {/* ── Player grid ─────────────────────────────────────── */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
            gap: 2,
          }}
        >
          {tiles.map(tile => (
            <Box key={tile.id}>
              {/* Tile header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, px: 0.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ flexGrow: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  {tile.label}
                </Typography>
                <Tooltip title="Remove">
                  <IconButton size="small" onClick={() => removeTile(tile.id)} sx={{ p: '2px' }}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Web component — url pre-fills the input; style sets width + optional per-instance token overrides */}
              <video-stream-player
                url={tile.url}
                style={playerStyle}
              />
            </Box>
          ))}
        </Box>
      </Box>

    </Box>
  )
}
