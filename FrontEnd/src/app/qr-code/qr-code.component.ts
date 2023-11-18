import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  qrCodeUrl: string | null = null;

  constructor(private http: HttpClient) { }

  iniciarWhatsApp() {
    this.http.get<{ qrCodeUrl: string }>('http://localhost:3000/iniciar-whatsapp').subscribe(
      (response) => {
        console.log(response.qrCodeUrl); // Muestra la URL del código QR por consola
        this.qrCodeUrl = response.qrCodeUrl; // Asigna la URL para mostrarla en tu interfaz
      },
      (error) => {
        console.error('Error iniciando WhatsApp:', error);
      }
    );
  }
}