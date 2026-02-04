// Products mock data
export const mockProducts = [
  { id: '1', title: 'A Gentle Touch of Serenity', titleHe: 'מגע עדין של שלווה', price: 3450, categories: ['wildlife', 'Peace'], image_url: '/products/A_Gentle_Touch_of_Serenity_.webp', stock: 15 },
  { id: '2', title: 'A Lingering Glance in the Grass', titleHe: 'מבט מתמשך בעשב', price: 7820, categories: ['wildlife', 'Curiosity'], image_url: '/products/A_Lingering_Glance_in_the_Grass_.webp', stock: 8 },
  { id: '3', title: 'A Moment of Gentle Grace', titleHe: 'רגע של חן עדין', price: 2190, categories: ['wildlife', 'Naturalness'], image_url: '/products/A_Moment_of_Gentle_Grace_.webp', stock: 22 },
  { id: '4', title: 'A Strategy in the Shadows', titleHe: 'אסטרטגיה בצללים', price: 5670, categories: ['wildlife', 'Focus'], image_url: '/products/A_Strategy_in_the_Shadows_.webp', stock: 5 },
  { id: '5', title: 'A Stride Toward Discovery', titleHe: 'צעד לקראת גילוי', price: 4230, categories: ['wildlife', 'Curiosity'], image_url: '/products/A_Stride_Toward_Discovery_.webp', stock: 12 },
  { id: '6', title: 'A Whimsical Shift of Perspective', titleHe: 'שינוי פרספקטיבה שובבי', price: 8940, categories: ['wildlife', 'Vision'], image_url: '/products/A_Whimsical_Shift_of_Perspective.webp', stock: 3 },
  { id: '7', title: 'Ascending with Grace', titleHe: 'עלייה בחן', price: 1560, categories: ['wildlife', 'Determination'], image_url: '/products/Ascending_with_Grace_.webp', stock: 18 },
  { id: '8', title: 'Aspiring to the Peak', titleHe: 'שאיפה לפסגה', price: 6780, categories: ['landscapes', 'Power'], image_url: '/products/Aspiring_to_the_Peak_.webp', stock: 7 },
  { id: '9', title: 'Burst of Vitality', titleHe: 'התפרצות חיוניות', price: 3890, categories: ['wildlife', 'Power'], image_url: '/products/Burst_of_Vitality_.webp', stock: 14 },
  { id: '10', title: 'Celestial Alignment', titleHe: 'יישור שמימי', price: 9450, categories: ['landscapes', 'Wholeness'], image_url: '/products/Celestial_Alignment_.webp', stock: 2 }
];

// Articles mock data - About the photographers
export const mockArticles = [
  {
    id: '1',
    title: 'The Artist Behind the Lens',
    titleHe: 'האמן מאחורי העדשה',
    content: 'Meet our lead photographer who has spent over two decades capturing the raw beauty of wildlife and nature. His journey started in childhood when he received his first camera as a gift.',
    contentHe: 'הכירו את הצלם הראשי שלנו שביליה יותר משני עשורים בלכידת היופי הגולמי של חיות הבר והטבע. המסע שלו התחיל בילדותו, כשקיבל את המצלמה הראשונה שלו במתנה. מאז, הוא טייל ליותר מ-50 מדינות, תיעד רגעים נדירים ויצר אמנות שמדברת אל הנשמה. כל תמונה מספרת סיפור של סבלנות, התמדה ואהבה עמוקה לטבע.',
    image_url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    order: 1,
    published: true
  },
  {
    id: '2',
    title: 'Our Creative Vision',
    titleHe: 'החזון היצירתי שלנו',
    content: 'Discover our unique approach to wildlife photography and what drives our passion. We believe that true photography does not just document reality, but reveals the soul hidden within.',
    contentHe: 'גלו את הגישה הייחודית שלנו לצילום חיות בר ומה מניע את התשוקה שלנו. אנחנו מאמינים שצילום אמיתי לא רק מתעד את המציאות, אלא חושף את הנשמה שמסתתרת בתוכה. הפילוסופיה שלנו מבוססת על כבוד לטבע, סבלנות אינסופית והבנה עמוקה של התנהגות בעלי חיים. כל יציאה לשטח היא הרפתקה חדשה, כל פגישה עם חיית בר היא זכות.',
    image_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    order: 2,
    published: true
  }
];

