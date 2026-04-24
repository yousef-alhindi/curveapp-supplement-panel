import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-delivery-charges',
  templateUrl: './delivery-charges.component.html',
  styleUrls: ['./delivery-charges.component.css']
})
export class DeliveryChargesComponent {
constructor(private api:ApiService, private toastr:ToastrService,private dialog:MatDialog){
  this.getDel()
}

ngOnInit(){

}
freeDelivery:any
DeliveryCharges:any
addDel(){
let data={
  
    "deliveryCharge":this.DeliveryCharges,
    "minOrderToFree":this.freeDelivery

}
this.api.post1('deliveryCharge/addEdit',data).subscribe({
  next:(res:any)=>{
    this.dialog.closeAll()
this.toastr.success('Charges Added successfully')
  }
})
}

// get         1/supplement/deliveryCharge/list

getDel(){

  this.api.get1('deliveryCharge/list').subscribe({
    next:(res:any)=>{
     this.DeliveryCharges = res.data?.deliveryCharge
     this.freeDelivery = res.data?.minOrderToFree
    }
  })
  }

}
