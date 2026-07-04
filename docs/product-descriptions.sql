-- =====================================================================
-- Swajit — Product descriptions from official PDF catalogues
-- Run this in the Supabase SQL Editor. Safe to re-run.
--
-- Each UPDATE matches by category slug + product-name ILIKE pattern.
-- Only products explicitly listed in this file will have descriptions;
-- everything else stays untouched (clicking those does nothing, per spec).
-- =====================================================================

BEGIN;

-- Helper CTE approach: get category id inline via subquery.

-- ---------------- CEMENT INDUSTRY ----------------------------------------

UPDATE public.products SET description =
'Many industries use such type of chains to maintain the constant flow of materials like Cement, Coal, Chemical, Powder and small wooden logs for further processing work.

The forged links are made from Carbon Steel / Alloy Steel, duly heat treated, in the range from 100 mm to 260 mm pitch. Pins & Bushes are made from Alloy Steel, duly heat treated.

The flat plates are either welded or bolted as per requirement to maintain the required flow. Available in flat links, Pin, Bush & Roller design along with the Scrapper in single or double strand, as per requirement.

Tensile strength range: 10,000 kgf to 80,000 kgf.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'cement-sector')
  AND (name ILIKE '%drag chain%' OR name ILIKE '%flow conveyor%');

UPDATE public.products SET description =
'Crushed raw materials like Lime Stone and Coal stored in bulk on the ground under shed or silos are moved by Reclaimer Chain.

Chain links are made from Medium Carbon / Alloy Steel. Links are subjected to Blanking and fine boring on precision machines. Link hole size and finishing is controlled to suit adequate interference fit. Further, links are hardened and tempered to avoid linear elongation, then shot peened to improve fatigue strength.

Special Alloy Steel is used for Pins and Bushes with Case Carburized Hardening and Tempering to get maximum wear resistance and core strength. Chains are also manufactured with Out-Board type Rollers. Roller ID and OD are through-hardened and induction hardened for proper case depth and maximum wear life.

Suitable attachments of various shape and size accommodate scrappers for proper scrapping of raw material.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'cement-sector')
  AND name ILIKE '%reclaimer%';

UPDATE public.products SET description =
'Different designs and sizes of Bucket Elevator Chains are used in Cement, Power and Fertilizer Industries to lift material depending on height and load carrying capacity. The chain material is designed to withstand high abrasion and dusty conditions.

Chain links are made from Medium Carbon / Alloy Steel — blanked, fine bored, hardened, tempered and shot peened to improve fatigue strength.

Special Alloy Steel Pins are Volume Hardened & Tempered plus Induction Hardened for armoured case depth and maximum wear resistance. Bushes are Case Carburized for maximum wear resistance and core strength. Rollers are made from Medium Carbon / Alloy Steel with appropriate heat treatment.

For Fertilizer applications, where chains work in highly alkaline conditions, special-grade materials and heat treatment are selected to improve corrosion resistance and chain life.'
WHERE category_id IN (
    SELECT id FROM public.categories WHERE slug IN ('cement-sector','chemical-fertilizer','boiler-thermal-power','paper-industry','refractory-industry')
  )
  AND name ILIKE '%bucket elevator%';

UPDATE public.products SET description =
'These chains are used in Cement Industries for handling hot clinker. They are fitted with Out-Board Rollers, are of longer pitch with double strand and are meant for heavy-duty service with high yield strength to withstand heavy shock loads.

Links have a locking arrangement to avoid overlapping due to long pitch. Maximum chain strength and wear resistance is achieved through proper material selection and adequate heat-treatment. Chain links (Medium Carbon / Alloy Steel) are blanked, fine bored, hardened, tempered and shot peened. Pins & Bushes are Case Carburized. Roller ID and OD are Induction Hardened for maximum wear life.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'cement-sector')
  AND name ILIKE '%deep bucket%';

UPDATE public.products SET description =
'Pan Conveyor Chains are used in Cement Industries for handling hot clinker. They are fitted with Out-Board Rollers and are of longer pitch with double-strand construction, designed for heavy-duty service and high shock loads.

Links carry a locking arrangement to avoid overlapping due to long pitch. Chain links (Medium Carbon / Alloy Steel) are hardened, tempered and shot peened. Pins & Bushes use Special Alloy Steel with Case Carburized Hardening & Tempering for maximum wear resistance and core strength.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'cement-sector')
  AND name ILIKE '%pan conveyor%';