// Reviews mock data
export const mockReviews = [
  {
    id: '1',
    customerName: 'Sarah M.',
    rating: 5,
    text: 'Absolutely stunning! The quality exceeded my expectations.',
    textHe: 'פשוט מדהים! האיכות עלתה על הציפיות שלי.',
    approved: true,
    featured: true
  },
  {
    id: '2',
    customerName: 'David K.',
    rating: 5,
    text: 'The colors are vibrant and the detail is incredible.',
    textHe: 'הצבעים עזים והפרטים מדהימים.',
    approved: true,
    featured: true
  },
  {
    id: '3',
    customerName: 'Michelle R.',
    rating: 4,
    text: 'Beautiful artwork, shipping was fast and packaging was excellent.',
    textHe: 'אמנות יפה, המשלוח היה מהיר והאריזה הייתה מעולה.',
    approved: true,
    featured: false
  },
  {
    id: '4',
    customerName: 'John B.',
    rating: 5,
    text: 'Perfect addition to our home. We get compliments all the time!',
    textHe: 'תוספת מושלמת לבית שלנו. אנחנו מקבלים מחמאות כל הזמן!',
    approved: false,
    featured: false
  },
  {
    id: '5',
    customerName: 'Lisa T.',
    rating: 3,
    text: 'Good quality but took longer than expected to arrive.',
    textHe: 'איכות טובה אבל לקח יותר זמן מהצפוי להגיע.',
    approved: false,
    featured: false
  }
];

// Users mock data
export const mockUsers = [
  {
    id: '1',
    email: 'sarah.m@email.com',
    firstName: 'Sarah',
    lastName: 'Miller',
    phone: '+972-50-123-4567',
    address: '123 Herzl St, Tel Aviv',
    totalOrders: 3,
    totalSpent: 12450
  },
  {
    id: '2',
    email: 'david.k@email.com',
    firstName: 'David',
    lastName: 'Cohen',
    phone: '+972-52-234-5678',
    address: '45 Ben Yehuda St, Jerusalem',
    totalOrders: 5,
    totalSpent: 24890
  },
  {
    id: '3',
    email: 'michelle.r@email.com',
    firstName: 'Michelle',
    lastName: 'Rosen',
    phone: '+972-54-345-6789',
    address: '78 Rothschild Blvd, Tel Aviv',
    totalOrders: 2,
    totalSpent: 8760
  },
  {
    id: '4',
    email: 'john.b@email.com',
    firstName: 'John',
    lastName: 'Ben-David',
    phone: '+972-53-456-7890',
    address: '12 Dizengoff St, Tel Aviv',
    totalOrders: 1,
    totalSpent: 3450
  },
  {
    id: '5',
    email: 'lisa.t@email.com',
    firstName: 'Lisa',
    lastName: 'Tal',
    phone: '+972-58-567-8901',
    address: '56 HaYarkon St, Haifa',
    totalOrders: 4,
    totalSpent: 18920
  }
];

// Orders mock data
export const mockOrders = [
  {
    id: 'ORD-001',
    userId: '1',
    customerName: 'Sarah Miller',
    items: [
      { productId: '1', title: 'A Gentle Touch of Serenity', quantity: 1, price: 3450 }
    ],
    status: 'delivered',
    total: 3450,
    shippingAddress: '123 Herzl St, Tel Aviv',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD-002',
    userId: '2',
    customerName: 'David Cohen',
    items: [
      { productId: '2', title: 'A Lingering Glance in the Grass', quantity: 1, price: 7820 },
      { productId: '3', title: 'A Moment of Gentle Grace', quantity: 1, price: 2190 }
    ],
    status: 'shipped',
    total: 10010,
    shippingAddress: '45 Ben Yehuda St, Jerusalem',
    createdAt: '2024-01-18T14:45:00Z'
  },
  {
    id: 'ORD-003',
    userId: '3',
    customerName: 'Michelle Rosen',
    items: [
      { productId: '6', title: 'A Whimsical Shift of Perspective', quantity: 1, price: 8940 }
    ],
    status: 'processing',
    total: 8940,
    shippingAddress: '78 Rothschild Blvd, Tel Aviv',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 'ORD-004',
    userId: '4',
    customerName: 'John Ben-David',
    items: [
      { productId: '7', title: 'Ascending with Grace', quantity: 2, price: 3120 }
    ],
    status: 'pending',
    total: 3120,
    shippingAddress: '12 Dizengoff St, Tel Aviv',
    createdAt: '2024-01-22T16:00:00Z'
  },
  {
    id: 'ORD-005',
    userId: '5',
    customerName: 'Lisa Tal',
    items: [
      { productId: '10', title: 'Celestial Alignment', quantity: 1, price: 9450 }
    ],
    status: 'cancelled',
    total: 9450,
    shippingAddress: '56 HaYarkon St, Haifa',
    createdAt: '2024-01-10T11:30:00Z'
  },
  {
    id: 'ORD-006',
    userId: '2',
    customerName: 'David Cohen',
    items: [
      { productId: '4', title: 'A Strategy in the Shadows', quantity: 1, price: 5670 }
    ],
    status: 'delivered',
    total: 5670,
    shippingAddress: '45 Ben Yehuda St, Jerusalem',
    createdAt: '2024-01-08T08:20:00Z'
  }
];

