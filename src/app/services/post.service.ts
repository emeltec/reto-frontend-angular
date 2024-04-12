import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // public dataPosts$ = new BehaviorSubject<IPost>({} as IPost);
  public dataPosts$ = new BehaviorSubject<{post:IPost, nuevo:boolean}>({post:{} as IPost, nuevo:false});

  constructor() { }

}
