import { PaletteMode } from '@mui/material'

const darkPalette = {}
const lightPalette = {}

const palette = (mode: PaletteMode) => ({
  mode: mode as PaletteMode,
  ...(mode === 'dark' ? darkPalette : lightPalette),
})
export default palette