// Analytics mock data
export const mockAnalytics = {
  currentMonth: {
    revenue: 45670,
    orders: 28,
    newUsers: 15,
    avgOrderValue: 1631
  },
  previousMonth: {
    revenue: 38920,
    orders: 22,
    newUsers: 12,
    avgOrderValue: 1769
  },
  ordersByStatus: [
    { status: 'pending', count: 8, color: '#f59e0b' },
    { status: 'processing', count: 5, color: '#3b82f6' },
    { status: 'shipped', count: 7, color: '#8b5cf6' },
    { status: 'delivered', count: 45, color: '#22c55e' },
    { status: 'cancelled', count: 3, color: '#ef4444' }
  ],
  topProducts: [
    { id: '6', title: 'A Whimsical Shift of Perspective', sales: 12, revenue: 107280 },
    { id: '10', title: 'Celestial Alignment', sales: 8, revenue: 75600 },
    { id: '2', title: 'A Lingering Glance in the Grass', sales: 7, revenue: 54740 },
    { id: '8', title: 'Aspiring to the Peak', sales: 6, revenue: 40680 },
    { id: '4', title: 'A Strategy in the Shadows', sales: 5, revenue: 28350 }
  ],
  usersGained: [
    { month: 'Aug', users: 8 },
    { month: 'Sep', users: 12 },
    { month: 'Oct', users: 10 },
    { month: 'Nov', users: 15 },
    { month: 'Dec', users: 12 },
    { month: 'Jan', users: 15 }
  ],
  ordersByTime: [
    { hour: '6AM', orders: 2 },
    { hour: '9AM', orders: 8 },
    { hour: '12PM', orders: 15 },
    { hour: '3PM', orders: 12 },
    { hour: '6PM', orders: 18 },
    { hour: '9PM', orders: 10 },
    { hour: '12AM', orders: 3 }
  ],
  revenueByMonth: [
    { month: 'Dec', current: 38920, previous: 32100 },
    { month: 'Jan', current: 45670, previous: 38920 }
  ]
};

// Helper function to get products (combines mock with localStorage)
export function getProducts() {
  const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
  return [...mockProducts, ...savedProducts];
}

// Helper function to save products
export function saveProducts(products) {
  const newProducts = products.filter(p => !mockProducts.find(mp => mp.id === p.id));
  localStorage.setItem('adminProducts', JSON.stringify(newProducts));
}

// Category labels
export const categoryLabels = {
  wildlife: { en: 'Wildlife', he: 'חיות' },
  landscapes: { en: 'Landscapes', he: 'נופים' },
  tribes: { en: 'People', he: 'אנשים' },
  Authenticity: { en: 'Authenticity', he: 'אותנטיות' },
  Drama: { en: 'Drama', he: 'דרמה' },
  Vision: { en: 'Vision', he: 'חזון' },
  Fear: { en: 'Fear', he: 'חשש' },
  Naturalness: { en: 'Naturalness', he: 'טבעיות' },
  Focus: { en: 'Focus', he: 'מיקוד' },
  Determination: { en: 'Determination', he: 'נחישות' },
  Curiosity: { en: 'Curiosity', he: 'סקרנות' },
  Power: { en: 'Power', he: 'עוצמה' },
  Peace: { en: 'Peace', he: 'שלווה' },
  Wholeness: { en: 'Wholeness', he: 'שלמות' }
};
