# juju

=====
## DB

Create local database (from command line)
    createdb juju
Load Schema (from command line)
    psql juju < server/db/schema.sql
Start Database Server (locally)
    node server/db/databases.js
Load MockDataSet
    psql juju < server/db/mockData.sql

## For production DB commands:
[heroku](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on)
Connect to production DB:
    psql -h ec2-54-227-246-11.compute-1.amazonaws.com -U xdhsmwxwxbezek
db7ku14gg68rmg
Reset DB
     heroku pg:reset DATABASE

============================================
## Testing


### Front End
to start karma from the command line
    sudo npm install -g karma-cli

to run tests
    npm run tc

### Back End
install
    npm install -g jasmine

# Usage
stop server

run all tests
    npm test

run a specific test
    jasmine spec/server/path/to/your/test.js

=======================================
## API Keys
-put them in the .env file

-this line goes in any file you are trying to require an api key in
require('dotenv').config()
-if you add an api key, add the name of the key variable (but not the key itself) to the dotEnvTemplate file so everyone can see which APIs we are playing with
-add the api key/secret to the slack channel
## GULP

Run jshint
    gulp lint

