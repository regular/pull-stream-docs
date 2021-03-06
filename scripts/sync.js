const fs = require('fs')
const ghAuth = require('ghauth')
const ecosystem = require('ecosystem-docs')

const util = require('./util')
const config = require('../config')

module.exports = syncModules

function syncModules (modules, done) {
  const moduleList = util.toModuleList(modules)

  ghAuth({
    configName: 'ecosystem-docs',
    userAgent: 'ecosystem-docs',
    scopes: ['user']
  }, (err, auth) => {
    if (err) { return done(err) }

    ecosystem.sync(moduleList, {
      data: config.data,
      token: auth.token
    }, done)
  })
}

