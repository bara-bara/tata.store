/**
 * TATA.STORE - Authentic Initial Data from Tata Oasis Market Reference
 */

import {
  Category,
  Product,
  MoroccanCity,
  ShippingZone,
  Coupon,
  ProductReview,
  SiteSettings,
  AdminUser,
  Customer,
} from "../types";

export const INITIAL_CITIES: MoroccanCity[] = [
  {
    "id": "city-0",
    "nameAr": "طاطا",
    "nameFr": "طاطا",
    "region": "طاطا والجنوب",
    "isTata": true
  },
  {
    "id": "city-1",
    "nameAr": "أكادير",
    "nameFr": "أكادير",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-2",
    "nameAr": "مراكش",
    "nameFr": "مراكش",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-3",
    "nameAr": "الدار البيضاء",
    "nameFr": "الدار البيضاء",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-4",
    "nameAr": "الرباط",
    "nameFr": "الرباط",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-5",
    "nameAr": "فاس",
    "nameFr": "فاس",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-6",
    "nameAr": "مكناس",
    "nameFr": "مكناس",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-7",
    "nameAr": "طنجة",
    "nameFr": "طنجة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-8",
    "nameAr": "وجدة",
    "nameFr": "وجدة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-9",
    "nameAr": "القنيطرة",
    "nameFr": "القنيطرة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-10",
    "nameAr": "تطوان",
    "nameFr": "تطوان",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-11",
    "nameAr": "سلا",
    "nameFr": "سلا",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-12",
    "nameAr": "المحمدية",
    "nameFr": "المحمدية",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-13",
    "nameAr": "الجديدة",
    "nameFr": "الجديدة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-14",
    "nameAr": "بني ملال",
    "nameFr": "بني ملال",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-15",
    "nameAr": "الناظور",
    "nameFr": "الناظور",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-16",
    "nameAr": "العيون",
    "nameFr": "العيون",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-17",
    "nameAr": "خريبكة",
    "nameFr": "خريبكة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-18",
    "nameAr": "برشيد",
    "nameFr": "برشيد",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-19",
    "nameAr": "تازة",
    "nameFr": "تازة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-20",
    "nameAr": "سطات",
    "nameFr": "سطات",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-21",
    "nameAr": "بركان",
    "nameFr": "بركان",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-22",
    "nameAr": "خنيفرة",
    "nameFr": "خنيفرة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-23",
    "nameAr": "ورزازات",
    "nameFr": "ورزازات",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-24",
    "nameAr": "الصويرة",
    "nameFr": "الصويرة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-25",
    "nameAr": "تارودانت",
    "nameFr": "تارودانت",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-26",
    "nameAr": "تيزنيت",
    "nameFr": "تيزنيت",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-27",
    "nameAr": "گلميم",
    "nameFr": "گلميم",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-28",
    "nameAr": "السمارة",
    "nameFr": "السمارة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-29",
    "nameAr": "الداخلة",
    "nameFr": "الداخلة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-30",
    "nameAr": "الحسيمة",
    "nameFr": "الحسيمة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-31",
    "nameAr": "تادلة",
    "nameFr": "تادلة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-32",
    "nameAr": "أزيلال",
    "nameFr": "أزيلال",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-33",
    "nameAr": "رشيدية",
    "nameFr": "رشيدية",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-34",
    "nameAr": "زاكورة",
    "nameFr": "زاكورة",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-35",
    "nameAr": "تنغير",
    "nameFr": "تنغير",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-36",
    "nameAr": "كلميم",
    "nameFr": "كلميم",
    "region": "المملكة المغربية",
    "isTata": false
  },
  {
    "id": "city-37",
    "nameAr": "أسا",
    "nameFr": "أسا",
    "region": "طاطا والجنوب",
    "isTata": false
  },
  {
    "id": "city-38",
    "nameAr": "فم الحصن",
    "nameFr": "فم الحصن",
    "region": "طاطا والجنوب",
    "isTata": true
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "6ab03fdb9bf52d08424ee6e6",
    "name": "التمور",
    "nameFr": "dates",
    "slug": "dates",
    "description": "تمور طاطا الأصيلة من قلب الواحة",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg",
    "order": 1,
    "isActive": true,
    "seoTitle": "التمور من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات التمور الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e7",
    "name": "الكسكس",
    "nameFr": "couscous",
    "slug": "couscous",
    "description": "كسكس طاطا التقليدي المحضّر بعناية",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/6c534e736_generated_2abe2ad0.jpg",
    "order": 2,
    "isActive": true,
    "seoTitle": "الكسكس من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات الكسكس الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e8",
    "name": "العسل",
    "nameFr": "honey",
    "slug": "honey",
    "description": "عسل طبيعي من مناحل المنطقة",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/b4bec429d_generated_e9527a33.jpg",
    "order": 3,
    "isActive": true,
    "seoTitle": "العسل من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات العسل الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e9",
    "name": "الأعشاب الطبيعية",
    "nameFr": "herbs",
    "slug": "herbs",
    "description": "أعشاب ومنتجات طبيعية مجففة",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/60058dfaf_generated_d1c16457.jpg",
    "order": 4,
    "isActive": true,
    "seoTitle": "الأعشاب الطبيعية من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات الأعشاب الطبيعية الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6ea",
    "name": "الزيوت",
    "nameFr": "oils",
    "slug": "oils",
    "description": "زيوت طبيعية أصيلة",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/cbc825294_generated_2f0183a4.jpg",
    "order": 5,
    "isActive": true,
    "seoTitle": "الزيوت من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات الزيوت الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6eb",
    "name": "التوابل",
    "nameFr": "spices",
    "slug": "spices",
    "description": "توابل ومنكهات طبيعية",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/5575696eb_generated_b2d87b39.jpg",
    "order": 6,
    "isActive": true,
    "seoTitle": "التوابل من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات التوابل الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6ec",
    "name": "هدايا طاطا",
    "nameFr": "gifts",
    "slug": "gifts",
    "description": "منتجات تقليدية وهدايا من الواحة",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/f8db4a7d4_generated_3e7314cb.jpg",
    "order": 7,
    "isActive": true,
    "seoTitle": "هدايا طاطا من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات هدايا طاطا الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  },
  {
    "id": "6ab03fdb9bf52d08424ee6ed",
    "name": "منتجات الواحة",
    "nameFr": "oasis-products",
    "slug": "oasis-products",
    "description": "منتوجات متنوعة من واحة طاطا",
    "image": "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg",
    "order": 8,
    "isActive": true,
    "seoTitle": "منتجات الواحة من واحات طاطا | TATA.STORE",
    "seoDescription": "اكتشف أجود منتوجات منتجات الواحة الطبيعية والأصيلة من قلب واحات طاطا بالمغرب."
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "6ab040119bf52d08424ee709",
    "name": "تمر مجهول فاخر",
    "nameFr": "medjool-dates",
    "slug": "medjool-dates",
    "shortDescription": "تمر مجهول طري ذو مذاق غني، مقطوف من نخيل طاطا",
    "description": "تمر مجهول فاخر من واحات طاطا، يتميز بحجمه الكبير وقوامه الطري ومذاقه الغني بالكراميل الطبيعي. يُقطف يدوياً ويُفرز بعناية ويُغلّف ليصلك طازجاً.",
    "price": 89,
    "compareAtPrice": 110,
    "categoryId": "6ab03fdb9bf52d08424ee6e6",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg"
    ],
    "stock": 50,
    "sku": "DT-001",
    "weight": "500 غرام",
    "origin": "واحة طاطا",
    "ingredients": "تمر مجهول 100%",
    "usage": "يُؤكل مباشرة أو يُضاف للحلويات والمشروبات",
    "preservation": "يحفظ في مكان جاف وبارد بعيداً عن أشعة الشمس",
    "badge": "bestseller",
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "تمر",
      "مجهول",
      "واحة"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70a",
    "name": "تمر بو فاكوس",
    "nameFr": "boufakkous-dates",
    "slug": "boufakkous-dates",
    "shortDescription": "تمر أصفر طري بحلاوة متوسطة",
    "description": "تمر بو فاكوس من نخيل طاطا، ذو لون فاتح وقوام طري وحلاوة متوسطة، مثالي للاستعمال اليومي.",
    "price": 65,
    "categoryId": "6ab03fdb9bf52d08424ee6e6",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg"
    ],
    "stock": 40,
    "sku": "DT-002",
    "weight": "500 غرام",
    "origin": "واحة طاطا",
    "ingredients": "تمر بو فاكوس 100%",
    "preservation": "يحفظ في مكان جاف وبارد",
    "badge": "new",
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "تمر"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70b",
    "name": "كسكس طاطا الجاهز للتسخين",
    "nameFr": "tata-couscous",
    "slug": "tata-couscous",
    "shortDescription": "كسكس تقليدي محضّر يدوياً، جاهز للتسخين والتقديم",
    "description": "كسكس طاطا التقليدي المحضّر يدوياً من القمح المحلي، بحبيبات متوسطة وقوام مثالي. يصلك جاهزاً للتسخين والتقديم مباشرة.",
    "price": 45,
    "compareAtPrice": 55,
    "categoryId": "6ab03fdb9bf52d08424ee6e7",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/6c534e736_generated_2abe2ad0.jpg"
    ],
    "stock": 60,
    "sku": "CC-001",
    "weight": "1 كيلوغرام",
    "origin": "طاطا",
    "ingredients": "سميد القمح، ماء",
    "usage": "يُسخّن ويُقدّم مع الخضار أو اللحم",
    "preservation": "يحفظ في مكان جاف",
    "badge": "bestseller",
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "كسكس",
      "تقليدي"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70c",
    "name": "عسل السدر الجبلي",
    "nameFr": "mountain-honey",
    "slug": "mountain-honey",
    "shortDescription": "عسل طبيعي خام من مناحل المنطقة الجبلية",
    "description": "عسل طبيعي خام غير معالج حرارياً، يُجمع من أزهار المنطقة الجبلية حول طاطا. غني بالنكهة ومتعدد الاستعمالات.",
    "price": 120,
    "categoryId": "6ab03fdb9bf52d08424ee6e8",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/b4bec429d_generated_e9527a33.jpg"
    ],
    "stock": 21,
    "sku": "HN-001",
    "weight": "500 غرام",
    "origin": "جبال طاطا",
    "ingredients": "عسل طبيعي 100%",
    "usage": "يُضاف للمشروبات أو يُؤكل مباشرة",
    "preservation": "يحفظ في درجة حرارة الغرفة",
    "badge": "original",
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "عسل",
      "طبيعي"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70d",
    "name": "أعشاب طبيعية مجففة",
    "nameFr": "dried-herbs",
    "slug": "dried-herbs",
    "shortDescription": "مجموعة أعشاب محلية مجففة بعناية",
    "description": "مجموعة من الأعشاب الطبيعية المجففة من منطقة طاطا، تُقطف وتُجفف بعناية للحفاظ على نكهتها وروائحها.",
    "price": 35,
    "compareAtPrice": 45,
    "categoryId": "6ab03fdb9bf52d08424ee6e9",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/60058dfaf_generated_d1c16457.jpg"
    ],
    "stock": 35,
    "sku": "HB-001",
    "weight": "200 غرام",
    "origin": "طاطا",
    "ingredients": "أعشاب طبيعية مجففة",
    "usage": "تُستعمل للتتبيل أو الشاي",
    "preservation": "يحفظ في وعاء محكم الإغلاق بمكان جاف",
    "badge": "sale",
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "أعشاب"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70e",
    "name": "زيت الأركان الطبيعي",
    "nameFr": "argan-oil",
    "slug": "argan-oil",
    "shortDescription": "زيت أركان طبيعي معصور على البارد",
    "description": "زيت أركان طبيعي معصور على البارد من ثمار شجر الأركان، غني بالعناصر الطبيعية.",
    "price": 95,
    "categoryId": "6ab03fdb9bf52d08424ee6ea",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/cbc825294_generated_2f0183a4.jpg"
    ],
    "stock": 20,
    "sku": "OL-001",
    "weight": "250 مل",
    "origin": "الجنوب المغربي",
    "ingredients": "زيت أركان 100%",
    "usage": "للطهي أو العناية",
    "preservation": "يحفظ في مكان بارد بعيداً عن الضوء",
    "badge": "original",
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "زيت",
      "أركان"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee70f",
    "name": "زيت الزيتون البكر",
    "nameFr": "olive-oil",
    "slug": "olive-oil",
    "shortDescription": "زيت زيتون بكر ممتاز معصور تقليدياً",
    "description": "زيت زيتون بكر ممتاز معصور بطرق تقليدية من زيتون المنطقة.",
    "price": 75,
    "categoryId": "6ab03fdb9bf52d08424ee6ea",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/cbc825294_generated_2f0183a4.jpg"
    ],
    "stock": 30,
    "sku": "OL-002",
    "weight": "750 مل",
    "origin": "طاطا",
    "ingredients": "زيت زيتون بكر 100%",
    "preservation": "يحفظ في مكان بارد",
    "badge": "new",
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "زيت",
      "زيتون"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee710",
    "name": "خلطة توابل طاطا",
    "nameFr": "tata-spice-mix",
    "slug": "tata-spice-mix",
    "shortDescription": "خلطة توابل تقليدية بنكهة أصيلة",
    "description": "خلطة توابل تقليدية من طاطا، تجمع بين منكهات طبيعية مختارة بعناية لإضفاء نكهة أصيلة على أطباقك.",
    "price": 30,
    "categoryId": "6ab03fdb9bf52d08424ee6eb",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/5575696eb_generated_b2d87b39.jpg"
    ],
    "stock": 45,
    "sku": "SP-001",
    "weight": "150 غرام",
    "origin": "طاطا",
    "ingredients": "خلطة توابل طبيعية",
    "usage": "يُضاف للطاجين والكسكس",
    "preservation": "يحفظ في وعاء محكم",
    "badge": "limited",
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "توابل"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee711",
    "name": "صندوق هدايا طاطا",
    "nameFr": "tata-gift-box",
    "slug": "tata-gift-box",
    "shortDescription": "صندوق هدايا يجمع منتوجات الواحة المختارة",
    "description": "صندوق هدايا أنيق يجمع تشكيلة من منتوجات طاطا المختارة: تمر، عسل، أعشاب وتوابل. مثالي للإهداء.",
    "price": 220,
    "compareAtPrice": 260,
    "categoryId": "6ab03fdb9bf52d08424ee6ec",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/f8db4a7d4_generated_3e7314cb.jpg"
    ],
    "stock": 15,
    "sku": "GF-001",
    "weight": "صندوق متوسط",
    "origin": "طاطا",
    "ingredients": "تشكيلة منتوجات",
    "preservation": "يحفظ بمكان جاف",
    "badge": "sale",
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "هدية",
      "صندوق"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  },
  {
    "id": "6ab040119bf52d08424ee712",
    "name": "تمر العجوة",
    "nameFr": "ajwa-dates",
    "slug": "ajwa-dates",
    "shortDescription": "تمر العجوة ذو القوام الناعم واللون الداكن",
    "description": "تمر العجوة من نخيل طاطا، ذو قوام ناعم ولون داكن ومذاق مميز. يُغلّف بعناية ليصلك بأفضل حالاته.",
    "price": 99,
    "categoryId": "6ab03fdb9bf52d08424ee6e6",
    "images": [
      "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/76eef1f48_generated_2a3b0dfa.jpg"
    ],
    "stock": 0,
    "sku": "DT-003",
    "weight": "500 غرام",
    "origin": "واحة طاطا",
    "ingredients": "تمر العجوة 100%",
    "preservation": "يحفظ في مكان جاف وبارد",
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "rating": 5,
    "reviewCount": 3,
    "tags": [
      "تمر",
      "عجوة"
    ],
    "createdAt": "2026-09-20T20:20:33.448000"
  }
];

