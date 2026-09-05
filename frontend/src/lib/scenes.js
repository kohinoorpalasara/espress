// Curated street and food photography per city. Each entry is
// { kind: 'street' | 'dish', src, title, note }. Cities that are not listed
// fall back to a continent set so every city page still gets a gallery.

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

export const STREET_FALLBACK = u('photo-1477959858617-67f85cf4f1df')
export const DISH_FALLBACK = u('photo-1504674900247-0877df9cc836')

export const CITY_SCENES = {
  Paris: [
    { kind: 'street', src: u('photo-1502602898657-3e91760cbb34'), title: 'Rue Cler at dusk', note: 'The bakeries close, the bistros open.' },
    { kind: 'dish', src: u('photo-1555507036-ab1f4038808a'), title: 'Croissant', note: 'Still warm, from the corner boulangerie.' },
    { kind: 'street', src: u('photo-1499856871958-5b9627545d1a'), title: 'Along the Seine', note: 'Booksellers, lovers, a saxophone somewhere.' },
    { kind: 'dish', src: u('photo-1569864358642-9d1684040f43'), title: 'Macarons', note: 'Pistachio first. Always pistachio first.' },
  ],
  Tokyo: [
    { kind: 'street', src: u('photo-1503899036084-c55cdd92da26'), title: 'Shinjuku, 11pm', note: 'Neon on wet asphalt.' },
    { kind: 'dish', src: u('photo-1569718212165-3a8278d5f624'), title: 'Tonkotsu ramen', note: 'Ticket machine, counter seat, silence.' },
    { kind: 'street', src: u('photo-1540959733332-eab4deabeeaf'), title: 'Asakusa lanterns', note: 'The temple street before the crowds.' },
    { kind: 'dish', src: u('photo-1579584425555-c3ce17fd4351'), title: 'Sushi at the counter', note: 'One piece at a time, no menu.' },
  ],
  'New York': [
    { kind: 'street', src: u('photo-1534430480872-3498386e7856'), title: 'SoHo crosswalk', note: 'Nobody waits for the light.' },
    { kind: 'dish', src: u('photo-1513104890138-7c749659a591'), title: 'Dollar slice', note: 'Folded, standing, on the sidewalk.' },
    { kind: 'street', src: u('photo-1496442226666-8d4d0e62e6e9'), title: 'Brooklyn Bridge', note: 'Walk it at sunrise. Trust us.' },
    { kind: 'dish', src: u('photo-1551782450-a2132b4ba21d'), title: 'Bagel and lox', note: 'Everything bagel, extra scallion cream cheese.' },
  ],
  Bali: [
    { kind: 'street', src: u('photo-1537996194471-e657df975ab4'), title: 'Tegallalang terraces', note: 'Green in every direction.' },
    { kind: 'dish', src: u('photo-1512058564366-18510be2db19'), title: 'Nasi goreng', note: 'Fried egg on top, sambal on the side.' },
    { kind: 'street', src: u('photo-1518548419970-58e3b4079ab2'), title: 'Ubud back lane', note: 'Scooters, incense, offerings on the step.' },
    { kind: 'dish', src: u('photo-1559847844-5315695dadae'), title: 'Satay by the beach', note: 'Charcoal smoke and peanut sauce.' },
  ],
  'Cape Town': [
    { kind: 'street', src: u('photo-1580060839134-75a5edca2e99'), title: 'Bo-Kaap', note: 'Every house a different colour.' },
    { kind: 'dish', src: u('photo-1544025162-d76694265947'), title: 'Braai', note: 'Sunday, a fire, and everyone you know.' },
    { kind: 'street', src: u('photo-1576485375217-d6a95e34d043'), title: 'Long Street', note: 'Table Mountain at the end of every road.' },
    { kind: 'dish', src: u('photo-1626074353765-517a681e40be'), title: 'Cape Malay curry', note: 'Sweet, spiced, with roti to tear.' },
  ],
  Sydney: [
    { kind: 'street', src: u('photo-1523428096881-5bd79d043006'), title: 'Circular Quay', note: 'Ferries, gulls, the Opera House glowing.' },
    { kind: 'dish', src: u('photo-1525351484163-7529414344d8'), title: 'Avo toast and a flat white', note: 'The national breakfast.' },
    { kind: 'street', src: u('photo-1506905925346-21bda4d32df4'), title: 'Bondi to Coogee', note: 'The coast walk, early, before the heat.' },
    { kind: 'dish', src: u('photo-1559742811-822873691df8'), title: 'Fish and chips', note: 'Barramundi, at the beach, from the paper.' },
  ],
  Rome: [
    { kind: 'street', src: u('photo-1529260830199-42c24126f198'), title: 'Trastevere', note: 'Cobblestones and laundry lines.' },
    { kind: 'dish', src: u('photo-1612874742237-6526221588e3'), title: 'Carbonara', note: 'Guanciale, pecorino, no cream. Ever.' },
    { kind: 'street', src: u('photo-1515542622106-78bda8ba0e5b'), title: 'Colosseum at night', note: 'Quieter than you think.' },
    { kind: 'dish', src: u('photo-1557142046-c704a3adf364'), title: 'Gelato', note: 'Pistachio and dark chocolate, walking.' },
  ],
  Bangkok: [
    { kind: 'street', src: u('photo-1563492065599-3520f775eeed'), title: 'Yaowarat Road', note: 'Chinatown after dark. Everything is sizzling.' },
    { kind: 'dish', src: u('photo-1559314809-0d155014e29e'), title: 'Pad thai', note: 'From a cart, on a plastic stool.' },
    { kind: 'street', src: u('photo-1508009603885-50cf7c579365'), title: 'Wat Arun', note: 'Cross the river for it at golden hour.' },
    { kind: 'dish', src: u('photo-1562802378-063ec186a863'), title: 'Mango sticky rice', note: 'Coconut cream, sesame, a warm evening.' },
  ],
}

