-- This script create an empty database
-- To add tables to it use django's tools (migrations)
-- Run [python manage.py makemigrations] to create migrations
-- Run [python manage.py migrate] to apply those changes to the database.

-- To use this script:
-- 1. login into MySQL as root
--      mysql -u root -p
-- 2. run this script
--      source <path to the file>/create_db.sql
-- 3. grant all rights on this DB for your work user
--      CREATE USER '<user_name>'@'localhost' IDENTIFIED BY '<password>';
--      GRANT ALL ON CYCLINGDB.* TO '<user_name>'@'localhost';

-- create db. CHARACTER SET!!!
DROP DATABASE IF EXISTS CYCLINGDB;
CREATE DATABASE IF NOT EXISTS CYCLINGDB CHARACTER SET utf8;

-- create the user for this DB
DROP USER IF EXISTS 'dennygreb'@'localhost';
CREATE USER 'dennygreb'@'localhost' IDENTIFIED BY 'isurrender';
GRANT ALL ON CYCLINGDB.* TO 'dennygreb'@'localhost';
GRANT CREATE ON *.* TO 'dennygreb'@'localhost';
