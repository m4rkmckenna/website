import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../services/post.service';
import {formatDistance} from 'date-fns';

@Pipe({
  name: 'postedTimeAgo',
  pure: true
})
export class PostedTimeAgoPipe implements PipeTransform {

  transform(post: Post, ...args: any[]): string {
    const timeAgo = formatDistance(Date.parse(post.date), Date.now(), {addSuffix: true, includeSeconds: true});
    return `posted ${timeAgo}`;
  }

}
