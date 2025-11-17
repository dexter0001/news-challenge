import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card-component';
import { provideZonelessChangeDetection } from '@angular/core';
import { Story } from '../models/Story';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;
  const mockStory: Story = {
    id: 123,
    title: 'Test News Title',
    url: 'https://example.com/article',
    score: 42,
    by: 'fsdfsd',
    time: Math.floor(Date.now() / 1000) - 3600,
    descendants: 10,
    text: 'dsfsdfsf',
    type: 'story'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.story = mockStory;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
