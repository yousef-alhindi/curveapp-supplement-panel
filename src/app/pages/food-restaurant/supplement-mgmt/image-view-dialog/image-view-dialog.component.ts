import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { DescriptionViewDialogComponent } from '../description-view-dialog/description-view-dialog.component';

@Component({
  selector: 'app-image-view-dialog',
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.css']
})
export class ImageViewDialogComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private api: ApiService,
    public dialogRef: MatDialogRef<ImageViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
console.log(data)

  }
}
