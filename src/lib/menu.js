// Set img to "/images/your-photo.jpg" after adding the file to public/images
export const CATS = ["Starters", "Grills", "Rice & Mains", "Desserts & Drinks"];
export const MENU = [
  { id: "bolani", n: "Bolani", c: "Starters", p: 5.5, d: "Crispy flatbread stuffed with potato and leek, served with yoghurt.", img: '/images/Bolani.jpg' },
  { id: "mantu", n: "Mantu", c: "Starters", p: 8.95, d: "Steamed dumplings with spiced lamb, yoghurt and lentil sauce.", img: '/images/mantu.jpg' },
  { id: "aush", n: "Aush Soup", c: "Starters", p: 5.95, d: "Hearty noodle soup with herbs, beans and mint yoghurt.", img: '/images/aush.jpg' },
  { id: "tikka", n: "Chicken Tikka", c: "Grills", p: 11.95, d: "Marinated chicken pieces, charcoal grilled, with naan and salad.", img: '/images/tikka.jpg' },
  { id: "seekh", n: "Lamb Seekh Kebab", c: "Grills", p: 12.95, d: "Minced lamb skewers with herbs, served with naan and chutney.", img: '/images/lamb.jpg' },
  { id: "mixed", n: "Mixed Grill", c: "Grills", p: 18.95, d: "Lamb chops, chicken tikka and seekh kebab on a sizzling platter.", img: '/images/mixed-grill.jpg' },
  { id: "kabuli", n: "Kabuli Pulao", c: "Rice & Mains", p: 13.95, d: "Slow-cooked lamb on caramelised rice with carrots and raisins.", img: '/images/kabuli-pulao.jpg' },
  { id: "qorma", n: "Qorma-e-Sabzi", c: "Rice & Mains", p: 11.5, d: "Spinach and herb stew with tender lamb, served with rice.", img: '/images/korma-sabzi.jpg' },
  { id: "karahi", n: "Vegetable Karahi", c: "Rice & Mains", p: 10.5, d: "Seasonal vegetables in a rich tomato and spice sauce.", img: '/images/veg-karahi.jpg' },
  { id: "firni", n: "Firni", c: "Desserts & Drinks", p: 4.5, d: "Cardamom milk pudding topped with pistachio.", img: '/images/firni.jpg' },
  { id: "baklava", n: "Baklava", c: "Desserts & Drinks", p: 4.95, d: "Flaky pastry layered with nuts and honey syrup.", img: '/images/bak2.jpg' },
  { id: "tea", n: "Afghan Green Tea", c: "Desserts & Drinks", p: 2.5, d: "Fragrant green tea with cardamom.", img: '/images/greentea.jpg' },
];
export const money = (v) => "£" + v.toFixed(2);
