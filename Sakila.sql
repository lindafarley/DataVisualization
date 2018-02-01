#Display the first and last names of all actors from the table actor.
SELECT first_name, last_name
FROM sakila.actor;

#1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
SELECT Concat(first_name, ' ', last_name) AS 'Actor Name'
FROM sakila.actor;

#2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
SELECT actor_id, first_name, last_name
FROM sakila.actor
WHERE first_name = 'Joe';

# 2b. Find all actors whose last name contain the letters GEN:
SELECT first_name, last_name
FROM sakila.actor
WHERE last_name like '%GEN%';

# 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
SELECT last_name, first_name
FROM sakila.actor
WHERE last_name like '%LI%';

# 2d. Using IN, display the country_id and country columns of the following countries: 
# Afghanistan, Bangladesh, and China:
SELECT country_id, country
FROM sakila.country
WHERE country
IN ('Afghanistan', 'Bangladesh', 'China');

# 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
ALTER TABLE sakila.actor
ADD COLUMN middle_name VARCHAR(30)
AFTER first_name;

# 3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs.
ALTER TABLE sakila.actor MODIFY COLUMN middle_name blob(30);

# 3c. Now delete the middle_name column.
ALTER TABLE sakila.actor DROP middle_name;

# 4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name, count(last_name)
FROM sakila.actor
GROUP BY last_name;

# 4b. List last names of actors and the number of actors who have that last name, 
# but only for names that are shared by at least two actors
SELECT last_name, count(last_name)
FROM sakila.actor
GROUP BY last_name
HAVING count(last_name) > 1;

# 4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
UPDATE sakila.actor 
SET first_name ='Harpo' 
WHERE first_name ='Groucho'
and last_name = 'Williams';

SELECT first_name, actor_id
FROM sakila.actor
WHERE first_name = 'Harpo';

# 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. 
# It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, 
# change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error. 
# BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO MUCHO GROUCHO, HOWEVER! (Hint: update the record using a unique identifier.)
UPDATE sakila.actor
SET first_name = CASE WHEN first_name = 'Harpo' THEN 'Groucho'
				      WHEN first_name <> 'Harpo' THEN 'Mucho Groucho' 
				 END
WHERE actor_id = 172;

# 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
SHOW CREATE TABLE address;

# 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. 
# Use the tables staff and address:
SELECT st.first_name, st.last_name, ad.address
FROM sakila.staff as st
JOIN sakila.address as ad
ON st.address_id = ad.address_id;

# 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. 
# Use tables staff and payment.
SELECT st.first_name, st.last_name, sum(pa.amount) 
FROM sakila.staff as st
JOIN sakila.payment as pa
ON pa.staff_id = st.staff_id
WHERE month(payment_date) = 8
AND year(payment_date) = 2005;

# 6c. List each film and the number of actors who are listed for that film. 
# Use tables film_actor and film. Use inner join.
SELECT fi.title, count(fa.actor_id)
FROM sakila.film as fi
JOIN sakila.film_actor as fa
ON fi.film_id = fa.film_id
GROUP BY fi.title;

# 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT fi.title, count(fi.title)
FROM sakila.film as fi
JOIN sakila.inventory as inv
ON fi.film_id = inv.film_id
WHERE title = 'Hunchback Impossible';

# 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer.
# List the customers alphabetically by last name:
SELECT cu.first_name, cu.last_name, sum(pa.amount)
FROM sakila.payment as pa
JOIN sakila.customer as cu
ON pa.customer_id = cu.customer_id
GROUP BY cu.last_name;

#![Total amount paid](Images/total_payment.png)
# 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
# As an unintended consequence, films starting with the letters K and Q have also soared in popularity. 
# Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
SELECT fi.title
FROM sakila.film as fi
WHERE fi.title like 'Q%' 
OR fi.title like 'K%'; 

# 7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT fi.title, ac.first_name, ac.last_name
FROM sakila.actor as ac
JOIN sakila.film_actor as fa
ON ac.actor_id = fa.actor_id
JOIN sakila.film as fi
ON fa.film_id = fi.film_id
WHERE fi.title = 'Alone Trip';

# 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email
#addresses of all Canadian customers. Use joins to retrieve this information.
SELECT cu.first_name, cu.last_name, cu.email, co.country
FROM sakila.customer as cu
JOIN sakila.address as ad
ON cu.address_id = ad.address_id
JOIN sakila.city as ci
ON ad.city_id = ci.city_id
JOIN sakila.country as co
ON ci.country_id = co.country_id
WHERE co.country = 'Canada';

# 7d. Sales have been lagging among young families, and you wish to target all family movies for
# a promotion. Identify all movies categorized as famiy films.
SELECT ca.name as 'Category', fi.title as 'Film Title'
FROM sakila.category as ca
JOIN sakila.film_category as fc
ON ca.category_id = fc.category_id
JOIN sakila.film as fi
ON fc.film_id = fi.film_id
WHERE ca.name = 'Family';

# 7e. Display the most frequently rented movies in descending order.
SELECT fi.title, count(re.inventory_id)
FROM sakila.film as fi
JOIN sakila.inventory as inv
ON fi.film_id = inv.film_id
JOIN sakila.rental as re
ON inv.inventory_id = re.inventory_id
GROUP BY fi.title;

# 7f. Write a query to display how much business, in dollars, each store brought in.
SELECT cu.store_id, sum(pa.amount)
FROM sakila.payment as pa
JOIN sakila.customer as cu
ON pa.customer_id = cu.customer_id
GROUP BY cu.store_id;

# 7g. Write a query to display for each store its store ID, city, and country.
SELECT st.store_id, ci.city, co.country
FROM sakila.store as st
JOIN sakila.address as ad
ON st.address_id = ad.address_id
JOIN sakila.city as ci
ON ad.city_id = ci.city_id
JOIN sakila.country as co
ON ci.country_id = co.country_id
GROUP BY store_id;

# 7h. List the top five genres in gross revenue in descending order. 
# (Hint: you may need to use the following tables: 
# category, film_category, inventory, payment, and rental.)
SELECT ca.name as 'Category', sum(pa.amount)
FROM sakila.category as ca
JOIN sakila.film_category as fc
ON ca.category_id = fc.category_id
JOIN sakila.inventory as inv
ON fc.film_id = inv.film_id
JOIN sakila.rental as re
ON inv.inventory_id = re.inventory_id
JOIN sakila.payment as pa
ON re.rental_id = pa.rental_id
GROUP BY ca.name
ORDER BY sum(pa.amount) DESC LIMIT 5;

# 8a. In your new role as an executive, you would like to have an easy way of viewing the 
# Top five genres by gross revenue. Use the solution from the problem above to create a view. 
#If you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW Top_Genres AS
SELECT ca.name as 'Category', sum(pa.amount)
FROM sakila.category as ca
JOIN sakila.film_category as fc
ON ca.category_id = fc.category_id
JOIN sakila.inventory as inv
ON fc.film_id = inv.film_id
JOIN sakila.rental as re
ON inv.inventory_id = re.inventory_id
JOIN sakila.payment as pa
ON re.rental_id = pa.rental_id
GROUP BY ca.name
ORDER BY sum(pa.amount) DESC LIMIT 5;

# 8b. How would you display the view that you created in 8a?
SELECT * FROM Top_Genres;

# 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
DROP VIEW Top_Genres;