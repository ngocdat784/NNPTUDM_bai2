const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

/**
 * TỰ TĂNG ID + isDeleted khi CREATE POST
 */
server.post('/posts', (req, res, next) => {
  const db = router.db
  const posts = db.get('posts').value()

  const maxId = posts.length
    ? Math.max(...posts.map(p => Number(p.id)))
    : 0

  req.body.id = String(maxId + 1)
  req.body.isDeleted = false

  next()
})

/**
 * XOÁ MỀM POST (set isDeleted = true)
 */
server.delete('/posts/:id', (req, res) => {
  const db = router.db
  const postId = req.params.id

  db.get('posts')
    .find({ id: postId })
    .assign({ isDeleted: true })
    .write()

  res.status(200).json({ message: 'Post soft-deleted' })
})

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})
