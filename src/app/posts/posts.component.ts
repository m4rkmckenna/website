import {Component} from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  readonly posts$ = this.postService.getPosts();

  constructor(
    private postService: PostService
  ) {
  }

}
