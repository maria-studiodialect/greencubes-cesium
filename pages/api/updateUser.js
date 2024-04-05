import { getXataClient } from '../../src/xata'

const xata = getXataClient()

const handler = async (req, res) => {
    // using update method to update records in the database
    const { id, ...data } = req.body
    try {
        await xata.db.Sponsorships.update(id, { ...data })
        res.json({ message: 'Success 😁' })
        } catch (error) {
        const errorMessage = 'Error updating the product.'
        res.status(500).json({ message: errorMessage })
    }
}

export default handler;

