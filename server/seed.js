const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const Admin = require("./src/models/admin");
const Contact = require("./src/models/Contact");
const Menu = require("./src/models/menu");
const Package = require("./src/models/Package");
const Image = require("./src/models/Image");
const Order = require("./src/models/order");

const seedAdmin = async () => {
  const existing = await Admin.findOne({ email: "admin@swiezyporanek.pl" });
  if (existing) {
    console.log("Admin already exists, skipping...");
    return existing;
  }
  const admin = await Admin.create({
    email: "admin@swiezyporanek.pl",
    password: "admin123",
  });
  console.log("Admin created:", admin.email);
  return admin;
};

const seedContact = async () => {
  const existing = await Contact.findOne();
  if (existing) {
    console.log("Contact already exists, skipping...");
    return existing;
  }
  const contact = await Contact.create({
    facebook: "https://facebook.com/swiezyporanek",
    instagram: "https://instagram.com/swiezyporanek",
    phone: "+48 123 456 789",
    email: "kontakt@swiezyporanek.pl",
    address: "ul. Przykładowa 1, 61-001 Poznań",
    openingHours: "Pon-Pt: 7:00-18:00, Sob: 8:00-14:00",
  });
  console.log("Contact created");
  return contact;
};

const seedMenus = async () => {
  const existing = await Menu.findOne();
  if (existing) {
    console.log("Menus already exist, skipping...");
    return await Menu.find();
  }

  const menu1 = await Menu.create({
    menus: [
      {
        day: "Poniedziałek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Jajecznica na maśle", calories: 350 },
              { name: "Chleb żytni z masłem", calories: 180 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Rosół z makaronem", calories: 250 },
              { name: "Kotlet schabowy z ziemniakami", calories: 550 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Sałatka z kurczakiem", calories: 320 },
            ],
          },
        ],
      },
      {
        day: "Wtorek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Owsianka z owocami", calories: 280 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Zupa krem z brokułów", calories: 200 },
              { name: "Pierś z kurczaka z ryżem", calories: 480 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Kanapki z awokado", calories: 290 },
            ],
          },
        ],
      },
      {
        day: "Środa",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Twarożek z rzodkiewką", calories: 220 },
              { name: "Pieczywo razowe", calories: 160 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Gulasz wołowy", calories: 420 },
              { name: "Kasza gryczana", calories: 200 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Jogurt grecki z orzechami", calories: 250 },
            ],
          },
        ],
      },
      {
        day: "Czwartek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Naleśniki z serem", calories: 380 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Zupa pomidorowa", calories: 180 },
              { name: "Łosoś pieczony z warzywami", calories: 450 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Hummus z warzywami", calories: 260 },
            ],
          },
        ],
      },
      {
        day: "Piątek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Granola z mlekiem", calories: 300 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Placki ziemniaczane", calories: 400 },
              { name: "Surówka z marchewki", calories: 120 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Tosty z serem i pomidorem", calories: 310 },
            ],
          },
        ],
      },
    ],
  });

  const menu2 = await Menu.create({
    menus: [
      {
        day: "Poniedziałek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Tosty francuskie", calories: 340 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Krem z dyni", calories: 210 },
              { name: "Filet z indyka z kaszą jaglaną", calories: 460 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Miska mocy (quinoa, awokado, jajko)", calories: 380 },
            ],
          },
        ],
      },
      {
        day: "Wtorek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Smoothie bowl", calories: 290 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Chili con carne", calories: 480 },
              { name: "Ryż basmati", calories: 200 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Bruschetta z pomidorami", calories: 240 },
            ],
          },
        ],
      },
      {
        day: "Środa",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Omelette z szpinakiem i fetą", calories: 320 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Zupa minestrone", calories: 230 },
              { name: "Makaron penne z sosem bolońskim", calories: 520 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Sałatka grecka", calories: 280 },
            ],
          },
        ],
      },
      {
        day: "Czwartek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Granola proteinowa", calories: 350 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Kurczak curry z mlekiem kokosowym", calories: 440 },
              { name: "Ryż jaśminowy", calories: 210 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Wrap z hummusem i warzywami", calories: 300 },
            ],
          },
        ],
      },
      {
        day: "Piątek",
        mealtime: [
          {
            type: "Śniadanie",
            dishes: [
              { name: "Pankejki z syropem klonowym", calories: 370 },
            ],
          },
          {
            type: "Obiad",
            dishes: [
              { name: "Ryba pieczona w folii", calories: 350 },
              { name: "Warzywa na parze", calories: 120 },
            ],
          },
          {
            type: "Kolacja",
            dishes: [
              { name: "Zupa krem z pomidorów", calories: 190 },
            ],
          },
        ],
      },
    ],
  });

  console.log("Menus created:", menu1.position, menu2.position);
  return [menu1, menu2];
};

