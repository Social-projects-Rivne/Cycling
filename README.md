# Cycling #
This is an application that allows bike riders to share their experience in a city. 

### Version
0.0.1

### Installation
For installing required libs and frameworks execute next commands:
```sh
    git clone https://github.com/Social-projects-Rivne/Cycling
    sudo apt-get install build-essential python-dev libmysqlclient-dev
    pip install -r requirements.txt
```

Next step you need to create *config.ini* file in the project folder.
*config.ini* should contain next lines with yours setting:

    [DataBase]
    ENGINE = mysql
    HOST = localhost
    USER = root
    PASSWORD = password
    NAME = CYCLINGDB

    [MailSender]
    API_TOKEN: hw9r09ojwwi03fjw09rijf
    MAIL_FROM: cycling.no-reply@email.ua

You have to create the database:
```sh
    mysql -u root -p 
    source ./fixtures/create_db.sql
```
This script creates new user and grants all rights on this new DB to it.
Better open this *create_db.sql* and edit it:
change user's name and password.

Then you have to let Django make its migrations
```sh
    python manage.py makemigrations
    python manage.py migrate
```

After that you have to set *npm*
```sh
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install
```

## Gulp commands:

### Build:

- `npm run gulp transform` Build all *.jsx files into one bundle.js file into `static/js/app/`
- `npm run gulp build` Build all *.jsx files into one minified bundle.js file into `static/js/app/`
- `npm run gulp less` Build all *.less files into one main.css file into `static/css/`

### For deleoping

- `npm run gulp watch` Run building every time you change any *jsx or *.less file
