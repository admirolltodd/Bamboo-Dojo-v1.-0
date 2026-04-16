export const APPETIZERS = [
  "Edamame", "Miso Soup", "Spring Roll (6pc)", "Gyoza Pork (7pc)", 
  "Lemon Pepper Tuna", "Panko Fried Scallops", "Panko Fried Shrimp (8 lge)", 
  "Shrimp Tempura", "Vegetable Tempura", "Cucumber Salad", "Seaweed Salad", 
  "Squid Salad", "Seafood Salad", "House Salad"
];

export const SUSHI_ROLLS = [
  { name: "Asparagus & Garlic Roll", ingredients: ["tempura asparagus", "garlic", "spicy sauce"] },
  { name: "Avocado Roll", ingredients: ["avocado", "green onion", "spicy sauce"] },
  { name: "Bacon Avocado Roll", ingredients: ["bacon", "avocado", "garlic", "spicy sauce"] },
  { name: "Black Dragon Roll", ingredients: ["fried soft shell crab", "green onion", "avocado", "BBQ eel", "eel sauce", "sesame seeds"] },
  { name: "Bulldog Roll", ingredients: ["yellowtail", "green onions", "spicy sauce", "tuna"] },
  { name: "California Roll", ingredients: ["krab", "avocado", "cucumbers", "wasabi", "sesame seeds", "smelt roe"] },
  { name: "Crestview Roll", ingredients: ["NY strip", "avocado", "green onion", "spicy sauce"] },
  { name: "Crunchy Shrimp Roll", ingredients: ["shrimp", "spicy sauce"] },
  { name: "Emerald Dragon Roll", ingredients: ["shrimp", "tempura crunch", "cucumber", "green onion", "spicy sauce", "avocado"] },
  { name: "Frying Fish Roll", ingredients: ["fried white fish", "spicy mayo", "green onions", "garlic", "avocado"] },
  { name: "Green Eel Roll", ingredients: ["eel", "cucumber", "spicy mayo", "eel sauce", "avocado", "sesame seeds"] },
  { name: "Hurricane Roll", ingredients: ["fresh salmon", "krab salad", "green onion", "avocado", "chili paste"] },
  { name: "Kamikaze Roll", ingredients: ["shrimp", "fresh salmon", "tempura crunch", "smelt roe", "green onions", "spicy sauce", "eel sauce", "chili paste", "sesame seeds"] },
  { name: "Okinawa Roll", ingredients: ["shrimp", "tempura crunch", "spicy sauce", "cucumber", "smoked salmon", "chili paste"] },
  { name: "Philly Roll", ingredients: ["smoked salmon", "avocado", "green onion", "cream cheese"] },
  { name: "Rainbow Roll", ingredients: ["shrimp", "cucumber", "wasabi", "green onion", "tuna", "fresh salmon", "white fish"] },
  { name: "Salmon & Avocado Roll", ingredients: ["smoked salmon", "avocado", "wasabi"] },
  { name: "Smokin Eel Roll", ingredients: ["eel", "tempura crunch", "garlic", "green onion", "smoked salmon", "jalapeno", "eel sauce", "sesame seeds"] },
  { name: "Spicy Octopus Roll", ingredients: ["octopus", "cucumber", "green onion", "spicy sauce"] },
  { name: "Spicy Shrimp Roll", ingredients: ["shrimp", "cucumber", "green onion", "spicy sauce", "jalapeno"] },
  { name: "Spicy Tuna Roll", ingredients: ["tuna", "green onion", "spicy sauce"] },
  { name: "Spider Roll", ingredients: ["fried soft shell crab", "avocado", "green onion", "smelt roe", "spicy sauce", "eel sauce", "sesame seeds"] },
  { name: "Surf & Turf Roll", ingredients: ["NY strip", "shrimp", "green onion", "spicy sauce"] },
  { name: "Tuna & Avocado Roll", ingredients: ["tuna", "green onion", "avocado", "spicy sauce"] },
  { name: "Tuna & Bacon Roll", ingredients: ["tuna", "bacon", "spicy sauce", "green onion", "garlic"] },
  { name: "Vegan Roll", ingredients: ["assorted vegetables", "wasabi"] },
  { name: "Yellowtail Roll", ingredients: ["yellowtail", "green onion", "spicy sauce"] }
];

