const { pool } = require('../utilities/poolConfig')

module.exports = async (req, res, next) => {
    const userId = req.session.userId

    if (!userId) {
        return res.redirect('/')
    }

    try {
        const query = 'SELECT * FROM users WHERE id = $1'
        const values = [userId]

        const result = await pool.query(query, values)
        const user = result.rows[0]

        if (!user) {
            return res.redirect('/')
        }

        req.user = user
        // console.log(user)
        res.locals.user = user
        next()
    }

    catch (error) {
        console.log(error)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
}