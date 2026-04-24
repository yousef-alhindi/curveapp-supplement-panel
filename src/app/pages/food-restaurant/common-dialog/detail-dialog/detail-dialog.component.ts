import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent {

  restroData:any
  items:any 
  customizeArray:any[]=[]
  viewInstruction: boolean = false;
constructor(  public dialogRef: MatDialogRef<DetailDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    
    if(data.type == 1 || data.type ==3 || data.type ==2){
      this.restroData = data?.element
      console.log(this.restroData)
      console.log('data',data)
    }else{
      this.restroData = data?.restaurentCartId
    }
  }

  suppItems:any[]=[]
  suppItemDetails:any[]=[]
  ngOnInit(){
   this.suppItems = this.restroData['items']
   this.suppItemDetails = this.restroData['itemsDetails']
}
    

}
