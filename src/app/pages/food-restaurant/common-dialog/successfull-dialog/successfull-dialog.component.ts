import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-successfull-dialog',
  templateUrl: './successfull-dialog.component.html',
  styleUrls: ['./successfull-dialog.component.css']
})
export class SuccessfullDialogComponent implements OnInit {

  constructor(
    private api: ApiService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>,

  ) {}
  ngOnInit(): void {
    console.log(this.data);
    setTimeout(() => {
      this.dialogRef.close(true)
    }, 3000);
  }


}
