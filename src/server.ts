import app from './app'

const port = process.env.PORT

app.listen(port || 3000, () => console.log('Server is currently running on ' + port))
