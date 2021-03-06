const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  scoket: state => state.user.scoket,
  sessionId: state => state.user.sessionId,
  permission_routes: state => state.permission.routes
}
export default getters
