import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
constructor( public dialog: MatDialog,
    private toastr: ToastrService,
    private api: ApiService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
console.log('productDialog',data)
}
selectedStockId: string | null = null; // Bind this to the radio group

submit() {
  if (this.selectedStockId) {
    const selectedStock = this.data.stock.find((item: any) => item._id === this.selectedStockId);
    console.log('Selected Stock:', selectedStock);
    this.dialogRef.close(selectedStock);
  } else {
    console.log('No stock selected');
  }
}

}