UPDATE public.products SET description =
'Drive Chains are used in Heavy-Duty Construction Machinery, Road Building Equipment, Power Shovels, Hoists and Oil Rigs — suitable for abrasive, high-temperature and dusty conditions.

Precise alignment of chain and sprocket is maintained by precision manufacturing. Maximum chain strength and wear resistance is achieved by strict raw-material control and modern in-house heat treatment. Chain links (Medium Carbon / Alloy Steel) are blanked, fine bored, hardened, tempered and shot peened. Pins are Volume Hardened & Tempered plus Induction Hardened for armoured case depth. Bushes are Case Carburized. Rollers use Medium Carbon Steel with appropriate heat treatment.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'cement-sector')
  AND name ILIKE '%drive chain%';

-- ---------------- BOILER & THERMAL POWER ---------------------------------

UPDATE public.products SET description =
'Drive Chain for Boiler is used in Power Plants — suitable for abrasive, high-temperature and dusty conditions. Precise chain-to-sprocket alignment is maintained through precision manufacturing.

Chain links (Medium Carbon / Alloy Steel) are hardened, tempered and shot peened. Pins are Volume Hardened & Tempered plus Induction Hardened for armoured case depth and maximum wear resistance. Bushes are Case Carburized for maximum wear resistance and core strength. Rollers use Medium Carbon Steel with appropriate heat treatment.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'boiler-thermal-power')
  AND (name ILIKE '%drive chain%' OR name ILIKE '%boiler%');

UPDATE public.products SET description =
'Traveling Grate Chains are used in Power Plants and Co-Generation Plants in Sugar Industries — suitable for abrasive, high-temperature and dusty conditions. Precise chain-and-sprocket alignment with proper tolerance is maintained.

Chain links (Medium Carbon / Alloy Steel) are blanked, fine bored, hardened, tempered and shot peened to improve fatigue strength. Special Alloy Steel Pins and Bushes with adequate heat treatment achieve optimum case depth for maximum wear resistance and core strength.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'boiler-thermal-power')
  AND (name ILIKE '%travel%grate%' OR name ILIKE '%traveling grate%');

-- ---------------- AUTOMOBILE ---------------------------------------------

UPDATE public.products SET description =
'These conveyor chains are mainly used for Vehicle Assembly Line, Paint Line and Engine Assembly Conveyors.

As they run at very low speed with frequent stoppages at defined stages, a higher degree of accuracy is achieved through special processes followed by heat treatment. Chains are supplied with Rollers assembled with Bearings for smooth functioning. Pusher plates are provided for Pusher Dog mounting as per customer requirement.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'automobile')
  AND (name ILIKE '%conveyor chain%' OR name ILIKE '%slat conveyor%');

-- ---------------- EDIBLE OIL (Palm & Soyabean) ---------------------------

UPDATE public.products SET description =
'Drag / Flow Conveyor chains for Soyabean and Edible Oil plants maintain constant flow of materials such as seeds, meal and solvent-processed products.

Forged links are made from Carbon Steel / Alloy Steel, duly heat treated. Pins & Bushes are made from Alloy Steel with appropriate heat treatment. Flat plates are welded or bolted as per requirement.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'solvent-plant')
  AND (name ILIKE '%drag%' OR name ILIKE '%enmass%' OR name ILIKE '%flow conveyor%');

UPDATE public.products SET description =
'Extractor Chains are used in Solvent Extraction Plants for edible-oil processing. They are engineered to withstand continuous immersion in solvent, high loads and abrasive material flow.

Chain components use Alloy Steel with case-carburized pins and bushes for maximum wear resistance and core strength. Attachments are designed to carry the material bed uniformly through the extractor.'
WHERE category_id = (SELECT id FROM public.categories WHERE slug = 'solvent-plant')
  AND name ILIKE '%extractor%';

-- ---------------- COMPANY-WIDE / GENERIC (fallback) ---------------------
-- Nothing here; only products listed above get a description.

COMMIT;

-- =====================================================================
-- Verify what was updated:
--   SELECT c.slug AS category, p.name, LEFT(p.description, 60) AS preview
--   FROM public.products p JOIN public.categories c ON c.id = p.category_id
--   WHERE p.description IS NOT NULL AND p.description <> ''
--   ORDER BY c.slug, p.name;
-- =====================================================================