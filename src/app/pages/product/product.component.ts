import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

export interface Products{
  id: number,
  company_name: string,
  product_name: string,
  cost: number
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public formNewProduct: FormGroup;
  float_num_regex =/^[-+]?\d*\.?\d*$/;
  companies =[
    {id: 1, company_name:'Nestle India', gstin:'23adaem1774a2Z5'},
    {id: 2, company_name:'Parle Agro', gstin:'23eniys1321a2Z2'},
    {id: 3, company_name:'Britannia Industries Ltd', gstin:'27aavss1221a2Z2'},
    {id: 4, company_name:'Mondelez India Foods', gstin:'27pqehn9100a5Z2'},
  ]
  selectedCompany = this.companies[0].company_name;
  products: Products[]= [
    {id: 1, company_name:'Parle Agro', product_name:'Hide and Seek', cost:30},
    {id: 2, company_name:'Parle Agro', product_name:'Parle G', cost:20},
    {id: 3, company_name:'Nestle India', product_name:'NesCafe', cost:200},
    {id: 4, company_name:'Nestle India', product_name:'Munch', cost:20},
    {id: 5, company_name:'Britannia Industries Ltd', product_name:'Good Day Biscuits', cost:40},
    {id: 6, company_name:'Mondelez India Foods', product_name:'Dairy Milk', cost:80},
  ];
  columnNames=['company_name', 'product_name', 'cost']
  constructor(private formBuilder : FormBuilder) { }
  ngOnInit(): void {
    this.formNewProduct = this.formBuilder.group({
      company_name: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      cost:[null, [Validators.required, Validators.pattern(this.float_num_regex)]]
    })
  }

  addNewProduct= ()=>{
    let formInputs = this.formNewProduct.value;
    if(this.formNewProduct.invalid){
      alert("Please check if form inputs are valid");
      return;
    }
    else{
      console.log(formInputs)
      alert("Code to add product to DB executes here.")
    }
  }
  get productFormValidated() { return this.formNewProduct.controls; }
}
