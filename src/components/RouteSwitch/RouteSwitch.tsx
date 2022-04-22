import React, { ComponentType, FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

export interface RouteSwitchProps {
  routes: Record<string, RouteType>
}

const RouteSwitch: FC<RouteSwitchProps> = ({ routes, children }) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        {Object.keys(routes).map((key) => {
          const { path, component } = routes[key]
          const Component: ComponentType = lazy(component)
          return <Route key={key} path={path} element={<Component />} />
        })}
        <Route
          path="*"
          element={
            children || <Navigate to={Object.values(routes)[0].path} replace />
          }
        />
      </Routes>
    </Suspense>
  )
}
export default RouteSwitch