const seedPackages = async (menus) => {
  const existing = await Package.findOne();
  if (existing) {
    console.log("Packages already exist, skipping...");
    return;
  }

  const packages = [
    {
      title: "Standard",
      description:
        "Podstawowy pakiet cateringu dietetycznego. 3 posiłki dziennie: śniadanie, obiad i kolacja. Idealny dla osób rozpoczynających przygodę ze zdrowym odżywianiem.",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/packages/standard.png",
      price: 59,
      type: "standard",
      menu: menus[0]?._id,
    },
    {
      title: "Premium",
      description:
        "Rozszerzony pakiet z 5 posiłkami dziennie. Śniadanie, II śniadanie, obiad, podwieczorek i kolacja. Dla wymagających klientów ceniących różnorodność.",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/packages/premium.png",
      price: 89,
      type: "premium",
      menu: menus[1]?._id,
    },
    {
      title: "Sport",
      description:
        "Pakiet stworzony dla sportowców. Zwiększona zawartość białka i kalorii. 5 posiłków dziennie z pełnym makroskładników.",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/packages/sport.png",
      price: 99,
      type: "sport",
      menu: menus[0]?._id,
    },
  ];

  await Package.insertMany(packages);
  console.log("Packages created:", packages.length);
};

const seedImages = async () => {
  const existing = await Image.findOne();
  if (existing) {
    console.log("Images already exist, skipping...");
    return;
  }

  const images = [
    {
      title: "Jajecznica na maśle",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/dishes/jajecznica.jpg",
    },
    {
      title: "Kotlet schabowy",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/dishes/schabowy.jpg",
    },
    {
      title: "Łosoś pieczony",
      url: "https://res.cloudinary.com/da3vwohmo/image/upload/v1727780951/dishes/losos.jpg",
    },
  ];

  await Image.insertMany(images);
  console.log("Images created:", images.length);
};

const seedOrders = async () => {
  const existing = await Order.findOne();
  if (existing) {
    console.log("Orders already exist, skipping...");
    return;
  }

  const orders = [
    {
      fullName: "Jan Kowalski",
      phone: "+48 500 100 200",
      address: "ul. Długa 10, 61-001 Poznań",
      description: "Proszę o dostawę przed 12:00",
      email: "jan.kowalski@email.com",
      items: [
        {
          index: "1",
          title: "Standard",
          price: 59,
          dishes: [
            { name: "Jajecznica na maśle", day: "Poniedziałek", index: "1", calories: 350 },
            { name: "Kotlet schabowy", day: "Poniedziałek", index: "2", calories: 550 },
          ],
          count: 1,
        },
      ],
      fullPrice: "59",
      status: "Nowe zamówienie",
    },
    {
      fullName: "Anna Nowak",
      phone: "+48 600 200 300",
      address: "ul. Krótka 5, 61-023 Poznań",
      description: "",
      email: "anna.nowak@email.com",
      items: [
        {
          index: "1",
          title: "Premium",
          price: 89,
          dishes: [
            { name: "Owsianka z owocami", day: "Wtorek", index: "1", calories: 280 },
            { name: "Łosoś pieczony", day: "Czwartek", index: "2", calories: 450 },
          ],
          count: 2,
        },
      ],
      fullPrice: "178",
      status: "W realizacji",
    },
  ];

  await Order.insertMany(orders);
  console.log("Orders created:", orders.length);
};

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    await seedAdmin();
    await seedContact();
    const menus = await seedMenus();
    await seedPackages(menus);
    await seedImages();
    await seedOrders();

    console.log("\nSeed completed successfully!");
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
};

seed();
