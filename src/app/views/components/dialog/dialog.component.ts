import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPost } from 'src/app/interfaces/post';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  formPost: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: MessagesService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.formPost = fb.group({
      title: [''],
      description: ['']
    })
  }

  ngOnInit() {
  }

  savePost() {
  }


  close(){
    this.formPost.controls['title'].setValue('');
    this.formPost.controls['description'].setValue('');
    this.dialogRef.close();
  }

}
