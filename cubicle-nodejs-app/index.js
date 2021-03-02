const env = process.env.NODE_ENV.trim() || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
require('./config/mongoose')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}!`));

