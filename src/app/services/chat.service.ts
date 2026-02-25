import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private api: ApiService) {}

  sendMessage(message: string, sessionId?: string) {
    return this.api.post('/chat', {
      message,
      sessionId
    });
  }

  getQuote(publicCode: string) {
    return this.api.get(`/chat/quote/${publicCode}`);
  }

}