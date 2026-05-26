use food_db;
CREATE TABLE IF NOT EXISTS Items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    UnitPrice FLOAT,
    ImageUrl VARCHAR(255),
    Description LONGTEXT,
    Catagory VARCHAR(255)
);

INSERT INTO Items (id, Description, ImageUrl, name, UnitPrice, Catagory)
SELECT * FROM (
    SELECT 1,'Regular Mexican Shawerma Sandwich Italian bread','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637476197378158985.webp','Regular Mexican Shawerma Sandwich',2.2,'shawerma' UNION ALL
    SELECT 2,'Spicy Mexican Shawerma Sandwich Italian bread','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477972136948930.webp','Spicy Mexican Shawerma Sandwich',2.2,'shawerma' UNION ALL
    SELECT 3,'Taco Shawerma Sandwich succulent chicken, fresh veggies, and tangy sauce','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477975141752445.webp','Taco Shawerma Sandwich',2.15,'shawerma' UNION ALL
    SELECT 4,'French Shawerma With Cheese Sandwich succulent chicken, fresh veggies, and tangy sauce','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477975141752445.webp','French Shawerma With Cheese Sandwich',2.15,'shawerma' UNION ALL
    SELECT 5,'French Shawerma With Cheese small Meal succulent chicken, fresh veggies, and tangy sauce','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477972136948930.webp','French Shawerma With Cheese small Meal',3.25,'shawerma' UNION ALL
    SELECT 6,'French Shawerma With Cheese Double Meal succulent chicken, fresh veggies, and tangy sauce','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637476201626310040.webp','French Shawerma With Cheese Double Meal',4.7,'shawerma' UNION ALL
    SELECT 7,'A meal with a double portion of shawarma.','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477970661103586.webp','Double Shawerma Meal',4.7,'shawerma' UNION ALL
    SELECT 8,'Triple Shawerma Meal thinly sliced chickens, Sliced tomato, Shredded lettuce, Garlic sauce, Pickled and Saj bread','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477968426422296.webp','Triple Shawerma Meal',5.65,'shawerma' UNION ALL
    SELECT 9,'Regular Taco Shawerma Meal','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477975851399147.webp','Regular Taco Shawerma Meal',3.35,'shawerma' UNION ALL
    SELECT 10,'Double Taco Shawerma Meal succulent chicken, fresh veggies, and tangy sauce','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/shawerma/blob_637477970141836790.webp','Double Taco Shawerma Meal',4.7,'shawerma' UNION ALL

    SELECT 11,'tomato, mozzarella, basil','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg','Margherita',12,'pizza' UNION ALL
    SELECT 12,'tomato, mozzarella, ham, mushrooms, artichoke','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-2.jpg','Capricciosa',14,'pizza' UNION ALL
    SELECT 13,'tomato, mozzarella, prosciutto','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-3.jpg','Romana',15,'pizza' UNION ALL
    SELECT 14,'tomato, mozzarella, prosciutto, arugula','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-4.jpg','Prosciutto e Rucola',16,'pizza' UNION ALL
    SELECT 15,'tomato, mozzarella, spicy salami, chili flakes','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-5.jpg','Diavola',16,'pizza' UNION ALL
    SELECT 16,'tomato, mozzarella, bell peppers, onions, mushrooms','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-6.jpg','Vegetale',13,'pizza' UNION ALL
    SELECT 17,'tomato, mozzarella, fresh tomato, basil','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-7.jpg','Napoli',16,'pizza' UNION ALL
    SELECT 18,'tomato, mozzarella, anchovies, olives, capers','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-8.jpg','Siciliana',16,'pizza' UNION ALL
    SELECT 19,'tomato, mozzarella, pepperoni','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-9.jpg','Pepperoni',14,'pizza' UNION ALL
    SELECT 20,'tomato, mozzarella, pineapple, ham','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-10.jpg','Hawaiian',15,'pizza' UNION ALL
    SELECT 21,'tomato, mozzarella, spinach, mushrooms','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-11.jpg','Spinach and Mushroom',15,'pizza' UNION ALL
    SELECT 22,'tomato, mozzarella, sun-dried tomatoes, olives, artichoke','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-12.jpg','Mediterranean',16,'pizza' UNION ALL
    SELECT 23,'tomato, mozzarella, spinach, feta, olives, pepperoncini','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-13.jpg','Greek',16,'pizza' UNION ALL
    SELECT 24,'tomato, mozzarella, prosciutto, arugula','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-14.jpg','Abruzzese',16,'pizza' UNION ALL
    SELECT 25,'pesto, mozzarella, chicken, sun-dried tomatoes, spinach','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-15.jpg','Pesto Chicken',16,'pizza' UNION ALL
    SELECT 26,'marinara, mozzarella, eggplant, parmesan','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-16.jpg','Eggplant Parmesan',15,'pizza' UNION ALL
    SELECT 27,'marinara, mozzarella, zucchini, eggplant, peppers, onions','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-17.jpg','Roasted Veggie',15,'pizza' UNION ALL
    SELECT 28,'marinara, mozzarella, tofu, mushrooms, bell peppers','https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-18.jpg','Tofu and Mushroom',15,'pizza' UNION ALL

    SELECT 29,'EISBERGSALAT, TOMATE, DILLGURKE, ROTE ZWIEBELN, KETCHUP, MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Menu-Hamburger-1.png','HAMBURGER',4,'burger' UNION ALL
    SELECT 30,'KÄSE, EISBERGSALAT, TOMATE, DILLGURKE, ROTE ZWIEBELN, KETCHUP, MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Menu-Cheese-1.png','CHEESEBURGER',5,'burger' UNION ALL
    SELECT 31,'JALAPEÑOS, CHIPOTLE SAUCE, KÄSE, EISBERGSALAT, TOMATE, DILLGURKE, ROTE ZWIEBELN, MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Chili-Cheeseburger-1.png','CHILI-CHEESEBURGER',5,'burger' UNION ALL
    SELECT 32,'DOPPELT FLEISCH, DOPPELT KÄSE، GEBRATENE ZWIEBELN، SENF، KETCHUP','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Fleischermeister-1.png','FLEISCHERMEISTER',6,'burger' UNION ALL
    SELECT 33,'BACON، GEBRATENE ZWIEBELN، BARBECUE SAUCE، SENF، EISBERGSALAT، TOMATE، DILLGURKE، ROTE ZWIEBELN، MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Meisterburger-1.png','MEISTERBURGER',6,'burger' UNION ALL
    SELECT 34,'DOPPELT FLEISCH، DOPPELT KÄSE، BACON، JALAPEÑOS، BARBECUE SAUCE، EISBERGSALAT، TOMATE، DILLGURKE، ROTE ZWIEBELN، MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Meister-Aller-Klassen-1.png','MEISTER ALLER KLASSEN',8,'burger' UNION ALL
    SELECT 35,'GEGRILLTE CHAMPIGNONS، BACON، KÄSE، EISBERGSALAT، TOMATE، DILLGURKE، ROTE ZWIEBELN، MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Hausmeister-2.png','HAUSMEISTER',7,'burger' UNION ALL
    SELECT 36,'SOJA PATTY، GEGRILLTE CHAMPIGNONS، KÄSE، EISBERGSALAT، TOMATE، DILLGURKE، ROTE ZWIEBELN، MAYO','https://gwzjoptlprrjtsetfqwh.supabase.co/storage/v1/object/public/image/burger/Burgermeister-Waldmeister-1.png','WALDMEISTER (VEGGIE)',4,'burger'
) AS tmp
WHERE (SELECT COUNT(*) FROM Items) = 0;
