import {Injectable} from '@angular/core';
import Posts from '../../data/posts.json';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';


export interface Post {
  slug: string
  title: string;
  published: boolean;
  date: string;
  tags: string[];
  categories: string[];
  html: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() {
  }


  getPosts(): Observable<Post[]> {
    return of(Posts.filter(p => p.published));
  }

  getPost(slug: string): Observable<Post> {
    return this.getPosts()
      .pipe(
        map(posts => posts.find(p => p.slug === slug))
      );
  }
}