export const INITIAL_SHIPPING_ZONES: ShippingZone[] = [
  {
    "id": "6ab03fdb9bf52d08424ee6e2",
    "name": "طاطا (توصيل محلي)",
    "rate": 15,
    "freeAbove": 200,
    "estimatedDelivery": "24-48 ساعة",
    "cities": [
      "طاطا"
    ]
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e3",
    "name": "الجنوب المغربي",
    "rate": 35,
    "freeAbove": 400,
    "estimatedDelivery": "2-4 أيام عمل",
    "cities": [
      "أكادير",
      "تارودانت",
      "تيزنيت",
      "ورزازات",
      "زاكورة",
      "تنغير",
      "گلميم",
      "كلميم",
      "أسا",
      "فم الحصن",
      "العيون",
      "الداخلة",
      "السمارة",
      "الحسيمة"
    ]
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e4",
    "name": "المدن الكبرى",
    "rate": 40,
    "freeAbove": 500,
    "estimatedDelivery": "2-4 أيام عمل",
    "cities": [
      "الدار البيضاء",
      "الرباط",
      "مراكش",
      "فاس",
      "مكناس",
      "طنجة",
      "وجدة",
      "القنيطرة",
      "تطوان",
      "سلا",
      "المحمدية",
      "الجديدة",
      "بني ملال",
      "الناظور"
    ]
  },
  {
    "id": "6ab03fdb9bf52d08424ee6e5",
    "name": "باقي المدن",
    "rate": 45,
    "freeAbove": 500,
    "estimatedDelivery": "2-4 أيام عمل",
    "cities": []
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    "id": "6ab03fdb9bf52d08424ee6ee",
    "code": "TATA10",
    "type": "percentage",
    "value": 10,
    "minOrderAmount": 200,
    "usedCount": 0,
    "expiresAt": "2026-12-31",
    "isActive": true
  },
  {
    "id": "6ab03fdb9bf52d08424ee6ef",
    "code": "WELCOME20",
    "type": "fixed",
    "value": 20,
    "minOrderAmount": 300,
    "usedCount": 0,
    "expiresAt": "2026-12-31",
    "isActive": true
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productId: "6ab040119bf52d08424ee709",
    customerName: "فاطمة الزهراء",
    customerCity: "الدار البيضاء",
    rating: 5,
    comment: "تمور ممتازة جدا وطازجة! التوصيل كان سريعا والتغليف في غاية الاحترافية. شكرا TATA.STORE.",
    status: "approved",
    createdAt: "2026-03-12"
  },
  {
    id: "rev-2",
    productId: "6ab040119bf52d08424ee709",
    customerName: "محمد الإدريسي",
    customerCity: "الرباط",
    rating: 5,
    comment: "مذاق الكراميل الطبيعي في التمر المجهول لا يعلى عليه. جودة عالية ومصدر موثوق من طاطا.",
    status: "approved",
    createdAt: "2026-03-15"
  },
  {
    id: "rev-3",
    productId: "6ab040119bf52d08424ee70c",
    customerName: "سعيد التازي",
    customerCity: "مراكش",
    rating: 5,
    comment: "عسل سدر طبيعي وأصيل ذو نكهة قوية وجودة لا شك فيها. سأكرر الطلب بالتأكيد.",
    status: "approved",
    createdAt: "2026-03-18"
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  storeName: "TATA.STORE",
  storeSlogan: "منتوجات طاطا الأصيلة، من الواحة إلى باب دارك",
  phone: "+212 6 00 00 00 00",
  whatsapp: "212600000000",
  email: "contact@tata.store",
  address: "طاطا، المغرب",
  announcementText: "🌴 توصيل سريع لجميع المدن المغربية — الدفع عند الاستلام",
  announcementActive: true,
  freeShippingThreshold: 500,
  defaultShippingRate: 40,
  tataLocalShippingRate: 15,
  googleAnalyticsId: "",
  metaPixelId: "",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  tiktokUrl: "https://tiktok.com",
  hero: {
    title: "من طاطا... إلى باب دارك",
    subtitle: "اكتشف مذاق الواحة ومنتوجاتها الأصيلة، واختر منتجات طاطا بعناية لتصلك أينما كنت.",
    badge: "منتوجات طاطا الأصيلة",
    buttonText: "اكتشف المنتجات",
    buttonLink: "/shop",
    image: "https://media.base44.com/images/public/6ab03de99bf52d08424ee607/577b09cfa_generated_eaf7efa3.jpg"
  }
};

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "كريم المنصوري",
    phone: "0661234567",
    city: "الدار البيضاء",
    address: "حي المعاريف، شارع الزرقطوني، رقم 45",
    ordersCount: 2,
    totalSpent: 420,
    lastOrderDate: "2026-03-18",
    status: "active"
  }
];

export const INITIAL_ADMIN_USER: AdminUser = {
  id: "admin-1",
  username: "tata",
  name: "مدير المتجر",
  email: "admin@tata.store",
  role: "Super Admin",
  passwordHash: "22c4b81246ba2468b3e1a35c4b4307c58d522f971dc03525f08e8e5d0f538263",
  mustChangePassword: false,
  createdAt: "2026-01-01"
};
