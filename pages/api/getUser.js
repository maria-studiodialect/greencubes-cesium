import { getXataClient } from '../../src/xata'

const xata = getXataClient()

const handler = async (req, res) => {
    const email = req.query.email
    const record = await xata.db.Sponsorships.filter({ email: email }).getMany()
    try {
    const data = record[0]
    res.json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message, data: []});
    }
}

export default handler;
