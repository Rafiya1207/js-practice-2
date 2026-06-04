{actor: actor_id, first_name, last_name, last_update}
{address:address_id, address, address2, district, city_id, postal_code, phone, last_update}
{category:category_id, name, last_update}
{city:city_id, city, country_id, last_update}
{country:country_id, country, last_update}
{customer:customer_id, store_id, first_name, last_name, email, address_id, activebool, create_date, last_update, active}
{film:film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, last_update, special_features, fulltext}
{film_actor:actor_id, film_id, last_update}
{film_category:film_id, category_id, last_update}
{inventory:inventory_id, film_id, store_id, last_update}
{language:language_id, name, last_update}
{payment:payment_id, customer_id, staff_id, rental_id, amount, payment_date}
{rental:rental_id, rental_date, inventory_id, customer_id, return_date, staff_id, last_update}
{staff:staff_id, first_name, last_name, address_id, email, store_id, active, username, password, last_update, picture}
{store:store_id, manager_staff_id, address_id, last_update}

select
- distinct
- where
- logical operators, comparision operators
- between
- like, ilike
- in
- count
- order by
- limit
- aggregate functions
- group by
- having
- JOINS
  - AS
  - Inner join
  - full outer join
  - left outer join
  - right join
  - Union
  - TIMEZONE
  - NOW
  - TIMEOFDAY
  - CURRENT_TIME
  - CURRENT_DATE
  - SHOW
  - EXTRACT
  - AGE
  - TO_CHAR
  - COALESCE
  - CAST
  - mathemactical functions
  - string functions
  - sub query
  - self join
  - data types
  - primary keys and foreign keys
  - constraints
  - CREATE TABLE
  - INSERT INTO
  - UPDATE
  - DELETE
  - ALTER TABLE
    - COLUMN
    - DROP
    - SET
  - DROP
  - CHECK constraint
  - CASE ( WHEN .. THEN ..)
  - NULLIF
  - VIEWS
  - IMPORT AND EXPORT

these are the topics i've learnt recently from an udemy course BECOME an expert at SQL! 
i want to test my leanings and understandings about the concepts.
give me businness scenarios to practice. give each eaxercise at a time. After submission of query give feedback, by highlighting the areas of mistake

i don't have any database. so start from there
DON'T PROVIDE
- exercises in sequence of the topics listed.
- seperate the exercises concept wise.
- hints
- SOLUTIONS
