import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UID } from 'src/app/config/short-id';
import { IPost } from 'src/app/interfaces/post';
import { MessagesService } from 'src/app/services/messages.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  formPost: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private message: MessagesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.formPost = this.fb.group({
      id: [''],
      title: [''],
      description: ['']
    })
  }

  ngOnInit() {
    this.formPost.patchValue(this.data?.postSelected)
  }

  addOrUpdatePost(){
    const formValue = this.formPost.value;

    if(formValue.title == '' || formValue.description == '') {
      this.message.showMessageError('El título y la descripción son obligatorios', '');
      return;
    }

    if(formValue.id == '' || formValue.id == undefined) {
      this.addPost();
    } else {
      this.updatePost();
    }
    
    this.close();
  }

  addPost() {
    const formValue = this.formPost.value;

    const newPost:IPost = {
      id: UID(),
      title: formValue.title,
      description: formValue.description,
    }

    this.postService.dataPosts$.next({post:newPost, nuevo:true});
  }

  updatePost() {
    const formValue = this.formPost.value;

    const postEdited:IPost = {
      id: formValue.id,
      title: formValue.title,
      description: formValue.description,
    }
    this.postService.dataPosts$.next({post: postEdited, nuevo:false});
  }

  close(){
    this.formPost.controls['id'].setValue('');
    this.formPost.controls['title'].setValue('');
    this.formPost.controls['description'].setValue('');
    this.dialogRef.close();
  }

}
