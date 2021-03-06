/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useImperativeHandle, useState, VFC } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { AlertColor } from '@mui/material/Alert/Alert'
import Transition from '@mui/material/Fade'

type ToastProps = {
  idx?: string
  message: string | JSX.Element
  duration?: number
  type: AlertColor
}

let timeouts: Record<string, number> = {}
const ref = createRef<any>()

export const toast = (props: ToastProps) => ref.current.open(props)

const ToastContainer: VFC = () => {
  const [alerts, setAlerts] = useState<ToastProps[]>([])

  const onClose = (idx: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.idx !== idx))
  }

  const onAdd = (params: ToastProps): void => {
    const idx = params?.idx || `${Math.random() + Date.now()}`
    clearTimeout(timeouts[idx])
    if (params?.idx) onClose(idx)
    setAlerts((alerts) => [...alerts, { ...params, idx }])
    timeouts[idx] = window.setTimeout(onClose, params?.duration || 4000, idx)
  }

  useImperativeHandle(ref, () => ({ open: onAdd }), [])

  return (
    <Snackbar
      open={alerts.length > 0}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <div data-testid="container">
        {alerts.map(({ idx, message, type }) => (
          <Transition key={idx} in={true}>
            <Alert
              data-testid={`alert-${idx}`}
              onClose={() => onClose(idx as string)}
              severity={type}
              elevation={6}
              variant="filled"
              style={{ width: '100%', marginBottom: 5 }}
            >
              {message}
            </Alert>
          </Transition>
        ))}
      </div>
    </Snackbar>
  )
}

export default ToastContainer