const CONTINENT_SCENES = {
  EU: [
    { kind: 'street', src: u('photo-1467269204594-9661b134dd2b'), title: 'Old town', note: 'Narrow streets and long dinners.' },
    { kind: 'dish', src: u('photo-1414235077428-338989a2e8c0'), title: 'A long lunch', note: 'Two hours minimum.' },
  ],
  AS: [
    { kind: 'street', src: u('photo-1480796927426-f609979314bd'), title: 'Night market', note: 'Follow the smoke.' },
    { kind: 'dish', src: u('photo-1455619452474-d2be8b1e70cd'), title: 'Noodles', note: 'Slurping is a compliment.' },
  ],
  NA: [
    { kind: 'street', src: u('photo-1449824913935-59a10b8d2000'), title: 'Downtown', note: 'Wide streets, big sky.' },
    { kind: 'dish', src: u('photo-1550547660-d9450f859349'), title: 'Diner plate', note: 'Coffee refills included.' },
  ],
  SA: [
    { kind: 'street', src: u('photo-1483729558449-99ef09a8c325'), title: 'Hillside colours', note: 'Music from somewhere above.' },
    { kind: 'dish', src: u('photo-1599974579688-8dbdd335c77f'), title: 'Street grill', note: 'Lime, salt, and a cold drink.' },
  ],
  AF: [
    { kind: 'street', src: u('photo-1489749798305-4fea3ae63d43'), title: 'Market morning', note: 'Spices before the sun is high.' },
    { kind: 'dish', src: u('photo-1547592180-85f173990554'), title: 'Shared plate', note: 'Eat with your hands, with everyone.' },
  ],
  OC: [
    { kind: 'street', src: u('photo-1507699622108-4be3abd695ad'), title: 'Harbour city', note: 'The water is never far.' },
    { kind: 'dish', src: u('photo-1484723091739-30a097e8f929'), title: 'Brunch', note: 'It is a whole culture here.' },
  ],
}

export function scenesFor(city) {
  if (!city) return []
  return CITY_SCENES[city.name] || CONTINENT_SCENES[city.continent] || CONTINENT_SCENES.EU
}

// A flat, shuffled-feeling list for the landing page: alternate streets and dishes.
export function featuredScenes(limit = 8) {
  const out = []
  const names = Object.keys(CITY_SCENES)
  for (let i = 0; out.length < limit; i++) {
    const name = names[i % names.length]
    // Even slots take a street, odd slots a dish, so the grid alternates.
    const pick = CITY_SCENES[name][((i % 2) + 2 * Math.floor(i / names.length)) % 4]
    if (pick) out.push({ ...pick, city: name })
  }
  return out
}
