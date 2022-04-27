import React, { ReactElement } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'theme'

export default function provideTheme(ui: ReactElement): ReactElement {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>
}
