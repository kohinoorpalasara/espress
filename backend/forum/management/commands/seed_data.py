from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from forum.models import UserProfile, City, Post


CITIES_DATA = [
    {
        'name': 'Paris',
        'country': 'France',
        'continent': 'EU',
        'description': 'The City of Light dazzles visitors with its iconic Eiffel Tower, world-class museums like the Louvre, and legendary cuisine. Stroll along the Seine, explore charming Montmartre, and indulge in croissants at a sidewalk cafe.',
        'image_url': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    },
    {
        'name': 'Tokyo',
        'country': 'Japan',
        'continent': 'AS',
        'description': 'A city where ancient temples coexist with neon-lit skyscrapers, Tokyo offers an extraordinary blend of tradition and modernity. From the serene Meiji Shrine to the electrifying streets of Shibuya, every corner reveals something new.',
        'image_url': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    },
    {
        'name': 'New York',
        'country': 'United States',
        'continent': 'NA',
        'description': 'The city that never sleeps captivates with its towering skyline, Central Park, diverse neighborhoods, and cultural melting pot. From Broadway shows to world-class dining, New York City offers endless possibilities.',
        'image_url': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    },
    {
        'name': 'Bali',
        'country': 'Indonesia',
        'continent': 'AS',
        'description': 'This Indonesian paradise island enchants visitors with terraced rice paddies, ancient Hindu temples, and stunning beaches. Ubud offers spiritual retreats while Seminyak beckons with surf and sunsets.',
        'image_url': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    },
    {
        'name': 'Cape Town',
        'country': 'South Africa',
        'continent': 'AF',
        'description': 'Nestled between Table Mountain and the Atlantic Ocean, Cape Town is one of the world\'s most spectacular cities. Explore the Cape Winelands, visit Robben Island, or hike up Table Mountain for breathtaking panoramas.',
        'image_url': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    },
    {
        'name': 'Sydney',
        'country': 'Australia',
        'continent': 'OC',
        'description': 'Australia\'s harbor city dazzles with its iconic Opera House, Harbour Bridge, and golden beaches like Bondi. A cosmopolitan city with a relaxed outdoor lifestyle, Sydney combines natural beauty with urban sophistication.',
        'image_url': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    },
    {
        'name': 'Rome',
        'country': 'Italy',
        'continent': 'EU',
        'description': 'The Eternal City is an open-air museum where ancient ruins, Renaissance art, and vibrant street life converge. Toss a coin in the Trevi Fountain, explore the Colosseum, and savor authentic pasta in a trattoría.',
        'image_url': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    },
    {
        'name': 'Bangkok',
        'country': 'Thailand',
        'continent': 'AS',
        'description': 'Thailand\'s vibrant capital is a sensory feast of ornate temples, floating markets, street food stalls, and rooftop bars. The Grand Palace and Wat Phra Kaew showcase Thai craftsmanship, while the Chatuchak Market offers endless shopping.',
        'image_url': 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    },
]

