import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-estimator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estimator.component.html',
  styleUrls: ['./estimator.component.scss']
})
export class EstimatorComponent {

  messages: any[] = [];
  inputMessage = '';
  sessionId: string | null = null;
  loading = false;

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {}

  send() {

    if (!this.inputMessage.trim()) return;

    const userText = this.inputMessage;

    this.messages.push({
      type: 'user',
      text: userText
    });

    this.inputMessage = '';
    this.loading = true;

    this.chatService
      .sendMessage(userText, this.sessionId || undefined)
      .subscribe({
        next: (res: any) => {

          this.sessionId = res.sessionId;

          this.messages.push({
            type: 'bot',
            text: res.reply
          });

          if (res.summary) {
            this.messages.push({
              type: 'summary',
              text: res.summary,
              publicCode: res.publicCode
            });
          }

          this.loading = false;
        },
        error: (err) => {
          console.error('API ERROR:', err);
          this.messages.push({
            type: 'bot',
            text: 'Server error. Please try again.'
          });
          this.loading = false;
        }
      });
  }

  viewQuote(publicCode: string) {
    this.router.navigate(['/quote', publicCode]);
  }
}