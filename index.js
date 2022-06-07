const app = require('./app')
const childProcess = require('child_process');
const port = process.env.PORT || 5004
app.listen(port, () => console.log(`Server started on ${port}`))

childProcess.exec("npm run client")