export const SPECIALTY_ROLLS = [
  { name: "Crispy Bagel Roll", ingredients: ["smoked salmon", "cream cheese", "avocado", "green onion", "bamboo sauce", "sesame seeds"] },
  { name: "Crispy California Roll", ingredients: ["krab stick", "avocado", "cucumber", "bamboo sauce", "sesame seeds"] },
  { name: "Godzilla Roll", ingredients: ["tuna", "krab salad", "avocado", "green onion", "asparagus", "eel sauce", "chili paste", "sesame seeds"] },
  { name: "King Kong", ingredients: ["smoked salmon", "shrimp", "krabstick", "cucumber", "green onion", "avocado", "baked shrimp", "scallops", "bamboo sauce", "eel sauce", "chilli paste", "sesame seeds"] },
  { name: "Mr. Orange Roll", ingredients: ["fresh salmon", "tempura crunch", "green onion", "spicy sauce", "avocado", "krab salad"] },
  { name: "Mt. Fuji Roll", ingredients: ["yellowtail", "tempura crunch", "green onion", "baked shrimp", "scallops", "bamboo sauce", "eel sauce", "sesame seeds"] },
  { name: "Red Dragon Roll", ingredients: ["fried softshell crab", "green onion", "spicy sauce", "avocado", "spicy tuna tar tar"] },
  { name: "Rock Da Mike Roll", ingredients: ["tempura shrimp", "baked fresh salmon", "eel", "cream cheese", "avocado", "green onion", "eel sauce", "sesame seeds"] },
  { name: "Sasquatch Roll", ingredients: ["shrimp", "tempura crunch", "cucumber", "avocado", "green onion", "baked krab salad", "shrimp", "scallops", "eel sauce", "sesame seeds"] },
  { name: "Sunset Roll", ingredients: ["yellow tail", "smelt roe", "green onion", "spicy sauce", "fresh salmon"] },
  { name: "TNT Roll", ingredients: ["tuna", "tempura crunch", "green onion", "spicy sauce", "tuna", "avocado", "eel sauce", "chili paste", "sesame seeds"] },
  { name: "Vu Ching Roll", ingredients: ["shrimp", "tempura crunch", "cream cheese", "cucumber", "green onion", "spicy sauce", "tuna", "avocado", "krab salad"] }
];

export const ALL_ROLLS = [...SUSHI_ROLLS, ...SPECIALTY_ROLLS];

export const SUSHI_LORE = [
  { q: "Maguro", a: "Tuna (general term)", options: ["Salmon", "Yellowtail", "Eel"] },
  { q: "Toro", a: "Fatty tuna belly", options: ["Shrimp", "Octopus", "Squid"] },
  { q: "Otoro", a: "The fattiest, most prized cut of tuna belly", options: ["Medium-fatty tuna", "Lean tuna", "Seared tuna"] },
  { q: "Chutoro", a: "Medium-fatty tuna belly", options: ["Fatty tuna belly", "Lean tuna", "Spicy tuna"] },
  { q: "Nigiri", a: "Hand-pressed rice topped with fish", options: ["Thick roll", "Thin roll", "Raw fish slices"] },
  { q: "Futomaki", a: "Thick roll, multiple fillings", options: ["Thin roll", "Hand roll", "Pressed sushi"] },
  { q: "Hosomaki", a: "Thin roll, single filling", options: ["Thick roll", "Inside-out roll", "Fried roll"] },
  { q: "Maki", a: "General term for any rolled sushi", options: ["Raw fish without rice", "Hand-pressed sushi", "Sushi bowl"] },
  { q: "Sashimi", a: "Sliced raw fish served WITHOUT rice", options: ["Rolled sushi", "Hand-pressed sushi", "Fried fish"] },
  { q: "Uni", a: "Sea urchin roe", options: ["Salmon roe", "Flying fish roe", "Smelt roe"] },
  { q: "Ikura", a: "Salmon roe (big orange eggs)", options: ["Sea urchin", "Flying fish roe", "Smelt roe"] },
  { q: "Tobiko", a: "Flying fish roe (small, crunchy)", options: ["Salmon roe", "Sea urchin", "Smelt roe"] },
  { q: "Ebi", a: "Shrimp", options: ["Eel", "Octopus", "Squid"] },
  { q: "Sake", a: "Salmon", options: ["Tuna", "Yellowtail", "Mackerel"] },
  { q: "Hamachi", a: "Yellowtail", options: ["Tuna", "Salmon", "Eel"] },
  { q: "Unagi", a: "Freshwater eel", options: ["Saltwater eel", "Sea snake", "Octopus"] },
  { q: "Anago", a: "Saltwater eel", options: ["Freshwater eel", "Shrimp", "Squid"] },
  { q: "Wasabi", a: "Japanese horseradish", options: ["Pickled ginger", "Soy sauce", "Spicy mayo"] },
  { q: "Gari", a: "Pickled ginger (palate cleanser)", options: ["Japanese horseradish", "Seaweed", "Fish flakes"] },
  { q: "Shoyu", a: "Soy sauce", options: ["Eel sauce", "Spicy mayo", "Ponzu"] },
  { q: "Nori", a: "Dried seaweed sheet", options: ["Rice paper", "Soy wrapper", "Cucumber wrap"] },
  { q: "Gohan", a: "Cooked rice", options: ["Sushi vinegar", "Raw fish", "Seaweed"] },
  { q: "Omakase", a: "Chef's choice", options: ["A la carte", "All you can eat", "Bento box"] },
  { q: "Itamae", a: "Head sushi chef", options: ["Waiter", "Dishwasher", "Manager"] }
];

