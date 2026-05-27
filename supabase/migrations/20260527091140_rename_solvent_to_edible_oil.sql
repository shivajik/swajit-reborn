-- Rename Solvent Plant category to Edible Oil and update hero slide wording
UPDATE public.categories
SET name = 'Edible Oil'
WHERE slug = 'solvent-plant' OR name ILIKE 'Solvent%';

UPDATE public.hero_slides
SET title = REPLACE(REPLACE(title, 'Palm Oil & Edible Oil', 'Edible Oil'), 'Palm Oil', 'Edible Oil')
WHERE title ILIKE '%Palm Oil%';
