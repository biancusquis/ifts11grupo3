import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  qrCodeData: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchQrCodeData();
  }

  fetchQrCodeData() {
    // Llama a tu API backend para obtener los datos del QR
    // Asegúrate de ajustar la URL según tu configuración
    const apiUrl = 'http://localhost:3000/api/generar_qr'; // Cambia la URL según tu backend
    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.qrCodeData = data.qrData;
      },
      (error) => {
        console.error('Error al obtener datos del QR', error);
      }
    );
  }
}
