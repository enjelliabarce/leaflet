import { Component } from '@angular/core';
import * as L from 'leaflet';

const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // ukuran ikon
  iconAnchor: [12, 41], // titik anchor yang sesuai untuk posisi ikon
  popupAnchor: [1, -34], // posisi popup di atas marker
  shadowSize: [41, 41], // ukuran bayangan
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  osmLayer!: L.TileLayer;
  satelliteLayer!: L.TileLayer;
  terrainLayer!: L.TileLayer;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Menginisialisasi peta dengan tampilan awal
    this.map = L.map('mapId').setView([-7.7829, 110.3671], 14);  // Mengarahkan ke lokasi Tugu Jogja

    // Menambahkan TileLayer untuk OpenStreetMap
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map); // Menambahkan ke peta

    // Menambahkan TileLayer untuk Satelit
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    // Menambahkan TileLayer untuk Terrain
    this.terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors, SRTM'
    });

    // Menambahkan Layer Control
    const baseLayers = {
      'OpenStreetMap': this.osmLayer,
      'Satellite': this.satelliteLayer,
      'Terrain': this.terrainLayer
    };

    L.control.layers(baseLayers).addTo(this.map);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    // Menambahkan marker di lokasi Tugu Jogja
    const tuguJogjaMarker = L.marker([-7.7829, 110.3671],
      { icon: iconDefault }).addTo(this.map);

    // Menambahkan popup dengan gambar dan teks
    const popupContent = `
      <b>Tugu Jogja</b><br>
      Yogyakarta, Indonesia.<br>
      <img src="https://bakpiakukustugu.co.id/uploads/5/2024-04/yogyakarta_monument2.jpg" alt="Tugu Jogja" width="150" height="100"><br>
      Tugu Pal Putih.
    `;
    tuguJogjaMarker.bindPopup(popupContent).openPopup();
  }
}
