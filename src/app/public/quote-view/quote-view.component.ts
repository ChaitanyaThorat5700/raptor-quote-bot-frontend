import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-quote-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-view.component.html',
  styleUrls: ['./quote-view.component.scss']
})
export class QuoteViewComponent implements OnInit {

  publicCode!: string;
  quote: any = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.publicCode = this.route.snapshot.paramMap.get('publicCode') || '';

    if (!this.publicCode) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.chatService.getQuote(this.publicCode)
      .subscribe({
        next: (res: any) => {
          this.quote = res;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

}