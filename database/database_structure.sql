DROP DATABASE store;
CREATE DATABASE store;
USE store;
CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20),
    PRIMARY KEY (id)
);
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    sex CHAR(1),
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number CHAR(12),
    hashed_password VARCHAR(60),
    PRIMARY KEY (user_id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT UQ_username UNIQUE (username),
    CONSTRAINT UQ_email UNIQUE (email),
    CONSTRAINT UQ_phone_number UNIQUE (phone_number),
    CONSTRAINT User_sex CHECK (sex = 'M' OR 'F')
);
CREATE TABLE suppliers (
	supplier_id INT NOT NULL AUTO_INCREMENT,
    supplier_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(13),
    PRIMARY KEY (supplier_id),
    CONSTRAINT UQ_supplier_name UNIQUE (supplier_name),
    CONSTRAINT UQ_supplier_email UNIQUE (email),
    CONSTRAINT UQ_supplier_phone_number UNIQUE (phone_number)
);
CREATE TABLE categories (
	category_id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (category_id),
    CONSTRAINT UQ_category UNIQUE (category_name)
);
CREATE TABLE products (
	product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    supplier_id INT NOT NULL,
    category_id INT NOT NULL,
    price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 0,
    unit_in_order INT UNSIGNED NOT NULL DEFAULT 0,
    discount DOUBLE,
    images VARCHAR(500),
    description TEXT,
    PRIMARY KEY (product_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    CONSTRAINT UQ_product UNIQUE (product_name),
    CONSTRAINT discount_limit CHECK (discount> 0 AND discount < 1),
    CONSTRAINT order_limit CHECK (unit_in_order <= quantity)
);
CREATE TABLE vouchers (
	voucher_id VARCHAR(60) NOT NULL,
    voucher_name VARCHAR(255) NOT NULL,
    voucher_discount DOUBLE NOT NULL,
    expiry_date DATE NOT NULL,
    description TEXT,
    PRIMARY KEY (voucher_id),
    CONSTRAINT voucher_limit CHECK (voucher_discount > 0 AND voucher_discount < 1)
);
CREATE TABLE orders (
	order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date DATETIME,
    voucher_id VARCHAR(60),
    paid BOOL NOT NULL DEFAULT 0,
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (voucher_id) REFERENCES vouchers(voucher_id)
);
CREATE TABLE order_details (
	order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT atleast_quantity CHECK (quantity > 0)
);
CREATE TRIGGER before_order_detail_insert
BEFORE INSERT ON order_details
FOR EACH ROW
UPDATE products
SET unit_in_order = unit_in_order + NEW.quantity
WHERE NEW.product_id = products.product_id;
--
CREATE TRIGGER before_order_detail_update
BEFORE UPDATE ON order_details
FOR EACH ROW
UPDATE products
SET unit_in_order = (unit_in_order + (NEW.quantity - OLD.quantity))
WHERE NEW.product_id = products.product_id;
--
CREATE TRIGGER before_order_detail_delete
BEFORE DELETE ON order_details
FOR EACH ROW
UPDATE products
SET unit_in_order = unit_in_order - OLD.quantity
WHERE OLD.product_id = products.product_id;
--
CREATE TRIGGER before_orders_update
BEFORE UPDATE ON orders
FOR EACH ROW
UPDATE products JOIN order_details ON products.product_id = order_details.product_id
JOIN orders ON order_details.order_id = NEW.order_id
SET products.quantity = products.quantity - order_details.quantity,
unit_in_order = unit_in_order - order_details.quantity
WHERE products.product_id = order_details.product_id;