import { Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as jsPDF from 'jspdf';  

export interface Order{
  order_id: string,
  company_name: string,
  product_name: string,
  cost: number,
  quantity: number,
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [
    {order_id:'PO/2020/1',company_name:'Nestle India', product_name:'Kitkat', cost: 40, quantity:1},
    {order_id:'PO/2020/3', company_name:'Parle Agro', product_name:'Hide and Seek', cost: 30, quantity:2}
  ]
  products:any = [
    {id: 1, company_name:'Parle Agro', product_name:'Hide and Seek', cost:30},
    {id: 2, company_name:'Parle Agro', product_name:'Parle G', cost:20},
    {id: 3, company_name:'Nestle India', product_name:'NesCafe', cost:200},
    {id: 4, company_name:'Nestle India', product_name:'Munch', cost:20},
    {id: 5, company_name:'Britannia Industries Ltd', product_name:'Good Day Biscuits', cost:40},
    {id: 6, company_name:'Mondelez India Foods', product_name:'Dairy Milk', cost:80},
  ];
  float_num_regex =/^[-+]?\d*\.?\d*$/;
  public formNewOrder: FormGroup;
  columnNames=['order_id','pdf_download']
  currentOrder= this.orders[0];  
  companies:any;
  selectedCompany:string;
  selectedProduct : any;
  selectedProductCost: number;
  orderTotal : number;
  constructor(public dialog: MatDialog, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.formNewOrder = this.formBuilder.group({
      company_name: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      quantity:[ 1, [Validators.required, Validators.pattern(this.float_num_regex)]]
    })
    this.companies = [...new Set(this.products.map(item => item.company_name))]
    this.selectedCompany= this.companies[0];
    this.selectedProduct = this.products[0].product_name;
  }

  filterProducts= ()=>{
    return this.products.filter(prod=>{
      if(prod.company_name == this.selectedCompany){ 
        this.getCost(prod); 
        return prod;  
      }
    })
  }
  
  getCost = (prod) =>{
    if(prod.product_name == this.selectedProduct){
      this.selectedProductCost = prod.cost;
    }
  }

  addNewOrder = () =>{
    let formInputs = this.formNewOrder.value;
    if(this.formNewOrder.invalid){
      alert("Please check if form inputs are valid");
      return;
    }
    else{
      console.log(formInputs)
      alert("Code to add product to DB executes here.")
    }
  }
  get orderFormValidated() { return this.formNewOrder.controls; }
  openDialog =(order) =>{
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      data: order
    });

  }
}

@Component({
  selector: 'order-overview-example-dialog',
  templateUrl: 'order-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  @ViewChild('orderData') orderData: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Order) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  savePDF = () =>{
    let content=this.orderData.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element, renderer){  
        return true;  
      }  
    };  
    doc.fromHTML(content.innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('orders.pdf');
  }
}
