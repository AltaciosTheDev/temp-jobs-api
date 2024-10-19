//Every not found request will be handled with this middleware

const notFound = (req,res) => res.status(404).send('Route does not exist')

module.exports = notFound
