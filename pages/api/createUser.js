import { getXataClient } from '../../src/xata'

const xata = getXataClient()

const handler = async (req, res) => {
    // using update method to update records in the database
    const {...data} = req.body
    try {
        await xata.db.Sponsorships.create({ ...data })
        res.json({ message: 'Success 😁' })
        } catch (error) {
        const errorMessage = 'Error creating user.'
        res.status(500).json({ message: errorMessage })
    }
}

export default handler;

