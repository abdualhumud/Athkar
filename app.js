// ============================================================
// LAMHUB – Full Interactive App
// ============================================================

// ===== GLOBAL STATE =====
let currentLang = 'en';
let currentUser = null;
let cart = [];
let currentRestaurant = null;
let currentItem = null;
let itemQuantity = 1;
let groupOrder = null;
let onboardingStep = 0;
let cartArea = null;
let selectedPayment = 'card';
let deliveryAddress = null; // { label: 'Home'|'Work'|'Other', address: '', lat: 24.7136, lng: 46.6753 }
let savedAddresses = [];

// ===== RESTAURANT DATABASE =====
const AREAS = [
    { id: 'hittin', nameEn: 'Hittin', nameAr: 'حطين', distance: '2.3 km' },
    { id: 'olaya', nameEn: 'Olaya', nameAr: 'العليا', distance: '3.1 km' },
    { id: 'malqa', nameEn: 'Al Malqa', nameAr: 'الملقا', distance: '4.5 km' },
    { id: 'nakheel', nameEn: 'Al Nakheel', nameAr: 'النخيل', distance: '5.2 km' },
    { id: 'kafd', nameEn: 'KAFD', nameAr: 'كافد', distance: '6.0 km' }
];

const RESTAURANTS = [
    // ===== HITTIN =====
    {
        id: 'section-b', name: 'Section-B', area: 'hittin', rating: 4.6,
        cuisineEn: 'Burgers', cuisineAr: 'برجر', priceRange: '25-55',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Burgers', catAr: 'برجر', items: [
                { id: 'sb1', nameEn: 'Classic Smash Burger', nameAr: 'سماش برجر كلاسيك', price: 32, descEn: 'Double beef patties, American cheese, pickles, special sauce', descAr: 'شريحتين لحم بقري، جبنة أمريكية، مخلل، صوص خاص', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop' },
                { id: 'sb2', nameEn: 'Mushroom Swiss Burger', nameAr: 'برجر مشروم سويس', price: 38, descEn: 'Beef patty, sautéed mushrooms, Swiss cheese, truffle mayo', descAr: 'شريحة لحم، مشروم سوتيه، جبنة سويسرية، مايو ترافل', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop' },
                { id: 'sb3', nameEn: 'Chicken Smash', nameAr: 'سماش دجاج', price: 28, descEn: 'Crispy chicken, lettuce, tomato, ranch sauce', descAr: 'دجاج مقرمش، خس، طماطم، صوص رانش', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Sides', catAr: 'جانبيات', items: [
                { id: 'sb4', nameEn: 'Loaded Fries', nameAr: 'بطاطس محملة', price: 18, descEn: 'Crispy fries, cheese sauce, jalapeños, bacon bits', descAr: 'بطاطس مقرمشة، صوص جبنة، هالابينو، بيكون', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop' },
                { id: 'sb5', nameEn: 'Onion Rings', nameAr: 'حلقات بصل', price: 14, descEn: 'Golden fried onion rings with dipping sauce', descAr: 'حلقات بصل مقلية ذهبية مع صوص', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'sb6', nameEn: 'Fresh Lemonade', nameAr: 'ليمونادة طازجة', price: 12, descEn: 'Freshly squeezed lemonade with mint', descAr: 'ليمونادة طازجة بالنعناع', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'smokey-beards', name: 'Smokey Beards Q', area: 'hittin', rating: 4.8,
        cuisineEn: 'BBQ', cuisineAr: 'مشويات', priceRange: '35-75',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'BBQ Platters', catAr: 'أطباق مشويات', items: [
                { id: 'sq1', nameEn: 'Brisket Platter', nameAr: 'طبق بريسكت', price: 48, descEn: 'Slow-smoked brisket, coleslaw, cornbread, pickles', descAr: 'بريسكت مدخن، كولسلو، خبز ذرة، مخلل', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop' },
                { id: 'sq2', nameEn: 'Pulled Pork Sandwich', nameAr: 'ساندويتش لحم مسحب', price: 35, descEn: 'Tender pulled meat, BBQ sauce, coleslaw on brioche', descAr: 'لحم مسحب طري، صوص باربيكيو، كولسلو على بريوش', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=200&fit=crop' },
                { id: 'sq3', nameEn: 'Ribs Half Rack', nameAr: 'نصف رف ريش', price: 62, descEn: 'Baby back ribs, house BBQ glaze, fries', descAr: 'ريش ناعمة، صوص باربيكيو خاص، بطاطس', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Sides', catAr: 'جانبيات', items: [
                { id: 'sq4', nameEn: 'Mac & Cheese', nameAr: 'ماك أند تشيز', price: 16, descEn: 'Creamy three-cheese mac', descAr: 'ماكرونة بثلاث أنواع جبنة', image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=300&h=200&fit=crop' },
                { id: 'sq5', nameEn: 'Coleslaw', nameAr: 'كولسلو', price: 10, descEn: 'Classic creamy coleslaw', descAr: 'كولسلو كلاسيكي', image: 'https://images.unsplash.com/photo-1625938145744-e380515399bf?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'feels', name: 'Feels', area: 'hittin', rating: 4.5,
        cuisineEn: 'Café', cuisineAr: 'كافيه', priceRange: '18-40',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop',
        deliveryTime: '15-25',
        menu: [
            { cat: 'Hot Drinks', catAr: 'مشروبات ساخنة', items: [
                { id: 'f1', nameEn: 'Spanish Latte', nameAr: 'لاتيه إسباني', price: 22, descEn: 'Espresso with condensed milk and steamed milk', descAr: 'إسبريسو مع حليب مكثف وحليب مبخر', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=200&fit=crop' },
                { id: 'f2', nameEn: 'Matcha Latte', nameAr: 'ماتشا لاتيه', price: 24, descEn: 'Premium Japanese matcha with oat milk', descAr: 'ماتشا يابانية فاخرة مع حليب شوفان', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Cold Drinks', catAr: 'مشروبات باردة', items: [
                { id: 'f3', nameEn: 'Iced Spanish Latte', nameAr: 'آيس لاتيه إسباني', price: 24, descEn: 'Iced espresso with condensed milk', descAr: 'إسبريسو مثلج مع حليب مكثف', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop' },
                { id: 'f4', nameEn: 'Berry Smoothie', nameAr: 'سموذي توت', price: 26, descEn: 'Mixed berries, banana, yogurt', descAr: 'توت مشكل، موز، زبادي', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Pastries', catAr: 'معجنات', items: [
                { id: 'f5', nameEn: 'Chocolate Croissant', nameAr: 'كرواسون شوكولاتة', price: 16, descEn: 'Buttery croissant filled with dark chocolate', descAr: 'كرواسون بالزبدة محشو بالشوكولاتة الداكنة', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=300&h=200&fit=crop' },
                { id: 'f6', nameEn: 'Pistachio Cookie', nameAr: 'كوكيز فستق', price: 14, descEn: 'Crunchy pistachio butter cookie', descAr: 'كوكيز زبدة الفستق المقرمشة', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'woods-cafe', name: "Wood's Café & Roastery", area: 'hittin', rating: 4.7,
        cuisineEn: 'Coffee', cuisineAr: 'قهوة', priceRange: '20-45',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=400&fit=crop',
        deliveryTime: '15-25',
        menu: [
            { cat: 'Specialty Coffee', catAr: 'قهوة مختصة', items: [
                { id: 'w1', nameEn: 'V60 Pour Over', nameAr: 'في 60 بور أوفر', price: 28, descEn: 'Single origin Ethiopian, fruity notes', descAr: 'أصل واحد إثيوبي، نكهات فاكهية', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop' },
                { id: 'w2', nameEn: 'Flat White', nameAr: 'فلات وايت', price: 22, descEn: 'Double ristretto with velvety micro-foam', descAr: 'دبل ريستريتو مع رغوة حليب ناعمة', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Food', catAr: 'طعام', items: [
                { id: 'w3', nameEn: 'Avocado Toast', nameAr: 'توست أفوكادو', price: 32, descEn: 'Sourdough, smashed avo, poached egg, chili flakes', descAr: 'خبز حامض، أفوكادو، بيض مسلوق، رقائق فلفل', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop' },
                { id: 'w4', nameEn: 'Granola Bowl', nameAr: 'بول جرانولا', price: 28, descEn: 'Greek yogurt, house granola, honey, mixed berries', descAr: 'زبادي يوناني، جرانولا منزلية، عسل، توت مشكل', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'lunch-room', name: 'Lunch Room', area: 'hittin', rating: 4.4,
        cuisineEn: 'Brunch', cuisineAr: 'برانش', priceRange: '30-60',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Brunch', catAr: 'برانش', items: [
                { id: 'lr1', nameEn: 'Eggs Benedict', nameAr: 'إيجز بينيديكت', price: 38, descEn: 'Poached eggs, hollandaise, English muffin, smoked salmon', descAr: 'بيض مسلوق، صوص هولنديز، مافن إنجليزي، سلمون مدخن', image: 'https://images.unsplash.com/photo-1608039829572-9b0189de3af3?w=300&h=200&fit=crop' },
                { id: 'lr2', nameEn: 'Fluffy Pancakes', nameAr: 'بانكيك هش', price: 32, descEn: 'Stack of 3, maple syrup, fresh berries, whipped cream', descAr: 'ثلاث طبقات، شراب قيقب، توت طازج، كريمة مخفوقة', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop' },
                { id: 'lr3', nameEn: 'Turkish Eggs', nameAr: 'بيض تركي', price: 34, descEn: 'Poached eggs on yogurt, chili butter, sourdough', descAr: 'بيض مسلوق على زبادي، زبدة حارة، خبز حامض', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'lr4', nameEn: 'Fresh Orange Juice', nameAr: 'عصير برتقال طازج', price: 16, descEn: 'Freshly squeezed oranges', descAr: 'برتقال معصور طازج', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop' },
            ]}
        ]
    },

    // ===== OLAYA =====
    {
        id: 'q-on-da-go', name: 'Q ON DA Go', area: 'olaya', rating: 4.5,
        cuisineEn: 'International', cuisineAr: 'عالمي', priceRange: '30-65',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Mains', catAr: 'أطباق رئيسية', items: [
                { id: 'qd1', nameEn: 'Truffle Pasta', nameAr: 'باستا ترافل', price: 45, descEn: 'Creamy truffle mushroom linguine', descAr: 'لينجويني بالترافل والمشروم الكريمي', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop' },
                { id: 'qd2', nameEn: 'Grilled Salmon', nameAr: 'سلمون مشوي', price: 58, descEn: 'Atlantic salmon, asparagus, lemon butter', descAr: 'سلمون أطلسي، هليون، زبدة ليمون', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Starters', catAr: 'مقبلات', items: [
                { id: 'qd3', nameEn: 'Caesar Salad', nameAr: 'سلطة سيزر', price: 28, descEn: 'Romaine, parmesan, croutons, Caesar dressing', descAr: 'خس رومين، بارميزان، كروتون، صوص سيزر', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'sociale', name: 'Sociale Café', area: 'olaya', rating: 4.6,
        cuisineEn: 'Café', cuisineAr: 'كافيه', priceRange: '20-45',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=400&fit=crop',
        deliveryTime: '15-25',
        menu: [
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'sc1', nameEn: 'Caramel Latte', nameAr: 'لاتيه كراميل', price: 24, descEn: 'Espresso, steamed milk, house caramel', descAr: 'إسبريسو، حليب مبخر، كراميل خاص', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300&h=200&fit=crop' },
                { id: 'sc2', nameEn: 'Iced Mocha', nameAr: 'آيس موكا', price: 26, descEn: 'Iced espresso, chocolate, milk, whipped cream', descAr: 'إسبريسو مثلج، شوكولاتة، حليب، كريمة', image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Desserts', catAr: 'حلويات', items: [
                { id: 'sc3', nameEn: 'Tiramisu', nameAr: 'تيراميسو', price: 28, descEn: 'Classic Italian tiramisu', descAr: 'تيراميسو إيطالي كلاسيكي', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'bossco', name: 'Bossco Roastery', area: 'olaya', rating: 4.7,
        cuisineEn: 'Coffee', cuisineAr: 'قهوة', priceRange: '18-35',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop',
        deliveryTime: '15-20',
        menu: [
            { cat: 'Coffee', catAr: 'قهوة', items: [
                { id: 'bo1', nameEn: 'Cortado', nameAr: 'كورتادو', price: 18, descEn: 'Equal parts espresso and steamed milk', descAr: 'إسبريسو وحليب مبخر بأجزاء متساوية', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=300&h=200&fit=crop' },
                { id: 'bo2', nameEn: 'Cold Brew', nameAr: 'كولد برو', price: 22, descEn: '18-hour slow brewed, smooth and rich', descAr: 'تخمير بارد 18 ساعة، ناعم وغني', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'swiss-butter', name: 'Swiss Butter', area: 'olaya', rating: 4.8,
        cuisineEn: 'Fine Dining', cuisineAr: 'مطعم فاخر', priceRange: '55-120',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop',
        deliveryTime: '30-40',
        menu: [
            { cat: 'Mains', catAr: 'أطباق رئيسية', items: [
                { id: 'sw1', nameEn: 'Wagyu Steak', nameAr: 'ستيك واغيو', price: 120, descEn: 'A5 Wagyu, truffle mash, seasonal veg', descAr: 'واغيو A5، بطاطس ترافل، خضار موسمية', image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=300&h=200&fit=crop' },
                { id: 'sw2', nameEn: 'Lobster Thermidor', nameAr: 'لوبستر ثيرميدور', price: 95, descEn: 'Half lobster, cream sauce, gratin', descAr: 'نصف لوبستر، صوص كريمي، جراتان', image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Desserts', catAr: 'حلويات', items: [
                { id: 'sw3', nameEn: 'Crème Brûlée', nameAr: 'كريم بروليه', price: 38, descEn: 'Classic French vanilla crème brûlée', descAr: 'كريم بروليه فرنسي كلاسيكي بالفانيلا', image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'zafran', name: 'Zafran Indian Bistro', area: 'olaya', rating: 4.6,
        cuisineEn: 'Indian', cuisineAr: 'هندي', priceRange: '25-55',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Mains', catAr: 'أطباق رئيسية', items: [
                { id: 'zf1', nameEn: 'Butter Chicken', nameAr: 'دجاج بالزبدة', price: 42, descEn: 'Tender chicken in rich tomato-butter sauce, naan', descAr: 'دجاج طري في صوص طماطم وزبدة غني، خبز نان', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop' },
                { id: 'zf2', nameEn: 'Lamb Biryani', nameAr: 'برياني لحم', price: 48, descEn: 'Aromatic basmati rice with tender lamb, raita', descAr: 'أرز بسمتي عطري مع لحم طري، رايتا', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop' },
                { id: 'zf3', nameEn: 'Paneer Tikka Masala', nameAr: 'بنير تكا مسالا', price: 35, descEn: 'Grilled paneer in spiced tomato cream', descAr: 'بنير مشوي في كريمة طماطم متبلة', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Starters', catAr: 'مقبلات', items: [
                { id: 'zf4', nameEn: 'Samosa Platter', nameAr: 'طبق سمبوسة', price: 18, descEn: '4 crispy samosas with chutneys', descAr: '4 سمبوسات مقرمشة مع صلصات', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop' },
            ]}
        ]
    },

    // ===== AL MALQA =====
    {
        id: '300f-smokehouse', name: '300F Smokehouse', area: 'malqa', rating: 4.7,
        cuisineEn: 'BBQ', cuisineAr: 'مشويات', priceRange: '35-70',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Smoked Meats', catAr: 'لحوم مدخنة', items: [
                { id: '3f1', nameEn: 'Smoked Brisket', nameAr: 'بريسكت مدخن', price: 52, descEn: '12-hour oak-smoked beef brisket', descAr: 'بريسكت بقري مدخن 12 ساعة على خشب البلوط', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop' },
                { id: '3f2', nameEn: 'Smoked Wings', nameAr: 'أجنحة مدخنة', price: 32, descEn: 'Crispy smoked wings, honey glaze', descAr: 'أجنحة مدخنة مقرمشة، تغليفة عسل', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'namq', name: 'Namq', area: 'malqa', rating: 4.8,
        cuisineEn: 'Coffee', cuisineAr: 'قهوة', priceRange: '18-35',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop',
        deliveryTime: '15-20',
        menu: [
            { cat: 'Coffee', catAr: 'قهوة', items: [
                { id: 'nm1', nameEn: 'Signature Latte', nameAr: 'لاتيه مميز', price: 24, descEn: 'House blend latte with vanilla', descAr: 'لاتيه خلطة خاصة بالفانيلا', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=200&fit=crop' },
                { id: 'nm2', nameEn: 'Pistachio Latte', nameAr: 'لاتيه فستق', price: 26, descEn: 'Latte with house pistachio cream', descAr: 'لاتيه بكريمة الفستق الخاصة', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'aok-kitchen', name: 'A.O.K Kitchen', area: 'malqa', rating: 4.5,
        cuisineEn: 'Breakfast', cuisineAr: 'فطور', priceRange: '25-50',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Breakfast', catAr: 'فطور', items: [
                { id: 'ak1', nameEn: 'Full English', nameAr: 'فطور إنجليزي كامل', price: 42, descEn: 'Eggs, sausage, beans, toast, mushrooms, tomato', descAr: 'بيض، سجق، فاصوليا، توست، مشروم، طماطم', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop' },
                { id: 'ak2', nameEn: 'Shakshuka', nameAr: 'شكشوكة', price: 28, descEn: 'Baked eggs in spiced tomato sauce with bread', descAr: 'بيض مخبوز في صلصة طماطم متبلة مع خبز', image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'nora-burgers', name: 'Nora Smashed Burgers', area: 'malqa', rating: 4.6,
        cuisineEn: 'Burgers', cuisineAr: 'برجر', priceRange: '25-50',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Burgers', catAr: 'برجر', items: [
                { id: 'nb1', nameEn: 'The Nora Smash', nameAr: 'ذا نورا سماش', price: 35, descEn: 'Triple smashed patty, aged cheddar, Nora sauce', descAr: 'ثلاث شرائح سماش، شيدر معتق، صوص نورا', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop' },
                { id: 'nb2', nameEn: 'Truffle Burger', nameAr: 'برجر ترافل', price: 42, descEn: 'Beef patty, truffle mayo, arugula, brie', descAr: 'شريحة لحم، مايو ترافل، جرجير، جبنة بري', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'molten-chocolate', name: 'Molten Chocolate Café', area: 'malqa', rating: 4.9,
        cuisineEn: 'Desserts', cuisineAr: 'حلويات', priceRange: '20-45',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Desserts', catAr: 'حلويات', items: [
                { id: 'mc1', nameEn: 'Molten Lava Cake', nameAr: 'كيك اللافا', price: 32, descEn: 'Warm chocolate cake with gooey center, ice cream', descAr: 'كيك شوكولاتة دافئ بقلب سائل، آيس كريم', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&h=200&fit=crop' },
                { id: 'mc2', nameEn: 'Belgian Waffle', nameAr: 'وافل بلجيكي', price: 28, descEn: 'Crispy waffle, Nutella, strawberries, whipped cream', descAr: 'وافل مقرمش، نوتيلا، فراولة، كريمة مخفوقة', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'mc3', nameEn: 'Hot Chocolate', nameAr: 'شوكولاتة ساخنة', price: 22, descEn: 'Rich Belgian hot chocolate with marshmallows', descAr: 'شوكولاتة ساخنة بلجيكية غنية مع مارشميلو', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=200&fit=crop' },
            ]}
        ]
    },

    // ===== AL NAKHEEL =====
    {
        id: 'elixir-bunn', name: 'Elixir Bunn', area: 'nakheel', rating: 4.8,
        cuisineEn: 'Coffee', cuisineAr: 'قهوة', priceRange: '20-40',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop',
        deliveryTime: '15-20',
        menu: [
            { cat: 'Coffee', catAr: 'قهوة', items: [
                { id: 'eb1', nameEn: 'Elixir Signature', nameAr: 'إلكسير المميز', price: 28, descEn: 'Our signature house blend espresso drink', descAr: 'مشروب الإسبريسو المميز بالخلطة الخاصة', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=300&h=200&fit=crop' },
                { id: 'eb2', nameEn: 'Rose Latte', nameAr: 'لاتيه ورد', price: 26, descEn: 'Latte infused with natural rose water', descAr: 'لاتيه بماء الورد الطبيعي', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'buttermilk', name: 'Buttermilk', area: 'nakheel', rating: 4.6,
        cuisineEn: 'Breakfast', cuisineAr: 'فطور', priceRange: '25-50',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Breakfast', catAr: 'فطور', items: [
                { id: 'bm1', nameEn: 'Buttermilk Pancakes', nameAr: 'بانكيك باترميلك', price: 30, descEn: 'Fluffy buttermilk pancakes, syrup, butter', descAr: 'بانكيك باترميلك هش، شراب، زبدة', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop' },
                { id: 'bm2', nameEn: 'French Toast', nameAr: 'فرنش توست', price: 32, descEn: 'Brioche French toast, berries, maple syrup', descAr: 'فرنش توست بريوش، توت، شراب قيقب', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'breehant', name: 'Breehant Roastery', area: 'nakheel', rating: 4.5,
        cuisineEn: 'Coffee', cuisineAr: 'قهوة', priceRange: '18-35',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=400&fit=crop',
        deliveryTime: '15-20',
        menu: [
            { cat: 'Coffee', catAr: 'قهوة', items: [
                { id: 'br1', nameEn: 'Espresso', nameAr: 'إسبريسو', price: 14, descEn: 'Double shot of house-roasted beans', descAr: 'شوت مزدوج من حبوب محمصة محلياً', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=200&fit=crop' },
                { id: 'br2', nameEn: 'Cappuccino', nameAr: 'كابتشينو', price: 20, descEn: 'Classic cappuccino with latte art', descAr: 'كابتشينو كلاسيكي مع رسمة لاتيه', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'urth-cafe', name: 'Urth Café', area: 'nakheel', rating: 4.7,
        cuisineEn: 'Café', cuisineAr: 'كافيه', priceRange: '25-55',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=400&fit=crop',
        deliveryTime: '20-30',
        menu: [
            { cat: 'Food', catAr: 'طعام', items: [
                { id: 'ur1', nameEn: 'Urth Salad', nameAr: 'سلطة أورث', price: 34, descEn: 'Mixed greens, quinoa, avocado, citrus dressing', descAr: 'خضار مشكلة، كينوا، أفوكادو، صوص حمضي', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop' },
                { id: 'ur2', nameEn: 'Club Sandwich', nameAr: 'كلوب ساندويتش', price: 38, descEn: 'Triple decker with chicken, bacon, avocado', descAr: 'ساندويتش ثلاثي مع دجاج، بيكون، أفوكادو', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'ur3', nameEn: 'Organic Coffee', nameAr: 'قهوة عضوية', price: 22, descEn: 'Single origin organic pour over', descAr: 'قهوة عضوية بور أوفر من أصل واحد', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'asfoura', name: 'Asfoura Café', area: 'nakheel', rating: 4.4,
        cuisineEn: 'Café', cuisineAr: 'كافيه', priceRange: '18-40',
        image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop',
        deliveryTime: '15-25',
        menu: [
            { cat: 'Drinks', catAr: 'مشروبات', items: [
                { id: 'as1', nameEn: 'Saffron Latte', nameAr: 'لاتيه زعفران', price: 26, descEn: 'Warm latte with premium saffron', descAr: 'لاتيه دافئ بالزعفران الفاخر', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=200&fit=crop' },
                { id: 'as2', nameEn: 'Taro Latte', nameAr: 'لاتيه تارو', price: 24, descEn: 'Purple taro milk latte', descAr: 'لاتيه حليب التارو البنفسجي', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Pastries', catAr: 'معجنات', items: [
                { id: 'as3', nameEn: 'Kunafa Cheesecake', nameAr: 'تشيز كيك كنافة', price: 28, descEn: 'Fusion cheesecake with crispy kunafa top', descAr: 'تشيز كيك فيوجن بطبقة كنافة مقرمشة', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop' },
            ]}
        ]
    },

    // ===== KAFD =====
    {
        id: 'tobys-estate', name: "Toby's Estate", area: 'kafd', rating: 4.7,
        cuisineEn: 'Coffee & Desserts', cuisineAr: 'قهوة وحلويات', priceRange: '22-45',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=400&fit=crop',
        deliveryTime: '15-25',
        menu: [
            { cat: 'Coffee', catAr: 'قهوة', items: [
                { id: 'te1', nameEn: 'Single Origin Filter', nameAr: 'فلتر أصل واحد', price: 28, descEn: 'Rotating single origin pour over', descAr: 'بور أوفر من أصل واحد متغير', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Desserts', catAr: 'حلويات', items: [
                { id: 'te2', nameEn: 'Banana Bread', nameAr: 'خبز الموز', price: 18, descEn: 'Warm banana bread with walnut', descAr: 'خبز الموز الدافئ بالجوز', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'black-tap', name: 'Black Tap', area: 'kafd', rating: 4.6,
        cuisineEn: 'Burgers', cuisineAr: 'برجر', priceRange: '35-65',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Burgers', catAr: 'برجر', items: [
                { id: 'bt1', nameEn: 'The All-American', nameAr: 'الأول أمريكان', price: 48, descEn: 'Double patty, American cheese, lettuce, tomato, pickles', descAr: 'شريحتين لحم، جبنة أمريكية، خس، طماطم، مخلل', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop' },
                { id: 'bt2', nameEn: 'Texan Burger', nameAr: 'برجر تكسان', price: 52, descEn: 'Beef, bacon, onion rings, BBQ sauce, cheddar', descAr: 'لحم، بيكون، حلقات بصل، صوص باربيكيو، شيدر', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Shakes', catAr: 'ميلك شيك', items: [
                { id: 'bt3', nameEn: 'CrazyShake', nameAr: 'كريزي شيك', price: 45, descEn: 'Over-the-top milkshake with cake, candy, whipped cream', descAr: 'ميلك شيك فوق الخيال مع كيك وحلويات وكريمة', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'chotto-matte', name: 'Chotto Matte', area: 'kafd', rating: 4.8,
        cuisineEn: 'Pan-Asian', cuisineAr: 'آسيوي', priceRange: '45-95',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=400&fit=crop',
        deliveryTime: '30-40',
        menu: [
            { cat: 'Sushi & Sashimi', catAr: 'سوشي وساشيمي', items: [
                { id: 'cm1', nameEn: 'Dragon Roll', nameAr: 'درجن رول', price: 55, descEn: 'Shrimp tempura, avocado, eel sauce', descAr: 'روبيان تمبورا، أفوكادو، صوص أنقليس', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop' },
                { id: 'cm2', nameEn: 'Salmon Sashimi', nameAr: 'ساشيمي سلمون', price: 48, descEn: 'Fresh Atlantic salmon, 8 pieces', descAr: 'سلمون أطلسي طازج، 8 قطع', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Hot Dishes', catAr: 'أطباق ساخنة', items: [
                { id: 'cm3', nameEn: 'Wagyu Gyoza', nameAr: 'غيوزا واغيو', price: 42, descEn: 'Pan-fried Wagyu beef dumplings', descAr: 'فطائر واغيو بقري مقلية', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'kuuru', name: 'Kuuru', area: 'kafd', rating: 4.7,
        cuisineEn: 'Modern Dining', cuisineAr: 'مطبخ حديث', priceRange: '40-85',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
        deliveryTime: '25-35',
        menu: [
            { cat: 'Mains', catAr: 'أطباق رئيسية', items: [
                { id: 'ku1', nameEn: 'Kuuru Bowl', nameAr: 'بول كوورو', price: 48, descEn: 'Signature grain bowl, grilled chicken, tahini', descAr: 'بول الحبوب المميز، دجاج مشوي، طحينة', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop' },
                { id: 'ku2', nameEn: 'Sea Bass Fillet', nameAr: 'فيليه سي باس', price: 72, descEn: 'Pan-seared sea bass, saffron risotto', descAr: 'سي باس مقلي، ريزوتو بالزعفران', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop' },
            ]}
        ]
    },
    {
        id: 'nobu', name: 'Nobu Riyadh', area: 'kafd', rating: 4.9,
        cuisineEn: 'Japanese', cuisineAr: 'ياباني', priceRange: '60-150',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
        cover: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=400&fit=crop',
        deliveryTime: '30-45',
        menu: [
            { cat: 'Signature', catAr: 'أطباق مميزة', items: [
                { id: 'no1', nameEn: 'Black Cod Miso', nameAr: 'بلاك كود ميسو', price: 95, descEn: 'Nobu signature black cod with miso glaze', descAr: 'بلاك كود نوبو المميز بتغليفة الميسو', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop' },
                { id: 'no2', nameEn: 'Yellowtail Jalapeño', nameAr: 'يلوتيل هالابينو', price: 68, descEn: 'Thinly sliced yellowtail with jalapeño', descAr: 'شرائح يلوتيل رفيعة مع هالابينو', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&h=200&fit=crop' },
            ]},
            { cat: 'Sushi', catAr: 'سوشي', items: [
                { id: 'no3', nameEn: 'Omakase Roll', nameAr: 'أوماكاسي رول', price: 75, descEn: "Chef's choice premium sushi roll", descAr: 'سوشي رول فاخر باختيار الشيف', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop' },
            ]}
        ]
    }
];


// ===== AUTH FUNCTIONS =====
function initApp() {
    currentUser = JSON.parse(localStorage.getItem('lamhub_user'));
    cart = JSON.parse(localStorage.getItem('lamhub_cart')) || [];
    groupOrder = JSON.parse(localStorage.getItem('lamhub_group')) || null;

    // Restore saved addresses
    savedAddresses = JSON.parse(localStorage.getItem('lamhub_addresses')) || [];
    deliveryAddress = JSON.parse(localStorage.getItem('lamhub_delivery_address')) || {
        label: 'Home', address: currentLang === 'en' ? 'King Fahd Road, Riyadh' : 'طريق الملك فهد، الرياض',
        lat: 24.7136, lng: 46.6753
    };

    // Restore cartArea from cart items
    if (cart.length > 0) {
        // Try to get area from cart item's area property, or look up from restaurant
        const firstItem = cart[0];
        if (firstItem.area) {
            cartArea = firstItem.area;
        } else {
            const restaurant = RESTAURANTS.find(r => r.id === firstItem.restaurantId);
            if (restaurant) cartArea = restaurant.area;
        }
    } else {
        cartArea = null;
    }

    if (currentUser) {
        showScreen('screen-home');
    } else {
        showScreen('screen-welcome');
    }
    updateCartBadge();
}

function signup() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const password = document.getElementById('signup-password').value;

    // Validation
    let errors = [];
    if (!name) errors.push(currentLang === 'en' ? 'Name is required' : 'الاسم مطلوب');
    if (!email || !email.includes('@')) errors.push(currentLang === 'en' ? 'Valid email required' : 'البريد الإلكتروني غير صحيح');
    if (!phone || phone.length < 9) errors.push(currentLang === 'en' ? 'Valid phone required' : 'رقم الجوال غير صحيح');
    if (!password || password.length < 6) errors.push(currentLang === 'en' ? 'Password must be 6+ characters' : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');

    const errEl = document.getElementById('signup-errors');
    if (errors.length > 0) {
        errEl.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
        errEl.style.display = 'block';
        return;
    }
    errEl.style.display = 'none';

    // Store temp user data for OTP step
    window._tempUser = { name, email, phone, password };
    showScreen('screen-otp');
    startOTPTimer();
    // Auto-focus first OTP input
    setTimeout(() => document.getElementById('otp-1').focus(), 300);
}

function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const errEl = document.getElementById('login-errors');
    const stored = JSON.parse(localStorage.getItem('lamhub_user'));

    if (!stored || stored.email !== email) {
        errEl.innerHTML = `<div>${currentLang === 'en' ? 'Account not found. Please sign up.' : 'الحساب غير موجود. يرجى التسجيل.'}</div>`;
        errEl.style.display = 'block';
        return;
    }
    if (stored.password !== password) {
        errEl.innerHTML = `<div>${currentLang === 'en' ? 'Incorrect password' : 'كلمة المرور غير صحيحة'}</div>`;
        errEl.style.display = 'block';
        return;
    }

    errEl.style.display = 'none';
    currentUser = stored;
    showScreen('screen-home');
    showToast(currentLang === 'en' ? `Welcome back, ${currentUser.name}!` : `أهلاً بعودتك، ${currentUser.name}!`);
}

function verifyOTP() {
    const code = [1,2,3,4].map(i => document.getElementById('otp-'+i).value).join('');
    if (code.length < 4) return;

    // Accept any 4-digit code for demo
    const user = window._tempUser;
    currentUser = {
        id: 'user_' + Date.now(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        avatar: user.name.charAt(0).toUpperCase(),
        joinDate: new Date().toISOString()
    };
    localStorage.setItem('lamhub_user', JSON.stringify(currentUser));
    showScreen('screen-home');
    showToast(currentLang === 'en' ? `Welcome to Lamhub, ${currentUser.name}!` : `أهلاً بك في لامهب، ${currentUser.name}!`);
}

function logout() {
    currentUser = null;
    cart = [];
    cartArea = null;
    groupOrder = null;
    localStorage.removeItem('lamhub_user');
    localStorage.removeItem('lamhub_cart');
    localStorage.removeItem('lamhub_group');
    showScreen('screen-welcome');
}

let otpTimerInterval;
function startOTPTimer() {
    let seconds = 60;
    const timerEl = document.getElementById('otp-timer');
    const resendEl = document.getElementById('otp-resend');
    if (resendEl) resendEl.style.display = 'none';

    clearInterval(otpTimerInterval);
    otpTimerInterval = setInterval(() => {
        seconds--;
        if (timerEl) timerEl.textContent = `0:${seconds.toString().padStart(2, '0')}`;
        if (seconds <= 0) {
            clearInterval(otpTimerInterval);
            if (resendEl) resendEl.style.display = 'block';
            if (timerEl) timerEl.textContent = '';
        }
    }, 1000);
}

function setupOTPInputs() {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById('otp-' + i);
        if (!input) continue;
        input.addEventListener('input', function() {
            if (this.value.length === 1 && i < 4) {
                document.getElementById('otp-' + (i + 1)).focus();
            }
            if (i === 4 && this.value.length === 1) {
                verifyOTP();
            }
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && i > 1) {
                document.getElementById('otp-' + (i - 1)).focus();
            }
        });
    }
}

// ===== ONBOARDING =====
function nextOnboarding() {
    onboardingStep++;
    if (onboardingStep >= 3) {
        showScreen('screen-signup');
        onboardingStep = 0;
        return;
    }
    updateOnboardingDots();
    updateOnboardingContent();
}

function updateOnboardingDots() {
    document.querySelectorAll('.onboarding-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === onboardingStep);
    });
}

function updateOnboardingContent() {
    document.querySelectorAll('.onboarding-slide').forEach((slide, i) => {
        slide.classList.toggle('active', i === onboardingStep);
    });
}

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        const scroll = screen.querySelector('.screen-scroll');
        if (scroll) scroll.scrollTop = 0;
    }

    // Show/hide bottom nav and status bar based on screen
    const bottomNav = document.getElementById('bottom-nav');
    const authScreens = ['screen-welcome', 'screen-signup', 'screen-login', 'screen-otp'];
    const showNav = !authScreens.includes(screenId);
    if (bottomNav) bottomNav.style.display = showNav ? 'flex' : 'none';

    // Update active nav
    if (showNav) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(n => n.classList.remove('active'));
        const navMap = { 'screen-home': 0, 'screen-group': 1, 'screen-restaurants': 2, 'screen-cart': 3, 'screen-profile': 4 };
        if (navMap[screenId] !== undefined && navItems[navMap[screenId]]) {
            navItems[navMap[screenId]].classList.add('active');
        }
    }

    // Render dynamic content
    if (screenId === 'screen-home') renderHome();
    if (screenId === 'screen-restaurants') {
        // Reset to area-specific view when entering Explore (not All Stores)
        showAllStores = false;
        renderRestaurants();
    }
    if (screenId === 'screen-cart') renderCart();
    if (screenId === 'screen-checkout') renderCheckout();
    if (screenId === 'screen-profile') renderProfile();
    if (screenId === 'screen-group') renderGroup();
}

function setActiveNav(btn) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
}

// ===== RENDER HOME =====
let activeArea = 'hittin';

function renderHome() {
    // Update user greeting if logged in
    const greetEl = document.getElementById('user-greeting');
    if (greetEl && currentUser) {
        greetEl.textContent = currentLang === 'en' ? `Hi, ${currentUser.name}` : `أهلاً، ${currentUser.name}`;
    }

    // If cart has items, sync home area to cart area for consistency
    if (cartArea && cart.length > 0) {
        activeArea = cartArea;
    }

    // Sync area tab highlight to activeArea
    const areaTabs = document.querySelectorAll('.area-tab');
    const areaIds = ['hittin', 'olaya', 'malqa', 'nakheel', 'kafd'];
    areaTabs.forEach((tab, i) => {
        tab.classList.toggle('active', areaIds[i] === activeArea);
    });

    renderAreaRestaurants(activeArea);
}

function switchArea(btn, areaId) {
    activeArea = areaId;
    document.querySelectorAll('.area-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderAreaRestaurants(areaId);
}

function renderAreaRestaurants(areaId) {
    const container = document.getElementById('area-restaurants-list');
    if (!container) return;
    const areaRestaurants = RESTAURANTS.filter(r => r.area === areaId);

    container.innerHTML = areaRestaurants.map(r => `
        <div class="restaurant-card" onclick="openRestaurant('${r.id}')">
            <div class="restaurant-img">
                <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="restaurant-info">
                <div class="restaurant-name-row">
                    <h4>${r.name}</h4>
                    <span class="rating">⭐ ${r.rating}</span>
                </div>
                <span class="cuisine-tag">${currentLang === 'en' ? r.cuisineEn : r.cuisineAr}</span>
                <div class="fast-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#059669"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>
                    <span>${currentLang === 'en' ? 'Same Location – Fast Delivery' : 'نفس الموقع – توصيل سريع'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== RENDER RESTAURANTS (Browse Screen) =====
let activeFilter = 'All';
let showAllStores = false;

function renderRestaurants(filter) {
    if (filter) activeFilter = filter;
    const container = document.getElementById('restaurants-grid');
    if (!container) return;

    // Determine which restaurants to show
    let filtered = RESTAURANTS;

    // By default, only show restaurants from the active area (not all stores)
    if (!showAllStores) {
        const browseArea = cartArea || activeArea || 'hittin';
        filtered = RESTAURANTS.filter(r => r.area === browseArea);
    }

    // Apply cuisine filter on top
    if (activeFilter !== 'All') {
        filtered = filtered.filter(r => r.cuisineEn.toLowerCase().includes(activeFilter.toLowerCase()));
    }

    // Update location badge
    const badgeEl = document.querySelector('.hub-location-badge span');
    if (badgeEl) {
        if (showAllStores) {
            const count = filtered.length;
            badgeEl.textContent = currentLang === 'en' ? `All areas · ${count} restaurants` : `جميع المناطق · ${count} مطعم`;
        } else {
            const browseArea = cartArea || activeArea || 'hittin';
            const areaObj = AREAS.find(a => a.id === browseArea);
            const areaName = areaObj ? (currentLang === 'en' ? areaObj.nameEn : areaObj.nameAr) : browseArea;
            const count = filtered.length;
            badgeEl.textContent = currentLang === 'en' ? `${areaName} · ${count} restaurants` : `${areaName} · ${count} مطعم`;
        }
    }

    container.innerHTML = filtered.map(r => {
        const areaObj = AREAS.find(a => a.id === r.area);
        const areaLabel = showAllStores && areaObj ? (currentLang === 'en' ? areaObj.nameEn : areaObj.nameAr) : '';
        return `
        <div class="restaurant-grid-card" onclick="openRestaurantSmart('${r.id}')">
            <div class="rgc-img">
                <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'">
            </div>
            <div class="rgc-badge">${currentLang === 'en' ? 'Fast Delivery' : 'توصيل سريع'}</div>
            ${showAllStores && areaLabel ? `<div class="rgc-area-badge">${areaLabel}</div>` : ''}
            <div class="rgc-info">
                <h4>${r.name}</h4>
                <div class="rgc-meta">
                    <span class="rating">⭐ ${r.rating}</span>
                    <span class="cuisine-tag">${currentLang === 'en' ? r.cuisineEn : r.cuisineAr}</span>
                </div>
                <p class="rgc-price">${currentLang === 'en' ? `SAR ${r.priceRange} per person` : `${r.priceRange} ر.س للشخص`}</p>
            </div>
        </div>
    `}).join('');

    // Update filter chips
    document.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === activeFilter);
    });

    // Update All Stores chip
    const allStoresChip = document.getElementById('all-stores-chip');
    if (allStoresChip) {
        allStoresChip.classList.toggle('active', showAllStores);
    }
}

function setFilter(filter, btn) {
    activeFilter = filter;
    // Reset "All Stores" when a cuisine filter is selected (except for 'All')
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderRestaurants();
}

function toggleAllStores() {
    showAllStores = !showAllStores;
    activeFilter = 'All';
    renderRestaurants();
}

// Smart restaurant open — shows area conflict if needed from Explore screen
function openRestaurantSmart(id) {
    const restaurant = RESTAURANTS.find(r => r.id === id);
    if (!restaurant) return;

    // If cart has items from a different area, warn user
    if (cartArea && cart.length > 0 && restaurant.area !== cartArea) {
        showAreaConflictModal(restaurant, function(switched) {
            if (switched) {
                // Cart was cleared, area switched — update activeArea
                activeArea = restaurant.area;
                showAllStores = false;
                openRestaurant(id);
            }
        });
        return;
    }

    // If "All Stores" is active and restaurant is from a different area than activeArea
    // (but cart is empty), just switch the area silently
    if (showAllStores && restaurant.area !== activeArea && cart.length === 0) {
        activeArea = restaurant.area;
    }

    openRestaurant(id);
}

// ===== RESTAURANT MENU =====
function openRestaurant(id) {
    currentRestaurant = RESTAURANTS.find(r => r.id === id);
    if (!currentRestaurant) return;
    showScreen('screen-menu');
    renderMenu();
}

let activeMenuCat = 0;

function renderMenu() {
    const r = currentRestaurant;
    if (!r) return;

    // Header
    document.getElementById('menu-cover').style.backgroundImage = `url(${r.cover})`;
    document.getElementById('menu-name').textContent = r.name;
    document.getElementById('menu-rating').textContent = `⭐ ${r.rating}`;
    document.getElementById('menu-cuisine').textContent = currentLang === 'en' ? r.cuisineEn : r.cuisineAr;
    document.getElementById('menu-time').textContent = currentLang === 'en' ? `${r.deliveryTime} min` : `${r.deliveryTime} دقيقة`;

    // Categories
    const catContainer = document.getElementById('menu-categories');
    catContainer.innerHTML = r.menu.map((c, i) => `
        <button class="menu-cat-btn ${i === activeMenuCat ? 'active' : ''}" onclick="switchMenuCat(${i})">
            ${currentLang === 'en' ? c.cat : c.catAr}
        </button>
    `).join('');

    // Items
    renderMenuItems();
}

function switchMenuCat(index) {
    activeMenuCat = index;
    document.querySelectorAll('.menu-cat-btn').forEach((b, i) => b.classList.toggle('active', i === index));
    renderMenuItems();
}

function renderMenuItems() {
    const r = currentRestaurant;
    if (!r || !r.menu[activeMenuCat]) return;
    const items = r.menu[activeMenuCat].items;
    const container = document.getElementById('menu-items');

    container.innerHTML = items.map(item => {
        const inCart = cart.find(c => c.itemId === item.id);
        return `
        <div class="menu-item-card">
            <div class="menu-item-img">
                <img src="${item.image}" alt="${currentLang === 'en' ? item.nameEn : item.nameAr}" loading="lazy">
            </div>
            <div class="menu-item-info">
                <h4>${currentLang === 'en' ? item.nameEn : item.nameAr}</h4>
                <p class="menu-item-desc">${currentLang === 'en' ? item.descEn : item.descAr}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">SAR ${item.price}</span>
                    ${inCart
                        ? `<div class="qty-control">
                            <button class="qty-btn" onclick="event.stopPropagation(); updateCartItem('${item.id}', -1)">−</button>
                            <span class="qty-num">${inCart.quantity}</span>
                            <button class="qty-btn" onclick="event.stopPropagation(); updateCartItem('${item.id}', 1)">+</button>
                           </div>`
                        : `<button class="add-item-btn" onclick="event.stopPropagation(); openItemDetail('${item.id}')">+</button>`
                    }
                </div>
            </div>
        </div>
    `}).join('');
}

// ===== AREA CONFLICT MODAL =====
function showAreaConflictModal(newRestaurant, callback) {
    // Remove any existing modal
    const existing = document.getElementById('area-conflict-modal');
    if (existing) existing.remove();

    const currentAreaObj = AREAS.find(a => a.id === cartArea);
    const newAreaObj = AREAS.find(a => a.id === newRestaurant.area);
    const currentAreaName = currentAreaObj ? (currentLang === 'en' ? currentAreaObj.nameEn : currentAreaObj.nameAr) : cartArea;
    const newAreaName = newAreaObj ? (currentLang === 'en' ? newAreaObj.nameEn : newAreaObj.nameAr) : newRestaurant.area;

    // Find similar restaurants in the current cart area (same cuisine type)
    const similarInCurrentArea = RESTAURANTS.filter(r =>
        r.area === cartArea &&
        r.id !== newRestaurant.id &&
        r.cuisineEn.toLowerCase() === newRestaurant.cuisineEn.toLowerCase()
    );

    let suggestionsHTML = '';
    if (similarInCurrentArea.length > 0) {
        const suggestionLabel = currentLang === 'en'
            ? `Similar restaurants in ${currentAreaName}`
            : `مطاعم مشابهة في ${currentAreaName}`;
        suggestionsHTML = `
            <div class="area-conflict-suggestions">
                <p class="area-conflict-suggest-label">${suggestionLabel}:</p>
                ${similarInCurrentArea.slice(0, 3).map(r => `
                    <div class="area-conflict-suggest-item" onclick="closeAreaConflictModal(); openRestaurant('${r.id}')">
                        <img src="${r.image}" alt="${r.name}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;">
                        <div style="flex:1;min-width:0;">
                            <span style="font-weight:600;font-size:13px;display:block;">${r.name}</span>
                            <span style="font-size:11px;color:#6B7280;">⭐ ${r.rating} · ${currentLang === 'en' ? r.cuisineEn : r.cuisineAr}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const modal = document.createElement('div');
    modal.id = 'area-conflict-modal';
    modal.className = 'area-conflict-overlay';
    modal.innerHTML = `
        <div class="area-conflict-box">
            <div class="area-conflict-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            </div>
            <h3 class="area-conflict-title">${currentLang === 'en' ? 'Different Delivery Area' : 'منطقة توصيل مختلفة'}</h3>
            <p class="area-conflict-msg">${currentLang === 'en'
                ? 'Items from different areas will increase delivery cost and time. Your cart has items from <strong>' + currentAreaName + '</strong>, but this restaurant is in <strong>' + newAreaName + '</strong>.'
                : 'العناصر من مناطق مختلفة ستزيد تكلفة ووقت التوصيل. سلتك تحتوي على عناصر من <strong>' + currentAreaName + '</strong>، لكن هذا المطعم في <strong>' + newAreaName + '</strong>.'
            }</p>
            ${suggestionsHTML}
            <div class="area-conflict-actions">
                <button class="area-conflict-btn switch-btn" id="area-conflict-switch">
                    ${currentLang === 'en' ? 'Switch to ' + newAreaName : 'انتقل إلى ' + newAreaName}
                </button>
                <button class="area-conflict-btn stay-btn" id="area-conflict-stay">
                    ${currentLang === 'en' ? 'Stay in ' + currentAreaName : 'ابقَ في ' + currentAreaName}
                </button>
            </div>
        </div>
    `;

    document.getElementById('app').appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('show'));

    document.getElementById('area-conflict-switch').addEventListener('click', function() {
        // Clear cart and switch area
        cart = [];
        cartArea = newRestaurant.area;
        saveCart();
        closeAreaConflictModal();
        callback(true);
    });

    document.getElementById('area-conflict-stay').addEventListener('click', function() {
        closeAreaConflictModal();
        callback(false);
    });

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAreaConflictModal();
            callback(false);
        }
    });
}

function closeAreaConflictModal() {
    const modal = document.getElementById('area-conflict-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ===== ITEM DETAIL MODAL =====
function openItemDetail(itemId) {
    const r = currentRestaurant;
    if (!r) return;
    let item = null;
    for (const cat of r.menu) {
        item = cat.items.find(i => i.id === itemId);
        if (item) break;
    }
    if (!item) return;
    currentItem = item;
    itemQuantity = 1;

    document.getElementById('detail-img').src = item.image;
    document.getElementById('detail-name').textContent = currentLang === 'en' ? item.nameEn : item.nameAr;
    document.getElementById('detail-desc').textContent = currentLang === 'en' ? item.descEn : item.descAr;
    document.getElementById('detail-price').textContent = `SAR ${item.price}`;
    document.getElementById('detail-qty').textContent = '1';
    document.getElementById('detail-total').textContent = `SAR ${item.price}`;

    document.getElementById('item-detail-modal').classList.add('show');
}

function closeItemDetail() {
    document.getElementById('item-detail-modal').classList.remove('show');
}

function changeDetailQty(delta) {
    itemQuantity = Math.max(1, itemQuantity + delta);
    document.getElementById('detail-qty').textContent = itemQuantity;
    document.getElementById('detail-total').textContent = `SAR ${currentItem.price * itemQuantity}`;
}

function addItemFromDetail() {
    if (!currentItem || !currentRestaurant) return;

    // Check area conflict
    if (cartArea && cartArea !== currentRestaurant.area && cart.length > 0) {
        // Capture references before async callback
        const itemToAdd = currentItem;
        const restaurantToAdd = currentRestaurant;
        const qtyToAdd = itemQuantity;

        showAreaConflictModal(restaurantToAdd, function(switched) {
            if (switched) {
                // Cart was cleared, add the new item
                performAddToCart(itemToAdd, restaurantToAdd, qtyToAdd);
            }
            // If not switched, do nothing (stay in current area)
        });
        return;
    }

    performAddToCart(currentItem, currentRestaurant, itemQuantity);
}

function performAddToCart(item, restaurant, qty) {
    // Set the cart area
    cartArea = restaurant.area;

    const existing = cart.find(c => c.itemId === item.id);
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            itemId: item.id,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            area: restaurant.area,
            nameEn: item.nameEn,
            nameAr: item.nameAr,
            price: item.price,
            quantity: qty,
            image: item.image
        });
    }

    saveCart();
    closeItemDetail();
    renderMenuItems();
    showToast(currentLang === 'en'
        ? `Added ${item.nameEn} to cart`
        : `تمت إضافة ${item.nameAr} للسلة`
    );
}

// ===== CART MANAGEMENT =====
function updateCartItem(itemId, delta) {
    const item = cart.find(c => c.itemId === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(c => c.itemId !== itemId);
    }

    // Reset cartArea when cart becomes empty
    if (cart.length === 0) {
        cartArea = null;
    }

    saveCart();
    // Re-render current view
    if (document.getElementById('screen-menu').classList.contains('active')) {
        renderMenuItems();
    }
    if (document.getElementById('screen-cart').classList.contains('active')) {
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('lamhub_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ===== RENDER CART =====
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');

    if (!container) return;

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'flex';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';

    // Group by restaurant
    const grouped = {};
    cart.forEach(item => {
        if (!grouped[item.restaurantId]) {
            grouped[item.restaurantId] = {
                name: item.restaurantName,
                items: []
            };
        }
        grouped[item.restaurantId].items.push(item);
    });

    container.innerHTML = Object.entries(grouped).map(([rid, group]) => {
        const subtotal = group.items.reduce((s, i) => s + i.price * i.quantity, 0);
        return `
        <div class="cart-person">
            <div class="cart-person-header">
                <div class="member-avatar" style="background: var(--primary); width: 32px; height: 32px; font-size: 14px;">
                    ${currentUser ? currentUser.avatar : 'U'}
                </div>
                <h4>${currentUser ? currentUser.name : 'You'}</h4>
                <span class="cart-person-restaurant">${group.name}</span>
            </div>
            ${group.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-left">
                        <img src="${item.image}" alt="" class="cart-item-thumb">
                        <div class="cart-item-info">
                            <span class="cart-item-name">${currentLang === 'en' ? item.nameEn : item.nameAr}</span>
                            <span class="cart-item-price">SAR ${item.price}</span>
                        </div>
                    </div>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateCartItem('${item.itemId}', -1)">−</button>
                        <span class="qty-num">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartItem('${item.itemId}', 1)">+</button>
                    </div>
                </div>
            `).join('')}
            <div class="cart-person-subtotal">
                <span>${currentLang === 'en' ? 'Subtotal' : 'المجموع الفرعي'}</span>
                <span>SAR ${subtotal}</span>
            </div>
        </div>
    `}).join('');

    // Update totals — 15 SAR standard delivery fee
    const itemsTotal = getCartTotal();
    const restaurantCount = Object.keys(grouped).length;
    const DELIVERY_FEE = 15;
    const separateDelivery = restaurantCount * DELIVERY_FEE;
    const savings = separateDelivery - DELIVERY_FEE;
    const total = itemsTotal + DELIVERY_FEE;

    const summaryEl = document.getElementById('cart-summary');
    if (summaryEl) {
        summaryEl.innerHTML = `
            <div class="cost-row">
                <span>${currentLang === 'en' ? 'Items Total' : 'إجمالي العناصر'}</span>
                <span>SAR ${itemsTotal}</span>
            </div>
            <div class="cost-row">
                <span>${currentLang === 'en' ? 'Delivery Fee' : 'رسوم التوصيل'}</span>
                <span>SAR ${DELIVERY_FEE}</span>
            </div>
            ${restaurantCount >= 2 ? `
            <div class="cost-row savings-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${currentLang === 'en' ? 'You Saved' : 'وفّرت'}</span>
                <span class="savings-amount">SAR ${savings}</span>
            </div>
            <div class="savings-explainer">
                <span>${currentLang === 'en'
                    ? `Ordering from ${restaurantCount} restaurants separately would cost SAR ${separateDelivery} delivery. With Lamhub, just SAR ${DELIVERY_FEE}!`
                    : `الطلب من ${restaurantCount} مطاعم بشكل منفصل يكلف ${separateDelivery} ر.س توصيل. مع لامهب، فقط ${DELIVERY_FEE} ر.س!`
                }</span>
            </div>` : ''}
            <div class="cost-total">
                <span>${currentLang === 'en' ? 'Total' : 'الإجمالي'}</span>
                <span>SAR ${total}</span>
            </div>
        `;
    }

    // Checkout bar total
    const checkoutAmount = document.getElementById('cart-checkout-amount');
    if (checkoutAmount) checkoutAmount.textContent = `SAR ${total}`;
}

// ===== RENDER CHECKOUT =====
function renderCheckout() {
    const total = getCartTotal() + 15;
    const el = document.getElementById('checkout-total-amount');
    if (el) el.textContent = `SAR ${total}`;

    // Render delivery address section dynamically
    const addressSection = document.getElementById('checkout-address-section');
    if (addressSection) {
        const labelIcons = { Home: '🏠', Work: '💼', Other: '📍' };
        addressSection.innerHTML = `
            <div class="checkout-address-card" onclick="openLocationMap()">
                <div class="checkout-address-info">
                    <span class="address-type-badge">${labelIcons[deliveryAddress.label] || '📍'} ${currentLang === 'en' ? deliveryAddress.label : (deliveryAddress.label === 'Home' ? 'المنزل' : deliveryAddress.label === 'Work' ? 'العمل' : 'أخرى')}</span>
                    <p id="checkout-address-text">${deliveryAddress.address}</p>
                </div>
                <span class="checkout-edit">${currentLang === 'en' ? 'Change' : 'تغيير'}</span>
            </div>
        `;
    }

    // Dynamically render payment options (fixes Issues 3 & 4)
    const paymentContainer = document.querySelector('.payment-options');
    if (paymentContainer) {
        const svgCreditCard = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
        const svgApplePay = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#333"><path d="M17.72 7.54c-.47-.56-1.13-.88-1.83-.88-.86 0-1.44.38-1.92.38-.5 0-1.16-.37-1.86-.37-1.04.01-2.13.63-2.71 1.62-1.17 2.02-.3 5.03.83 6.68.55.8 1.21 1.7 2.08 1.67.83-.03 1.15-.54 2.15-.54 1 0 1.29.54 2.17.52.9-.02 1.46-.82 2.01-1.63.37-.53.65-1.08.82-1.5-2.04-.85-2.37-4-.34-5.23zM15.4 4.01c.46-.56.76-1.33.68-2.1-.65.03-1.43.44-1.89 1-.42.49-.79 1.28-.69 2.03.72.06 1.45-.37 1.9-.93z"/></svg>`;
        const svgCash = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
        const svgAddCard = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="12" y1="9" x2="12" y2="17"/><line x1="8" y1="13" x2="16" y2="13"/></svg>`;

        const paymentOptions = [
            {
                id: 'card',
                icon: svgCreditCard,
                nameEn: 'Credit/Debit Card',
                nameAr: 'بطاقة ائتمان',
                detail: '**** 4242'
            },
            {
                id: 'apple',
                icon: svgApplePay,
                nameEn: 'Apple Pay',
                nameAr: 'Apple Pay',
                detail: ''
            },
            {
                id: 'cash',
                icon: svgCash,
                nameEn: 'Cash on Delivery',
                nameAr: 'الدفع عند الاستلام',
                detail: ''
            }
        ];

        paymentContainer.innerHTML = paymentOptions.map(opt => `
            <div class="payment-option ${selectedPayment === opt.id ? 'active' : ''}" onclick="selectPayment('${opt.id}')">
                <div class="payment-option-content">
                    <span class="payment-icon">${opt.icon}</span>
                    <div>
                        <span class="payment-name">${currentLang === 'en' ? opt.nameEn : opt.nameAr}</span>
                        ${opt.detail ? `<span class="payment-detail">${opt.detail}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('') + `
            <div class="add-card-section" id="add-card-section">
                <div class="payment-option add-card-trigger" onclick="toggleAddCardForm()">
                    <div class="payment-option-content">
                        <span class="payment-icon">${svgAddCard}</span>
                        <span class="payment-name" style="color:#6B7280;">${currentLang === 'en' ? 'Add New Card' : 'إضافة بطاقة جديدة'}</span>
                    </div>
                </div>
                <div class="add-card-form" id="add-card-form" style="display:none;">
                    <div class="add-card-input-group">
                        <label>${currentLang === 'en' ? 'Card Number' : 'رقم البطاقة'}</label>
                        <input type="text" id="new-card-number" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatCardNumber(this)">
                    </div>
                    <div class="add-card-row">
                        <div class="add-card-input-group" style="flex:1;">
                            <label>${currentLang === 'en' ? 'Expiry' : 'الانتهاء'}</label>
                            <input type="text" id="new-card-expiry" placeholder="MM/YY" maxlength="5" oninput="formatCardExpiry(this)">
                        </div>
                        <div class="add-card-input-group" style="flex:1;">
                            <label>CVV</label>
                            <input type="text" id="new-card-cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <button class="add-card-save-btn" onclick="saveNewCard()">${currentLang === 'en' ? 'Save Card' : 'حفظ البطاقة'}</button>
                </div>
            </div>
        `;
    }
}

// ===== DELIVERY LOCATION MAP =====
function openLocationMap() {
    const existing = document.getElementById('location-map-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'location-map-modal';
    modal.className = 'location-map-overlay';

    // Default saved addresses + user-saved ones
    const defaultAddresses = [
        { label: 'Home', address: currentLang === 'en' ? 'King Fahd Road, Riyadh' : 'طريق الملك فهد، الرياض', lat: 24.7136, lng: 46.6753 },
        { label: 'Work', address: currentLang === 'en' ? 'Olaya District, Riyadh' : 'حي العليا، الرياض', lat: 24.6900, lng: 46.6850 }
    ];
    const allAddresses = [...defaultAddresses, ...savedAddresses.filter(a => a.label === 'Other')];

    modal.innerHTML = `
        <div class="location-map-content">
            <div class="location-map-header">
                <h3>${currentLang === 'en' ? 'Delivery Location' : 'موقع التوصيل'}</h3>
                <button class="location-map-close" onclick="closeLocationMap()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>

            <div class="location-map-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="location-search-input" placeholder="${currentLang === 'en' ? 'Search for address...' : 'ابحث عن عنوان...'}" oninput="filterMapAddresses(this.value)">
            </div>

            <div class="location-map-visual" id="location-map-visual">
                <div class="map-placeholder">
                    <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
                        <rect width="200" height="140" rx="12" fill="#E8F4E8"/>
                        <path d="M0 80 Q50 60 100 75 Q150 90 200 70 L200 140 L0 140Z" fill="#C8E6C8" opacity="0.5"/>
                        <rect x="60" y="35" width="30" height="25" rx="3" fill="#D1D5DB"/>
                        <rect x="110" y="45" width="25" height="20" rx="3" fill="#D1D5DB"/>
                        <rect x="30" y="55" width="20" height="15" rx="3" fill="#D1D5DB"/>
                        <rect x="145" y="30" width="22" height="30" rx="3" fill="#D1D5DB"/>
                        <path d="M0 90 L200 90" stroke="#E5E7EB" stroke-width="2" stroke-dasharray="6 4"/>
                        <path d="M80 0 L80 140" stroke="#E5E7EB" stroke-width="1.5" stroke-dasharray="6 4"/>
                    </svg>
                    <div class="map-pin-marker" id="map-pin">
                        <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                            <ellipse cx="18" cy="40" rx="8" ry="3" fill="rgba(0,0,0,0.15)"/>
                            <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26s18-12.5 18-26C36 8.06 27.94 0 18 0z" fill="#FF6B35"/>
                            <circle cx="18" cy="18" r="7" fill="white"/>
                        </svg>
                    </div>
                    <p class="map-drag-hint">${currentLang === 'en' ? 'Tap to adjust pin location' : 'اضغط لتعديل موقع الدبوس'}</p>
                </div>
            </div>

            <div class="location-saved-section">
                <h4>${currentLang === 'en' ? 'Saved Locations' : 'المواقع المحفوظة'}</h4>
                <div class="location-saved-list" id="location-saved-list">
                    ${allAddresses.map((a, i) => {
                        const icon = a.label === 'Home' ? '🏠' : a.label === 'Work' ? '💼' : '📍';
                        const labelAr = a.label === 'Home' ? 'المنزل' : a.label === 'Work' ? 'العمل' : 'أخرى';
                        const isActive = deliveryAddress && deliveryAddress.address === a.address;
                        return `
                        <div class="location-saved-item ${isActive ? 'active' : ''}" onclick="selectDeliveryAddress(${i}, '${a.label}', '${a.address.replace(/'/g, "\\'")}', ${a.lat}, ${a.lng})">
                            <span class="location-saved-icon">${icon}</span>
                            <div class="location-saved-info">
                                <span class="location-saved-label">${currentLang === 'en' ? a.label : labelAr}</span>
                                <span class="location-saved-addr">${a.address}</span>
                            </div>
                            ${isActive ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <div class="location-add-new">
                <div class="location-add-new-btn" onclick="toggleNewAddressForm()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>${currentLang === 'en' ? 'Add New Address' : 'إضافة عنوان جديد'}</span>
                </div>
                <div class="location-new-form" id="location-new-form" style="display:none;">
                    <div class="location-type-selector">
                        <button class="location-type-btn active" onclick="selectLocationType(this, 'Home')">🏠 ${currentLang === 'en' ? 'Home' : 'المنزل'}</button>
                        <button class="location-type-btn" onclick="selectLocationType(this, 'Work')">💼 ${currentLang === 'en' ? 'Work' : 'العمل'}</button>
                        <button class="location-type-btn" onclick="selectLocationType(this, 'Other')">📍 ${currentLang === 'en' ? 'Other' : 'أخرى'}</button>
                    </div>
                    <input type="text" id="new-address-input" class="location-new-input" placeholder="${currentLang === 'en' ? 'Enter full address...' : 'أدخل العنوان الكامل...'}">
                    <button class="location-save-btn" onclick="saveNewAddress()">${currentLang === 'en' ? 'Save Address' : 'حفظ العنوان'}</button>
                </div>
            </div>

            <button class="location-confirm-btn" onclick="confirmLocationSelection()">
                ${currentLang === 'en' ? 'Confirm Location' : 'تأكيد الموقع'}
            </button>
        </div>
    `;

    document.getElementById('app').appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('show'));
}

function closeLocationMap() {
    const modal = document.getElementById('location-map-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

let newAddressType = 'Home';

function selectLocationType(btn, type) {
    newAddressType = type;
    document.querySelectorAll('.location-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function toggleNewAddressForm() {
    const form = document.getElementById('location-new-form');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveNewAddress() {
    const input = document.getElementById('new-address-input');
    if (!input || !input.value.trim()) {
        showToast(currentLang === 'en' ? 'Please enter an address' : 'يرجى إدخال العنوان');
        return;
    }
    const newAddr = {
        label: newAddressType,
        address: input.value.trim(),
        lat: 24.7136 + (Math.random() - 0.5) * 0.05,
        lng: 46.6753 + (Math.random() - 0.5) * 0.05
    };
    savedAddresses.push(newAddr);
    localStorage.setItem('lamhub_addresses', JSON.stringify(savedAddresses));

    // Auto-select the new address
    deliveryAddress = newAddr;
    localStorage.setItem('lamhub_delivery_address', JSON.stringify(deliveryAddress));

    showToast(currentLang === 'en' ? 'Address saved!' : 'تم حفظ العنوان!');
    closeLocationMap();
    renderCheckout();
}

function selectDeliveryAddress(index, label, address, lat, lng) {
    deliveryAddress = { label, address, lat, lng };
    localStorage.setItem('lamhub_delivery_address', JSON.stringify(deliveryAddress));

    // Update UI to show selected
    document.querySelectorAll('.location-saved-item').forEach(item => item.classList.remove('active'));
    const items = document.querySelectorAll('.location-saved-item');
    if (items[index]) items[index].classList.add('active');
}

function confirmLocationSelection() {
    closeLocationMap();
    renderCheckout();
    // Also update home screen address
    const homeAddr = document.querySelector('.address-text');
    if (homeAddr) homeAddr.textContent = deliveryAddress.address;
    showToast(currentLang === 'en' ? 'Delivery location updated' : 'تم تحديث موقع التوصيل');
}

function filterMapAddresses(query) {
    if (!query) {
        document.querySelectorAll('.location-saved-item').forEach(i => i.style.display = 'flex');
        return;
    }
    query = query.toLowerCase();
    document.querySelectorAll('.location-saved-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

function selectPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('active');
    });
    // Find the clicked option and add active
    const options = document.querySelectorAll('.payment-option:not(.add-card-trigger)');
    const methodMap = ['card', 'apple', 'cash'];
    options.forEach((opt, index) => {
        if (methodMap[index] === method) {
            opt.classList.add('active');
        }
    });
}

function toggleAddCardForm() {
    const form = document.getElementById('add-card-form');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value.substring(0, 19);
}

function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    input.value = value.substring(0, 5);
}

function saveNewCard() {
    const num = document.getElementById('new-card-number').value.replace(/\s/g, '');
    const exp = document.getElementById('new-card-expiry').value;
    const cvv = document.getElementById('new-card-cvv').value;

    if (num.length < 13 || !exp || cvv.length < 3) {
        showToast(currentLang === 'en' ? 'Please fill in all card details' : 'يرجى ملء جميع بيانات البطاقة');
        return;
    }

    // For demo, just show success and select card payment
    selectedPayment = 'card';
    const last4 = num.slice(-4);
    showToast(currentLang === 'en' ? `Card ending in ${last4} added` : `تمت إضافة البطاقة المنتهية بـ ${last4}`);
    toggleAddCardForm();
    renderCheckout();
}

// ===== RENDER PROFILE =====
function renderProfile() {
    if (!currentUser) return;
    const nameEl = document.getElementById('profile-name');
    const emailEl = document.getElementById('profile-email');
    const phoneEl = document.getElementById('profile-phone');
    const avatarEl = document.getElementById('profile-avatar');

    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;
    if (phoneEl) phoneEl.textContent = currentUser.phone;
    if (avatarEl) avatarEl.textContent = currentUser.avatar;
}

// ===== GROUP ORDER =====
function createGroup() {
    groupOrder = {
        id: 'GRP-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        host: currentUser ? currentUser.name : 'You',
        hostAvatar: currentUser ? currentUser.avatar : 'U',
        members: [
            { name: currentUser ? currentUser.name : 'You', avatar: currentUser ? currentUser.avatar : 'U', isHost: true }
        ],
        area: activeArea,
        createdAt: new Date().toISOString()
    };
    localStorage.setItem('lamhub_group', JSON.stringify(groupOrder));
    showScreen('screen-group');
    showToast(currentLang === 'en' ? 'Group created!' : 'تم إنشاء المجموعة!');
}

function addSimulatedMember() {
    if (!groupOrder) return;
    const fakeMembers = [
        { name: 'Sara', avatar: 'S' },
        { name: 'Mohammed', avatar: 'M' },
        { name: 'Nora', avatar: 'N' },
        { name: 'Khalid', avatar: 'K' }
    ];
    const available = fakeMembers.filter(f => !groupOrder.members.find(m => m.name === f.name));
    if (available.length === 0) return;

    const member = available[0];
    groupOrder.members.push(member);
    localStorage.setItem('lamhub_group', JSON.stringify(groupOrder));
    renderGroup();
    showToast(currentLang === 'en' ? `${member.name} joined the group!` : `${member.name} انضم للمجموعة!`);
}

function renderGroup() {
    if (!groupOrder) {
        // Show create group prompt
        const container = document.getElementById('group-content');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" stroke-width="1.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <h3>${currentLang === 'en' ? 'No Active Group' : 'لا توجد مجموعة نشطة'}</h3>
                    <p>${currentLang === 'en' ? 'Create a group to order together with friends & family' : 'أنشئ مجموعة للطلب مع الأصدقاء والعائلة'}</p>
                    <button class="cta-button" onclick="createGroup()">${currentLang === 'en' ? 'Create Group' : 'إنشاء مجموعة'}</button>
                </div>
            `;
        }
        return;
    }

    const container = document.getElementById('group-content');
    if (!container) return;

    const memberAvatars = groupOrder.members.map(m =>
        `<div class="group-avatar" style="background: ${m.isHost ? 'var(--primary)' : ['#7C3AED','#059669','#DC2626','#2563EB'][groupOrder.members.indexOf(m) % 4]}">${m.avatar}</div>`
    ).join('');

    container.innerHTML = `
        <div class="group-setup-card">
            <div class="group-avatar-row">
                ${memberAvatars}
                <div class="group-avatar add" onclick="addSimulatedMember()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
            </div>
            <h3>${currentLang === 'en' ? `${groupOrder.host}'s Group Order` : `طلب مجموعة ${groupOrder.host}`}</h3>
            <p class="group-subtitle">${groupOrder.members.length} ${currentLang === 'en' ? 'members' : 'أعضاء'} · ${AREAS.find(a => a.id === groupOrder.area)?.[currentLang === 'en' ? 'nameEn' : 'nameAr'] || ''}</p>
        </div>

        <div class="invite-options">
            <button class="invite-btn" onclick="document.getElementById('invite-modal').style.display='flex'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span>${currentLang === 'en' ? 'Share Invite Link' : 'مشاركة رابط الدعوة'}</span>
            </button>
            <button class="invite-btn" onclick="document.getElementById('invite-modal').style.display='flex'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"/></svg>
                <span>${currentLang === 'en' ? 'Show QR Code' : 'عرض رمز QR'}</span>
            </button>
        </div>

        <div class="section-header" style="padding: 0 20px; margin-top: 24px;">
            <h2>${currentLang === 'en' ? "Who's Ordering What" : 'مين طلب إيش'}</h2>
        </div>

        ${cart.length > 0 ? `
        <div class="member-order-card">
            <div class="member-header">
                <div class="member-avatar" style="background: var(--primary);">${currentUser ? currentUser.avatar : 'U'}</div>
                <div class="member-info">
                    <h4>${currentUser ? currentUser.name : 'You'} ${currentLang === 'en' ? '(You)' : '(أنت)'}</h4>
                    <span class="member-restaurant">${[...new Set(cart.map(c => c.restaurantName))].join(', ')}</span>
                </div>
                <span class="member-total">SAR ${getCartTotal()}</span>
            </div>
            <div class="member-items">
                ${cart.map(item => `
                    <div class="member-item">
                        <span>${item.quantity}x ${currentLang === 'en' ? item.nameEn : item.nameAr}</span>
                        <span>SAR ${item.price * item.quantity}</span>
                    </div>
                `).join('')}
            </div>
        </div>` : ''}

        <button class="add-order-btn" onclick="showScreen('screen-restaurants')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>${currentLang === 'en' ? 'Add or Edit Your Order' : 'أضف أو عدّل طلبك'}</span>
        </button>
    `;
}

// ===== ORDER CONFIRMATION =====
function placeOrder() {
    if (cart.length === 0) {
        showToast(currentLang === 'en' ? 'Cart is empty!' : 'السلة فارغة!');
        return;
    }
    document.getElementById('order-confirmation').classList.add('show');
    document.getElementById('conf-order-num').textContent = 'LH-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('conf-restaurants').textContent = [...new Set(cart.map(c => c.restaurantName))].length;
    document.getElementById('conf-items').textContent = getCartItemCount();
    document.getElementById('conf-total').textContent = `SAR ${getCartTotal() + 15}`;
}

function hideOrderConfirmation() {
    document.getElementById('order-confirmation').classList.remove('show');
    cart = [];
    cartArea = null;
    groupOrder = null;
    saveCart();
    localStorage.removeItem('lamhub_group');
    showScreen('screen-home');
}

// ===== LANGUAGE TOGGLE =====
function toggleLanguage() {
    const html = document.documentElement;
    if (currentLang === 'en') {
        currentLang = 'ar';
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        currentLang = 'en';
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
    }

    const langBtn = document.querySelector('.lang-toggle .lang-text');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'عربي' : 'EN';
    }

    // Update static bilingual elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute('data-' + currentLang);
        if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        const ph = el.getAttribute('data-placeholder-' + currentLang);
        if (ph) el.placeholder = ph;
    });

    // Re-render dynamic content
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        const screenId = activeScreen.id;
        if (screenId === 'screen-home') renderHome();
        if (screenId === 'screen-restaurants') renderRestaurants();
        if (screenId === 'screen-menu') renderMenu();
        if (screenId === 'screen-cart') renderCart();
        if (screenId === 'screen-group') renderGroup();
        if (screenId === 'screen-checkout') renderCheckout();
        if (screenId === 'screen-profile') renderProfile();
    }
}

// ===== TOAST =====
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.getElementById('app').appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    setupOTPInputs();
});
