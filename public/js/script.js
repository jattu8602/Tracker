const socket  = io();

if(navigator.geolocation){
  navigator.geolocation.watchPosition((position)=>{
    const {latitude, longitude} = position.coords;
    socket.emit("send-location", {latitude, longitude});
  },(error)=>{
    console.error(error);

  },
{
  enableHighAccuracy:true,
  maximumAge:0,
  timeout:5000
})
}


const map = L.map("map").setView([0,0],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
  attribution:"OpenStreetMap"
}).addTo(map)



const markers = {};



socket.on("recieve-location", (data)=>{
  const {latitude, longitude, username} = data;
  map.setView([lattitude,longitude]);
  if(marker[id]){
    marker[id].setLatLng([latitude,longitude]);
  }
  else{
    markers[id] = L.marker([latitude,longitude]).addTo(map);
    // marker[id].bindPopup(`<b>${username}</b>`).openPopup();
  }

});


socket.on("user-dsiconnected",(id)=>{
  if(markers[id]){
    map.removeLayer(marker[id]);
    delete markers[id];
  }

})