/** @format */

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapboxToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: park.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
  projection: "globe", // display the map as a 3D globe
});

new mapboxgl.Marker()
  .setLngLat(park.geometry.coordinates)
  .setPopup(new mapboxgl.Popup().setHTML(`<h3>${park.name}</h3>`))
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl({ showZoom: true }));
