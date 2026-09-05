from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from forum.models import UserProfile, City, Post, Comment


class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **options):
        # Create superuser
        if not User.objects.filter(username='admin').exists():
            admin = User.objects.create_superuser('admin', 'admin@espress.com', 'admin123')
            UserProfile.objects.get_or_create(user=admin)
            self.stdout.write('Created superuser: admin')

        # Create traveler user
        if not User.objects.filter(username='traveler').exists():
            traveler = User.objects.create_user(
                username='traveler',
                email='traveler@espress.com',
                password='travel123',
                first_name='Alex',
                last_name='Wanderer'
            )
            UserProfile.objects.create(
                user=traveler,
                bio='Passionate world traveler who loves discovering hidden gems and sharing stories from the road.',
                location='Nomadic'
            )
            self.stdout.write('Created user: traveler')
        else:
            traveler = User.objects.get(username='traveler')

        # Create cities
        cities_data = [
            {
                'name': 'Paris',
                'country': 'France',
                'continent': 'EU',
                'description': 'The City of Light captivates visitors with its iconic Eiffel Tower, world-class cuisine, and unparalleled art museums. Strolling along the Seine, exploring Montmartre, and sipping espresso at a sidewalk café are experiences that define Parisian life.',
                'image_url': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
            },
            {
                'name': 'Tokyo',
                'country': 'Japan',
                'continent': 'AS',
                'description': 'Tokyo seamlessly blends ancient tradition with cutting-edge modernity. From the serene Meiji Shrine to the neon-lit streets of Shinjuku, this megacity offers an endless array of experiences, incredible food, and unmatched efficiency.',
                'image_url': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
            },
            {
                'name': 'New York',
                'country': 'USA',
                'continent': 'NA',
                'description': 'The city that never sleeps pulses with energy around the clock. From Central Park to Times Square, the Brooklyn Bridge to world-famous museums, New York is a universe of neighborhoods, cultures, and experiences compressed into one magnificent island.',
                'image_url': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
            },
            {
                'name': 'Bali',
                'country': 'Indonesia',
                'continent': 'AS',
                'description': 'Bali enchants with its lush rice terraces, ancient temples, and spiritual atmosphere. The island strikes a perfect balance between vibrant beach culture in Seminyak, artistic heritage in Ubud, and spiritual serenity at Tanah Lot temple.',
                'image_url': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
            },
            {
                'name': 'Cape Town',
                'country': 'South Africa',
                'continent': 'AF',
                'description': 'Nestled between Table Mountain and the Atlantic Ocean, Cape Town is one of the world\'s most scenic cities. Stunning beaches, world-class wine regions, diverse wildlife, and a rich cultural history make it an unmissable destination.',
                'image_url': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
            },
            {
                'name': 'Sydney',
                'country': 'Australia',
                'continent': 'OC',
                'description': 'Sydney dazzles with its iconic Opera House and Harbour Bridge, world-renowned beaches like Bondi, and a laid-back lifestyle that\'s distinctly Australian. The city\'s mix of outdoor adventures, fantastic food, and multicultural neighborhoods is truly irresistible.',
                'image_url': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            },
            {
                'name': 'Rome',
                'country': 'Italy',
                'continent': 'EU',
                'description': 'The Eternal City is an open-air museum where every cobblestone has a story. Walking from the Colosseum to the Pantheon, tossing a coin in the Trevi Fountain, and savoring authentic Roman pasta are bucket-list experiences that never disappoint.',
                'image_url': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
            },
            {
                'name': 'Bangkok',
                'country': 'Thailand',
                'continent': 'AS',
                'description': 'Bangkok overwhelms the senses in the most wonderful way. Gilded temples, floating markets, sizzling street food, and rooftop bars overlooking the Chao Phraya River create an intoxicating mix that keeps travelers coming back again and again.',
                'image_url': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
            },
        ]

        cities = {}
        for city_data in cities_data:
            city, created = City.objects.get_or_create(
                name=city_data['name'],
                country=city_data['country'],
                defaults={
                    'continent': city_data['continent'],
                    'description': city_data['description'],
                    'image_url': city_data['image_url'],
                }
            )
            cities[city.name] = city
            if created:
                self.stdout.write(f'Created city: {city.name}')

        # Posts data per city
        posts_data = {
            'Paris': [
                {
                    'title': 'A Week in Paris: Beyond the Tourist Trail',
                    'body': '''Paris is so much more than the Eiffel Tower and the Louvre, though both are absolutely worth your time. After spending a week here, I discovered that the magic lies in the neighborhoods that tourists rarely visit.

Start your mornings in Le Marais, where the boulangeries open at dawn and the smell of fresh croissants fills the narrow medieval streets. Grab a pain au chocolat and wander through the Place des Vosges, Paris's oldest planned square, where Victor Hugo once lived.

For lunch, head to the Canal Saint-Martin neighborhood in the 10th arrondissement. This is where young Parisians actually hang out, sitting along the iron footbridges with a bottle of wine and a baguette. The cafes here are affordable and the atmosphere is genuinely local.

The Musée d'Orsay deserves at least half a day - the Impressionist collection on the top floor alone is worth the trip. Monet, Renoir, Degas... seeing these works in person is a completely different experience from photographs.

Don't miss an evening in Montmartre. Yes, it gets crowded, but if you arrive just before sunset and find your way to the quieter streets behind the Sacré-Cœur, you'll discover stunning views over the city and bistros where locals actually dine.

My tip: buy a carnet of metro tickets and use the Paris Visite card sparingly. Walk as much as possible - Paris is a city that reveals itself to those willing to get lost.''',
                },
                {
                    'title': 'The Perfect Parisian Cafe Crawl',
                    'body': '''Coffee culture in Paris is an art form. Forget everything you know about Starbucks - here, the cafe is a social institution, a place to linger, debate philosophy, and watch the world go by for as long as you like.

My favorite discovery was Café de Flore in Saint-Germain-des-Prés. Yes, it's touristy, but the history is undeniable - Sartre and Simone de Beauvoir held court here for decades. Order a café crème and a tartine, and take your time.

For something more modern, Telescope near the Palais Royal serves exceptional specialty coffee in a tiny but perfectly designed space. The baristas know their craft and can recommend beans that suit your taste perfectly.

The café au lait at Café de la Paix near the Opera is an experience in itself - the Belle Époque interior is breathtaking and the terrace overlooking the Paris Opera House is simply magical, especially in the golden afternoon light.

Remember: in Paris, you pay for the privilege of sitting at a terrace table. It costs more than standing at the bar, but you're really paying for the use of the most beautiful outdoor living rooms in the world. Completely worth it.''',
                },
                {
                    'title': 'Hidden Gardens of Paris You Never Knew Existed',
                    'body': '''Most visitors rush from monument to monument without ever discovering Paris's extraordinary network of hidden gardens and green spaces. As someone who spent three weeks here specifically to find these gems, let me share my discoveries.

The Promenade Plantée is a converted railway viaduct transformed into an elevated park - years before New York built the High Line, Paris did it first. Walking its length gives you views over rooftops and through windows that no street-level perspective can offer.

Parc des Buttes-Chaumont in the 19th arrondissement is Paris's most dramatic park, with a lake, a rocky island temple, and cliffs that feel completely removed from the urban sprawl. Bring a picnic on a Sunday and join the families, students, and couples who make this their outdoor living room.

The Jardin des Plantes deserves a full afternoon. Beyond the botanical gardens, there's a natural history museum, a small zoo, and ancient cedar trees that were already mature when the French Revolution began.

My absolute favorite is Square du Vert-Galant at the tip of the Île de la Cité. Hidden below the level of the bridges, this triangular garden points directly up the Seine. On a summer evening, watching the boats and the setting sun from here, Paris feels like the most beautiful city on earth.''',
                },
            ],
            'Tokyo': [
                {
                    'title': 'Tokyo on a Budget: The Art of the Cheap Eat',
                    'body': '''Tokyo has a reputation for being expensive, but after spending two months here I can tell you it's one of the most affordable cities in Asia if you know where to eat. And eating well is what Tokyo is all about.

The convenience stores - 7-Eleven, FamilyMart, Lawson - are secretly some of the best food destinations in the city. Onigiri (rice balls) for ¥120, surprisingly good hot food stations, fresh sandwiches and sushi. Don't be too proud for the konbini; Tokyo's convenience store food would win awards in most other countries.

Ramen is the ultimate budget meal and Tokyo has hundreds of regional styles. My favorites are the tonkotsu shops in Shinjuku that open at midnight and serve until dawn. There's something magical about a steaming bowl of rich broth at 2am surrounded by salarymen unwinding after long days.

The depachika - basement food halls in department stores - are free to enter and offer tastes of everything from fresh mochi to grilled skewers. It's completely acceptable to have a mini-meal just by grazing through these extraordinary food bazaars.

For sit-down meals, look for the teishoku lunch sets offered at most Japanese restaurants between 11am and 2pm. You'll typically get a main dish, rice, miso soup, and pickles for ¥800-1200. These same dishes would cost three times as much at dinner.''',
                },
                {
                    'title': 'Finding Zen in Tokyo: Temples and Shrines Beyond Senso-ji',
                    'body': '''Senso-ji is magnificent, but arriving at 8am with ten thousand other tourists slightly diminishes the spiritual experience. Tokyo has dozens of temples and shrines where you can actually find quiet contemplation without the selfie sticks.

Yanaka is the neighborhood that survived the fire bombings of World War II and retains an atmosphere of old Tokyo that's increasingly rare. The cemetery here is peaceful and beautiful, a place where elderly residents walk their dogs among centuries-old stones while cats nap on grave markers.

Meiji Jingu in Yoyogi Park should be on every itinerary, but the trick is visiting on a weekday morning. The forested approach through towering torii gates at 7am, before the crowds arrive, is genuinely moving. I've visited six times and still get chills walking beneath the trees.

The Nezu Shrine in Bunkyo is famous for its tunnel of small torii gates (similar to Kyoto's Fushimi Inari but much less crowded). The iris garden in June is spectacular. If you're here during the Azalea Festival in late April, the hillside blooms are extraordinary.

Finally, Zenpukuji-koen in Suginami, a residential neighborhood, offers two linked ponds surrounded by massive ancient trees. No tour groups come here. Turtles sun themselves on logs while children feed the ducks. This is Tokyo at its most peacefully human.''',
                },
                {
                    'title': 'Tokyo Neighborhoods: A Local\'s Guide to Each Ward',
                    'body': '''Tokyo isn't really one city - it's dozens of distinct neighborhoods stitched together by one of the world's best transit systems. Each ward has its own personality, and understanding this transforms your visit.

Shimokitazawa is where young Tokyo comes to be itself. Vintage clothing shops, tiny live music venues, indie theaters, and coffee shops where the barista has considered their pourover technique with the seriousness of a Michelin-starred chef. Come on a weekend afternoon and just wander.

Akihabara is Electric Town, and even if you're not into anime or electronics, the sheer sensory overload of its main street is worth experiencing. The energy is frenetic and completely unique to Tokyo.

Koenji has been called Tokyo's Brooklyn - artists, musicians, and students have kept rents affordable by sheer force of creative willpower. The weekend flea markets here are legendary for vintage finds at reasonable prices.

Nakameguro along the canal is beautiful in any season, but during cherry blossom season (late March/early April), it transforms into something from a dream. The weeping cherry trees line the canal on both sides and the petals fall into the water like pink snow.

For authentic working-class Tokyo, explore Kiyosumi-Shirakawa. Once a shitamachi craftsman district, it's now ground zero for Tokyo's specialty coffee scene without having lost its working neighborhood character.''',
                },
                {
                    'title': 'The Japanese Countryside from Tokyo: Day Trips Worth Taking',
                    'body': '''The Shinkansen network transforms Japan into a country where major cities feel like neighborhoods. From Tokyo, incredible day trips are possible that completely change your sense of what Japan is.

Nikko is an hour and forty minutes north and contains some of Japan's most elaborate shrine architecture. The Tosho-gu shrine complex, built to enshrine Tokugawa Ieyasu, is ornate to the point of overwhelming. The surrounding cedar forests and waterfalls provide perfect counterpoint to all the gold leaf.

Kamakura, forty-five minutes south, offers seaside temples, the famous Great Buddha, and hiking trails through forested hills connecting various shrines. Arrive early and hike the Daibutsu Hiking Course before the heat and crowds build up.

Hakone should really be an overnight trip, but ambitious day-trippers can see Mt. Fuji (weather permitting), soak in an onsen with mountain views, and ride the ropeway over volcanic Owakudani in a single long day. I recommend the Hakone Free Pass for unlimited transport.

Least-visited but most surprising: Chichibu, a river valley an hour and a half from Shinjuku, offers sake breweries, Shinto pilgrimage routes, rafting, and rural Japan that feels completely removed from the megalopolis at the end of the train line.''',
                },
            ],
            'New York': [
                {
                    'title': 'New York Like a Local: Neighborhoods They Don\'t Put in Guidebooks',
                    'body': '''After living in New York for three years, I still discover neighborhoods that surprise me. The city is too large and too constantly reinventing itself for any guidebook to keep pace. Here's where I actually spend my time.

Flushing, Queens is the most authentic Chinese food destination outside of China. The underground food courts beneath the main commercial streets serve regional specialties - Sichuan, Cantonese, Shanghainese, Taiwanese - that blow away anything in Manhattan. Take the 7 train to the last stop and start exploring.

Jackson Heights in Queens might be New York's most culturally diverse neighborhood, with Bangladeshi, Indian, Nepali, Colombian, Mexican, and Tibetan communities all within walking distance. The Roosevelt Avenue strip offers some of the best South Asian sweets and snacks in America.

Sunset Park in Brooklyn has a thriving Chinese community on Eighth Avenue and a Mexican neighborhood further south. Industry City on the waterfront has transformed old factory buildings into a food and creative hub with stunning harbor views.

Inwood at the top of Manhattan is where my family lives and where real New Yorkers raise their children. Fort Tryon Park and the Cloisters medieval museum are treasures that most tourists never find. The Dominican restaurants on Dyckman Street serve some of the city's best traditional food.

Skip the High Line (or visit at 7am), skip the Meatpacking District, and spend a morning in Red Hook Brooklyn instead - waterfront views of the Statue of Liberty, artisan food producers, and a community that feels genuinely itself.''',
                },
                {
                    'title': 'The Met and Beyond: New York\'s World-Class Museums',
                    'body': '''New York has more great museums per square mile than anywhere else on earth, and most visitors only see a fraction of what's available. The Metropolitan Museum of Art alone would take weeks to properly explore - its Egyptian Temple of Dendur, the arms and armor galleries, and the rooftop installation with views over Central Park are just the beginning.

The Museum of Natural History is not just for kids - the Hall of Ocean Life with its 94-foot blue whale, the Rose Center for Earth and Space, and the gem and mineral halls are stunning for visitors of any age. Go early on a weekday.

The Frick Collection, housed in the Gilded Age mansion of Henry Clay Frick, offers an intimate experience with some of the world's greatest Old Master paintings. Vermeer, Rembrandt, El Greco - in a setting that makes you feel like you've been invited to someone's extraordinary home.

The Whitney Museum of American Art in the Meatpacking District has its own outdoor terraces with fantastic views of the Hudson and the Meatpacking District below. Their collection of 20th-century American art is the finest in existence.

My personal favorites are the smaller institutions: the Morgan Library's reading room is one of the most beautiful rooms in America; the Neue Galerie on Museum Mile specializes in early 20th-century German and Austrian art and has the best café of any museum in New York.''',
                },
                {
                    'title': 'Surviving and Thriving: First-Timer\'s Guide to NYC',
                    'body': '''New York can overwhelm first-time visitors. The scale, the pace, the noise - it takes a day or two to calibrate. Here's what I wish someone had told me before my first visit.

The subway is the only way to move efficiently. Buy a MetroCard immediately and put at least $20 on it. Yes, the system is old and sometimes infuriating, but it runs 24 hours and covers essentially everywhere you want to go. The confusion passes quickly.

Walk the bridges. The Brooklyn Bridge is magnificent, but also consider the Manhattan Bridge (better views of the Brooklyn Bridge itself) and the Williamsburg Bridge (less crowded, great views of the Manhattan skyline). These are free and provide perspectives that no building or boat tour can match.

Eat at the extremes. New York has both the world's greatest fine dining (book Eleven Madison Park, Le Bernardin, or Per Se months in advance) and extraordinary cheap eats. The hot dog from the cart on the corner of the park, the pizza slice from any non-touristy spot in Brooklyn, the bagel from a proper Jewish deli - these are as much a New York experience as anything with a Michelin star.

Central Park is bigger than you think. Plan to spend a full morning or afternoon there. The Ramble, a deliberately wild section in the middle, is one of the best birding spots on the East Coast. In summer, free Shakespeare in the Park performances are worth queuing for.

Times Square is worth seeing once, briefly, just to understand what it is. Then leave and don't go back.''',
                },
            ],
            'Bali': [
                {
                    'title': 'Ubud: Art, Spirit and Rice Terraces',
                    'body': '''Ubud is Bali's cultural heart and the place that finally made me understand what all the fuss was about. My first impression driving in was disappointment - the main road is choked with traffic and souvenir shops. But walk five minutes off the main drag and the real Ubud reveals itself.

The Campuhan Ridge Walk at dawn is something I'll never forget. Starting from the Pura Gunung Lebah temple and following the narrow path between two river valleys, surrounded by jungle sounds and the smell of incense from offerings left along the path - this is why people come to Bali.

The Tegalalang Rice Terraces just north of Ubud are genuinely spectacular in the early morning before the tour buses arrive. The Subak irrigation system, unchanged for centuries, creates those perfect mirror-like paddies that photograph so beautifully. Hire a local guide to explain the spiritual and agricultural significance - it transforms the experience.

Ubud's warungs - family-owned restaurants - offer some of Bali's best traditional cooking at very reasonable prices. Nasi campur (rice with various accompaniments) is the local staple and the best versions are extraordinary. The babi guling (suckling pig) at Ibu Oka is legitimately one of the best dishes I've eaten anywhere in the world.

The museums in Ubud are genuinely excellent. The Puri Lukisan Museum focuses on traditional Balinese painting, while the Neka Art Museum has a broader collection showing the evolution of Balinese art through the 20th century.''',
                },
                {
                    'title': 'Bali\'s Temple Circuit: A Spiritual Journey',
                    'body': '''Bali has more temples than it has houses, which gives you some sense of how central spirituality is to daily life here. The island is predominantly Hindu in a Muslim-majority country, and this creates a religious intensity that permeates everything.

Tanah Lot, the temple on a rocky islet just offshore, is Bali's most photographed sight. It's also very crowded. Visit at low tide to walk across to the base, or better yet, arrive an hour before sunset and find a spot on the clifftop to watch the sun drop behind the silhouette of the temple. It's genuinely magical despite the crowds.

Pura Besakih, the "Mother Temple" on the slopes of Mount Agung, is Bali's most sacred site and the largest temple complex on the island. The approach through rice fields with Agung's volcano rising above is magnificent. Be warned: the touts at Besakih are persistent and the "mandatory guide" scam is well-established. Go with a trusted local or join a reputable tour.

Pura Luhur Uluwatu on the southern cliffs is where I had my most profound Balinese moment. The clifftop temple at sunset, with the Kecak fire dance performed on an adjacent platform against a backdrop of the Indian Ocean, was absolutely beautiful. Watch your belongings from the resident monkeys.

For something off the circuit, seek out small village temples during odalan (temple anniversary festivals). These celebrations happen roughly every 210 days at each temple and involve elaborate offerings, music, and community. If you're invited to observe, accept graciously.''',
                },
                {
                    'title': 'Surf, Sunset and Seafood: Seminyak and Beyond',
                    'body': '''Bali's south coast is the beach holiday side of the island - a world away from spiritual Ubud - and it does beach life exceptionally well. Seminyak has grown up considerably and offers some of Asia's best beach clubs, restaurants, and sunset cocktail experiences.

Potato Head Beach Club is the standard-bearer of the Bali beach club experience. The architecture is remarkable (made from salvaged antique doors), the pool overlooks the Indian Ocean, and the sundowners are properly mixed. It's expensive by local standards but reasonable by international ones.

For actual surfing, Kuta Beach is fine for beginners but the better breaks are at Berawa, Canggu, and the various reef breaks further along the coast. Batu Bolong Beach in Canggu is where the surfing community actually hangs out, and the warungs along the beach serve the freshest grilled fish I've found in Bali.

Jimbaran Bay is worth a special trip for seafood. The beach is lined with simple restaurants that buy directly from the fishing boats and grill their catch over coconut husks on the beach. Eating grilled tuna and prawns on a low table in the sand as the sun sets over the bay - this is the Bali that stays with you.

Don't skip the Bukit Peninsula in the far south. The Uluwatu surf breaks are world-famous and the clifftop warung above the break at Padang Padang offers cold Bintang beer and arguably the best view in Bali of surfers navigating the reef break below.''',
                },
            ],
            'Cape Town': [
                {
                    'title': 'Table Mountain and the Cape Peninsula: A Day of Wonder',
                    'body': '''Table Mountain deserves its reputation as one of the world's great natural spectacles, but the experience depends enormously on timing and conditions. The cable car is efficient but the hike up Platteklip Gorge (2 hours) gives you a genuine sense of achievement and extraordinary views back over the city.

My strong advice: check the "tablecloth" - the orographic cloud that drapes over the mountain top. A light tablecloth makes for dramatic photographs. A heavy one means you'll see nothing from the top and everything from the cable car will be cancelled. Check the Table Mountain Aerial Cableway website for conditions before heading up.

The Cape Peninsula drive to Cape Point is one of the world's great road trips. Starting at Sea Point, following the Atlantic seaboard through Clifton and Camps Bay, around the mountain to Hout Bay, and then down to the Cape of Good Hope - the scenery changes dramatically every few kilometers.

Boulders Beach near Simon's Town has a colony of African penguins that feels completely surreal. These small, personable birds waddle between sunbathers and play in the surf while tourists watch in delighted disbelief. A morning here with a baguette from the village bakery is a perfect Capetonian experience.

Cape Point itself, at the southwestern tip of the peninsula, has a wild, end-of-the-world quality. The lighthouse views are extraordinary, the hiking trails through fynbos vegetation reveal extraordinary endemic plants, and the Atlantic breakers crashing on the rocks below are genuinely powerful.''',
                },
                {
                    'title': 'Cape Town\'s Food and Wine Revolution',
                    'body': '''Cape Town has quietly become one of the world's great food cities, and its winelands just forty minutes away make it arguably the best place on earth for the intersection of serious cuisine and serious wine.

The Stellenbosch and Franschhoek wine regions produce wines that compete with the world's best at a fraction of the price. My favorites are the Pinotage (uniquely South African), the Chenin Blanc from older vines, and the Bordeaux-style blends from estates like Rust en Vrede and Vergelegen. Most estates offer excellent bistro lunches on their terraces overlooking the vineyards.

Back in the city, the V&A Waterfront has excellent seafood - the West Coast crayfish (spiny lobster) at various restaurants is outstanding when in season. But the real food action is elsewhere.

The Old Biscuit Mill in Woodstock hosts a Saturday morning Neighbourgoods Market that's one of the world's great food markets. Chefs from the city's best restaurants sell directly here, and the diversity of South African and international food is staggering.

For traditional Cape Malay cooking - a unique cuisine blending Dutch, Malay, Indian and African influences - head to the Bo-Kaap neighborhood. The brightly colored houses are the Instagram cliché, but the restaurants serving bobotie (spiced minced meat with egg custard topping) and koeksisters (braided doughnuts in syrup) are the real reason to visit.''',
                },
                {
                    'title': 'Township Tours and the Real Cape Town',
                    'body': '''No visit to Cape Town is complete without engaging with the townships - the neighborhoods created by apartheid where the majority of the city's population still lives. This requires care and cultural sensitivity, but done right, it's among the most eye-opening and ultimately hopeful travel experiences I've had.

Langa, the oldest township in Cape Town, established in 1927, now has a vibrant cultural scene. The Guga S'thebe Arts and Culture Centre hosts exhibitions, performances, and workshops, and there are excellent traditional restaurants and shebeens (informal taverns) where the welcome is warm.

Khayelitsha, the largest township, is where many tour operators concentrate, but rather than passively observing poverty, the better tours connect visitors with community-run enterprises, schools, and the extraordinary informal economy that has developed here. The food tour options are particularly good.

The Zeitz Museum of Contemporary Art Africa (Zeitz MOCAA) in the V&A Waterfront is the world's largest museum of contemporary African art, converted from grain silos into a stunning space by Thomas Heatherwick. The collection challenges any remaining assumptions about African art being peripheral to the global conversation.

Robben Island, where Nelson Mandela spent 18 of his 27 years in prison, is emotionally powerful and politically essential for understanding South Africa's history. The tours are led by former political prisoners. Book well in advance.''',
                },
            ],
            'Sydney': [
                {
                    'title': 'The Sydney Harbour Walk: Australia\'s Great Urban Hike',
                    'body': '''Sydney's greatest asset is its harbour, and the best way to experience it costs nothing beyond comfortable walking shoes. The Bondi to Coogee coastal walk is famous, but the harbour-side walks reveal a different and equally spectacular Sydney.

The Spit Bridge to Manly walk follows the northern beaches and harbor foreshore for about ten kilometers through Sydney Harbour National Park. The Sydney sandstone bushland is extraordinary - distinctive pink-orange rock formations covered in scrubby vegetation with views over the harbor at every promontory. If you're lucky (or smart and bring binoculars), you'll see kookaburras, rainbow lorikeets, and possibly echidnas.

The eastern harbor walk from the Opera House through the Royal Botanic Garden, around Farm Cove, and along to Woolloomooloo and Potts Point takes about two hours at a leisurely pace. The Botanic Garden has century-old Moreton Bay fig trees that are in themselves worth the trip, and the harbourside garden cafe serves excellent coffee.

For the iconic Opera House and Bridge combination photographs, the walk from Circular Quay around to the Rocks neighborhood, then up to the Pylon Lookout on the Harbour Bridge offers perspectives that beat most postcard shots. The BridgeClimb experience is expensive but extraordinary - standing on the apex of the bridge with the harbor spreading in all directions is genuinely unforgettable.

Ferries are my preferred Sydney transport. The Manly ferry is a classic - thirty minutes across the harbor with changing views of the Opera House, the North Shore, and eventually Manly's beach and pine trees.''',
                },
                {
                    'title': 'Sydney\'s Coffee Culture and Cafe Scene',
                    'body': '''Melbourne gets the credit for Australia's coffee obsession, but Sydney has quietly developed a cafe scene that rivals anywhere in the world. The flat white was arguably invented here (sorry Wellington), and the understanding of espresso craft is now universal across the city.

Surry Hills is ground zero for Sydney's independent cafe culture. Streets like Crown Street and Bourke Street are lined with exceptional coffee roasters and cafes. Single O (formerly Single Origin) has been setting standards for over a decade; their retail space and training lab on Reservoir Street is worth visiting just to understand what serious coffee culture looks like.

Newtown in the inner west is Sydney's most bohemian neighborhood and has exceptional cafe density. The stretch of King Street from Newtown Station to St Peters has enough excellent options to fuel a week of mornings. Campos Coffee on Young Street in Newtown is a legend - they started the current specialty coffee wave in Australia.

For breakfast with harbor views, choose Bondi. The strip of cafes along Campbell Parade opposite the beach attracts an absurdly beautiful crowd of surfers, models, and various creative types, and the flat whites are excellent. The Bondi Icebergs pool terrace at the southern end of the beach is worth the slight splurge.

The Rocks, immediately below the Harbour Bridge, has been touristified but retains some great cafes, particularly on the weekend market days. The Museum of Contemporary Art cafe on the waterfront has exceptional harbor views and decent food.''',
                },
                {
                    'title': 'Day Trips from Sydney: The Blue Mountains and Hunter Valley',
                    'body': '''Sydney is an excellent base for exploring two of Australia's most distinctive landscapes. The Blue Mountains to the west and the Hunter Valley wine region to the north are both achievable as day trips, though each deserves more time.

The Blue Mountains are named for the blue haze of eucalyptus oil that hangs over the valley - on hot days it's quite striking. The train to Katoomba takes about two hours and the views from Echo Point of the Three Sisters rock formation are spectacular, if somewhat overrun with tour groups. The real payoff is the bushwalking - the Grand Canyon walk or the National Pass below Wentworth Falls pass through ancient rainforest and fern gullies that feel prehistoric.

Leura, the village before Katoomba, has excellent cafes and galleries and is less crowded. The Sublime Point lookout south of town is quieter than Echo Point and arguably has better views. The Leura Cascades walking track is beautiful in autumn when the deciduous trees in the village gardens are turning.

The Hunter Valley wine region produces excellent Semillon and Shiraz - distinctly Australian styles that reward exploration. The cellar doors are generally open daily and tasting fees are modest. Tyrrell's Wines has been operating since 1858 and their old vine Semillon is genuinely world-class. The Hunter Valley Gardens in Pokolbin are worth including if you're visiting between May and November.

My recommendation: take the train to the Blue Mountains, do the walking, and save the Hunter Valley for a proper overnight trip when you can drink freely without worrying about driving.''',
                },
            ],
            'Rome': [
                {
                    'title': 'Rome in Four Days: The Essential Itinerary',
                    'body': '''Rome is simultaneously one of the easiest and most overwhelming cities to visit. The essential sights are extraordinary but can feel like checkboxes being ticked against enormous crowds. The secret is pacing, early mornings, and remembering that Rome rewards those who sit still.

Day one: the ancient city. The Colosseum and Roman Forum together will take most of the morning - book tickets online to skip the entrance line. The scale of the Forum, where the most important business of the ancient world was conducted for centuries, takes time to absorb. In the afternoon, the Palatine Hill above the Forum offers views over both the Forum and the Circus Maximus.

Day two: Vatican City. Book the Vatican Museums well in advance - the line without tickets can stretch to three hours. The Sistine Chapel is the climax of an already overwhelming collection, and seeing Michelangelo's ceiling in person after years of looking at photographs is genuinely moving. St. Peter's Basilica is free - climb the dome for the best views in Rome.

Day three: the Baroque and the beautiful. The Piazza Navona, the Pantheon (still free, still magnificent), the Trevi Fountain (beautiful despite the crowds), and the Spanish Steps occupy the morning. The afternoon belongs to the Borghese Gallery (strictly timed tickets required) and its extraordinary Bernini sculptures.

Day four: the neighborhoods. Trastevere for lunch and afternoon wandering. The Jewish Ghetto for its excellent restaurants and ancient history. Testaccio, the authentic working-class neighborhood, for an evening at a trattoria where the carbonara has never seen a recipe card.''',
                },
                {
                    'title': 'Eating in Rome: A Passionate Guide to Roman Cuisine',
                    'body': '''Roman cuisine is one of Italy's most distinctive regional traditions - based on offal, pasta, and the produce of the surrounding Lazio countryside. It's emphatically not the Italy of pizza and tourist menus. Understanding what to order, and where, transforms the Roman experience.

The four canonical Roman pastas are cacio e pepe (pasta with aged pecorino and black pepper), carbonara (guanciale, egg, pecorino, black pepper - NO CREAM, NEVER CREAM), amatriciana (guanciale, tomato, pecorino), and gricia (guanciale, pecorino, black pepper - carbonara without the egg). Each should be tried at a proper Roman trattoria.

Suppli (fried rice balls with tomato sauce and mozzarella) are the Roman street food essential. Flattened artichokes fried crisp (carciofi alla giudia) are a Jewish Roman specialty that predates most Italian cuisines. Saltimbocca alla romana - veal with prosciutto and sage in a white wine pan sauce - is what Roman restaurant cooking looks like at its best.

For where to eat: avoid any restaurant with photographs on the menu or touts outside. In Trastevere, seek out the trattorias on the quieter side streets rather than the main piazza. Testaccio has the highest density of authentic Roman cooking in the city. The Prati neighborhood near the Vatican is underrated and the pizza al taglio shops here serve some of Rome's best slices.

Gelato: only from places where the gelato is stored in metal containers with lids, not piled high in colorful mountains. The colorful mountains mean artificial flavors and air inflation. Pistacchio that's grey-green rather than bright green is the real thing.''',
                },
                {
                    'title': 'Rome\'s Hidden Gems: Art and Architecture Beyond the Obvious',
                    'body': '''Rome's problem isn't a shortage of extraordinary things to see - it's that there are so many extraordinary things that the less-famous ones get overlooked entirely. After five visits, I'm still discovering rooms and churches that stop me in my tracks.

The church of Santa Maria Maggiore on Esquiline Hill has a 5th-century nave that predates most of Rome's famous buildings and the original golden ceiling (paid for by the first gold brought back from the Americas) is staggering. Almost nobody is here. The church of San Clemente has four layers of history stacked vertically - a medieval church over an early Christian church over a Roman house over a Mithraic temple. You descend through centuries of history.

The Palazzo Doria Pamphilj on Via del Corso is a privately owned palace whose family still lives in part of the building. The picture gallery contains an extraordinary collection including Velázquez's portrait of Pope Innocent X - the original, in the room where it was painted. Audio guides narrated by the current Prince Doria Pamphilj give it an intimate quality museums rarely achieve.

The Protestant Cemetery near the Pyramid of Cestius contains the graves of Keats and Shelley among others, and is one of Rome's most peaceful corners. The resident cats, fed by volunteers, drape themselves over the graves in perfect Roman indifference.

Aventine Hill has the Orange Garden with panoramic views of the city, and the Knights of Malta keyhole - a bronze door through which a perfectly framed view of St. Peter's dome appears at the end of a long garden path. This piece of accidental genius has been delighting visitors since the 18th century.''',
                },
            ],
            'Bangkok': [
                {
                    'title': 'Bangkok Street Food: The Ultimate Guide',
                    'body': '''Bangkok's street food scene is the world's greatest, and I say that having eaten on the streets of Tokyo, Hong Kong, Istanbul, and Mexico City. The density, quality, variety, and price of Bangkok street food is simply unmatched anywhere.

The benchmark is Chinatown (Yaowarat Road). Come after dark when the street stalls set up and the smoke from a hundred woks creates a theatrical atmosphere. The goong ob woon sen (glass noodles with prawns) from the longstanding seafood stalls, the roast duck, the boat noodles - this is where serious Thai foodies come to eat.

Sukhumvit Soi 38 was Bangkok's most famous street food destination before development destroyed most of it, but Soi 49 and the surrounding streets still have excellent options. Look for the stalls with the longest queues of Thai people.

For pad thai, the proper version, find Thip Samai on Mahachai Road - a decades-old institution that still has a queue at 10pm. The pad thai wrapped in egg is genuinely different from the tourist versions served elsewhere.

Khao Tom (rice porridge) at dawn - Bangkok has a culture of eating very early breakfast. The open-front restaurants near the fresh markets that serve khao tom with salted egg, fried garlic, and ginger at 6am are serving some of the purest Thai food in the city, to the market workers who just finished their shifts.

My absolute Bangkok street food moment: eating spicy papaya salad (som tam) so hot my eyes streamed, sitting on a plastic stool under fluorescent lights at midnight, surrounded by tuk-tuk drivers and office workers. Nothing has made me feel more at home in a foreign city.''',
                },
                {
                    'title': 'Temples of Bangkok: Beyond Wat Phra Kaew',
                    'body': '''Wat Phra Kaew (Temple of the Emerald Buddha) and the Grand Palace complex are obligatory, and they are spectacular - the scale, the golden spires, the intricate tile work all working together create an effect of overwhelming beauty and power. Book tickets online and dress modestly (shoulders and knees covered, shoes you can remove quickly).

But Bangkok has hundreds of temples, and several less-visited ones offer experiences that are more spiritually concentrated precisely because they're not overrun with tourists.

Wat Pho, immediately south of the Grand Palace, houses the largest reclining Buddha in Thailand - 46 meters long and covered in gold leaf. The surrounding temple grounds are actually older than the Grand Palace and the traditional massage school here is the most legitimate in Bangkok. Get a Thai massage in this extraordinary setting.

Wat Arun (Temple of Dawn) across the Chao Phraya River is best seen from the water at sunset when the spires glow. Climb the steep stairs of the central prang (tower) for views over the river and back towards the Grand Palace.

For locals-only atmosphere, take the river express boat to Wat Ratchanatdaram (the Loha Prasat, or Metal Castle) in the old city. The multi-tiered metal spire is unlike any other Thai temple architecture and the surrounding old neighborhood has excellent food vendors.

Wat Saket on Golden Mount is a hilltop temple reached by a spiral staircase. The views over the old city are excellent and the temple itself has an intimate quality despite being well-known.''',
                },
                {
                    'title': 'Bangkok\'s River: The Chao Phraya as a Living City',
                    'body': '''Bangkok was built on and around the Chao Phraya River, which served as its highway, its market, its spiritual center, and its social fabric for centuries. Understanding the river is understanding Bangkok.

The Chao Phraya Express Boats are the most efficient and atmospheric way to move between many of Bangkok's main attractions. The orange-flag boats stop at most piers; the express boats (yellow, green, blue flag) skip stops but move faster. A day pass is excellent value and the journey itself - navigating between massive rice barges, long-tail boats, and cross-river ferries - is thrilling.

Khlong Saen Saep, the canal that runs east-west through the city, is another boat route that cuts through the middle of Bangkok. The boats are faster, noisier, and more crowded than the river boats, and the canal they run through is frankly filthy, but using this system gives access to neighborhoods (particularly around Jim Thompson House and the Golden Mount area) that would otherwise require expensive taxis.

The Iconsiam mall on the Thonburi side of the river is extraordinary for its combination of luxury retail and the SOOKSIAM market inside, which is a reproduction of a traditional floating market with vendors from across Thailand's regions. The rooftop bar has extraordinary views of the city.

Asiatique the Riverfront is a night market and entertainment complex that, despite being quite commercial, has genuine charm at night. The Ferris wheel over the river at night, the mix of Thai and international food, and the layout along the actual river bank make it a pleasant evening.''',
                },
                {
                    'title': 'Getting Out of Bangkok: Day Trips That Reveal Thailand',
                    'body': '''Bangkok is extraordinary but it can also be exhausting - the heat, the traffic, the constant sensory input. Day trips to the surrounding region offer relief and context that helps make sense of the city itself.

Ayutthaya, the ancient capital destroyed by the Burmese in 1767, is 80 kilometers north and accessible by train in ninety minutes. The ruins of the great temples - including the famous head of the Buddha entwined in tree roots at Wat Mahathat - are deeply moving. The scale of what was once the capital of a major kingdom and the gentleness of the site now make for a day that stays with you.

The floating markets at Damnoen Saduak (a bit commercial but still atmospheric) or the more authentic Amphawa floating market (particularly good on weekends) show the canal-based trade economy that shaped Thai life for centuries. The Amphawa market is also a base for firefly boat tours on the evening.

Kanchanaburi, two hours west, was the site of the Death Railway built by Allied prisoners of war under Japanese occupation. The JEATH Museum and the Bridge on the River Kwai are sobering and important. The surrounding region is beautiful - waterfalls, tiger temples (avoid the controversial tiger interactions), and wooden guesthouses over the river.

For a purely joyful experience: the Maeklong Railway Market, where vendors set up stalls along (and over) an active railway track, and pack up their awnings when the train comes through eight times a day. This is not a tourist construct - it's been operating since the railway was built and the vendors' calm efficiency when the train comes is genuinely impressive.''',
                },
            ],
        }

        for city_name, posts in posts_data.items():
            if city_name not in cities:
                continue
            city = cities[city_name]
            for post_data in posts:
                post, created = Post.objects.get_or_create(
                    title=post_data['title'],
                    defaults={
                        'body': post_data['body'],
                        'author': traveler,
                        'city': city,
                    }
                )
                if created:
                    self.stdout.write(f'  Created post: {post.title[:50]}...')
                    Comment.objects.create(
                        post=post,
                        author=traveler,
                        body=f"Great insights about {city_name}! I had a similar experience when I visited. The local culture really is something special."
                    )
                    admin_user = User.objects.get(username='admin')
                    Comment.objects.create(
                        post=post,
                        author=admin_user,
                        body=f"Thanks for sharing! {city_name} is definitely on my list now. The tips about timing and avoiding tourist traps are invaluable."
                    )

        self.stdout.write(self.style.SUCCESS('Seeding complete!'))