POSTS_DATA = {
    'Paris': [
        ('Hidden Gems of Montmartre', 'I spent three days exploring Montmartre and discovered so many incredible spots beyond the tourist trail. The Place du Tertre fills with artists each morning, and the nearby vineyard is surprisingly peaceful. Make sure to visit La Maison Rose for photos and grab a crepe from the street vendors on Rue Lepic.'),
        ('Best Croissants in Paris', 'After extensively testing croissants across the city, I can confidently say Du Pain et des Idées makes the best ones in Paris. Arrive early because they sell out by 11am. The pistache-chocolat escargot is absolutely divine. Pair it with a cafe au lait and you have the perfect Parisian morning.'),
        ('Navigating the Louvre Like a Pro', 'The Louvre is overwhelming unless you have a strategy. Book tickets online to skip the main entrance line, then enter through the Richelieu wing. Focus on one wing per visit — trying to see everything in a day is a recipe for museum fatigue. The Denon wing has the Mona Lisa and Venus de Milo.'),
        ('A Weekend on the Seine', 'Renting a bicycle and cycling along the Seine from Notre-Dame to the Eiffel Tower is one of the best ways to see Paris. Stop at the bouquinistes (booksellers) along the Left Bank, grab lunch at one of the riverside cafes, and watch the bateaux mouches glide by. Pure magic.'),
        ('Paris on a Budget', 'Paris can be done affordably! Most museums are free on the first Sunday of each month. Picnics in the Tuileries garden or Luxembourg Gardens cost almost nothing. Boulangeries sell day-old baguettes for 50 cents. The Metro is efficient and cheap. You can have an amazing Paris trip without breaking the bank.'),
    ],
    'Tokyo': [
        ('Tokyo Food Guide: Ramen Edition', 'Tokyo\'s ramen scene is extraordinarily diverse. Ichiran in Shinjuku offers solo dining booths perfect for shy travelers. Fuunji in Shinjuku station serves incredible tsukemen (dipping noodles). For classic shoyu ramen, head to Afuri in Harajuku. Budget around 1000-1500 yen per bowl.'),
        ('Navigating Tokyo Transit', 'The Tokyo subway system looks intimidating but is actually very logical. Get a Suica card and load it up — it works on all trains and even at convenience stores. Google Maps gives perfect transit directions. During rush hour (7-9am, 6-8pm) trains are extremely crowded, so try to travel off-peak.'),
        ('Exploring Yanaka: Old Tokyo', 'Yanaka is one of the few neighborhoods that survived WWII bombing intact, preserving old Edo-era atmosphere. The cemetery is beautiful for walks, and Yanaka Ginza shopping street has affordable snacks and crafts. It\'s a tranquil escape from the frenetic energy of Shinjuku and Shibuya.'),
        ('Teamlab Borderless: Worth the Hype?', 'Absolutely yes. Teamlab Borderless is unlike any digital art experience I\'ve had. The immersive rooms where projections respond to your movement feel genuinely magical. Book tickets months in advance as they sell out fast. Go on a weekday morning to avoid crowds. Allow at least 3 hours.'),
        ('Day Trip to Nikko', 'A 2-hour train ride from Tokyo brings you to Nikko, home to some of Japan\'s most ornate shrines. The Toshogu Shrine complex is extraordinary — all gold, lacquer, and intricate carvings. The surrounding forests and waterfalls make it a beautiful contrast to urban Tokyo. Perfect day trip.'),
    ],
    'New York': [
        ('The Best Pizza in NYC', 'The pizza wars rage on but here are my favorites: Di Fara in Brooklyn for the classic experience, Prince Street Pizza in Nolita for the spicy square slice, and Lucali in Carroll Gardens for the best date night pizza. Skip the tourist traps in Times Square entirely.'),
        ('A Walk Across the Brooklyn Bridge', 'Walking the Brooklyn Bridge is free, takes about 30 minutes, and gives you some of the best views of Manhattan. Start from the Brooklyn side for better photos. Stop at Brooklyn Bridge Park afterward for views back at the bridge, then head to DUMBO for brunch.'),
        ('Hidden Bars of the Lower East Side', 'The LES has an incredible bar scene if you know where to look. Attaboy has no menu — just tell the bartender what flavors you like. Death & Co. makes exceptional cocktails. Sundown serves natural wine in a cozy setting. Bar Goto offers Japanese-inspired cocktails in a serene atmosphere.'),
        ('Central Park: Beyond the Obvious', 'Most tourists stick to the southern end of Central Park. Head north to find the Harlem Meer, the Conservatory Garden (free to enter, beautiful in spring), and the North Woods for a surprisingly wild hike. Rent a rowboat at the Loeb Boathouse for a classic NYC experience.'),
        ('Brooklyn Flea Weekend Guide', 'The Brooklyn Flea runs on weekends at various locations. Fort Greene on Sundays has the best vintage clothing selection. Smorgasburg next door serves outstanding food from local vendors — the ramen burger and the lobster roll are legendary. Arrive hungry and come cash-ready.'),
    ],
    'Bali': [
        ('Sunrise at Mount Batur', 'Waking at 2am to hike Mount Batur is completely worth it. The 2-hour trek to the summit is challenging but manageable. Watching the sunrise over the clouds while eating a banana cooked in volcanic steam is one of those experiences that stays with you forever. Book a guide through your accommodation.'),
        ('Ubud: Beyond the Yoga Studios', 'Ubud has become very touristy but there are still authentic experiences. Visit the Tegallalang rice terraces at dawn before the crowds. The Ubud Traditional Art Market opens at 8am with better prices than afternoon shopping. The Sacred Monkey Forest is genuinely magical despite the Instagram crowds.'),
        ('Finding Quiet Beaches in Bali', 'Kuta and Seminyak get all the attention but Amed on the east coast has black sand beaches, incredible snorkeling, and almost no crowds. Nusa Penida is harder to reach but has the most dramatic cliffs and crystal waters. Rent a scooter and explore the coastline at your own pace.'),
        ('Bali Spiritual Ceremonies', 'With some 20,000 temples, religious ceremonies happen daily across Bali. Ask your accommodation about upcoming ceremonies open to respectful visitors. Always dress modestly (sarong and sash required at temples) and follow local guidance. Witnessing a Kecak fire dance at sunset at Uluwatu is truly unforgettable.'),
        ('Bali Food Beyond Nasi Goreng', 'While nasi goreng is excellent everywhere, dig deeper into Balinese cuisine. Try babi guling (suckling pig) at Ibu Oka in Ubud. Bebek betutu (slow-cooked duck) takes 24 hours to prepare. Jimbaran seafood restaurants set tables on the beach at sunset. Warung food stalls offer the most authentic and affordable meals.'),
    ],
    'Cape Town': [
        ('Table Mountain: Cable Car vs Hiking', 'Both options are great. The cable car is easy and gives instant dramatic views. Hiking takes 2-3 hours but the sense of achievement is incredible. The Platteklip Gorge route is the most popular trail. Check the weather app before going — the mountain makes its own clouds and can be shrouded in minutes.'),
        ('Cape Point and the Peninsula', 'Rent a car and drive the Cape Peninsula for a full day of spectacular scenery. The Chapman\'s Peak drive is jaw-dropping. Cape Point has both the old and new lighthouses worth visiting. Boulder\'s Beach has a colony of African penguins you can get surprisingly close to. End with sundowners in Hout Bay.'),
        ('Exploring the Cape Winelands', 'Stellenbosch is just 45 minutes from Cape Town and produces world-class wines. Spier Estate and Boschendal are beautiful properties open for tastings. The Jordan Restaurant on Jordan Wine Estate has exceptional food. Franschhoek is even more picturesque. Consider hiring a driver so everyone can enjoy the tastings.'),
        ('Cape Town Street Art Scene', 'The Woodstock neighborhood has been transformed by street art, particularly along Albert Road. The City Bowl also has incredible murals. Follow the Cape Town Street Art collective on social media for guided walk schedules. The contrast between the colorful art and the mountain backdrop makes for amazing photography.'),
        ('Safety Tips for Cape Town Travelers', 'Cape Town is wonderful but requires some awareness. Avoid walking with valuables visible, especially at night. Use Uber rather than hailing taxis. The City Bowl, Waterfront, and Southern Suburbs are generally safe. The tourist areas around the cable car station can have pick-pockets. Travel with locals or guided tours to townships.'),
    ],
    'Sydney': [
        ('Sydney Opera House: More Than a Photo', 'The Opera House is even more impressive up close. Take the guided tour to see backstage areas and learn about Jorn Utzon\'s revolutionary design. Better yet, book a performance — even a one-hour early morning children\'s concert gives you the experience from inside. The bar overlooking the harbour is excellent at sunset.'),
        ('Bondi to Coogee Coastal Walk', 'This 6km clifftop walk is one of Sydney\'s absolute highlights. Starting from Bondi Beach, the path winds past Tamarama, Bronte, Clovelly, and Gordon\'s Bay before reaching Coogee. Allow 2-3 hours. The views are spectacular, the swimming holes are tempting, and the Bondi Icebergs pool is a must-stop.'),
        ('Sydney\'s Best Coffee Scene', 'Sydney takes its coffee seriously. Sample & Hold in Surry Hills consistently wins awards. Single O in Surry Hills is a pioneer of the specialty scene. Artificer Coffee Bar in Surry Hills (yes, Surry Hills is the coffee capital) offers exceptional espresso. The Rocks area has cafes with Opera House views to pair with your latte.'),
        ('Weekend in the Blue Mountains', 'A 2-hour train from Central Station delivers you to the Blue Mountains. The Three Sisters rock formation is iconic, but the Wentworth Falls track rewards with better views. Katoomba township has great cafes and vintage shops. Jenolan Caves nearby are stunning underground chambers. Book accommodation early for weekends.'),
        ('Sydney Harbour by Ferry', 'The Manly Ferry from Circular Quay is a 30-minute journey that gives you the full harbour experience for the price of a transit ticket. Watch the Opera House and Harbour Bridge recede as you cross the water. Manly Beach is great for swimming and the pedestrian mall has good food. Return on a sunset ferry.'),
    ],
    'Rome': [
        ('Beating the Vatican Crowds', 'Book Vatican Museums tickets at least 2 weeks ahead, especially for the Sistine Chapel. Arrive for the 8am opening and head directly to the Sistine Chapel before everyone else arrives. The Vatican Gardens tour gets you into the museums via a different entrance with smaller groups. The Swiss Guard uniform change happens at 9am sharp.'),
        ('Rome\'s Best Gelato', 'Avoid any gelato place near a major tourist attraction — they\'re almost always inferior and overpriced. Giolitti near the Pantheon is a Roman institution since 1900. Fatamorgana in the Prati neighborhood makes inventive flavors. Gelateria dei Gracchi near the Vatican uses seasonal ingredients. Look for gelato stored in metal lidded containers, not piled in mountains.'),
        ('The Trastevere Neighborhood', 'Trastevere at night is Rome at its most romantic. The medieval streets lit by warm lamplight, ivy-covered facades, and piazzas filled with laughter and wine. Arrive before 7pm to secure a table at Da Enzo al 29 for cacio e pepe. After dinner, wander to the Piazza Santa Maria in Trastevere for the beautiful illuminated basilica.'),
        ('Ancient Rome in a Day', 'If you only have one day for ancient sites: start at the Colosseum (pre-book tickets), walk to the Roman Forum, then to Palatine Hill (included in same ticket). Afternoon, visit the Borghese Gallery (must book). End at the Pantheon, which is free and absolutely awe-inspiring. The oculus in the ceiling has inspired architects for 2000 years.'),
        ('Rome\'s Neighborhood Markets', 'Campo de\' Fiori market runs weekday mornings with produce, flowers, and local vendors. The Porta Portese flea market on Sunday mornings in Trastevere is enormous — arrive early for best finds. Testaccio Market is where Romans actually shop for food and is excellent for a street food lunch of supplì (fried rice balls) and artichokes.'),
    ],
    'Bangkok': [
        ('Bangkok Street Food Guide', 'Start your Bangkok food adventure at Or Tor Kor Market near Chatuchak for premium quality produce and prepared foods. Yaowarat Road (Chinatown) at night offers incredible dim sum, roasted duck, and mango sticky rice. Pad Thai from Thip Samai on Mahachai Road is legendary. Jay Fai, the Michelin-starred street cook, is worth the queue.'),
        ('Temple Hopping in Bangkok', 'Wat Phra Kaew and the Grand Palace complex is a must-visit but can be done in a morning. Wat Pho next door has the incredible Reclining Buddha. Cross the river by ferry to Wat Arun for its extraordinary spire covered in porcelain fragments. Dress modestly (cover shoulders and knees) or rent appropriate clothing at the entrance.'),
        ('Floating Markets Near Bangkok', 'Damnoen Saduak is the most famous floating market but very touristy. Amphawa market on weekends is more authentic and Bangkok locals actually go there. Talat Rot Fai (Train Market) happens Thursday-Sunday and combines vintage shopping with street food. Take a longtail boat tour through the Bangkok Yai canals for a glimpse of traditional river life.'),
        ('Bangkok Rooftop Bars', 'Bangkok has some of the world\'s best rooftop bars. Vertigo at Banyan Tree has 360-degree views from the 61st floor. Octave at the Marriott Sukhumvit is three stories of rooftop with excellent cocktails. Sky Bar at Lebua is famous from The Hangover Part II. Most have smart casual dress codes and minimum spends, but the views are incredible.'),
        ('Getting Around Bangkok Like a Local', 'The BTS Skytrain and MRT are fast, cheap, and air-conditioned. For rivers and canals, use the Chao Phraya Express Boat — much faster than taxis during traffic. Grab (Southeast Asia\'s Uber) is reliable and affordable. Tuk-tuks are for short distances and always negotiate the price first. The elevated walkways connecting malls beat walking in the heat.'),
    ],
}


