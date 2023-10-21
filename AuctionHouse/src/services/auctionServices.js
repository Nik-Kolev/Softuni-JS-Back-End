const Auction = require("../models/Auction");

module.exports.createAuction = (auctionData) => Auction.create(auctionData)

module.exports.getAll = () => Auction.find()

module.exports.getSingleAuctionById = (auctionId) => Auction.findById(auctionId).populate('author').populate('bidder')

module.exports.bidForAuction = async (auctionId, userId, price) => {
    let auctionBid = await Auction.findById(auctionId).populate('author').populate('bidder')

    if (auctionBid.price >= price) {
        throw new Error('Bid must be greater than or equal to the current price!');
    }

    return Auction.findByIdAndUpdate({ _id: auctionId }, [
        {
            $set: {
                price: {
                    $cond: {
                        if: { $gte: ['$price', price] },
                        then: '$price',
                        else: price
                    }
                },
                bidder: {
                    $cond: {
                        if: { $gte: ['$price', price] },
                        then: '$bidder',
                        else: userId
                    }
                }
            }
        }
    ], { new: true });
}

module.exports.editAuction = (auctionId, data) => Auction.findByIdAndUpdate({ _id: auctionId }, data, { runValidators: true }, { new: true })

module.exports.deleteAuction = (auctionId) => Auction.findByIdAndDelete(auctionId)
