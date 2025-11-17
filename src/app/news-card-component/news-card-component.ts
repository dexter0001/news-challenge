import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Story } from '../models/Story';

@Component({
  selector: 'app-news-card-component',
  imports: [    
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './news-card-component.html',
  styleUrl: './news-card-component.scss',
})
export class NewsCardComponent {

  @Input() story!: Story;

  formatTime(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    
    const hours = Math.floor(diff / 3600);
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }

}
