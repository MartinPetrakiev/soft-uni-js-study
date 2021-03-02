const { PORT} = require('./config/config');

const app = require('express')();
require('./config/express')(app);
require('./services/routes')(app);
require('./config/mongoose')(app);


app.listen(PORT, console.log(`Listening on port ${PORT}!`));