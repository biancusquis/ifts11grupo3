// qr-code.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QRCodeService {
  private qrCodeUrl = 'http://localhost:3000/getQRCode'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  getQRCodeValue(): Observable<string> {
    return this.http.get<string>(this.qrCodeUrl);
  }
}
