import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { App } from './app';
import { of } from 'rxjs';
import { HackerNewsService } from './services/hacker-news-service';
import { Story } from './models/Story';
import { provideZonelessChangeDetection } from '@angular/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let hackerNewsService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Story[] = [
    {
      id: 1,
      title: 'Test Story 1',
      url: 'https://example.com/1',
      score: 100,
      by: 'xyz',
      time: 1234567890,
      descendants: 50,
      type: 'dfsd'
    },
    {
      id: 2,
      title: 'Test Story 2',
      url: 'https://example.com/2',
      score: 200,
      by: 'asds',
      time: 1234567891,
      descendants: 75,
      type: 'dfds'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HackerNewsService', ['getStories']);

    await TestBed.configureTestingModule({
      imports: [
        App,
        HttpClientTestingModule
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HackerNewsService, useValue: spy }
      ]
    }).compileComponents();

    hackerNewsService = TestBed.inject(HackerNewsService) as jasmine.SpyObj<HackerNewsService>;
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    hackerNewsService.getStories.and.returnValue(of(mockStories));
    component.ngOnInit();

    expect(hackerNewsService.getStories).toHaveBeenCalledWith('top');
    expect(component.stories().length).toBe(2);
    expect(component.loading()).toBe(false);
  });

  it('should load stories when tab is selected', () => {
    hackerNewsService.getStories.and.returnValue(of(mockStories));
    const event = { index: 0 };
    component.onTabChange(event);
    expect(component.activeTab()).toBe('top');
  });

  it('should increase the limit by 20', () => {
    hackerNewsService.getStories.and.returnValue(of(mockStories));
    component.currentLimit = 30;
    component.loadMore();
    expect(component.currentLimit).toBe(50);
  });
});
