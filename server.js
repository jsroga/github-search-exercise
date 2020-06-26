const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const _ = require('lodash')

const SUPER_SECRET_TOKEN = '439twbefn032rqmiwdfswjjkfnw9e4r'

const isAuthorized = (req) => req.header('X-Secret-Token') === SUPER_SECRET_TOKEN

server.use(middlewares)

server.use((req, res, next) => {
  console.log(req.path);
 if (isAuthorized(req) || req.path === '/login') { // add your authorization logic here
   setTimeout(next, _.random(500, 2000));
 } else {
   res.sendStatus(401)
 }
})

server.get('/login', (req, res) => {
  if (req.query.email === 'jacek' && req.query.password === '123') {
    res.json({
      token: SUPER_SECRET_TOKEN
    })  
  } else {
    res.sendStatus(401)
  }
})

server.use(router)

server.listen(3008, () => {
  console.log('JSON Server is running')
})