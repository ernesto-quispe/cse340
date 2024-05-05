INSERT INTO public.account(
	account_firstname, account_lastname, account_email, account_password)
	VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


UPDATE public.account
	SET  account_type= 'Admin'
	WHERE account_firstname = 'Tony' AND account_lastname = 'Stark' AND account_email = 'tony@starkent.com';


DELETE FROM public.account WHERE account_firstname = 'Tony' AND account_lastname = 'Stark' AND account_email = 'tony@starkent.com';


UPDATE public.inventory
	SET  inv_description= REPLACE(inv_description, 'small interiors', 'a huge interior')
	WHERE inv_id =  10;

SELECT a.inv_make, a.inv_model, b.classification_name  
	FROM public.inventory a 
	 INNER JOIN 
	     public.classification b ON (a.classification_id = b.classification_id)
	WHERE  b.classification_id = 2;

UPDATE public.inventory SET inv_image = REPLACE(inv_image, '/images' ,'/images/vehicles'), 
	inv_thumbnail = REPLACE(inv_thumbnail, '/images' ,'/images/vehicles');