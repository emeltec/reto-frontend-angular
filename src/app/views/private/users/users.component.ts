import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { IUser, IUserResponse } from 'src/app/interfaces/user';
import { PostService } from 'src/app/services/post.service';
import { IPost } from 'src/app/interfaces/post';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit {

  public dataSource: IUser[] = [];
  public columnsToDisplay = ['name', 'username', 'email', 'phone'];
  public columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  public expandedElement: IUser[] | null = [];

  private currentUserId: number = 0;

  private editUserId: number = 0;
  private editPostIndex: number = -1;

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = users;
    });

    this.postService.dataPosts$.asObservable().subscribe(response => {
      this.addOrUpdate(response);
    });
  }

  openDialog(user:IUser, postSelected?:IPost): void {
    this.currentUserId = user.id;

    this.dialog.open(DialogComponent, {
      disableClose:true,
      width: '640px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data:{user, postSelected},
    });
  }

  addOrUpdate(response:{post:IPost, nuevo:boolean}){
    if(response.nuevo) {
      this.addPost(response.post);
    } else {
      this.updatePost(response.post)
    }
    this.editUserId = 0;
  }

  addPost(post:IPost) {
    this.dataSource.find(user => user.id === this.currentUserId)?.posts.push(post);
  }

  updatePost(post:IPost) {
    this.dataSource.find(user => user.id === this.editUserId)?.posts.splice(this.editPostIndex, 1, post);
  }

  deletePost(idUser:number, indexPost:number){
    this.dataSource.find(user => user.id === idUser)?.posts.splice(indexPost, 1);
  }

  selectPost(user:IUser, indexPost:number, post:IPost){
    this.editUserId = user.id;
    this.editPostIndex = indexPost;
    this.openDialog(user, post);
  }

}