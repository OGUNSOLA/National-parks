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
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/f91d6s6045rtjjkup9jm.jpg",
        filename: "National Parks/f91d6s6045rtjjkup9jm",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/wrrezqe3qmr592olp3ew.jpg",
        filename: "National Parks/wrrezqe3qmr592olp3ew",
      },
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
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/lstrgfnqqsocje6tuyk7.jpg",
        filename: "National Parks/lstrgfnqqsocje6tuyk7",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/ofaodvjvk3fgjh1h3jhn.jpg",
        filename: "National Parks/ofaodvjvk3fgjh1h3jhn",
      },
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
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/a7uynyt06wtkxeazjl6m.jpg",
        filename: "National Parks/jai4jajrkajkutcetr1s",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/jai4jajrkajkutcetr1s.jpg",
        filename: "National Parks/ofaodvjvk3fgjh1h3jhn",
      },
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
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/txcdfpjfr2y415nvbypk.jpg",
        filename: "National Parks/yaytqfed9zhifhz8ozfb",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/txcdfpjfr2y415nvbypk.jpg",
        filename: "National Parks/txcdfpjfr2y415nvbypk",
      },
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
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/wfilnjjpbli5bsbunm7s.jpg",
        filename: "National Parks/wfilnjjpbli5bsbunm7s",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1656987572/National%20Parks/txcdfpjfr2y415nvbypk.jpg",
        filename: "National Parks/txcdfpjfr2y415nvbypk",
      },
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
