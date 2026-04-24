import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-description-view-dialog',
  templateUrl: './description-view-dialog.component.html',
  styleUrls: ['./description-view-dialog.component.css']
})
export class DescriptionViewDialogComponent {

  itemDetails:any
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private api: ApiService,
    public dialogRef: MatDialogRef<DescriptionViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if(data.type == 10){
this.itemDetails = data.element
    }
console.log(data)

  }
}
