const routes: Record<string, RouteType> = {
  home: {
    path: '/',
    component: () => import('views/pages/Home'),
  },
  search: {
    path: '/search',
    component: () => import('views/pages/Search'),
  },
  channels: {
    path: '/channels',
    component: () => import('views/pages/Channels'),
  },
}

export default routes
