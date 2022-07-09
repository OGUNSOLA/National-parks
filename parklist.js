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
      geometry: {
        type: "Point",
        coordinates: [parks[i].long, parks[i].lat],
      },
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
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657074104/National%20Parks/cgjuah1j24lkk8qkj9ev.jpg",
        filename: "National Parks/cgjuah1j24lkk8qkj9ev",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657074104/National%20Parks/pxwytrrerl3nujvilltj.jpg",
        filename: "National Parks/pxwytrrerl3nujvilltj",
      },
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    long: -75.4,
    lat: 40,
  },
  {
    name: "Bruce Peninsula National Park",
    location: "Tobermory, Ontario",
    intro:
      "Dramatic cliffs rise from the turquoise waters of Georgian Bay. In large tracts of forest, black bears roam and rare reptiles find refuge in rocky areas and diverse wetlands. Ancient cedar trees spiral from the cliff-edge; a multitude of orchids and ferns take root in a mosaic of habitats. Welcome to the magic of Bruce Peninsula National Park!",
    images: [
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657074139/National%20Parks/j20sh0hoclqhuy0qs4yt.jpg",
        filename: "National Parks/j20sh0hoclqhuy0qs4yt",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657074139/National%20Parks/nlidag1a8ghtyfhkmbjq.jpg",
        filename: "National Parks/nlidag1a8ghtyfhkmbjq",
      },
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    long: -75.4,
    lat: 40,
  },
  {
    name: "Fundy National Park",
    location: "Bay of Fundy, New Brunswick",
    intro:
      "Experience the world’s highest tides – not to mention pristine forests, deluxe campgrounds and a taste of Atlantic Canada culture – at Fundy National Park. Paddle in a kayak as the waters rise up to 12 m or more. Walk the otherworldly ocean floor at low tide. Or venture inland where trails lead to waterfalls deep in Acadian forests. With unique camping options and even regular music performances, Fundy is a Maritime treasure.",
    images: [
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657375339/National%20Parks/dlqocfzqioog0k8chejf.jpg",
        filename: "National Parks/dlqocfzqioog0k8chejf",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657074165/National%20Parks/msmhyosxt6mol8dfavvn.jpg",
        filename: "National Parks/msmhyosxt6mol8dfavvn",
      },
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    long: -75.4,
    lat: 40,
  },
  {
    name: "Georgian Bay Islands National Park",
    location: "Honey Harbour, Ontario",
    intro:
      "Welcome to the world’s largest freshwater archipelago—home to a boat-access nature preserve situated where the windswept white pines and granite shores of the Canadian Shield turn to dense deciduous woodland. Here, adventure is easy. Cycle wooded trails, overnight at secluded campsites or waterfront cabins and hike to viewpoints atop emerald shoreline. The landscape of Georgian Bay Islands National Park inspired the Group of Seven. Let it inspire you.",
    images: [
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657375224/National%20Parks/ynzh78jcydtnqy9fmhop.jpg",
        filename: "National Parks/ynzh78jcydtnqy9fmhop",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657375224/National%20Parks/rvnb5chmsezqe51zw9pp.jpg",
        filename: "National Parks/rvnb5chmsezqe51zw9pp",
      },
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    long: -75.4,
    lat: 40,
  },
  {
    name: "Kootenay National Park",
    location: "British Colombia",
    intro:
      "Established in 1920 as part of an agreement to build a new road across the Rockies, Kootenay National Park is a place of unique contrasts, from icy mountain rivers to steamy hot springs. Take a 60-minute scenic drive and discover a new surprise around every bend. Spend the day exploring deep canyons and tumbling waterfalls just a short stroll from the road. Or, plan a vacation traversing the park’s backcountry trails.",
    images: [
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657374967/National%20Parks/q4pmjounpkqbocbyspqe.jpg",
        filename: "National Parks/q4pmjounpkqbocbyspqe",
      },
      {
        url: "https://res.cloudinary.com/dbb9ypmi0/image/upload/v1657375080/National%20Parks/zevvoejkoojvoijnplwm.jpg",
        filename: "National Parks/zevvoejkoojvoijnplwm",
      },
    ],
    price: 10.5,
    author: "62c0afc0ae3e716aeff4b7ab",
    long: -75.4,
    lat: 40,
  },
];

seedDB().then(() => {
  mongoose.connection.close();
});
