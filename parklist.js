/** @format */
const mongoose = require("mongoose");
const NationalPark = require("./models/parks");

mongoose.connect("mongodb://localhost:27017/national-parks");

const db = mongoose.connection;
db.once("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const seedDB = async () => {
  await NationalPark.deleteMany({});

  for (let i = 0; i < parks.length; i++) {
    const park = new NationalPark({
      name: parks[i].name,
      price: parks[i].price,
      images: parks[i].images,
      intro: parks[i].intro,
      location: parks[i].location,
      geometry: parks[i].geometry,
      author: parks[i].author,
    });
    await park.save();
  }
};

const parks = [
  {
    name: "Banff National Park",
    location: "Banff, Alberta",
    intro:
      "Rocky Mountain peaks, turquoise glacial lakes, a picture-perfect mountain town and village, abundant wildlife and scenic drives come together in Banff National Park - Canada’s first national park and the flagship of the nation’s park system. Over three million visitors a year make the pilgrimage to the park for a variety of activities including hiking, biking, skiing and camping in some of the world’s most breathtaking mountain scenery. Banff is part of the Canadian Rocky Mountain Parks UNESCO World Heritage Site.",
    images: [
      "https://nationalparks-15bc7.kxcdn.com/images/parks/banff/Banff%20National%20Park%20vermillion%20lakes.jpg",
      "https://www.moon.com/wp-content/uploads/2016/08/CAN_AB_JohnstonCanyonBanff_PeterWey_123rf.jpg?fit=735%2C1104",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/284px-Moraine_Lake_17092005.jpg",
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    geometry: {
      coordinates: [51.482505, -115.90456],
    },
  },
  {
    name: "Bruce Peninsula National Park",
    location: "Tobermory, Ontario",
    intro:
      "Dramatic cliffs rise from the turquoise waters of Georgian Bay. In large tracts of forest, black bears roam and rare reptiles find refuge in rocky areas and diverse wetlands. Ancient cedar trees spiral from the cliff-edge; a multitude of orchids and ferns take root in a mosaic of habitats. Welcome to the magic of Bruce Peninsula National Park!",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nIu1EOcI5DeD9hyV10W1id39i8gRC-tdGA&usqp=CAU",
      "https://brucepeninsulapress.com/wp-content/uploads/2021/04/5-grotto.jpg",
      "https://trizzletravels.com/wp-content/uploads/2018/08/09186.jpg",
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    geometry: {
      coordinates: [45.209134, -81.47049],
    },
  },
  {
    name: "Fundy National Park",
    location: "Bay of Fundy, New Brunswick",
    intro:
      "Experience the world’s highest tides – not to mention pristine forests, deluxe campgrounds and a taste of Atlantic Canada culture – at Fundy National Park. Paddle in a kayak as the waters rise up to 12 m or more. Walk the otherworldly ocean floor at low tide. Or venture inland where trails lead to waterfalls deep in Acadian forests. With unique camping options and even regular music performances, Fundy is a Maritime treasure.",
    images: [
      "https://www.cruiseamerica.com/getattachment/bb6b3ce6-26c3-487c-ad55-5ab9fea2512b/attachment.aspx",
      "https://www.todocanada.ca/wp-content/uploads/Fundy-National-Park.jpeg",
      "https://cheeseweb.eu/wp-content/uploads/2017/02/20160902_Fundy-National-Park_0002.jpg",
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    geometry: {
      coordinates: [45.614998, -65.038376],
    },
  },
  {
    name: "Georgian Bay Islands National Park",
    location: "Honey Harbour, Ontario",
    intro:
      "Welcome to the world’s largest freshwater archipelago—home to a boat-access nature preserve situated where the windswept white pines and granite shores of the Canadian Shield turn to dense deciduous woodland. Here, adventure is easy. Cycle wooded trails, overnight at secluded campsites or waterfront cabins and hike to viewpoints atop emerald shoreline. The landscape of Georgian Bay Islands National Park inspired the Group of Seven. Let it inspire you.",
    images: [
      "https://muskoka411.com/wp-content/uploads/2022/03/via.jpg",
      "https://www.discovermuskoka.ca/content/uploads/member-georgian-bay-island-national-park-hiking6-1000x562.jpg",
      "https://www.discovermuskoka.ca/content/uploads/member-georgian-bay-island-national-park-hiking.jpg",
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    geometry: {
      coordinates: [44.867156, -79.82219],
    },
  },
  {
    name: "Kootenay National Park",
    location: "British Colombia",
    intro:
      "Established in 1920 as part of an agreement to build a new road across the Rockies, Kootenay National Park is a place of unique contrasts, from icy mountain rivers to steamy hot springs. Take a 60-minute scenic drive and discover a new surprise around every bend. Spend the day exploring deep canyons and tumbling waterfalls just a short stroll from the road. Or, plan a vacation traversing the park’s backcountry trails.",
    images: [
      "https://www.todocanada.ca/wp-content/uploads/FloeLake-Kootenay-National-Park-Parks-Canada-1280x720.jpg",
      "https://heroesofadventure.com/wp-content/uploads/2018/02/Numa-Falls-in-Kootenay-National-Park-British-Columbia-Canada-20150701.jpg",
      "https://live.staticflickr.com/2898/33182859151_fb304c50e7_c.jpg",
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    geometry: {
      coordinates: [50.619616, -116.069452],
    },
  },
];

seedDB().then(() => {
  mongoose.connection.close();
});
