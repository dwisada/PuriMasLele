const router = require('express').Router()
const { orangValidation } = require('../helpers/validation')
const { printIcon } = require('../helpers/html')
const Orang = require('../models/Orang')
const User = require('../models/User')

// ADMIN INDEX
router.route('/')
  .get((req, res) => {
    res.render('admin/dash', {
      navTitle: { a: 'Dashboard', b: res.locals.user.level },
      menuBox: {
        size: 'is-one-third',
        items: [
          { text: 'orang', link: 'admin/orang', icon: 'people', color: 'has-background-warning' },
          { text: 'ikan', link: 'admin/ikan', icon: 'water', color: 'has-background-warning' },
          { text: 'modal', link: 'admin/modal', icon: 'money', color: 'has-background-warning' },
          { text: 'jualan', link: 'admin/jualan', icon: 'sell', color: 'has-background-warning' },
          { text: 'belanja', link: 'admin/belanja', icon: 'shopping_cart', color: 'has-background-warning' },
          { text: 'neraca', link: 'admin/neraca', icon: 'account_balance_wallet', color: 'has-background-warning' },
        ]
      },
      footBtn: [
        { text: '', link: '#', icon: '', color: 'is-hidden', type: '', isDisabled: '' },
      ],
    })
  })

// ORANG (LIST)
router.route('/orang')
  .get(async (req, res) => {
    // Get all orang
    const listOrang = await Orang.find().sort({ name: -1 }).lean()
    
    res.render('admin/orang', {
      navTitle: { a: 'Kelola data', b: 'Orang' },
      printIcon,
      listOrang,
      footBtn: [
        { text: 'kembali', link: '/admin', icon: 'arrow_back', color: 'is-warning', type: '', isDisabled: '' },
      ],
    })
  })
  .post(async (req, res) => {
    // Validate req.body
    const { error } = orangValidation(req.body)
    if (error) return res.status(400).json({ status: 'error', message: error.details[0].message })
    // Check if name exist in db
    const nameExist = await Orang.findOne({ name: req.body.name })
    if (nameExist) return res.status(400).json({ status: 'error', message: 'Name already exist' })
    // Create new Orang
    const orang = new Orang(req.body)
    // Try send to db
    try {
      const savedOrang = await orang.save()
      res.status(201).json({ status: 'ok', message: 'Add Orang Success, refresh page' })
    } catch (error) {
      res.status(400).json({ status: 'error', message: error })
    }
    // res.status(200).json({ status: 'ok', message: 'Data POSTed', data: req.body })
  })

// ORANG (DETAIL)
router.route('/orang/:id')
  .get((req, res) => {
    // Validate if params.id is valid objectId (later)

    // Try find specific orang based on params.id

    res.json(req.params.id)
  })

// IKAN
router.route('/ikan')
  .get((req, res) => {
    res.render('admin/ikan', {
      navTitle: { a: 'Kelola data', b: 'Ikan' },
      footBtn: [
        { text: 'kembali', link: '/admin', icon: 'arrow_back', color: 'is-warning', type: '', isDisabled: '' },
      ],
    })
  })

module.exports = router