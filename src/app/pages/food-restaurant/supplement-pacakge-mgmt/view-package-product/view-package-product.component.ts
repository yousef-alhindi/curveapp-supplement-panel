import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-package-product',
  templateUrl: './view-package-product.component.html',
  styleUrls: ['./view-package-product.component.css']
})
export class ViewPackageProductComponent {
constructor( public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewPackageProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
console.log('product',data)
}
}
