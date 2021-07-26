// require packages
const { urlencoded } = require('express');
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// creates PORT for express to listen on
const PORT = process.env.PORT || 3001

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Running server at http://localhost:${PORT}.`);
})