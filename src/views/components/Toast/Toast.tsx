/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useImperativeHandle, useState, VFC } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { AlertColor } from '@mui/material/Alert/Alert'
import Transition from '@mui/material/Fade'

type ToastState = {
  idx?: string
  message: string | JSX.Element
  duration?: number
  type: AlertColor
}
export type ToastParams = ToastState

let timeouts: Record<string, number> = {}
const ref = createRef<any>()

export const toast = (props: ToastParams) => ref.current.open(props)

const ToastContainer: VFC = () => {
  const [alerts, setAlerts] = useState<ToastState[]>([])

  const onClose = (idx: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.idx !== idx))
  }

  const onAdd = (params: ToastParams): void => {
    const idx = params?.idx || `${Math.random() + Date.now()}`
    clearTimeout(timeouts[idx])
    if (params?.idx) onClose(idx)
    setAlerts((alerts) => [...alerts, { ...params, idx }])
    timeouts[idx] = window.setTimeout(
      () => onClose(idx),
      params?.duration || 5000
    )
  }

  useImperativeHandle(ref, () => ({ open: onAdd }), [])

  return (
    <Snackbar
      open={alerts.length > 0}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <div>
        {alerts.map(({ idx, message, type }) => (
          <Transition key={idx} in={true}>
            <Alert
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