class Command(BaseCommand):
    help = 'Seed the database with sample cities, users, and posts'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Create sample users
        user1, created1 = User.objects.get_or_create(
            username='traveler1',
            defaults={
                'email': 'traveler1@example.com',
                'first_name': 'Alex',
                'last_name': 'Morrison',
            }
        )
        if created1:
            user1.set_password('password123')
            user1.save()
            UserProfile.objects.get_or_create(
                user=user1,
                defaults={
                    'bio': 'Avid backpacker and food enthusiast. Visited 40+ countries.',
                    'location': 'San Francisco, CA',
                }
            )
            self.stdout.write(f'  Created user: traveler1')

        user2, created2 = User.objects.get_or_create(
            username='traveler2',
            defaults={
                'email': 'traveler2@example.com',
                'first_name': 'Sarah',
                'last_name': 'Chen',
            }
        )
        if created2:
            user2.set_password('password123')
            user2.save()
            UserProfile.objects.get_or_create(
                user=user2,
                defaults={
                    'bio': 'Travel photographer and cultural explorer. Always chasing the perfect sunset.',
                    'location': 'New York, NY',
                }
            )
            self.stdout.write(f'  Created user: traveler2')

        # Create cities
        city_objects = {}
        for city_data in CITIES_DATA:
            city, created = City.objects.get_or_create(
                name=city_data['name'],
                country=city_data['country'],
                defaults={
                    'continent': city_data['continent'],
                    'description': city_data['description'],
                    'image_url': city_data['image_url'],
                }
            )
            city_objects[city_data['name']] = city
            if created:
                self.stdout.write(f'  Created city: {city.name}')

        # Create posts
        authors = [user1, user2]
        for city_name, posts in POSTS_DATA.items():
            city = city_objects.get(city_name)
            if not city:
                continue
            for i, (title, body) in enumerate(posts):
                post, created = Post.objects.get_or_create(
                    title=title,
                    city=city,
                    defaults={
                        'body': body,
                        'author': authors[i % 2],
                    }
                )
                if created:
                    self.stdout.write(f'  Created post: {title[:50]}')

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
