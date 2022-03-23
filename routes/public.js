const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.send('Public')
  })

module.exports = router