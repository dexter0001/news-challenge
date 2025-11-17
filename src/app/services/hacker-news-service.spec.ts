import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService } from './hacker-news-service';
import { Story } from '../models/Story';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;
  const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        HackerNewsService]
    });
    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getEndpoint', () => {
    const mockIds = [1, 2, 3];
    service.getStories('top').subscribe();

    const req = httpMock.expectOne(`${BASE_URL}/topstories.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIds);
    
    mockIds.forEach(id => {
      const storyReq = httpMock.expectOne(`${BASE_URL}/item/${id}.json`);
      expect(storyReq.request.method).toBe('GET');
      storyReq.flush({ id } as Story);
    });
  })

});