const routes: Record<string, RouteType> = {
  home: {
    path: '/',
    component: () => import('domains/Home'),
  },
}

export default routes
