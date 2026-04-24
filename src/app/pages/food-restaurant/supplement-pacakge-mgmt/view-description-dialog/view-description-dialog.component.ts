import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-description-dialog',
  templateUrl: './view-description-dialog.component.html',
  styleUrls: ['./view-description-dialog.component.css']
})
export class ViewDescriptionDialogComponent {
constructor( public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
console.log('desc',data)
}
}
