--brew services start postgresql
--\ir service/schema.sql
--psql mydb
--create database sdc;
--alter table features alter column value type character varying(50);

DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\c sdc;

CREATE TABLE products (
id INT PRIMARY KEY,
name VARCHAR(50),
slogan VARCHAR(200),
description VARCHAR(500),
category VARCHAR(50)
default_price INT,
);

CREATE TABLE features (
  id INT PRIMARY KEY,
  productId INT,
  feature VARCHAR(50),
  value VARCHAR(50)

);

CREATE TABLE related (
  id INT PRIMARY KEY,
  productId INT,
  relatedId INT

);

CREATE TABLE styles (
  id INT PRIMARY KEY,
  productid INT,
  name VARCHAR(50),
  sale_price VARCHAR(10),
  origin_price INT,
  default_style INT

);


CREATE TABLE photos(
  id INT PRIMARY KEY,
  styleid INT,
  url VARCHAR(300),
  thumbnail_url VARCHAR(300)
);

CREATE TABLE sku(
  id INT PRIMARY KEY,
  styleid INT,
  size VARCHAR(5),
  quantity INT
);

CREATE TABLE ratings(
id INT PRIMARY KEY,
productId INT,
Ratings INT

); --may not need it


CREATE TABLE Favorite(
id INT PRIMARY KEY,
productId INT,
default_img VARCHAR(100),
default_price INT,
discount_price INT,
description VARCHAR(50),
average_review INT
)


--COPY products from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/product.csv' DELIMITER ',' CSV HEADER;
--COPY related from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/related.csv' DELIMITER ',' CSV HEADER;
--COPY features from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/features.csv' DELIMITER ',' CSV HEADER;
--COPY styles from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/styles.csv' DELIMITER ',' CSV HEADER;
--COPY photos from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/photos.csv' DELIMITER ',' CSV HEADER;
--COPY sku from '/Users/huhu/Documents/cs/Hack-Reactor/SDC/data/skus.csv' DELIMITER ',' CSV HEADER;