declare interface RouteType {
  path: `/${string}`
  component: () => Promise
}
