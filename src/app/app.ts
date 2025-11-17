import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HackerNewsService } from './services/hacker-news-service';
import { CommonModule } from '@angular/common';
import { Story } from './models/Story';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NewsCardComponent } from "./news-card-component/news-card-component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterOutlet,
    NewsCardComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {

  stories = signal<Story[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  error = signal<string | null>(null);
  activeTab = signal<string>('top');
  currentLimit: number = 30;

  constructor(
    private newsService: HackerNewsService
  ) {}

  ngOnInit() {
    this.loadStories();
  }

  onTabChange(event: any) {
    const type = event.index == 0 ? 'top': 'new';
    this.activeTab.set(type);
    this.loadStories();
  }

  loadStories() {
    this.loading.set(true);
    this.error.set(null);

    this.newsService.getStories(this.activeTab()).subscribe({
      next: (stories) => {
        this.stories.set(stories);
        console.log('stories:', this.stories());
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to retrieve stories. Please try again.');
        this.loading.set(false);
        console.error('Error in fetching stories:', err);
      }
    });
  }

  loadMore() {
    this.currentLimit += 20;
    this.loadingMore.set(true);

    this.newsService.getStories(this.activeTab(), this.currentLimit).subscribe({
      next: (stories) => {
        this.stories.set(stories);
        this.loadingMore.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load more stories.');
        this.loadingMore.set(false);
        console.error('Error loading more stories:', err);
      }
    });
  }

}
