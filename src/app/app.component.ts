import { Component, OnInit } from '@angular/core';


declare const L : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  
  ngOnInit(){
    if(!navigator.geolocation){
      console.log('location is not support')
    }
    navigator.geolocation.getCurrentPosition((position) =>{
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude]
      
      
      console.log(`lat : ${position.coords.latitude}, long : ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 17);
      
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJmZW50byIsImEiOiJja3c2YmV3d245ZDN2MnVzMW5oYjBlenN0In0.TfzC_ZIhX6iTmk_BhNqXxQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
    let marker = L.marker(latLong).addTo(mymap);
    
    let circle = L.circle(latLong, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50
    }).addTo(mymap);
    
    let polyline = L.polyline([
      [-6.176298, 106.812354],
      [-6.175574, 106.812167],
      [-6.175356, 106.813367],
      [-6.175467, 106.815675],
      [-6.177814, 106.815697],
      [-6.177902, 106.814040],
      [-6.176147, 106.814272],
      [-6.176262, 106.812346],
      [-6.175596, 106.812158],
      [-6.176298, 106.812354],
    ]).addTo(mymap);
    
    // let polygon = L.polygon([
    //   [-6.176298, 106.812354],
    //   [-6.175574, 106.812167],
    //   [-6.175356, 106.813367],
    //   [-6.175467, 106.815675],
    //   [-6.177814, 106.815697],
    //   [-6.177902, 106.814040],
    //   [-6.176147, 106.814272],
    //   [-6.176262, 106.812346],
    //   [-6.175596, 106.812158],
    //   [-6.176298, 106.812354],
    // ]).addTo(mymap);
    
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    // polygon.bindPopup("I am a polygon.");
    
    var popup = L.popup()
    .setLatLng(latLong)
    .setContent("I am a standalone popup.")
    .openOn(mymap);
  });
  this.watchPosition();
}

watchPosition(){
  let deslat = 0;
  let deslong = 0;
  let id = navigator.geolocation.watchPosition((position) =>{ 
    console.log(`location now = lat : ${position.coords.latitude}, long : ${position.coords.longitude}`
    );
    if(position.coords.latitude === deslat){
      navigator.geolocation.clearWatch(id);
    }
  }, (err) =>{
    console.log(err);
  },{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}
}