export const ORACLE_QUOTES = {
  pass: [
    "The Oracle is... mildly impressed.",
    "You know your rolls. The Oracle tolerates you... for now.",
    "The Oracle is surprised. You've read things.",
    "You know your rolls. The Oracle is marginally less disappointed in you.",
    "Acceptable. Do not let it go to your head.",
    "The Oracle nods. A rare occurrence.",
    "Perhaps there is hope for you yet. Perhaps."
  ],
  fail: [
    "The Oracle has seen shrimp perform better. Actual shrimp.",
    "SHARP! You fool. The knife. ALWAYS announce the knife.",
    "...The Oracle is not angry. The Oracle is simply... disappointed.",
    "BEHIND! Always BEHIND! Were you raised in a dining room?!",
    "A customer asked what's in a California roll today. The Oracle wept.",
    "You walked into a human being. Congratulations.",
    "You handed someone a knife without warning. The Oracle fears for this restaurant.",
    "You walked into a server carrying soup. The Oracle smells lawsuits.",
    "The Oracle suggests a dictionary. Perhaps also a mirror.",
    "You served bacteria to a customer. The Oracle weeps for their weekend.",
    "You used the new stock first. The Oracle smells waste. And failure.",
    "The Oracle watched you tailgate a coworker in silence. Unsettling.",
    "You put spicy mayo on the Mt. Fuji. The Oracle is filing this away.",
    "The customer repeated themselves four times. They did not tip. This is your fault.",
    "The Oracle cannot protect you from the Health Department."
  ],
  gari_fail: "Gari is a PALATE CLEANSER. It is not a garnish. The Oracle needs a moment."
};

export const RANKS = [
  { min: 0, title: "🐟 Raw Fish", desc: "Bless your heart. You're... here." },
  { min: 100, title: "🥢 Apprentice Roller", desc: "You hold chopsticks correctly. Barely." },
  { min: 250, title: "🔪 Sharp! Certified", desc: "You know not to walk into knives. Progress." },
  { min: 500, title: "🌱 Corner Caller", desc: "The Oracle heard you call corners. Once." },
  { min: 750, title: "🔥 Line Aware", desc: "You navigate the kitchen without causing incidents." },
  { min: 1000, title: "🐉 Dragon Roll Disciple", desc: "The menu yields its secrets to you." },
  { min: 1500, title: "⛩️ Bamboo Veteran", desc: "You've earned a modicum of Oracle respect." },
  { min: 2000, title: "🏆 Sushi Sensei", desc: "The Oracle acknowledges your existence. High praise." },
  { min: 3000, title: "👑 Bamboo Oracle Approved", desc: "The Oracle bows. You're basically him now." }
];
