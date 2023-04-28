const bodyParser = require('body-parser');
const express = require('express');
const versionOneUserRoutes = require('./v1/routes/user.routes.js');
const versionOneBlogRoutes = require('./v1/routes/blog.routes.js');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/api/v1/users', versionOneUserRoutes);
app.use('/api/v1/blogs', versionOneBlogRoutes);

app.get('/', (req,res) => {
    res.json({'message': 'Welcome to Blog App'});
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: https://localhost:${PORT}`);
})

