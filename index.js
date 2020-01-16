// import server here in index
const server = require('./API/server.js');

// watch for connections on port 8000
server.listen(8000, () => {
    console.log('API running on port 8000')
})

