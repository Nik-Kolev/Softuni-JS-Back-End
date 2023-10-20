const errorHandler = require('../utils/errorHandler')
const auctionServices = require('../services/auctionServices')
const auctionController = require('express').Router()

auctionController.get('/publish', (req, res) => {
    res.render('auctions/publish', { title: 'Publish' })
})

auctionController.post('/publish', async (req, res) => {
    const { auctionTitle, category, imageUrl, price, description } = req.body
    const userId = req.user._id
    console.log(req.user.fullName)
    try {
        await auctionServices.createAuction({ auctionTitle, category, imageUrl, price, description, author: userId })
        res.redirect('/browse')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('auctions/publish', { title: 'Publish', errors })
    }
})

auctionController.get('/browse', async (req, res) => {
    try {
        const auctions = await auctionServices.getAll().lean()
        res.render('browse', { title: 'Browse', auctions })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('browse', { title: 'Browse', errors })
    }
})

auctionController.get('/details/:id', async (req, res) => {
    try {
        const auction = await auctionServices.getSingleAuctionById(req.params.id).lean({ virtuals: true })
        let canBid = auction.bidder?.id != req.user?._id && req.user?._id != auction.author._id
        res.render('auctions/details', { ...auction, title: 'Auction Details', canBid })
    } catch (err) {
        console.log(err)
        const errors = errorHandler(err)
        res.render('auctions/details', { title: 'Auction Details', errors })
    }
})

auctionController.post('/bid/:id', async (req, res) => {
    const { price } = req.body
    try {
        await auctionServices.bidForAuction(req.params.id, req.user._id, price)
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        const auction = await auctionServices.getSingleAuctionById(req.params.id).lean({ virtuals: true })
        let canBid = auction.bidder?.id != req.user?._id && req.user?._id != auction.author._id
        res.render('auctions/details', { title: 'Auction Details', errors, ...auction, canBid })
    }
})

module.exports = auctionController