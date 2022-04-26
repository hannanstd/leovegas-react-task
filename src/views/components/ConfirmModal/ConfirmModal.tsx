/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useImperativeHandle, useState, VFC } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import { ButtonProps } from '@mui/material/Button/Button'
import { AlertProps } from '@mui/material/Alert/Alert'
import Typography from '@mui/material/Typography'
import useStyles from './ConfirmModal.styles'

type ConfirmModalProps = {
  type?: AlertProps['severity']
  message?: string | JSX.Element
  title?: string | JSX.Element
  onConfirm: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  confirmText?: string
  confirmColor?: ButtonProps['color']
  cancelText?: string | null
}
type ConfirmModalState = ConfirmModalProps & { open: boolean }

const ref = createRef<any>()

export const confirm = (props: ConfirmModalProps) => ref.current.open(props)

const ConfirmModalContainer: VFC = () => {
  const classes = useStyles()

  const [state, setState] = useState<ConfirmModalState>({
    open: false,
    onConfirm: () => {},
  })

  const close = (): void => {
    setState((prevState: ConfirmModalProps) => ({ ...prevState, open: false }))
  }

  const open = (newState: ConfirmModalProps): void => {
    setState({ ...newState, open: true })
  }

  const onCancelClick = async () => {
    await state?.onCancel?.()
    close()
  }

  const onConfirmClick = async () => {
    await state.onConfirm()
    close()
  }

  useImperativeHandle(ref, () => ({ open }), [])

  return (
    <Dialog open={state.open}>
      {(!!state?.title || !!state.type) && (
        <DialogTitle className={classes.dialogTitle}>
          {!!state?.type && (
            <Alert
              severity={state.type}
              classes={{
                root: classes.alertRoot,
                icon: classes.alertIcon,
              }}
            />
          )}
          {!!state?.title && <Typography>{state?.title || ''}</Typography>}
        </DialogTitle>
      )}

      {!!state?.message && (
        <DialogContent>
          <DialogContentText>{state.message}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {state.cancelText !== null && (
          <Button onClick={onCancelClick}>{state.cancelText || 'No'}</Button>
        )}
        <Button
          onClick={onConfirmClick}
          autoFocus
          variant="contained"
          color={state?.confirmColor || state?.type || 'primary'}
        >
          {state.confirmText || 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModalContainer
