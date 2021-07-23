// require packages
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const htmlRoutes = require('./routes/apiRoutes');

const app = express();

// creates PORT for express to listen on
const PORT = process.env.PORT || 3001

// middleware
app.use(express.JSON());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}.`);
})