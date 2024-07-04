const app = require('./app')
const { port } = require('./config/config')
const sequelize = require('./config/db')

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...')
        return sequelize.sync()
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
    .catch(err => console.log('Error: ' + err))