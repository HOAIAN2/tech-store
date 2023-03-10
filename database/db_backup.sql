-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: store
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `UQ_category` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Laptop',NULL),(2,'Phone',NULL),(3,'Other',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int DEFAULT NULL,
  `discount` double DEFAULT NULL,
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `atleast_quantity` CHECK ((`quantity` > 0)),
  CONSTRAINT `order_details_discount_limit` CHECK (((`discount` > 0) and (`discount` < 1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `voucher_id` varchar(60) DEFAULT NULL,
  `paid_method_id` int DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `voucher_id` (`voucher_id`),
  KEY `paid_method_id` (`paid_method_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`voucher_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`paid_method_id`) REFERENCES `payment_methods` (`method_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `method_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`method_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Cash'),(2,'Electronic bank transfers');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `supplier_id` int NOT NULL,
  `category_id` int NOT NULL,
  `price` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL DEFAULT '0',
  `unit_in_order` int unsigned NOT NULL DEFAULT '0',
  `discount` double DEFAULT NULL,
  `images` varchar(500) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `UQ_product` (`product_name`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `discount_limit` CHECK (((`discount` > 0) and (`discount` < 1))),
  CONSTRAINT `order_limit` CHECK ((`unit_in_order` <= `quantity`))
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Laptop MSI Gaming Pulse GL76 11UEK-437VN (i7-11800H Gen 11th | 16GB DDR4 | SSD 512GB PCIe | VGA RTX 3060 6GB | 17.3 FHD IPS 144Hz | Win10| Titanium Gray) - H??ng Ch??nh H??ng',1,1,38990000,1000,0,NULL,'921f96137c0d71c700d6b5141e4ea5a0.png',NULL),(2,'Laptop Asus TUF Gaming F15 FX506LHB i5-10300H/8GB/512GB/Win11 HN188W - H??ng ch??nh h??ng',3,1,15990000,1000,0,NULL,'c2e7398856394743517f89ff2bf15f4e.jpg',NULL),(3,'Laptop Lenovo IdeaPad Gaming 3 15IHU6 82K100FBVN (Core i7-11370H/8GB RAM/512GB SSD/15.6-in - H??ng ch??nh h??ng',5,1,20890000,1000,0,NULL,'64d8b1511755668a6235654da60437dd.jpg',NULL),(4,'Laptop Acer Nitro 5 AN515-45-R6EV R5-5600H |8GB|512GB|GTX 1650 4GB|156 FHD 144Hz|Win 11 H??ng ch??nh h??ng',2,1,18790000,1000,0,NULL,'eb1ef0b698fcb68ece413e1f6349e2bd.jpg',NULL),(5,'Laptop Asus ROG Strix G15 G513RC-HN090W (Ryzen 7-6800H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Electro Punk)-H??ng ch??nh h??ng',3,1,26990000,1000,0,NULL,'141c10c609b42c4059202b08e5a237d1.png',NULL),(6,'Laptop HP Victus 16-d0293TX (5Z9R4PA) (i5-11400H|512GB|3050Ti 4GB|16.1 FHD 144Hz) H??ng ch??nh h??ng',4,1,21690000,1000,0,NULL,'c1529a187f3d7888ae93dd6dbf46b319.jpg',NULL),(7,'Laptop Lenovo Legion 5 15IAH7 82RC003WVN |i5-12500H|8GB|512GB|RTX 3050 Ti|Win11- H??ng ch??nh h??ng',5,1,32150400,1000,0,NULL,'c0042d5c8ee977fba0aa1b34a4de1e6f.jpg',NULL),(8,'Laptop HP ProBook 440 G8 614F9PA (i7-1165G7/8GB/512GB SSD/Win11) -  H??ng Ch??nh H??ng',4,1,23020000,1000,0,NULL,'fe8fdb7a21a55fa9a7248f4895917f67.png',NULL),(9,'Laptop HP 240 G8 i5 1135G7/8GB/256GB/14F/Win10/(518V6PA)/B???c - H??ng ch??nh h??ng',4,1,15290000,1000,0,NULL,'6ed1f897e83d67e79769aff5664253fd.jpg',NULL),(10,'Laptop Acer Nitro Gaming AN515-58-773Y i7 12700H/8GB/512GB/15.6FHD/3050Ti 4GB/Win11 H??ng Ch??nh H??ng',2,1,28990000,1000,0,NULL,'e1be5aa2598342f12f686680fa889387.png',NULL),(11,'Laptop Asus TUF Gaming F15 FX506HC i5-11400H/8GB/512GB/Win11 HN144W - H??ng ch??nh h??ng',3,1,18990000,1000,0,NULL,'159690c42763b35c3d3736b822d2274a.jpg',NULL),(12,'Laptop HP Pavilion X360 14 ek0055TU i7 1255U/16GB/512GB/14F/Touch/Pen/Win11/(6L293PA)/V??ng - H??ng Ch??nh h??ng',4,1,24420000,1000,0,NULL,'a4d3d1364ad946a80d1995ca9553ed8f.jpg',NULL),(13,'Laptop Asus TUF Gaming FX517ZC i5 12450H/8GB/512GB/4GB RTX3050/144Hz/Win11 (HN077W) - H??ng ch??nh h??ng',3,1,23690000,1000,0,NULL,'8c63606d0a62249ca82dbe74c87d9e84.jpg',NULL),(14,'Laptop MSI Bravo 15 B5DD 275VN ??en /R7-5800H/512GSSD/8G/RX5500M4GB/15.6FHD/W11 - H??ng Ch??nh H??ng',1,1,22990000,1000,0,NULL,'80efd9595292a9cb82aec2d2ed9d935a.png',NULL),(15,'Laptop Lenovo IdeaPad Gaming 3 15ACH6 82K200T1VN R7 5800H|8GB|512GB|RTX 3050|Win11 - H??ng ch??nh h??ng',5,1,20150400,1000,0,NULL,'be4209392a891884c6c79dcbf5973da2.jpg',NULL),(16,'Laptop MSI Creator Z16 B12UGST-044VN (I7-12700H Gen 12 | 32GB DDR5 | SSD 2 TB PCle | VGA RTX 3070Ti 8GB | 16 QHD 165Hz | Win11|Luna Gray ) - H??ng Ch??nh H??ng',1,1,79990000,1000,0,NULL,'5539ed6d6fcd56fc41e268afdc7da9f2.png',NULL),(17,'Laptop HP Victus 16-E0168AX R7-5800H/8GB/512GB 4R0U6PA - H??ng ch??nh h??ng',4,1,22990000,1000,0,NULL,'871dcbbae5570185ea2d77419c37a53d.jpg',NULL),(18,'Laptop HP Pavilion 15-eg0513TU 46M12PA V??ng - H??ng ch??nh h??ng (ch??? giao HN v?? m???t s??? khu v???c)',4,1,12020000,1000,0,NULL,'4ddcf98292007a24696778678af3c2ac.jpg',NULL),(19,'Laptop MSI Modern 14 B5M R5 5500U/8GB/512GB/T??i/Chu???t/Win11 (203VN) - H??ng Ch??nh H??ng',1,1,19000000,1000,0,NULL,'8b284e2cfc027678f87fc7a80aae15ec.jpg',NULL),(20,'Vivobook ASUS  R564JA-UH31T Core i3-1005G1 / RAM 4GB / SSD 128GB / 15.6 Full HD Touchscreen / Win 10- H??ng nh???p kh???u',3,1,13950000,1000,0,NULL,'e865d7eb997bb93dfbcfd0e747747bd9.png',NULL),(21,'Laptop Acer Nitro 5 Eagle AN515-57-5669 i5-11400H | 8GB |512GB |GTX 1650 |15.6 FHD 144Hz H??ng ch??nh h??ng',2,1,19790000,1000,0,NULL,'10f0103bc8fe7e17a0b1a79049bfc144.jpg',NULL),(22,'Laptop HP Pavilion 15-eg2034TX 6K780PA (Core i7-1255U | 8GB | 512GB | MX550 2GB | 15.6 inch FHD | Windows 11 | V??ng) - H??ng Ch??nh H??ng',4,1,22620000,1000,0,NULL,'79c51386edefc866ed38e56fd16154c3.png',NULL),(23,'S???c d??nh cho laptop Asus Gaming FX705DT FX705DD - S???c Zin - H??ng Ch??nh H??ng',6,3,785925,1000,0,NULL,'19bc4a96fa3afc07103ec69545af1d21.jpg',NULL),(24,'Laptop Gigabyte G5 i5 10500H/16GB/512GB/6GB RTX3060/15.6F/144Hz/Win11/(KC-5S11130SB)/??en - H??ng ch??nh h??ng',7,1,22900000,1000,0,NULL,'022b0c13d0db6314a02694862d5ecc5f.png',NULL),(25,'Laptop MSI VECTOR GP76 12UGS-610VN (i7-12700H Gen 12th | 16GB DDR4 | SSD 1TB PCle | VGA RTX 3070Ti 6GB | 17.3 FHD IPS 360Hz | Win11| Black) - H??ng Ch??nh H??ng',1,1,57990000,1000,0,NULL,'20c5de6778033a65d0ecf2813f243e69.png',NULL),(26,'Laptop HP Pavilion 15 eg2066TU i7 1260P/16GB/512GB/15.6F/Win11/(6K7E2PA)/V??ng - H??ng ch??nh h??ng',4,1,22620000,1000,0,NULL,'aaeb5aab5ff4fb90d8e15936ad7197a8.png',NULL),(27,'Laptop HP Victus 16-e0168AX 4R0U6PA R7-5800H | 8GB | 512GB |RTX 3050Ti 4GB | 144Hz H??ng ch??nh h??ng',4,1,22690000,1000,0,NULL,'1e86b55c8cff58d0093325589e3e8377.jpg',NULL),(28,'Laptop Acer Nitro AN515 57 720A i7 11800H/8GB/512GB/4GB RTX3050Ti/15.6F/144Hz/Win11/(NH.QEQSV.004)/??en - H??ng ch??nh h??ng',2,1,24900000,1000,0,NULL,'47551cd820bd8fec66cda63f398fbaf5.png',NULL),(29,'Laptop HP Pavilion 15-eg2056TU (6K786PA) (i5-1240P | 8GB | 512GB | Intel Iris Xe Graphics | 15.6 FHD | Win 11) H??ng ch??nh h??ng',4,1,17320000,1000,0,NULL,'7fbf99df4206ccefc6c689c5a3c1b715.jpg',NULL),(30,'Laptop Gaming Acer Nitro 5 Tiger AN515-58-52SP  i5-12500H/RAM 8GB/512GB SSD/3050 4GB H??ng Ch??nh H??ng',2,1,24990000,1000,0,NULL,'d55fe475c107f9d9bc49672be3625bec.png',NULL),(31,'Laptop HP Victus 16-e1102AX 7C139PA (R7-6800H | 16GB | 512GB | GeForce RTX 3050Ti 4GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,29690000,1000,0,NULL,'45b612e7dd7300bfe124172920528559.jpg',NULL),(32,'Laptop Asus TUF Dash F15 (FX517ZC-HN077W) (Core i5-12450H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Black)-H??ng ch??nh h??ng',3,1,23990000,1000,0,NULL,'2863163ad06db259e7b6fe750e3caefd.png',NULL),(33,'Laptop HP 240 G8 (6L1A1PA) (i3-1115G4 | 8GB | 256GB | Intel UHD Graphics | 14 FHD | Win 11) H??ng ch??nh h??ng',4,1,11890000,1000,0,NULL,'c75dde9edd3b019a12bab2f0e79bf820.jpg',NULL),(34,'Laptop HP ProBook 450 G9 (6M0Z8PA) (i7-1255U | 8GB | 512GB | Intel Iris Xe Graphics | 15.6 FHD | Win 11) H??ng ch??nh h??ng',4,1,24020000,1000,0,NULL,'ae9b1a135805c91d8dfeb10e468ae9fb.jpg',NULL),(35,'laptop MSI Gaming Crosshair 15 B12UEZ-460VN (i7-12700H Gen 12th | 16GB DDR4 | SSD 1TB PCle | VGA RTX 3060 8GB | 15.6 INCH QHD IPS 165Hz | Win11|Gradient) - H??ng Ch??nh H??ng',1,1,43990000,1000,0,NULL,'d3376489ee1b011f384b27bf1457c37c.png',NULL),(36,'Laptop Asus TUF Gaming F15 FX507ZC-HN124W (Core i7-12700H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Jaeger Gray)-H??ng ch??nh h??ng',3,1,26990000,1000,0,NULL,'83c60c3987137a0e07fbce961e1626bc.png',NULL),(37,'Laptop HP Pavilion X360 14-ek0059TU (6K7E1PA) (i3-1215U | 8GB | 256GB | Intel UHD Graphics | 14 FHD Touch | Win 11) H??ng ch??nh h??ng',4,1,15920000,1000,0,NULL,'56451699b7be2c735c91bfe4cbbec6fb.png',NULL),(38,'Laptop Dell Alienware M15 R6 P109F001DBL (Core i7-11800H/ 32GB/ 1TB SSD/ RTX 3060/ 15.6 FHD, 165Hz/ Win11 + Office) - H??ng Ch??nh H??ng',8,1,49990000,1000,0,NULL,'d777fa9591575a75201f9f523ee1e36c.jpg',NULL),(39,'Laptop Lenovo 100e Gen 2 N4020/4GB/64GB eMMC/Intel UHD Graphics 600/11.6HD/Win 10 Pro - H??NG CH??NH H??NG',5,1,4598400,1000,0,NULL,'7d074b54a6a1f4c940bcd3340031c28d.jpg',NULL),(40,'Laptop MSI Modern 14 B11MOU 1028VN 1115G4/8GB/256GB/14FHD/Win11/(1028VN) - H??ng ch??nh h??ng',1,1,9990000,1000,0,NULL,'c21574f6d5b2175624b930fd9cab4d19.png',NULL),(41,'Laptop Acer Gaming Nitro 5 AN515-45-R86D (NH.QBCSV.005) (R7 5800H/8GB Ram/512GB SSD/RTX3060 6G/15.6 inch FHD 144Hz/Win 11/??en) H??ng ch??nh h??ng',2,1,27990000,1000,0,NULL,'2ed9cb2f883df319ddca546390d6fd21.jpg',NULL),(42,'Laptop HP Pavilion 14-dv2051TU (6K7G8PA) (i3-1215U | 4GB | 256GB | Intel UHD Graphics | 14 FHD | Win 11) - H??ng Ch??nh H??ng',4,1,12920000,1000,0,NULL,'c4c288a14cfa990c8b83c27f11632e35.png',NULL),(43,'Laptop MSI Gaming GF63 Thin 11SC-664VN (I5-11400H Gen 11th | 8GB DDR4 | SSD 512GB PCle | VGA GTX 1650 4GB GDDR6 | 15.6 FHD IPS 144Hz | Win11| Black) - H??ng Ch??nh H??ng',1,1,15990000,1000,0,NULL,'3dd844a32fcdb32c8849696c860362f6.jpg',NULL),(44,'Laptop gaming LENOVO IdeaPad 3 15ACH6 82K2010GVN R5-5600H|8G|512G|15.6FHD120Hz|RTX3050Ti|W11 - H??ng ch??nh h??ng',5,1,19800500,1000,0,NULL,'e84f414a8085e846700f6522cffd65f5.jpg',NULL),(45,'Laptop Acer Nitro 5 AN515-45-R6EV (AMD R5-5600H/ 8GB/ 512GB/ 4GB GTX1650/ 15.6 FHD IPS, 144Hz/ Win11) - H??ng Ch??nh H??ng',2,1,19020000,1000,0,NULL,'6b65dc67b33f0d89197f96c9ed1f7c3b.jpg',NULL),(46,'Laptop Acer Aspire 7 A715-42G-R1SB (AMD R5-5500U/ 8GB DDR4/ 256GB SSD/ GTX 1650 4GB/ 15.6 FHD IPS, 144Hz/ Win10) - H??ng Ch??nh H??ng',2,1,14120000,1000,0,NULL,'becb5398f0be90119a855804ad2a05ce.jpg',NULL),(47,'Laptop HP 340s G7 36A43PA (Core i5-1035G1/ 8GB/ 256GB/ 14 FHD/ Win10) - H??ng Ch??nh H??ng',4,1,14020000,1000,0,NULL,'a21dc60ec60ab274c3ae5b96d1d34647.png',NULL),(48,'Laptop Gaming Acer Aspire 7 A715-42G-R4XX NH.QAYSV.003- H??ng ch??nh h??ng',2,1,15200000,1000,0,NULL,'4787f4dfb66ebfde46ec8d7df83c54d0.jpg',NULL),(49,'Laptop gaming HP VICTUS 16 e0179AX 4R0V0PA R5 5600H|8GB|512GB|4GB RTX3050Ti |144Hz|WIN11 - H??ng ch??nh h??ng',4,1,20990000,1000,0,NULL,'f42d319106b32dd1aaa3153393255ddc.png',NULL),(50,'Laptop MSI Gaming GF63 11UC-443VN (i5-11400H Gen 11Th | 8GB DDR4 | SSD 512GB PCle | VGA RTX3050 Max-Q 4GB | 15.6 FHD IPS | Win10|Black) - H??ng Ch??nh H??ng',1,1,21990000,1000,0,NULL,'785d167e60cf55bd7dbfd60d649b1f51.png',NULL),(51,'Laptop Gigabyte U4 UD-50VN823SO ( i5-1155G7, Iris Xe Graphics, Ram 16GB DDR4, SSD 512GB, 14 Inch IPS FHD ) - H??ng Ch??nh H??ng',7,1,15490000,1000,0,NULL,'9785253def880c6afdad5df2d1eab8bf.png',NULL),(52,'Laptop HP Pavilion X360 14-ek0057TU (6K7E0PA) (i5-1235U | 8GB | 512GB | Intel Iris Xe Graphics | 14 FHD Touch | Win 11) H??ng ch??nh h??ng',4,1,19520000,1000,0,NULL,'5370e71b976c5980a05e6668d0f8eacb.jpg',NULL),(53,'Laptop MSI Gaming Katana GF66 11UC-698VN | I7 11800H | 8GB RAM | 512GB SSD | 15.6 inch FHD 144Hz | RTX3050 4GB | Win10 | ??en - H??ng Ch??nh H??ng',1,1,22190000,1000,0,NULL,'a92cd5b548681f55d3a82c68ccb654a9.png',NULL),(54,'Laptop HP Gaming VICTUS 16 d0200TX 4R0U2PA i7 11800H - H??ng ch??nh h??ng',4,1,22990000,1000,0,NULL,'eada54e71d1b3a4a61e7a190863bce63.png',NULL),(55,'Laptop gaming LENOVO LEGION 5 15ACH6H R7-5800H|16GD4|512GB|15.6FHD|RTX3060|W11 - H??ng ch??nh h??ng',5,1,35490000,1000,0,NULL,'bf113c99152d6d59c9c98b0c06226f9c.jpg',NULL),(56,'Laptop MSI Gaming GF63 Thin 11UD-628VN (i7-11800H/8GB RAM/512GB SSD/RTX3050Ti Max 4GB/15.6 FHD 60Hz 72% NTSC/Win10/Black) - H??ng Ch??nh H??ng',1,1,27990000,1000,0,NULL,'9b2f7fb96b8f288d604c2f9ae581b6b3.png',NULL),(57,'M??y t??nh Laptop HP ProBook 440 G9 6M0V7PA (14 Full HD/Intel Core i3-1215U/8GB/256GB SSD/Windows 11 Home) - H??ng Ch??nh H??ng',4,1,16520000,1000,0,NULL,'a2da7476e37b76ff78468d953bec1cb5.png',NULL),(58,'Laptop HP Victus 16-e0168AX 4R0U6PA R7-5800H | 8GB | 512GB | GeForce RTX 3050Ti 4GB | 16.1 FHD 144Hz | Win 10 - H??ng ch??nh h??ng',4,1,22690000,1000,0,NULL,'d74f626b6846266ccc8d3ea40acd6c3b.png',NULL),(59,'Laptop ASUS TUF Gaming A15 FA506ICB-HN355W (R5-4600H | 8GB | 512GB | GeForce RTX 3050 4GB | 15.6??? FHD 144Hz | Win 11) - H??ng Ch??nh H??ng',3,1,18490000,1000,0,NULL,'1e40f7a23eca6f402aefe5fb9dbda9be.png',NULL),(60,'Laptop Colorful AT i7 11800H/ 3060 6G DDR6/ 16G3200-D4/ SSD 512GB - H??ng Ch??nh H??ng',9,3,42900000,1000,0,NULL,'855ce7cff3781784f0722572d1256412.jpg',NULL),(63,'Laptop MSI Modern 14 B11MOU-1033VN ( i7-1195G7 Gen 11th | 8GB DDR4 | SSD 512GB PCIe | VGA Onboard | 14.1 FHD IPS | Win11| Gray) - H??ng Ch??nh H??ng',1,1,15490000,1000,0,NULL,'11cb8a79d1e578932dba02b1272522db.png',NULL),(64,'Laptop MSI Gaming Katana GF66 11UC-698VN (I7-11800H Gen 11th | 8GB DDR4 | SSD 512GB PCle | VGA RTX 3050 4GB | 15.6 FHD IPS 144Hz | Win10| Black) - H??ng Ch??nh H??ng',1,1,29490000,1000,0,NULL,'6f819879f63a516fe7a5091e1227d946.png',NULL),(65,'Laptop HP ProBook 430 G8(614K6PA)(i3-1115G4|4GB|256GB|Intel UHD Graphics|13.3 HD|)H??ng ch??nh h??ng',4,1,13420000,1000,0,NULL,'b26cc5084864a7d3b132827dac211159.png',NULL),(66,'Laptop MSI Gaming Katana GF76 11UE-446VN (i7-11800H Gen 11th | 16 GB DDR4 | SSD 512GB PCIe | VGA RTX 3060 6GB GDDR6 | 17.3 FHD IPS 144Hz | Win11|Black) - H??ng Ch??nh h??ng',1,1,36990000,1000,0,NULL,'9ceeec0e7bc6efd5b6291fe5d086f79a.png',NULL),(67,'Laptop MSI Gaming Crosshair 17 A12UEZ 264VN (I7-12700H GEN 12 | 16GB DDR4 | SSD 1TB PCle | VGA RTX 3060 6GB | 17.3 FHD IPS 360Hz | Win11 | Multi-color Gradient) - H??ng Ch??nh H??ng',1,1,44990000,1000,0,NULL,'1f7331fc834810298c4dde3de285cfd0.png',NULL),(68,'Laptop Gaming MSI Bravo 15 B5DD 276VN (Ryzen 5-5600H/8GB/512GB/RX 5500M 4GB/15.6 inch FHD/Win 11/??en) - H??ng ch??nh h??ng',1,1,20990000,1000,0,NULL,'bb832eb33a138f32594fb3d169490c77.png',NULL),(70,'Laptop HP Omen 16-b0176TX (5Z9Q7PA) (i7-11800H | 16GB | 1TB | GeForce RTX 3060 6GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,39390000,1000,0,NULL,'edcd61b3c94fc53e34d0f1281c81da76.jpg',NULL),(71,'Laptop HP Victus 16-e1102AX (7C139PA) (R7-6800H | 16GB | 512GB | GeForce RTX 3050Ti 4GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,29090000,1000,0,NULL,'e1e62898e90c4badd61a313267effbfb.jpg',NULL),(72,'Laptop MSI Gaming Pulse GL76 11UDK 690VN (i7-11800H | 16GB | 512GB | RTX3050 Ti 4GB | 17.3 inch FHD 144Hz | Win 11 | Titanium Gray) - H??ng Ch??nh H??ng',1,1,34490000,1000,0,NULL,'c9ae5d46a166de26176bebaf4c95202a.png',NULL),(73,'Laptop LENOVO IdeaPad Gaming 3 15IHU6 (82K100KLVN) | Intel Core i5 _ 11300H | 8GB | 512GB | RTX 3050Ti 4GB | 15.6 FHD  120Hz | Win 11 | H??ng ch??nh h??ng',5,1,19990000,1000,0,NULL,'0f8a62982bc6724db239420701dbbb10.jpg',NULL),(74,'Laptop HP 15s-fq2663TU 6K796PA (i3-1115G4/4GB/256GB SSD/15.6/ VGA ON/ Win11/ Silver)-H??ng Ch??nh H??ng',4,1,9620000,1000,0,NULL,'0aa4acc1717e43210ebed92073d01e12.png',NULL),(75,'Laptop Dell Alienware M15 R6 P109F001CBL (Core i7-11800H/ 32GB/ 1TB SSD/ RTX 3060/ 15.6 QHD, 240Hz, G-SYNC/ Win11 + Office) - H??ng Ch??nh H??ng',8,1,49990000,1000,0,NULL,'58c41a95606dd87c58f20333fdec8ce1.jpg',NULL),(76,'Laptop MSI Creator M16 A12UC-291VN | I7-12700H Gen 12 | 16GB DDR4 | SSD 512 GB PCle | VGA RTX 3050 4GB | 16.1 WQHD 2K | Win11| Black) - H??ng Ch??nh H??ng',1,1,35490000,1000,0,NULL,'df89a57f3964ea8fa32cec3de2ba01bc.JPG',NULL),(77,'Laptop HP 240 G8 617M3PA (i3-1005G1/4GB/256GB SSD/14HD/VGA ON/WIN11/Silver) - H??ng Ch??nh H??ng',4,1,9320000,1000,0,NULL,'8e7c0a0b01aa419067d17beeaf500f77.png',NULL),(78,'Laptop Asus ROG Strix G15 G513RC-HN038W (R7-6800H/8GB/512GB/RTX 3050 4GB/15.6-inch FHD/Win 11/Eclipse Gray)-H??ng ch??nh h??ng',3,1,26990000,1000,0,NULL,'6d91e9985bc5e1e78c1a6c263de0eee5.jpg',NULL),(79,'Laptop Acer Nitro 5 Eagle AN515-57-54MV (Core i5-11400H/ 8GB/ 512GB SSD/ RTX 3050 4GB/ 15.6 FHD IPS, 144Hz/ Win11) - H??ng Ch??nh H??ng',2,1,22020000,1000,0,NULL,'2dd7f6760ae4f8f2cbc5f22d027ddaf7.png',NULL),(80,'Laptop MSI Gaming Katana GF66 11UE-824VN (I7-11800H Gen 11th | 16GB DDR4 | SSD 512GB PCle | VGA RTX 3060 6GB | 15.6 FHD IPS 144Hz | Win10| Black) - H??ng Ch??nh H??ng',1,1,35990000,1000,0,NULL,'d7c3f4bc7d6a6033d6343ac3a34c5612.png',NULL),(82,'Laptop Lenovo IdeaPad Gaming 3 15ARH7 82SB007MVN (R7-6800H | 16GB | 512GB | GeForce RTX 3050Ti 4GB | 15.6 FHD 120Hz) H??ng ch??nh h??ng',5,1,27290000,1000,0,NULL,'9a1feb695cbc2a85c46a29cfaa2d2083.jpg',NULL),(83,'Laptop MSI Gaming Katana GF66 11UD-696VN (I7-11800H Gen 11th | 8GB DDR4 | SSD 512GB PCle | VGA RTX 3050Ti 4GB | 15.6 FHD IPS 144Hz | Win10| Black) - H??ng Ch??nh H??ng',1,1,30990000,1000,0,NULL,'d7308f6afb8ff81d3425c03a259abacf.png',NULL),(84,'Laptop MSI GS77 12UH-075VN (i9-12900H Gen 12th | 32GB DDR5 4800MHz | SSD 2TB PCle | VGA RTX 3080 8GB | 17.3 QHD IPS 240Hz | Win11) - H??ng Ch??nh H??ng',1,1,89990000,1000,0,NULL,'b855f6c287e7f13a9492ef7b9e964b6b.png',NULL),(85,'Acer Nitro 5 AN515 57 5669 i5 11400H/8GB/512GB/4GB GTX1650/15.6F/144Hz/Win11/(NH.QEHSV.001)/??en - H??ng ch??nh h??ng',2,1,20520000,1000,0,NULL,'498923524f1bdd083405c6ea166750b8.png',NULL),(87,'Laptop Acer Nitro 5 Tiger AN515-58-52SP (Core i5-12500H/ 8GB/ 512GB SSD/ RTX 3050/ 15.6 FHD IPS, 144Hz/ Win11) - H??ng Ch??nh H??ng',2,1,26000000,1000,0,NULL,'8510e556b4ed77ded2d10f67460d8341.jpg',NULL),(88,'Laptop Acer Nitro 5 AN515-58-52SP i5-12500H/8GB/512GB/Win11 (NH.QFHSV.001) - H??ng ch??nh h??ng',2,1,23990000,1000,0,NULL,'9996e46596af22a75081387bc762fcf7.jpg',NULL),(89,'Laptop gaming LENOVO IdeaPad 3 15IHU6 i5-11300H|8G|512G|15.6FHD-120Hz|RTX3050Ti|W11',5,1,22590000,1000,0,NULL,'e012d968fa07471fd97909ca3a1ed15a.jpg',NULL),(90,'Laptop MSI Vector GP66 12UGS 422VN (I7-12700H Gen 12 | 16GB DDR4 | SSD 1TB PCle | VGA RTX 3070Ti 8GB | 15.6 QHD IPS 165Hz | Win11 |Black) - H??ng Ch??nh H??ng',1,1,55990000,1000,0,NULL,'b5a9fc1809f73a30b5a641c2b1744f7e.png',NULL),(91,'Laptop MSI Summit E16 Flip A11UCT-030VN (i7 1195G7/16GB RAM/1TB SSD/16.0 inch QHD Touch/RTX 3050 4G/Win10/ Black) - H??ng Ch??nh H??ng',1,1,46990000,1000,0,NULL,'0e1b03c8446a7c07196126eb17704028.png',NULL),(92,'Laptop MSI Gaming Alpha 17 B5EEK-031VN (R7-5800H/8GB/512GB PCIE/VGA 8GB RX6600M/17.3 FHD 144HZ/WIN11/Black) - H??ng Ch??nh H??ng',1,1,35490000,1000,0,NULL,'a027a0b5be5b1597b4237f65bf77f8c1.png',NULL),(94,'Laptop HP VICTUS 16-d1187TX (7C0S4PA) (i7-12700H | 8GB | 512GB | GeForce RTX 3050Ti 4GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,32490000,1000,0,NULL,'5d70c9c4e7560682dee3a93a1ebe4a64.jpg',NULL),(95,'Laptop HP 340S G7 i3-1005G1/8GB/512GB/Win10 224L0PA - H??ng ch??nh h??ng',4,1,9790000,1000,0,NULL,'d3f16b59da69441cbf534a7de921762d.jpg',NULL),(96,'Laptop Lenovo Legion 5 15ARH7 82RE002WVN |R5-6600H|16GB|512 SSD|RTX 3050 Ti|Win11 - H??ng ch??nh h??ng',5,1,26198400,1000,0,NULL,'5556ea6e2715bb5fef58d603c6375aeb.jpg',NULL),(97,'Laptop Acer Nitro 5 Tiger AN515-58-52SP i5-12500H|8GB|512GB|RTX 3050 4GB|15.6 144Hz H??ng ch??nh h??ng',2,1,24390000,1000,0,NULL,'53865c910a93e9fa5df726021f1270bd.jpg',NULL),(98,'Laptop HP VICTUS 16-e1107AX (7C140PA) (R5-6600H | 8GB | 512GB | GeForce RTX 3050 4GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,24990000,1000,0,NULL,'41e29d4f95cf7208c0c82e12ae22df69.jpg',NULL),(99,'Laptop Lenovo Ideapad Gaming 3 15IMH05 i7 10750H/8GB/512GB/4GB GTX1650Ti/120Hz/Win10 (81Y4013UVN) - H??ng ch??nh h??ng',5,1,20490000,1000,0,NULL,'f94cce5dd82f3452b65740c53b7c57f3.jpg',NULL),(100,'Laptop Acer Gaming Nitro 5 AN515-57-71VV (NH.QENSV.005) (i7 11800H/8GB Ram/512GB SSD/RTX3050 4G/15.6 inch FHD 144Hz/Win 11/??en) - H??ng ch??nh h??ng',2,1,23300000,1000,0,NULL,'8fcb385c8ed8234be5e2cff1daa76174.jpg',NULL),(101,'Laptop MSI Katana GF66 12UCK-804VN (i7-12650H/8GB/512GB SSD/RTX 3050 4GB/15.6 FHD/Win11/Bal??/Black) H??ng ch??nh h??ng',1,1,25990000,1000,0,NULL,'329f206a492f7bc62779491a1a8653b8.png',NULL),(102,'Laptop Lenovo Legion 5 15IAH7H 82RB0048VN (i5-12500H | 16GB | 512GB | GeForce RTX 3060 6GB | 15.6 WQHD 165Hz 100%) H??ng ch??nh h??ng',5,1,38490000,1000,0,NULL,'834912ec6184dee9764f24355fe20812.jpg',NULL),(103,'Laptop Lenovo IdeaPad 5 Pro 14ARH7 82SJ0028VN (R7-6800HS | 16GB | 512GB | AMD Radeon 680M Graphics | 14 2.8K 90Hz) H??ng ch??nh h??ng',5,1,23090000,1000,0,NULL,'136b412c4adb12cfc464bb49abe21261.jpg',NULL),(104,'Laptop Acer Nitro 5 Eagle AN515-57-720A (Core i7-11800H/ 8GB DDR4 3200MHz/ 512GB SSD M.2 PCIE/ RTX 3050Ti 4GB GDDR6/ 15.6 FHD IPS, 144Hz/ Win11) - H??ng Ch??nh H??ng',2,1,24900000,1000,0,NULL,'dfa42fc012e1c6c824b43969b6cc228e.png',NULL),(105,'Laptop ASUS TUF Dash F15 FX517ZM-HN480W (i7-12650H | 8GB | 512GB | GeForce RTX 3060 6GB | 15.6??? FHD 144Hz | Win 11) - H??ng Ch??nh H??ng',3,1,29490000,1000,0,NULL,'46f6b00891fdf641a75c9f8fa619d6fa.PNG',NULL),(106,'Laptop MSI Gaming Alpha 15 B5EEK-203VN (Ryzen 5 5600H/8GB RAM/512GB SSD/15.6 inch FHD 144Hz/RX6600M 8GB/Win11/Black) - H??ng Ch??nh H??ng',1,1,32490000,1000,0,NULL,'e47784564ecafb1f6b7358f3ceea99c3.png',NULL),(107,'Laptop Acer Nitro Gaming AN515-58-769J i7 12700H/8GB/512GB/15.6FHD/GeForce RTX 3050 4GB/Win11 - H??ng Ch??nh H??ng',2,1,28720000,1000,0,NULL,'98604bb4e11ac677bece857080aa39de.jpeg',NULL),(108,'Laptop Gigabyte G5 ME-51VN263SH (i5-12500H | 8GB | 512GB | GeForce RTX 3050Ti 4GB | 15.6??? FHD 144Hz | Win 11) - H??ng Ch??nh H??ng',7,1,26490000,1000,0,NULL,'336482caca4c813bb11d51caf5610594.png',NULL),(109,'Laptop HP Victus 16-d1191TX (7C0S5PA) (i5-12500H | 16GB | 512GB | GeForce RTX 3050Ti 4GB | 16.1 FHD 144Hz | Win 11) H??ng ch??nh h??ng',4,1,27090000,1000,0,NULL,'9deb5917c96a54e00b8f88dfa81c77d8.jpg',NULL),(110,'Apple MacBook Pro 2022 13 inch (Apple M2 - 8GB/ 256GB) - MNEH3SA/A',10,1,30490000,1000,0,NULL,'766970298e7c1f74d8067426d2246029.jpg',NULL),(111,'Apple Macbook Air 2022 13.6 inch (Apple M2 - 16GB/ 256GB) - Z15Y00051',10,1,32990000,1000,0,NULL,'5f3c9a7499bc976b932ef8cbd58c0282.jpg',NULL),(112,'Apple Macbook Air 2020 13 inch (Apple M1 - 8GB/ 256GB) - MGND3SA/A',10,1,20490000,1000,0,NULL,'1d977cb23133c625f0baf7f4326cf523.jpg',NULL),(113,'B??? C???NG CHUY???N HYPERDRIVE GEN2 16-IN-1 THUNDERBOLT 3 DOCKING STATION V?? B??? NGU???N DC 180W CHO MACBOOK/CHROM/PC/LAPTOP (HD-G2TB3) - H??NG CH??NH H??NG',11,3,9891000,1000,0,NULL,'f77902455dab5bec502cf500573bdffe.jpeg',NULL),(114,'C???NG CHUY???N HYPERDRIVE GEN2 16-IN-1 THUNDERBOLT 3 DOCKING STATION KI??M B??? NGU???N DC 180W CHO MACBOOK/CHROM/PC/LAPTOP HD-G2TB3 - H??ng Ch??nh H??ng',11,3,10590000,1000,0,NULL,'24b16a0e42253b0711cca496bbea06bd.jpg',NULL),(115,'C???ng Chuy???n HYPERDRIVE GEN2 18-IN-1 For Macbook / Ipad Pro 2018-2020 PC & DEVICES (G218) - H??NG CH??NH H??NG',11,3,4990000,1000,0,NULL,'6e1df9abcaeb0492c52c3238cac31843.jpg',NULL),(116,'C???ng chuy???n HyperDrive Gen2 18-in-1 for Macbook, Ipad Pro 2018-2020, PC & Devices (HD-G218)  H??ng ch??nh h??ng.',12,3,4990000,1000,0,NULL,'c7828d40fe33f7a9af63a9aafd1466ab.jpg',NULL),(117,'C???NG CHUY???N HYPERDRIVE DUAL 4K HDMI 10-IN-1 (2 M??N H??NH) USB-C HUB D??NH CHO MACBOOK M1 HDM1H - H??NG CH??NH H??NG',11,3,4900000,1000,0,NULL,'45b92bce88530dd5a0ecb2221614a51c.jpeg',NULL),(118,'C???NG CHUY???N HYPERDRIVE DUAL 4K HDMI 10-IN-1 (2 M??N H??NH) USB-C HUB FOR MACBOOK M1 HDM1H - H??ng Ch??nh H??ng',11,3,4900000,1000,0,NULL,'82aea8908ceec4fe3ea3b1f89790381a.jpg',NULL),(119,'C???ng Chuy???n/Hub USB-C Hyperdrive Dual 4K HDMI 10in1 (2 m??n h??nh) D??nh Cho Macbook M1 - H??ng Ch??nh H??ng',12,3,4690000,1000,0,NULL,'ff2da10cb3e8798bb39d806fa5dd6852.jpg',NULL),(120,'S???C D??? PH??NG HYPERJUICE 130W USB-C CHO MACBOOK V?? T???T C??? C??C LAPTOP/THI???T B??? S??? D???NG S??? D???NG C???NG USB-C - H??ng Ch??nh H??ng',11,3,4690000,1000,0,NULL,'73bd62d1f21901347d6aa378da8b2503.jpg',NULL),(121,'C???ng chuy???n HyperDrive Gen2 18 in 1 USB-C cho Macbook, iPad Pro 2018/2020, PC & Devices - G218- H??ng ch??nh h??ng',11,3,4690000,1000,0,NULL,'aea2b9b7c9529122c0316aa4b95ea74e.jpg',NULL),(122,'C???NG CHUY???N HYPERDRIVE GEN2 18-IN-1 FOR MACBOOK, IPAD PRO 2018-2020, PC & DEVICES (G218) CH??NH H??NGGG',13,3,4690000,1000,0,NULL,'90a7ed24b5f40d6118c6e29f7815aa2f.png',NULL),(123,'C??? s???c nhanh 200W UGREEN CD271 40913 ?????u ra 6 c???ng s???c nhanh GaN PD S???c ???????c cho macbook Pro/Air, iPad Pro/Mi ...- H??ng Ch??nh H??ng',14,3,4590000,1000,0,NULL,'544762eb5424c84cd33a3cf381f6e1cc.png',NULL),(124,'C???ng Chuy???n HyperDrive Gen2 18-IN-1 For Macbook, Ipad Pro 2018-2020, PC & Devices (G218)-Ch??nh h??ng',11,3,4690000,1000,0,NULL,'3d28b0a0b3c5b53c36bff1d9beefc7be.png',NULL),(125,'C???NG CHUY???N HYPERDRIVE FOR MACBOOK M1 DUAL 4K HDMI 10-IN-1 (2 M??N H??NH) USB-C HUB HDM1H - H??NG CH??NH H??NG',11,3,4099000,1000,0,NULL,'afe3622703871021c6b89fe393a47091.jpg',NULL),(126,'Hyperdrive Gen2 12-In-1 For Macbook, Ipad Pro 2018-2020, PC & Devices (G212)-ch??nh h??ng',11,3,3690000,1000,0,NULL,'670deb8d2480faf62dc7843e72890535.jpg',NULL),(127,'C???NG CHUY???N HYPERDRIVE GEN2 12-IN-1 CHO MACBOOK, IPAD PRO 2018-2020, PC & DEVICES (G212) - H??ng Ch??nh H??ng',11,3,3501000,1000,0,NULL,'0db823a74a55ce0b68e8e2a23319bb73.jpg',NULL),(128,'C???ng Chuy???n Hyperdrive Dual 4K HDMI ( 2 M??n H??nh) USB-C Hub For Macbook M1 HDM1- H??ng Ch??nh H??ng',11,3,3500000,1000,0,NULL,'ce79eb06fa56f42c2feedcaab2093bd4.jpg',NULL),(129,'C???ng chuy???n HyperDrive Gen2 12 in 1 USB-C Hub cho Macbook, iPad Pro 2018/2020, PC & Devices - G212-H??ng ch??nh h??ng',11,3,3390000,1000,0,NULL,'d591b472f2fd7c3dd3f136c58cc7f8a8.jpg',NULL),(130,'C???ng Chuy???n Hyperdrive Ultimate USB-C Hub Cho MacBook Pro, PC & Devices - H??ng Ch??nh H??ng',11,3,3290000,1000,0,NULL,'27a23a3997f0bb502d041c5ea14d5585.jpg',NULL),(131,'????? chuy???n ?????i Type-C sang c???ng USB 3.0  + Th??? SD / TF ?????c + Gigabit Lan + Audio (mic + tai nghe) + VGA + HDMI + DVI, Type-C cho Macbook m??u B???c Ugreen TC40373MM131 H??ng ch??nh h??ng.',14,3,3209000,1000,0,NULL,'90cf1519606352e23a24e7b6ef03e577.jpg',NULL),(132,'C???ng Chuy???n HYPERDRIVE GEN 2 12-IN-1 For MACBOOK, IPAD PRO 2018-2020, PC & DEVICES (G212) - H??NG CH??NH H??NG',11,3,3690000,1000,0,NULL,'07dc704a2b9b00b1edea9ba2d8a0c46f.jpg',NULL),(133,'Balo WiWU Backpack 30L Larger Capacity D??nh Cho Laptop, Macbook Thi???t K??? Cao C???p Nhi???u Ng??n T??i Ti???n L???i - H??ng Ch??nh H??ng',15,3,3115000,1000,0,NULL,'7025c52d77706a79f4729abd840aa81e.PNG',NULL),(134,'B??? chuy???n ?????i ??a n??ng USB type-C cho Macbook Ugreen 40373 cao c???p - H??ng Ch??nh H??ng',14,3,3190000,1000,0,NULL,'a82142d692edb5f1f0fd3fbae595b39c.jpg',NULL),(135,'??i???n tho???i Samsung Galaxy A73 5G (8GB/128GB) - H??ng ch??nh h??ng',16,2,9259000,1000,0,NULL,'d52228ced82838e1ad0d0bdc1b914242.jpg',NULL),(136,'??i???n Tho???i Oppo A55 (4GB/64GB) - H??ng Ch??nh H??ng',17,2,3590000,1000,0,NULL,'2a0e5c3f718d20d998cd13ccc84864b0.jpg',NULL),(137,'??i???n Tho???i Samsung Galaxy M32 (8GB/128GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,4110000,1000,0,NULL,'1afcfdb363fd6837c6ca313ff1b2076c.jpg',NULL),(138,'??i???n tho???i Samsung Galaxy Z Flip 4 (8GB/128GB) - H??ng ch??nh h??ng',16,2,16990000,1000,0,NULL,'ebd11992c962a5e63d0b148b78cfee9d.png',NULL),(139,'??i???n tho???i Xiaomi Redmi Note 11 (4GB/128GB) - H??ng ch??nh h??ng',18,2,4090000,1000,0,NULL,'e705d424f730e20fe8e4a0d76dfbea4b.jpg',NULL),(140,'??i???n tho???i Xiaomi Redmi 9A (2GB/32GB) - H??ng ch??nh h??ng',18,2,1939000,1000,0,NULL,'b5f298fba4538c309cc4e0c6889b2297.jpg',NULL),(141,'??i???n tho???i Gaming Tecno POVA 4 PRO 8GB/128GB - Media Tek G99 | 6000 mAh | S???c nhanh 45W - H??ng Ch??nh H??ng',19,3,4490000,1000,0,NULL,'caa24bf38721f9b9ea0e10ad8ee9e35b.png',NULL),(142,'??i???n Tho???i Oppo A16k (3GB/32G) - H??ng Ch??nh H??ng - Xanh th???i th?????ng',17,2,2600000,1000,0,NULL,'f3793099025547b24be378b165c8b839.jpg',NULL),(143,'??i???n Tho???i Oppo Reno 7 5G (8GB/256G) - H??ng Ch??nh H??ng',17,2,7490000,1000,0,NULL,'39a8bae7367459bde5c287eb9902f9c9.jpg',NULL),(144,'??i???n Tho???i Nokia C30 (2GB/32GB) - H??ng Ch??nh H??ng',20,2,1669000,1000,0,NULL,'696c5f6aa4810d0ed3cb8b354010c60f.jpg',NULL),(145,'??i???n tho???i Xiaomi Redmi 10 (4GB/128GB) - H??ng ch??nh h??ng',18,2,3579000,1000,0,NULL,'8466dc534506538cc7353e9df55cba1a.jpg',NULL),(147,'??i???n Tho???i Samsung Galaxy A03s (3GB/32GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,1990000,1000,0,NULL,'13195b09fa74b50051e8fe5ba4024c02.jpg',NULL),(148,'??i???n tho???i th??ng minh itel A26 - gi?? r??? | 2 Sim 2 S??ng 4G LTE | M??n h??nh IPS 5.7 HD+ | RAM 2GB + ROM 32 GB (H??? tr??? th??? nh??? 32 GB) | M??? kho?? b???ng G????ng M???t | Ch??nh H??ng b???o h??nh 12 th??ng| 1 ?????i 1 trong 30 ng??y',21,2,1199000,1000,0,NULL,'6139c593b35e21be17feb5869d173f6a.jpg',NULL),(149,'??i???n tho???i Samsung Galaxy A13 (4GB/128GB) - H??ng ch??nh h??ng',16,2,3790000,1000,0,NULL,'3aaaee95221be40d932ed082043550bb.jpg',NULL),(150,'??i???n tho???i Samsung Galaxy A04s (4GB/64GB) - H??ng ch??nh h??ng',16,2,3390000,1000,0,NULL,'72bb9f75d23ec25c66ae61a3ea280444.png',NULL),(151,'??i???n Tho???i Samsung A53 5G 8GB/128GB - H??ng Ch??nh H??ng',16,2,7449000,1000,0,NULL,'5cca0a22daf3d357658c2e23c4154444.jpg',NULL),(152,'??i???n tho???i Xiaomi Redmi Note 11 (4GB/64GB) - H??ng ch??nh h??ng',18,2,3949000,1000,0,NULL,'da92e43522d1b62b3042aae66e859e7f.jpg',NULL),(153,'??i???n tho???i Gaming Tecno POVA 3 (6GB)/128GB - Helio G88 | 7000 mAh | S???c nhanh 33W - H??ng Ch??nh H??ng',19,3,3990000,1000,0,NULL,'6d82d82d2f2e89a4193538374f0b8657.jpg',NULL),(154,'??i???n Tho???i Xiaomi Redmi Note 10S (8GB-128GB) - H??ng Ch??nh H??ng',18,2,4650000,1000,0,NULL,'3a150df6e2a671bf41ccfff032294b74.jpg',NULL),(155,'??i???n tho???i Samsung Galaxy A32 (6GB/128GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,4810000,1000,0,NULL,'d06048feb13a8ff14655840cd073eb36.jpg',NULL),(156,'??i???n tho???i Samsung Galaxy A53 5G (8GB/128GB) - H??ng ch??nh h??ng - ???? K??CH HO???T B???O H??NH ??I???N T???',16,2,7415000,1000,0,NULL,'00d0bcb036d01f4d916fc4ff5e0e2f8e.jpg',NULL),(158,'??i???n Tho???i OPPO RENO8 Z 5G (8GB/256GB) - H??ng Ch??nh H??ng',17,2,10490000,1000,0,NULL,'59cb74d5d368574b54fd2b4d7bb63501.jpg',NULL),(159,'??i???n Tho???i Samsung Galaxy S20 FE 256GB | 8GB - H??ng Ch??nh H??ng',16,2,9950000,1000,0,NULL,'7ec6ad5943179c4b2ad5ae8b79798599.jpeg',NULL),(160,'??i???n Tho???i Oppo Reno 7Z 5G (8GB/128G) - H??ng Ch??nh H??ng',17,2,6790000,1000,0,NULL,'66a32798ccdd655549299d9afa319983.jpg',NULL),(161,'??i???n Tho???i Samsung Galaxy A33 5G (6GB/128GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,5969000,1000,0,NULL,'e216e38d577861aa487763c4d720e65f.jpg',NULL),(162,'??i???n Tho???i Xiaomi Redmi 10 4GB/128GB - H??ng Ch??nh H??ng',18,2,3523000,1000,0,NULL,'0085b144d5d756ff01b01a53a01da19a.jpg',NULL),(163,'??i???n tho???i Nokia G11 Plus - H??ng Ch??nh H??ng',20,2,3190000,1000,0,NULL,'b9997e515eca0d6ed7b85eb3c9d22d92.png',NULL),(164,'??i???n Tho???i Samsung Galaxy A03s (4GB/64GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,2750000,1000,0,NULL,'237623690b9e67bd8378974c025004b9.jpg',NULL),(165,'??i???n tho???i Nokia 5710',20,2,1690000,1000,0,NULL,'d71aef9dc2e81cef02bf2c6315d0fbc4.png',NULL),(166,'??i???n Tho???i OPPO RENO8 Pro (12GB/256GB) - H??ng Ch??nh H??ng (Pre Order',17,2,16990000,1000,0,NULL,'de511ea92f293ce5a42d475b9834a859.jpg',NULL),(167,'??i???n Tho???i Oppo Reno 7 4G (8GB/128G) - H??ng Ch??nh H??ng',17,2,5850000,1000,0,NULL,'48b7d8714730c506813e35c74e3a2616.jpg',NULL),(168,'??i???n tho???i Gaming Tecno POVA 4 PRO 8GB/256GB - MTK G99| 6000 mAh | S???c nhanh 45W - H??ng Ch??nh H??ng',19,3,5490000,1000,0,NULL,'a3a5fcf7b719d4f1848c53b0091a4570.png',NULL),(169,'??i???n Tho???i Nokia C20 2GB/16GB - H??ng Ch??nh H??ng',20,2,1635000,1000,0,NULL,'1b77d5d22fa3a0b8d1dae075bfa1e749.jpg',NULL),(170,'??i???n tho???i XIAOMI POCO X4 GT 8+128GB/8+256GB | MediaTek Dimensity 8100 | S???c nhanh 67W - H??ng ch??nh h??ng',18,3,8490000,1000,0,NULL,'19ae8bc1b17d9a6f6357d92e7f2ee93d.jpg',NULL),(171,'??i???n tho???i Xiaomi Redmi Note 10S (8GB/128GB) - H??ng ch??nh h??ng',18,2,4690000,1000,0,NULL,'a9a8ff057070d9384a22fc2bc11d778e.jpg',NULL),(172,'??i???n tho???i Samsung Galaxy A53 5G (8GB/128GB) - H??ng ch??nh h??ng',16,2,7750000,1000,0,NULL,'af10e7a4e81acc2112d0fbe7e4e094f9.png',NULL),(173,'??i???n tho???i Xiaomi Redmi Note 11S (8GB/128GB) - H??ng ch??nh h??ng',18,2,5732000,1000,0,NULL,'69e19e5f6f1798cb4ea13e940c04e1bf.jpg',NULL),(174,'??i???n tho???i Samsung Galaxy A23 (4GB/128GB) - H??ng ch??nh h??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,4550000,1000,0,NULL,'e214f16e4391c0620ce5c37fc53ee685.jpg',NULL),(175,'??i???n tho???i Xiaomi Redmi 10A (2GB/32GB) - H??ng ch??nh h??ng',18,2,2289000,1000,0,NULL,'850b5bc473bf058c23bc18fc48c6c8ae.jpg',NULL),(176,'??i???n Tho???i Nokia C20 2GB/32GB - H??ng Ch??nh H??ng',20,2,1750000,1000,0,NULL,'c4186b8f275dde216e8fe3c6c9dcde00.jpg',NULL),(177,'??i???n Tho???i Oppo A17 (4GB/64GB) - H??ng Ch??nh H??ng',17,2,3630000,1000,0,NULL,'f61ba38250f4004913ec850323eaad6c.jpg',NULL),(178,'??i???n Tho???i Samsung A03 3GB/32GB - H??ng Ch??nh H??ng',16,2,2279000,1000,0,NULL,'32613cf95f268fee2115224546d9ee95.jpg',NULL),(181,'??i???n tho???i Samsung Galaxy A23 (4GB/128GB) - H??ng ch??nh h??ng',16,2,4990000,1000,0,NULL,'a920be57f165160addecb72f24acd799.jpg',NULL),(182,'??i???n tho???i Vivo T1X (8GB/128GB) - H??ng Ch??nh H??ng',22,2,4490000,1000,0,NULL,'fa830b33cfce384909bb6b4d284b3c81.jpg',NULL),(183,'??i???n Tho???i Samsung A03 Core 2GB/32GB - H??ng Ch??nh H??ng',16,2,1939000,1000,0,NULL,'621d0660dbffdb8450b18f37772b660e.jpg',NULL),(184,'??i???n tho???i Gaming Tecno POVA 4 PRO 8GB/128GB - Media Tek G99 | 6000 mAh | S???c nhanh 45W - B???o h??nh 13 Th??ng - H??ng Ch??nh H??ng',19,3,4690000,1000,0,NULL,'7ef9e4c9c2733414b87e42da87c34d30.png',NULL),(185,'??i???n tho???i Realme Narzo 50i Prime (4GB/64GB) - H??ng Ch??nh H??ng',23,2,2299000,1000,0,NULL,'9b2363dd18430d5179e19d35799b1dae.jpg',NULL),(186,'??i???n Tho???i Samsung A13 4GB/128GB - H??ng Ch??nh H??ng',16,2,3429000,1000,0,NULL,'6198cbf5a236ea4a1e932626100b22c6.jpg',NULL),(187,'??i???n tho???i Nokia C31 - H??ng Ch??nh H??ng',20,2,2290000,1000,0,NULL,'38c79f96e2a9a7a33d9bd09681cad42b.jpg',NULL),(188,'??i???n tho???i Xiaomi Redmi 10C (4GB/128GB) - H??ng ch??nh h??ng',18,2,3090000,1000,0,NULL,'4da22f2a28a10cdc4f10d41fefe8c5e2.jpg',NULL),(189,'??i???n tho???i Samsung Galaxy A33 5G (6GB/128GB) - H??ng ch??nh h??ng',16,2,5929000,1000,0,NULL,'511dc8f6982124028cc8122da6cd7494.jpg',NULL),(190,'??i???n tho???i Samsung Galaxy S21 FE 5G (8GB/128GB) - H??ng ch??nh h??ng',16,2,10490000,1000,0,NULL,'34f521ead719f4f881a226ebfa2e2bc7.jpg',NULL),(191,'??i???n Tho???i Oppo Reno 5G (8GB/128G) - H??ng Ch??nh H??ng',17,2,5790000,1000,0,NULL,'4fabafdb5e19e27317023dce57b87c00.jpg',NULL),(192,'??i???n Tho???i Smartphone KXD EL D68 3GB/32GB - H??ng ch??nh h??ng',21,2,1299000,1000,0,NULL,'144ab2b0c547c54f61a76f908fdf95d8.jpg',NULL),(194,'??i???n tho???i POCO M5 4GB+64GB/6GB+128GB | Pin 5000mAh | MediaTek Helio G99 | S???c nhanh 18W - H??ng ch??nh h??ng',18,3,3990000,1000,0,NULL,'3c2a4d1e06b7e135850ece8ef355e0b8.jpg',NULL),(195,'??i???n tho???i Samsung Galaxy S22 Ultra 5G (12GB/256GB) - H??ng Ch??nh H??ng',16,2,24990000,1000,0,NULL,'b8a014d33d5b1d28b73f7d7dfd3330ea.png',NULL),(196,'Gi?? ????? ??i???n Tho???i Tr??n ?? t?? - K???p ??i???n Tho???i Xem B???n ????? Cho Xe H??i Cavara CV14',24,3,159000,1000,0,NULL,'517edd490c4ae7dba64f2c94fb0086db.jpg',NULL),(198,'??i???n tho???i OPPO Reno8 4G (8GB/256GB) - H??ng ch??nh h??ng',17,2,8090000,1000,0,NULL,'958a664b81f0247bf3cc467211de9e87.jpg',NULL),(199,'Gi?? ????? ????? B??n ??i???n Tho???i Di ?????ng, M??y T??nh B???ng H???p Kim Nh??m Cao C???p - 02 V??? Tr?? ??i???u Ch???nh G??c Nh??n Helios',25,3,149000,1000,0,NULL,'9f5289127506eb2eb49bf41db40e8a86.jpg',NULL),(200,'??i???n Tho???i Samsung Galaxy A73 5G (8GB/128GB) - H??ng ch??nh h??ng - ???? K??CH HO???T B???O H??NH ??I???N T???',16,2,8490000,1000,0,NULL,'70f3108f9d7fce458aed9d6f74b25fa8.png',NULL),(201,'??i???n tho???i Samsung Galaxy A13 (4GB/64GB) - H??ng ch??nh h??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,3290000,1000,0,NULL,'263c611491a05d0b373266f936b36fa6.jpg',NULL),(203,'N???p ti???n ??i???n tho???i Vinaphone 10K',26,3,10000,1000,0,NULL,'be9fb981fde98c7e9c9cf49d9a0d6bae.png',NULL),(204,'??i???n Tho???i Oppo A57 (4GB/64GB) - H??ng Ch??nh H??ng',17,2,3650000,1000,0,NULL,'e96e2035f72c97c218ba9917f4e6d5ca.jpg',NULL),(205,'??i???n Tho???i Oppo Reno 6 5G (8GB/128G) - H??ng Ch??nh H??ng',17,2,6850000,1000,0,NULL,'94b9bfb35bc3975f81bd10f00f60c5e1.jpg',NULL),(206,'??i???n tho???i Gaming Tecno POVA 3 (6+5GB)/128GB-Helio G88|7000 mAh|S???c nhanh 33W-H??ng Ch??nh h??ng',19,3,3890000,1000,0,NULL,'206f758c16c86068f3e9b28b2cea219f.png',NULL),(207,'??i???n tho???i Samsung Galaxy A03 (3GB/32GB) - H??ng ch??nh h??ng',16,2,2309000,1000,0,NULL,'b22733e66028d1f13fc7b098efecb4cb.jpg',NULL),(208,'??i???n tho???i Nokia C21 Plus (2GB/32GB) - H??ng ch??nh h??ng',20,2,1821800,1000,0,NULL,'2cd23ff842c4c5acf7cee7f99f796cac.jpg',NULL),(209,'??i???n tho???i Tecno Pova Neo 4G/64GB - Pin 6000 mah - M??n 6.82 - H??ng ch??nh h??ng',19,2,2549000,1000,0,NULL,'ba5c297a51cf99c04507b375f22027e2.jpg',NULL),(210,'??i???n tho???i Samsung Galaxy Z Flip 4 (8GB/256GB) - H??ng ch??nh h??ng',16,2,18990000,1000,0,NULL,'f49e24b6aa8974c0025bb5026342ed7b.png',NULL),(212,'??i???n tho???i Nokia 110 4G - H??ng ch??nh h??ng',20,2,779000,1000,0,NULL,'8707396c60c5d6e2e6aabbe8a21f2472.png',NULL),(213,'Gi?? ????? ????? B??n ??i???n Tho???i Di ?????ng, M??y T??nh B???ng, Ipad Mini. Ch???t Li???u H???p Kim Nh??m Cao C???p. H??ng Ch??nh H??ng Tamayoko',27,3,129000,1000,0,NULL,'9753dfb8f6547015952089e2c8da5713.png',NULL),(214,'N???p ti???n ??i???n tho???i Vinaphone 50k',26,3,48500,1000,0,NULL,'d59654215e6a81f7e8e824fe6c59e088.png',NULL),(215,'??i???n tho???i Samsung Galaxy A03s (4GB/64GB) - H??ng ch??nh h??ng',16,2,2829000,1000,0,NULL,'b04ed996861098bc7e14b01530a05130.jpg',NULL),(216,'Gi?? ????? ??i???n tho???i ????? b??n cho iPad, M??y t??nh b???ng Ch???t li???u H???p Kim Nh??m Cao c???p C?? th??? G???p g???n Si??u di ?????ng M?? C184 - H??ng Ch??nh H??ng',28,2,215000,1000,0,NULL,'dda90816bb5f741ee417f8a01470865f.jpg',NULL),(217,'C??? S???c ??i???n Tho???i 30W 1 C???ng USB V?? 1 Type-C PD 18W RAVPower RP-PC132 - H??ng Ch??nh H??ng',29,3,399000,1000,0,NULL,'e62fadd68cb9ecfb843bba9cfd800bf0.png',NULL),(218,'Micro Bluetooth kh??ng d??y Karaoke h??t ??m si??u nh??? cao c???p PKCB cho ??i???n tho???i  - H??ng Ch??nh H??ng',30,3,1295000,1000,0,NULL,'618d37442ee4c8205a449e9edc208346.png',NULL),(219,'??i???n Tho???i Samsung Galaxy Z Flip 4 (8GB/128GB) - H??ng Ch??nh H??ng - ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,15340000,1000,0,NULL,'b8f989da67cb051c8731137c89cff084.jpg',NULL),(220,'Hub Chuy???n ?????i USB TypeC Ra C???ng M???ng Lan RJ45 1000Mbps/Gigabit Ethernet SeaSy SS88, C???ng Chuy???n ?????i TypeC To C???ng Lan, T??ch H???p 3 C???ng USB 3.0, T???c ????? Truy???n 1000Mbps, D??ng Cho Macbook/Laptop/PC/??i???n Tho???i ??? H??ng Ch??nh H??ng',31,3,246500,1000,0,NULL,'b23e55d0bac657cce681cac50105ed58.jpg',NULL),(221,'Gi?? ????? ????? B??n ??i???n Tho???i Di ?????ng, M??y T??nh B???ng, Ipad H???p Kim Nh??m Cao C???p Hai Tr???c Xoay 180 ????? Tamayoko',27,3,369000,1000,0,NULL,'bba5a17a5be8d77aa8ba0346c4ced3d9.png',NULL),(222,'Hub chuy???n ?????i USB TypeC 6 trong 1 SEASY SS26, C???ng chuy???n ?????i HUB USB TypeC to HDMI, 1 c???ng HDMI 4k UHD , 3 c???ng USB 3.0, 2 khe ?????c th??? nh??? SD v?? TF, K???t n???i nhi???u thi???t b??? v???i t???c ????? cao, D??ng cho ??i???n tho???i/Laptop/PC/Macbook ??? H??ng ch??nh h??ng',31,3,305400,1000,0,NULL,'6be115ad7a2c4356a4f8cb4552399514.jpg',NULL),(223,'B??n ph??m kh??ng d??y Bluetooth Logitech K380 - K???t n???i 3 thi???t b???, gi???m ???n, g???n nh??? d??? mang ??i, ph?? h???p Mac/ PC/ Laptop/ ??i???n tho???i - H??ng ch??nh h??ng - M??u H???ng',32,3,599000,1000,0,NULL,'3619948019e0e092792a99652cc3ae5a.png',NULL),(224,'Gi?? ????? ??i???n Tho???i, M??y T??nh B???ng H???p Kim Nh??m C?? Th??? ??i???u Ch???nh Chi???u Cao Helios',25,3,149000,1000,0,NULL,'530a460ace5f062d2b0460f8b6629484.jpg',NULL),(225,'G???y Ch???p H??nh T??? S?????ng 3 Ch??n Bluetooth Hoco K07 - H??ng Ch??nh H??ng + T???ng K??m 1 Gh??? ????? ??i???n Tho???i ??a N??ng T2',33,3,88000,1000,0,NULL,'ecd1542193e08b33fe5f7b538f67bdb9.jpg',NULL),(226,'Tai Nghe ??i???n Tho???i PKCB323 Tho???i C???ng 3.5mm - H??ng Ch??nh H??ng',30,3,100000,1000,0,NULL,'fdddfe8cc9bfadbe556f0c1b45d0b18f.png',NULL),(227,'Gi?? ????? ????? B??n ??i???n Tho???i Di ?????ng, M??y T??nh B???ng, Ipad H???p Kim Nh??m Helios',25,3,79000,1000,0,NULL,'32eb1ace2a707f8a3cd82cbbb8c36bc4.png',NULL),(228,'N???p ti???n ??i???n tho???i Mobifone 30K',34,3,30000,1000,0,NULL,'356df52f46529e5cfdc4503294972889.png',NULL),(229,'Qu???t T???n Nhi???t ??i???n Tho???i Ch??i Game MEMO DL05 C?? S?? L???nh D??nh Cho Game Th??? - H??ng Nh???p Kh???u',35,3,256000,1000,0,NULL,'7d4d29c4558b940f07bb3650141b9f10.jpg',NULL),(230,'Hub Chuy???n ?????i USB TypeC Ra C???ng HDMI / VGA / LAN Rj45 / USB / PD/SD/TF SeaSy, C???ng Chuy???n ?????i TypeC Ra HDMI 4K, C???ng VGA 1080 P, C???ng Lan Rj45, C???ng USB 3.0, C???ng S???c PD 100W, C???ng SD/TF, D??ng Cho Macbook/Ipad/Surface/Laptop/??i???n Tho???i ??? H??ng Ch??nh H??ng',31,3,276200,1000,0,NULL,'dc30208aa7126e8717a7482abaffd544.jpg',NULL),(231,'Gi?? ????? k???p ??i???n tho???i cho xe m??y/ xe m?? t?? Selfiecom S-500 - Si??u c???ng, ch???ng tr???m, ch???ng rung l???c, th??o l???p d??? d??ng - H??ng ch??nh h??ng',36,3,125000,1000,0,NULL,'dc7cb83bc7d282e9ffd98c4872d6cdce.png',NULL),(232,'Gi?? ????? ??i???n tho???i k???p ??i???n tho???i cao c???p 126  - H??ng Ch??nh H??ng',30,2,89000,1000,0,NULL,'8d32c0940df86be0cadafe6813572690.jpg',NULL),(233,'Micro Bluetooth kh??ng d??y Karaoke h??t ??m si??u nh??? cao c???p PKCB cho ??i???n tho???i - H??ng Ch??nh H??ng',30,3,650000,1000,0,NULL,'0ccd0f3224b18d84fa3c46547db53f8b.png',NULL),(234,'Pin s???c d??? ph??ng T??ch h???p s???c kh??ng d??y HXSJ 10000mAh, H??? tr??? s???c nhanh c???ng usb 2.1A K??m s???n 4 ?????u s???c cho c??c d??ng ??i???n tho???i - H??ng ch??nh h??ng',37,3,316900,1000,0,NULL,'75db94c3a82582433033237b5e017537.jpg',NULL),(235,'Qu???t t???n nhi???t cho ??i???n tho???i Remax X3-1 ch???y 2 Pin 500mAh - S?? l???nh si??u m??t - C???c ph???m cho Game th??? - H??ng Ch??nh H??ng',38,3,480000,1000,0,NULL,'7cf6d8b54ba8f56b3ea56644e6659523.jpg',NULL),(238,'M??y t??nh b???ng Samsung Galaxy Tab S7 FE (4GB/64GB) - H??ng ch??nh h??ng -  ???? k??ch ho???t b???o h??nh ??i???n t???',16,2,9989000,1000,0,NULL,'778415bf9de87df4e62031220ef9b400.jpg',NULL),(241,'Apple iPad 10.2-inch (9th Gen) Wi-Fi 2021',10,2,7250000,1000,0,NULL,'99190012171edee77674793a61c5a7e8.png',NULL),(242,'Apple iPhone 14 Pro Max',10,2,28490000,1000,0,NULL,'e6431984901119a1f8166cc4e579da93.png',NULL),(243,'Apple iPhone 11',10,2,10990000,1000,0,NULL,'84a16c41ac07ce50d754e44a16ecbd1c.jpg',NULL),(244,'Apple iPhone 14 Pro',10,2,26490000,1000,0,NULL,'8995e74fd95c47c4ab9ef244a5559176.png',NULL),(253,'Apple iPad Pro 11-inch M2 Wi-Fi, 2022',10,2,20490000,1000,0,NULL,'44fe328c9a95e8bbc9cb84caaf3a25cb.png',NULL),(256,'Apple iPhone 13',10,2,18140000,1000,0,NULL,'66059a54a3a139d45841d412379b1fe4.jpg',NULL),(261,'Apple iPad Air (5th Gen) Wi-Fi 2022',10,2,14990000,1000,0,NULL,'c0703cece31553f6539ff4bc02f34a4c.jpg',NULL),(263,'Apple iPhone 14 Plus',10,2,22990000,1000,0,NULL,'20cdb4e6168b995e8b7a1f031559ea18.png',NULL),(265,'Apple iPhone 14',10,2,20990000,1000,0,NULL,'0466fed7eaa6095baecd90f06419bc09.png',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'customer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `UQ_supplier_name` (`supplier_name`),
  UNIQUE KEY `UQ_supplier_email` (`email`),
  UNIQUE KEY `UQ_supplier_phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'MSI','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(2,'Acer','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(3,'Asus','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(4,'HP','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(5,'Lenovo','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(6,'MSmart','Th??? ???? H?? N???i, Vi???t Nam',NULL,NULL),(7,'Gigabyte','Th??nh ph??? H??? Ch?? Minh, Vi???t Nam',NULL,NULL),(8,'Dell','Th??nh ph??? H??? Ch?? Minh, Vi???t Nam',NULL,NULL),(9,'Colorful','Th??? ???? H?? N???i, Vi???t Nam',NULL,NULL),(10,'Apple','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(11,'Hyper','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(12,'HyperDrive','Th??nh ph??? H??? Ch?? Minh, Vi???t Nam',NULL,NULL),(13,'Innostyle','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(14,'UGREEN','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(15,'WIWU','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(16,'Samsung','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(17,'OPPO','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(18,'Xiaomi','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(19,'Tecno','Th??nh ph??? H??? Ch?? Minh, Vi???t Nam',NULL,NULL),(20,'Nokia','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(21,'Itel','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(22,'Vivo','Th??nh ph??? H??? Ch?? Minh, Vi???t Nam',NULL,NULL),(23,'Realme','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(24,'CAVARA','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(25,'Helios','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(26,'Vinaphone','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(27,'Tamayoko','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL),(28,'Yesido Just For You','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(29,'RAVPower','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(30,'PKCB','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(31,'SeaSy','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(32,'Logitech','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(33,'Hoco','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(34,'Mobifone','Th??nh Ph??? Nha Trang, Kh??nh H??a, Vi???t Nam',NULL,NULL),(35,'Memo','Th??nh ph??? Tuy H??a, Ph?? Y??n, Vi???t Nam',NULL,NULL),(36,'Selfiecom','Th??? ???? H?? N???i, Vi???t Nam',NULL,NULL),(37,'HXSJ','Th??? ???? H?? N???i, Vi???t Nam',NULL,NULL),(38,'Remax','Th??nh ph??? ???? ?????ng, Vi???t Nam',NULL,NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `sex` char(1) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` char(12) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'user.png',
  `hashed_password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UQ_username` (`username`),
  UNIQUE KEY `UQ_email` (`email`),
  UNIQUE KEY `UQ_phone_number` (`phone_number`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `User_sex` CHECK (((`sex` = _utf8mb4'M') or (`sex` = _utf8mb4'F')))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'hoaian_admin','Ho??i ??n','L??','2003-02-22','M','H??a Tr???, Ph?? H??a, Ph?? Y??n',NULL,NULL,'user.png','$2b$10$V11jxXDnQf2Xryyu2jP.6./6v0JRMA5DOCmTTuYd6FgsxJ1R6kxzm');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucher_id` varchar(60) NOT NULL,
  `voucher_name` varchar(255) NOT NULL,
  `voucher_discount` double NOT NULL,
  `expiry_date` date NOT NULL,
  `description` text,
  PRIMARY KEY (`voucher_id`),
  CONSTRAINT `voucher_limit` CHECK (((`voucher_discount` > 0) and (`voucher_discount` < 1)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14 10:33:48