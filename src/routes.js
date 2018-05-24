const routes = module.exports = require('next-routes')()

routes
  .add('landing-page', '/', 'landing-page')
  .add('opportunity-view', '/opportunity-view/:id', 'opportunity-view')
  // .add('about')
  // Examples:
  // .add('blog', '/blog/:slug')
  // .add('user', '/user/:id', 'profile')
  // .add('/:noname/:lang(en|es)/:wow+', 'complex')
  // .add({name: 'beta', pattern: '/v3', page: 'v3'})
