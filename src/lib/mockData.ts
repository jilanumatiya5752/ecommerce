export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  badge?: string;
  deliveryDays: number;
  seller: string;
  description: string;
  specifications: Record<string, string>;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

export const categories = [
{ id: 'electronics', name: 'Electronics', icon: '💻', count: 2840, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80' },
{ id: 'fashion', name: 'Fashion', icon: '👗', count: 5200, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
{ id: 'home', name: 'Home & Living', icon: '🏠', count: 1920, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
{ id: 'sports', name: 'Sports', icon: '⚽', count: 980, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80' },
{ id: 'beauty', name: 'Beauty', icon: '✨', count: 1450, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80' },
{ id: 'gaming', name: 'Gaming', icon: '🎮', count: 760, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80' }];


export const products: Product[] = [
{
  id: '1',
  name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
  brand: 'Sony',
  category: 'Electronics',
  subcategory: 'Headphones',
  price: 279,
  originalPrice: 399,
  discount: 30,
  rating: 4.8,
  reviewCount: 3241,
  soldCount: 12800,
  images: [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80'],

  colors: ['Black', 'Silver', 'Midnight Blue'],
  sizes: [],
  stock: 48,
  badge: 'Best Seller',
  deliveryDays: 2,
  seller: 'TechZone Official',
  description: 'Industry-leading noise cancellation with Auto NC Optimizer. Up to 30-hour battery life with quick charging. Multipoint connection allows pairing with two devices simultaneously. Crystal clear hands-free calling with precise voice pickup.',
  specifications: { 'Driver Size': '30mm', 'Frequency Response': '4Hz–40,000Hz', 'Battery Life': '30 hours', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.2', 'NFC': 'Yes' },
  isTrending: true,
  isFeatured: true
},
{
  id: '2',
  name: 'Apple MacBook Air 15" M3 Chip',
  brand: 'Apple',
  category: 'Electronics',
  subcategory: 'Laptops',
  price: 1099,
  originalPrice: 1299,
  discount: 15,
  rating: 4.9,
  reviewCount: 1876,
  soldCount: 8400,
  images: [
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  'https://images.unsplash.com/photo-1611186871525-7b4e07c5cf0b?w=800&q=80',
  'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80'],

  colors: ['Midnight', 'Starlight', 'Space Gray'],
  sizes: ['8GB/256GB', '16GB/512GB', '24GB/1TB'],
  stock: 23,
  badge: 'Flash Sale',
  deliveryDays: 3,
  seller: 'Apple Authorized',
  description: 'Supercharged by M3 chip with 18-hour battery life. 15.3-inch Liquid Retina display. Up to 24GB unified memory. Works with iPhone and iPad.',
  specifications: { 'Chip': 'Apple M3', 'Display': '15.3-inch Liquid Retina', 'Battery': '18 hours', 'Weight': '1.51 kg', 'Ports': '2x Thunderbolt 3, MagSafe 3' },
  isTrending: true,
  isFeatured: true
},
{
  id: '3',
  name: 'Nike Air Max 270 React Running Shoes',
  brand: 'Nike',
  category: 'Fashion',
  subcategory: 'Sneakers',
  price: 89,
  originalPrice: 130,
  discount: 32,
  rating: 4.6,
  reviewCount: 5890,
  soldCount: 34200,
  images: [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80'],

  colors: ['Black/White', 'Volt/Black', 'University Red'],
  sizes: ['7', '8', '9', '10', '11', '12'],
  stock: 156,
  badge: 'Hot Deal',
  deliveryDays: 2,
  seller: 'Nike Store US',
  description: 'Lightweight React foam midsole delivers smooth, springy cushioning. Mesh upper provides breathability. Rubber outsole for traction.',
  specifications: { 'Upper': 'Mesh + Synthetic', 'Midsole': 'React foam', 'Outsole': 'Rubber', 'Weight': '285g', 'Closure': 'Lace-up' },
  isTrending: true
},
{
  id: '4',
  name: 'Samsung 65" 4K QLED Smart TV QN65Q80C',
  brand: 'Samsung',
  category: 'Electronics',
  subcategory: 'TVs',
  price: 899,
  originalPrice: 1299,
  discount: 31,
  rating: 4.7,
  reviewCount: 2134,
  soldCount: 6700,
  images: [
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=800&q=80',
  'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80'],

  colors: ['Black'],
  sizes: ['55"', '65"', '75"', '85"'],
  stock: 12,
  badge: 'Limited Stock',
  deliveryDays: 5,
  seller: 'Samsung Official',
  description: 'Quantum HDR with Quantum Dot technology. Neural Quantum Processor 4K. Dolby Atmos sound. Smart TV powered by Tizen OS.',
  specifications: { 'Resolution': '4K UHD', 'HDR': 'Quantum HDR', 'Refresh Rate': '120Hz', 'Smart TV': 'Tizen OS', 'HDMI Ports': '4' },
  isFeatured: true
},
{
  id: '5',
  name: 'Dyson V15 Detect Absolute Cordless Vacuum',
  brand: 'Dyson',
  category: 'Home & Living',
  subcategory: 'Appliances',
  price: 649,
  originalPrice: 799,
  discount: 19,
  rating: 4.8,
  reviewCount: 987,
  soldCount: 4200,
  images: [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94ebb79d5?w=800&q=80'],

  colors: ['Yellow/Nickel', 'Submarine'],
  sizes: [],
  stock: 31,
  deliveryDays: 3,
  seller: 'Dyson Direct',
  description: 'Laser Slim Fluffy head reveals microscopic dust. Piezo sensor counts and sizes particles. HEPA filtration captures 99.99% of particles.',
  specifications: { 'Suction': '230 AW', 'Run Time': '60 min', 'Weight': '3.1 kg', 'Filtration': 'HEPA', 'Bin Volume': '0.77L' },
  isFeatured: true
},
{
  id: '6',
  name: 'Levi\'s 511 Slim Fit Jeans',
  brand: "Levi's",
  category: 'Fashion',
  subcategory: 'Jeans',
  price: 49,
  originalPrice: 69,
  discount: 29,
  rating: 4.5,
  reviewCount: 8920,
  soldCount: 52000,
  images: [
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80'],

  colors: ['Indigo', 'Black', 'Medium Wash', 'Dark Wash'],
  sizes: ['28x30', '30x32', '32x32', '34x32', '36x34'],
  stock: 340,
  badge: 'Top Rated',
  deliveryDays: 2,
  seller: "Levi's Official",
  description: 'Classic slim fit sits below waist. Straight through thigh with slim leg opening. Iconic 5-pocket styling.',
  specifications: { 'Fit': 'Slim', 'Rise': 'Mid', 'Material': '99% Cotton, 1% Elastane', 'Care': 'Machine wash cold' },
  isTrending: true
},
{
  id: '7',
  name: 'PlayStation 5 Console DualSense Bundle',
  brand: 'Sony',
  category: 'Gaming',
  subcategory: 'Consoles',
  price: 499,
  originalPrice: 549,
  discount: 9,
  rating: 4.9,
  reviewCount: 14230,
  soldCount: 89000,
  images: [
  'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
  'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80'],

  colors: ['White', 'Midnight Black'],
  sizes: [],
  stock: 5,
  badge: 'Low Stock',
  deliveryDays: 2,
  seller: 'GameZone Pro',
  description: 'Experience lightning-fast loading with ultra-high speed SSD. Feel physically responsive feedback with haptic feedback. Adaptive triggers dynamically simulate tension.',
  specifications: { 'CPU': 'AMD Zen 2, 8 cores', 'GPU': '10.3 TFLOPS RDNA 2', 'Storage': '825GB SSD', 'RAM': '16GB GDDR6', 'Resolution': 'Up to 8K' },
  isTrending: true,
  isFeatured: true
},
{
  id: '8',
  name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
  brand: 'Instant Pot',
  category: 'Home & Living',
  subcategory: 'Kitchen',
  price: 79,
  originalPrice: 119,
  discount: 34,
  rating: 4.7,
  reviewCount: 22100,
  soldCount: 145000,
  images: [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'],

  colors: ['Black', 'Red'],
  sizes: ['3 Qt', '6 Qt', '8 Qt'],
  stock: 200,
  badge: 'Best Value',
  deliveryDays: 2,
  seller: 'Kitchen Essentials',
  description: 'Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and warmer.',
  specifications: { 'Capacity': '6 quart', 'Programs': '13 built-in', 'Material': 'Stainless steel', 'Wattage': '1000W' },
  isFeatured: true
},
{
  id: '9',
  name: 'Garmin Forerunner 265 GPS Running Smartwatch',
  brand: 'Garmin',
  category: 'Sports',
  subcategory: 'Smartwatches',
  price: 349,
  originalPrice: 449,
  discount: 22,
  rating: 4.7,
  reviewCount: 1540,
  soldCount: 8900,
  images: [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'],

  colors: ['Black', 'Whitestone', 'Aqua'],
  sizes: ['42mm', '46mm'],
  stock: 67,
  badge: 'New',
  deliveryDays: 3,
  seller: 'Garmin Certified',
  description: 'AMOLED display with 13-day battery life. Morning Report with daily suggested workouts. Race predictor and recovery advisor.',
  specifications: { 'Display': 'AMOLED', 'Battery': '13 days', 'GPS': 'Multi-band', 'Water Rating': '5 ATM', 'Weight': '47g' },
  isNew: true,
  isTrending: true
},
{
  id: '10',
  name: 'Charlotte Tilbury Pillow Talk Lipstick',
  brand: 'Charlotte Tilbury',
  category: 'Beauty',
  subcategory: 'Makeup',
  price: 34,
  originalPrice: 40,
  discount: 15,
  rating: 4.9,
  reviewCount: 18760,
  soldCount: 230000,
  images: [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80'],

  colors: ['Pillow Talk', 'Pillow Talk Medium', 'Pillow Talk Intense'],
  sizes: [],
  stock: 890,
  badge: 'Iconic',
  deliveryDays: 2,
  seller: 'Beauty Luxe',
  description: 'The iconic pinky-nude lipstick that flatters all skin tones. Hyaluronic acid complex for plumping. 8-hour wear formula.',
  specifications: { 'Finish': 'Matte', 'Formula': 'Hyaluronic Acid', 'Wear': '8 hours', 'Cruelty Free': 'Yes' },
  isTrending: true,
  isFeatured: true
},
{
  id: '11',
  name: 'Logitech MX Master 3S Wireless Mouse',
  brand: 'Logitech',
  category: 'Electronics',
  subcategory: 'Accessories',
  price: 89,
  originalPrice: 109,
  discount: 18,
  rating: 4.8,
  reviewCount: 6720,
  soldCount: 42000,
  images: [
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'],

  colors: ['Graphite', 'Pale Gray'],
  sizes: [],
  stock: 145,
  deliveryDays: 2,
  seller: 'TechZone Official',
  description: '8000 DPI sensor. Quiet click buttons. MagSpeed electromagnetic scrolling. Works on any surface including glass.',
  specifications: { 'DPI': '200–8000', 'Battery': '70 days', 'Connectivity': 'Bluetooth + USB', 'Buttons': '7' },
  isFeatured: true
},
{
  id: '12',
  name: 'Under Armour HOVR Phantom 3 Running Shoes',
  brand: 'Under Armour',
  category: 'Sports',
  subcategory: 'Running',
  price: 119,
  originalPrice: 160,
  discount: 26,
  rating: 4.6,
  reviewCount: 2890,
  soldCount: 19400,
  images: [
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'],

  colors: ['Black', 'White', 'Electric Teal'],
  sizes: ['7', '8', '9', '10', '11', '12'],
  stock: 88,
  badge: 'Flash Sale',
  deliveryDays: 2,
  seller: 'SportsPro Store',
  description: 'HOVR technology provides zero gravity feel. Energy return that helps eliminate impact. Connected to MapMyRun app.',
  specifications: { 'Upper': 'Engineered mesh', 'Midsole': 'HOVR + EVA', 'Drop': '8mm', 'Weight': '298g' },
  isTrending: true
}];


export const flashSaleProducts = products.filter((p) => p.badge === 'Flash Sale' || p.discount >= 25).slice(0, 4);
export const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);
export const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

export const reviews: Review[] = [
{ id: 'r1', user: 'Marcus Thompson', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_149cc8178-1767712619103.png", rating: 5, date: 'March 15, 2025', title: 'Absolutely incredible sound quality', body: 'These headphones have completely transformed my music listening experience. The noise cancellation is out of this world — I can barely hear anything on my morning commute. Battery life is exceptional too.', helpful: 142, verified: true },
{ id: 'r2', user: 'Priya Kapoor', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_188550edd-1774693842049.png", rating: 5, date: 'April 2, 2025', title: 'Best headphones I\'ve ever owned', body: 'I\'ve tried Bose and Sennheiser but these beat them all. The touch controls are intuitive and the sound profile is perfectly balanced. Worth every penny.', helpful: 98, verified: true },
{ id: 'r3', user: 'James Wilson', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12d8654e9-1772222921360.png", rating: 4, date: 'April 18, 2025', title: 'Great but slightly tight fit', body: 'Sound and ANC are phenomenal. The only minor issue is that they feel a bit tight after 3+ hours. Still giving 4 stars because the audio quality is unmatched in this price range.', helpful: 67, verified: false },
{ id: 'r4', user: 'Sofia Martinez', avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15183dbb3-1767100330465.png", rating: 5, date: 'May 1, 2025', title: 'Perfect for WFH', body: 'Using these for work calls and music all day. The multipoint connection feature is a game changer — switches between my laptop and phone seamlessly.', helpful: 55, verified: true }];


export const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', "Levi\'s", 'Dyson', 'Logitech', 'Garmin', 'Under Armour'];