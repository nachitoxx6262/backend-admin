const { Router } = require("express");
const { requiresAuth } = require('express-openid-connect');
const auth =  Router();
auth.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Auth0 Webapp sample Nodejs',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });
module.exports = auth;