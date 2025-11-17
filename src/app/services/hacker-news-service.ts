import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Story } from '../models/Story';

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {

  private http = inject(HttpClient);
  private readonly base_url = 'https://hacker-news.firebaseio.com/v0';

  getStories(type: string, limit: number = 30): Observable<Story[]> {
    const endpoint = this.getEndpoint(type);
    
    return this.http.get<number[]>(`${this.base_url}/${endpoint}.json`)
    .pipe(
      map(ids => ids.slice(0, limit)),
      switchMap(ids => {
        const storyRequests = ids.map(id => 
          this.http.get<Story>(`${this.base_url}/item/${id}.json`)
          .pipe(
            catchError(() => of(null))
          )
        );
        return forkJoin(storyRequests);
      }),
      map(stories => stories.filter((story): story is Story => story !== null))
    );
  }

  private getEndpoint(type: string): string {
    if(type == 'top') {
      return 'topstories';
    } else {
      return 'newstories';
    }
  }
  
}
