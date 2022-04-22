const routes: Record<string, RouteType> = {
  home: {
    path: '/',
    component: () => import('domains/Home'),
  },
  search: {
    path: '/search/*',
    component: () => import('domains/Search'),
  },
}

export default routes
