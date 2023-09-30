const creatureServices = require('../services/creatureServices')

module.exports.creatureDataFetcher = async (creatureId, userId) => {
    let creature = await creatureServices.getSingleCreature(creatureId)

    let isOwner = creature.owner._id == userId

    let canVote = await creatureServices.checkVote(creatureId, userId)

    let totalVotes = creature.votes.filter(x => x._id).length
    canVote == null ? canVote = true : canVote = false
    let emails = []

    creature.votes.map(x => emails.push(x.email))
    emails = emails.join(', ')

    return {
        creature,
        isOwner,
        canVote,
        totalVotes,
        emails
    }
}