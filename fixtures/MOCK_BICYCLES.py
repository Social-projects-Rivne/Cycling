# -*- coding: utf-8 -*-

"""
Taken from https://www.mockaroo.com/
"""

LIST = [{"name":"ZYPREXA","description":"Torus fracture of lower end of left fibula, subsequent encounter for fracture with delayed healing"},
        {"name":"CVS Homeopathic SKIN TAG REMOVER","description":"Unavailability and inaccessibility of other helping agencies"},
        {"name":"night time","description":"Nondisplaced segmental fracture of shaft of left tibia, initial encounter for open fracture type I or II"},
        {"name":"Sunmark Childrens Pain and Fever","description":"Injury of radial nerve at forearm level, unspecified arm"},
        {"name":"Lovastatin","description":"Calculus of bile duct without cholangitis or cholecystitis with obstruction"},
        {"name":"Prednisone","description":"Laceration with foreign body of unspecified buttock"},
        {"name":"Diltiazem Hydrochloride","description":"Salter-Harris Type III physeal fracture of lower end of radius, right arm, initial encounter for closed fracture"},
        {"name":"Leader Medicated","description":"Breakdown (mechanical) of ventricular intracranial (communicating) shunt, initial encounter"},
        {"name":"SMART SENSE","description":"Macrostomia"},
        {"name":"FENTANYL","description":"Unspecified sprain of unspecified finger, sequela"},
        {"name":"Hi Vetic","description":"Epidural hemorrhage with loss of consciousness of 6 hours to 24 hours, subsequent encounter"},
        {"name":"Desferal","description":"Other superficial bite of right wrist, initial encounter"},
        {"name":"First Aid Direct Buffered Eyewash Sterile Isotonic","description":"Driver of heavy transport vehicle injured in collision with pedal cycle in traffic accident"},
        {"name":"Aspergillus niger","description":"Unspecified superficial injury of right elbow, initial encounter"},
        {"name":"Levaquin","description":"Strain of adductor muscle, fascia and tendon of left thigh, sequela"},
        {"name":"Health Mart Ibuprofen","description":"Burn of second degree of multiple sites of left lower limb, except ankle and foot, subsequent encounter"},
        {"name":"DayTime NightTime Sinus Relief","description":"Localization-related (focal) (partial) symptomatic epilepsy and epileptic syndromes with simple partial seizures, intractable, without status epilepticus"},
        {"name":"oxaliplatin","description":"Puncture wound with foreign body of lip, subsequent encounter"},
        {"name":"ACER SACCHARUM POLLEN","description":"Displaced fracture of medial condyle of right femur, subsequent encounter for open fracture type I or II with delayed healing"},
        {"name":"Paprika","description":"Degenerative myopia, bilateral"},
        {"name":"up and up ibuprofen pm","description":"Accidental malfunction of shotgun, initial encounter"},
        {"name":"Enalaprilat","description":"Unspecified injury of muscle and tendon of long extensor muscle of toe at ankle and foot level, right foot, sequela"},
        {"name":"Old Spice Red Zone Sweat Defense","description":"Supraglottitis, unspecified, with obstruction"},
        {"name":"Lancome Teint Idole Fresh Wear","description":"Contact with garden tool"},
        {"name":"aspirin","description":"Mantle cell lymphoma, intra-abdominal lymph nodes"},
        {"name":"Cefazolin","description":"Adverse effect of calcium-channel blockers, initial encounter"},
        {"name":"Guanfacine","description":"Fracture of other part of scapula, unspecified shoulder, subsequent encounter for fracture with nonunion"},
        {"name":"Lidocaine","description":"War operations involving accidental detonation of onboard marine weapons, civilian, sequela"},
        {"name":"CAFCIT","description":"Displaced fracture of neck of left talus, initial encounter for open fracture"},
        {"name":"Smooth Brome","description":"Underdosing of aminoglycosides, initial encounter"},
        {"name":"Sesame","description":"Other specified obstetric trauma"},
        {"name":"ABILIFY","description":"Rheumatoid polyneuropathy with rheumatoid arthritis of left elbow"},
        {"name":"lisinopril","description":"Contracture of muscle, unspecified ankle and foot"},
        {"name":"Ofloxacin","description":"Toxic effect of other specified gases, fumes and vapors, assault, sequela"},
        {"name":"THROMBIN-JMI","description":"Encounter for adjustment and management of other implanted hearing device"},
        {"name":"Atenolol","description":"Other specified fracture of unspecified acetabulum, sequela"},
        {"name":"Shopko Antibacterial Hand Sanitizer","description":"Fall on same level due to stepping on an object"},
        {"name":"Blackberry","description":"Displaced fracture of lateral condyle of left humerus, subsequent encounter for fracture with delayed healing"},
        {"name":"Diltiazem HydrochlorideExtended Release","description":"Traumatic cerebral edema with loss of consciousness greater than 24 hours without return to pre-existing conscious level with patient surviving, initial encounter"},
        {"name":"Hydrochlorothiazide","description":"Pressure ulcer of right heel"},
        {"name":"Happy Bones","description":"Unspecified injury of left foot"},
        {"name":"GlyBURIDE","description":"Foreign body in other and multiple parts of external eye, left eye, sequela"},
        {"name":"Laneige sliding pact EX","description":"Contusion of other specified intrathoracic organs, sequela"},
        {"name":"Aspirin","description":"Maternal care for other isoimmunization, unspecified trimester, other fetus"},
        {"name":"PROCYSBI","description":"Drowning and submersion due to falling or jumping from other burning powered watercraft, sequela"},
        {"name":"Neuro-Chord","description":"Complete traumatic amputation of two or more unspecified lesser toes, sequela"},
        {"name":"Peroxie Care Tartar Control","description":"Abscess of vulva"},
        {"name":"Gilotrif","description":"Streptococcal sepsis, unspecified"},
        {"name":"Trazodone Hydrochloride","description":"Pathological fracture in other disease, left shoulder, subsequent encounter for fracture with malunion"},
        {"name":"DELFLEX","description":"Congenital hiatus hernia"},
        {"name":"Lorazepam","description":"Periprosthetic osteolysis of internal prosthetic right hip joint, subsequent encounter"},
        {"name":"Mary Kay Tinted Lip Balm Sunscreen SPF 15 Natural","description":"Displaced other fracture of tuberosity of left calcaneus"},
        {"name":"SINGULAIR","description":"Abrasion of left ring finger"},
        {"name":"3M Cavilon Durable Barrier","description":"Insect bite (nonvenomous), right ankle, initial encounter"},
        {"name":"Visine A","description":"Other superficial bite of wrist"},
        {"name":"healthy accents all day pain relief","description":"Nondisplaced fracture of medial malleolus of unspecified tibia, initial encounter for open fracture type IIIA, IIIB, or IIIC"},
        {"name":"Levofloxacin","description":"Unspecified fracture of shaft of unspecified radius, sequela"},
        {"name":"Hydromorphone Hydrochloride","description":"Unspecified car occupant injured in collision with pedestrian or animal in traffic accident"},
        {"name":"TAZORAC","description":"Fracture of unspecified carpal bone, left wrist"},
        {"name":"ESIKA","description":"Loose body in shoulder"},
        {"name":"SyImmune","description":"Laceration of body of pancreas, unspecified degree, sequela"},
        {"name":"Orphenadrine Citrate","description":"Struck by duck"},
        {"name":"D-Cal Kids","description":"Other secondary osteonecrosis, right shoulder"},
        {"name":"Xolox","description":"Nondisplaced fracture of base of second metacarpal bone. left hand, initial encounter for open fracture"},
        {"name":"Carbon Dioxide-Oxygen Mixture","description":"Other specified bursopathies, left wrist"},
        {"name":"Torisel","description":"Other congenital deformities of chest"},
        {"name":"Hydrochlorothiazide","description":"Laceration without foreign body of abdominal wall, epigastric region with penetration into peritoneal cavity, initial encounter"},
        {"name":"BENADRYL Extra Strength Itch Cooling","description":"Infections of breast associated with pregnancy, the puerperium and lactation"},
        {"name":"CLONAZEPAM","description":"Crushing injury of wrist"},
        {"name":"Fluocinolone Acetonide","description":"Other injury of flexor muscle, fascia and tendon of unspecified finger at wrist and hand level"},
        {"name":"E.O.L.","description":"Aural vertigo, right ear"},
        {"name":"NITRO-TIME","description":"Other injury of tail of pancreas, initial encounter"},
        {"name":"Metformin Hydrochloride","description":"Unspecified injury of unspecified blood vessel at ankle and foot level, left leg, subsequent encounter"},
        {"name":"Bisacodyl","description":"Laceration without foreign body, left hip, initial encounter"},
        {"name":"Hepastat","description":"Melanocytic nevi of lower limb, including hip"},
        {"name":"Clonazepam","description":"Disorders of sclera"},
        {"name":"Hemorrhoid Relief","description":"Toxic effect of copper and its compounds, intentional self-harm, subsequent encounter"},
        {"name":"Equaline Moisturizing Dandruff","description":"Intentional self-harm by jumping from a high place"},
        {"name":"Prascion","description":"Displaced fracture of neck of right radius, initial encounter for open fracture type IIIA, IIIB, or IIIC"},
        {"name":"DIGOXIN","description":"Puncture wound with foreign body of right hand"},
        {"name":"BOTOX Cosmetic","description":"Skin transplant status"},
        {"name":"Venlafaxine","description":"Encopresis not due to a substance or known physiological condition"},
        {"name":"flormar PERFECT COVERAGE FOUNDATION SUNSCREEN BROAD SPECTRUM SPF 15 101 Pastelle","description":"Other disorders of bone development and growth, unspecified site"},
        {"name":"Tamsulosin Hydrochloride","description":"Other and unspecified superficial injuries of front wall of thorax"},
        {"name":"Darkleaves Mugwort","description":"Complete traumatic amputation of left hip and thigh, level unspecified"},
        {"name":"Flector","description":"Other specific arthropathies, not elsewhere classified, right hip"},
        {"name":"Ciprofloxacin","description":"Arthropathy following intestinal bypass, unspecified hip"},
        {"name":"PENICILLIUM CHRYSOGENUM VAR CHRYSOGENUM","description":"Other fracture of first metacarpal bone, right hand"},
        {"name":"REFRESH PLUS","description":"Multiple gestation, unspecified, first trimester"},
        {"name":"SHISEIDO THE SKINCARE DAY MOISTURE PROTECTION","description":"External constriction of part of breast, right breast"},
        {"name":"Doxycycline Hyclate","description":"Displaced fracture of middle third of navicular [scaphoid] bone of left wrist, subsequent encounter for fracture with routine healing"},
        {"name":"Treatment Set TS345694","description":"Poisoning by unspecified anesthetic, assault, initial encounter"},
        {"name":"Amlodipine besylate and Atorvastatin calcium","description":"Spondylolysis, occipito-atlanto-axial region"},
        {"name":"Metronidazole","description":"Bathroom in other specified residential institution as the place of occurrence of the external cause"},
        {"name":"Nighttime Daytime Cough","description":"Unspecified intracapsular fracture of right femur, initial encounter for open fracture type I or II"},
        {"name":"Type 11 Dizziness Regular","description":"Nondisplaced comminuted fracture of shaft of ulna, left arm, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with routine healing"},
        {"name":"Orabloc","description":"Displaced fracture of olecranon process with intraarticular extension of unspecified ulna, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with malunion"},
        {"name":"TUNA","description":"Type 2 diabetes mellitus with unspecified diabetic retinopathy without macular edema"},
        {"name":"Hangover Relief","description":"Displaced fracture of unspecified tibial tuberosity, initial encounter for closed fracture"},
        {"name":"Prevacid","description":"Corrosion of third degree of multiple sites of unspecified shoulder and upper limb, except wrist and hand, sequela"},
        {"name":"Trulicity","description":"Nondisplaced fracture of first metatarsal bone, unspecified foot, subsequent encounter for fracture with malunion"},
        {"name":"Soltamox","description":"Unspecified subluxation and dislocation of foot"},
        {"name":"Western Water Hemp","description":"External constriction of unspecified upper arm"},
        {"name":"Phoma glomerata","description":"Subluxation of metatarsophalangeal joint of unspecified great toe, sequela"},
        {"name":"Acyclovir","description":"Laceration with foreign body of unspecified great toe with damage to nail, subsequent encounter"},
        {"name":"Moore Medical Sugar Free Black Cherry Cough Suppressant/Anesthetic Drops","description":"Nondisplaced comminuted fracture of shaft of left fibula, sequela"},
        {"name":"Simply Right Mucus Relief","description":"Injury of digital nerve of unspecified thumb"},
        {"name":"Octreotide Acetate","description":"Periprosthetic osteolysis of internal prosthetic left knee joint, subsequent encounter"},
        {"name":"Albuterol Sulfate","description":"Nondisplaced fracture of trapezoid [smaller multangular], left wrist, subsequent encounter for fracture with nonunion"},
        {"name":"Mirtazapine","description":"Laceration without foreign body, right hip, sequela"},
        {"name":"SHISEIDO THE MAKEUP PERFECT SMOOTHING COMPACT FOUNDATION (Refill)","description":"Malignant neoplasm of lateral floor of mouth"},
        {"name":"Ibuprofen","description":"Adverse effect of other hormone antagonists, initial encounter"},
        {"name":"Raspberry","description":"Problems related to certain psychosocial circumstances"},
        {"name":"Phenobarbital","description":"Corrosion of third degree of multiple fingers (nail), not including thumb"},
        {"name":"Lazanda","description":"Other hyperphenylalaninemias"},
        {"name":"Neosporin Plus Pain Relief","description":"Puncture wound of abdominal wall with foreign body, periumbilic region without penetration into peritoneal cavity"},
        {"name":"Methyldopa","description":"Displaced fracture of neck of third metacarpal bone, right hand, initial encounter for open fracture"},
        {"name":"PanOxyl","description":"Poisoning by other estrogens and progestogens, undetermined, initial encounter"},
        {"name":"POLYETHYLENE GLYCOL 3350","description":"Other injury of unspecified muscle, fascia and tendon at shoulder and upper arm level, right arm, subsequent encounter"},
        {"name":"Dorzolamide Hydrochloride","description":"Granulation of postmastoidectomy cavity, bilateral ears"},
        {"name":"Personal Care Antibacterial Hand - Fresh Melon","description":"Other injury of other specified muscles, fascia and tendons at thigh level, unspecified thigh"},
        {"name":"Oxygen","description":"Exposure to other furniture fire due to unspecified burning material, initial encounter"},
        {"name":"Ipratropium Bromide","description":"Driver of three-wheeled motor vehicle injured in collision with fixed or stationary object in nontraffic accident, subsequent encounter"},
        {"name":"SHISEIDO RADIANT LIFTING FOUNDATION","description":"Multiple fractures of ribs, unspecified side, sequela"},
        {"name":"Potassium Citrate","description":"Exposure to other furniture fire due to unspecified burning material, sequela"},
        {"name":"Irbesartan","description":"Other extrapyramidal and movement disorders"},
        {"name":"SANIFOAM HAND SANITIZER","description":"Open bite of right ear, initial encounter"},
        {"name":"REVITALIZING C I2PL STEMCELL BB","description":"Stress fracture, right toe(s), subsequent encounter for fracture with malunion"},
        {"name":"Diaper Rash","description":"War operations involving other destruction of aircraft, military personnel, initial encounter"},
        {"name":"Sertraline Hydrochloride","description":"Pressure ulcer of right elbow, unspecified stage"},
        {"name":"bronze-n-brighten","description":"Rupture of papillary muscle as current complication following acute myocardial infarction"},
        {"name":"ZUSKA","description":"Military operations involving fragments from munitions"},
        {"name":"RAIN AND SHINE LIPTINT","description":"Unspecified sprain of right ring finger"},
        {"name":"HepatAmine","description":"Malignant neoplasm of urethra"},
        {"name":"Leader Acid Control","description":"Laceration of left kidney, unspecified degree"},
        {"name":"CORZIDE","description":"Infection and inflammatory reaction due to implanted electronic neurostimulator of brain, electrode (lead), initial encounter"},
        {"name":"Erythromycin","description":"Poisoning by antimalarials and drugs acting on other blood protozoa, intentional self-harm, sequela"},
        {"name":"Ergotamine Tartrate and Caffeine","description":"Other disorders of patella"},
        {"name":"SORIATANE","description":"Other specified injury of deep palmar arch of right hand"},
        {"name":"Theracodophen-Low-90","description":"Traumatic arthropathy, unspecified knee"},
        {"name":"Pleo Ginkgo","description":"Unspecified superficial injury of left hip, sequela"},
        {"name":"CLADOSPORIUM SPHAEROSPERMUM","description":"Isolated proteinuria with diffuse membranous glomerulonephritis"},
        {"name":"Vitaminerals Inc.","description":"Displaced fracture of lateral end of left clavicle, subsequent encounter for fracture with nonunion"},
        {"name":"Galantamine","description":"Lateral subluxation of proximal end of tibia, right knee, initial encounter"},
        {"name":"Terbutaline Sulfate","description":"Asperger's syndrome"},
        {"name":"Moisture Renew","description":"Unspecified motorcycle rider injured in noncollision transport accident in traffic accident"},
        {"name":"SHISEIDO EXTRA SMOOTH SUN PROTECTION N","description":"Puncture wound with foreign body of left lesser toe(s) without damage to nail, sequela"},
        {"name":"Clonazepam","description":"Poisoning by iron and its compounds, undetermined, sequela"},
        {"name":"Zosyn","description":"Primary open-angle glaucoma, right eye, indeterminate stage"},
        {"name":"Botanics Complexion Refining Day Moisture Lotion Sunscreen SPF 12","description":"Nondisplaced dome fracture of right talus, initial encounter for closed fracture"},
        {"name":"Donnatal","description":"Driver of ambulance or fire engine injured in traffic accident, initial encounter"},
        {"name":"Head and Shoulders","description":"Vitreomacular adhesion, left eye"},
        {"name":"Panadol","description":"Displaced fracture of lower epiphysis (separation) of right femur, subsequent encounter for closed fracture with malunion"},
        {"name":"Leader ibuprofen","description":"Sprain of other part of unspecified wrist and hand"},
        {"name":"Nabumetone","description":"Breakdown (mechanical) of internal fixation device of bones of hand and fingers, sequela"},
        {"name":"Betamethasone Dipropionate","description":"Unspecified superficial injury of left index finger"},
        {"name":"Sodium Phosphates","description":"Congenital dislocation of left hip, unilateral"},
        {"name":"Pure Finish Mineral Powder Foundation SPF 20 Pure Finish 1","description":"Injury of unspecified blood vessel at neck level, sequela"},
        {"name":"SENSAI FLUID FINISH LASTING VELVET FV205","description":"Adverse effect of unspecified narcotics, sequela"},
        {"name":"GOODSENSE IRRITATION RELIEF EYE DROPS","description":"Corrosion of first degree of back of left hand, initial encounter"},
        {"name":"Citrus Cydonia 5%","description":"Occupant of animal-drawn vehicle injured in other transport accident, sequela"},
        {"name":"Amazing Face","description":"Displaced comminuted fracture of shaft of left tibia, subsequent encounter for open fracture type I or II with delayed healing"},
        {"name":"Ondansetron hydrochloride and dextrose","description":"Fall from stairs and steps due to ice and snow, initial encounter"},
        {"name":"Hydroxyzine Hydrochloride","description":"Poisoning by other general anesthetics, intentional self-harm, initial encounter"},
        {"name":"Neutrogena Skin Clearing","description":"Other congenital malformations of renal artery"},
        {"name":"COLGATE 2IN1","description":"Calculus of bile duct with acute cholecystitis with obstruction"},
        {"name":"ELIDEL","description":"Pedestrian on skateboard injured in collision with other nonmotor vehicle, unspecified whether traffic or nontraffic accident, sequela"},
        {"name":"Good Neighbor Pharmacy Day Time","description":"Unspecified injury of muscle, fascia and tendon of triceps, left arm, initial encounter"},
        {"name":"Perphenazine","description":"Torus fracture of upper end of radius"},
        {"name":"Acetaminophen","description":"Laceration of extensor muscle, fascia and tendon of left thumb at wrist and hand level"},
        {"name":"SUCUR II","description":"Other dislocation of right wrist and hand, sequela"},
        {"name":"NATRUM MURIATICUM","description":"Maxillary fracture, left side, subsequent encounter for fracture with routine healing"},
        {"name":"ANTACID","description":"Adverse effect of insulin and oral hypoglycemic [antidiabetic] drugs"},
        {"name":"skin effects Firming Facial with Retinol Complex SPF 30","description":"Adult osteochondrosis of spine"},
        {"name":"Standardized Perennial Rye Grass","description":"Displaced fracture of head of unspecified radius, subsequent encounter for open fracture type IIIA, IIIB, or IIIC with delayed healing"},
        {"name":"AMOXICILLIN AND CLAVULANATE POTASSIUM","description":"Ankylosis, unspecified hip"},
        {"name":"CAPTOPRIL","description":"Puncture wound without foreign body of trachea"},
        {"name":"Arixtra","description":"Displaced bimalleolar fracture of unspecified lower leg"},
        {"name":"Shrimp","description":"Albinism with hematologic abnormality, unspecified"},
        {"name":"Diphenoxylate Hydrochloride and Atropine Sulfate","description":"Blister (nonthermal) of right shoulder, sequela"},
        {"name":"Acyclovir","description":"Labor and delivery complicated by cord around neck, with compression, not applicable or unspecified"},
        {"name":"Glyburide and Metformin Hydrochloride","description":"Nondisplaced fracture of head of unspecified radius, initial encounter for open fracture type IIIA, IIIB, or IIIC"},
        {"name":"Amlodipine Besylate","description":"Displaced unspecified fracture of unspecified lesser toe(s), sequela"},
        {"name":"Acyclovir","description":"Dislocation of distal interphalangeal joint of left middle finger, subsequent encounter"},
        {"name":"Voltaren","description":"Adverse effect of antihyperlipidemic and antiarteriosclerotic drugs, sequela"},
        {"name":"methylergonovine maleate","description":"Laceration of unspecified blood vessel at lower leg level, left leg, initial encounter"},
        {"name":"Molds, Rusts and Smuts, Mucor racemosus","description":"Oculomandibular dysostosis"},
        {"name":"Carbon Dioxide-Air Mixture","description":"Ocular laceration without prolapse or loss of intraocular tissue, right eye, initial encounter"},
        {"name":"Rough Pigweed","description":"Other accident with babystroller"},
        {"name":"PureLife APF","description":"Other hypertrophic osteoarthropathy, right upper arm"},
        {"name":"Cipro","description":"Injury of peripheral nerves of neck, sequela"},
        {"name":"Prednicarbate","description":"Nondisplaced transverse fracture of shaft of humerus, left arm, initial encounter for closed fracture"},
        {"name":"Morphine Sulfate","description":"Burn of unspecified degree of right scapular region, sequela"},
        {"name":"Alprazolam","description":"Stress fracture, left humerus, sequela"},
        {"name":"Good Neighbor Pharmacy Nicotine","description":"Inhalant use, unspecified with intoxication"},
        {"name":"Chlorpheniramine Maleate","description":"Partial traumatic transphalangeal amputation of left index finger, subsequent encounter"},
        {"name":"Yellow Onion","description":"Pre-existing essential hypertension complicating pregnancy,"},
        {"name":"Famciclovir","description":"Unspecified occupant of pick-up truck or van injured in collision with car, pick-up truck or van in nontraffic accident, initial encounter"},
        {"name":"Enalapril Maleate","description":"Other physeal fracture of lower end of unspecified femur, subsequent encounter for fracture with delayed healing"},
        {"name":"Mag-AL Plus","description":"Unspecified injury of other muscle(s) and tendon(s) at lower leg level, unspecified leg"}]
