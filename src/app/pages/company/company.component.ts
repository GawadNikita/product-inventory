import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
export interface Company{
  id: number,
  company_name: string,
  gstin: string
}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[]=[
    {id: 1, company_name:'Nestle India', gstin:'23adaem1774a2Z5'},
    {id: 2, company_name:'Parle Agro', gstin:'23eniys1321a2Z2'},
    {id: 3, company_name:'Britannia Industries Ltd', gstin:'27aavss1221a2Z2'},
    {id: 4, company_name:'Mondelez India Foods', gstin:'27pqehn9100a5Z2'},
    // {id: 5, company_name:'LT Foods Ltd', gstin:'27vvbov0200w5Z2'},
    // {id: 6, company_name:'MTR Foods Pvt Ltd', gstin:'34ppqsn6650a5Z2'}
  ]
  columnNames=['id', 'name', 'gstin']
  public formNewCompany : FormGroup;
  regExGST = '/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g';
  constructor(private formBuilder : FormBuilder) { }
  ngOnInit(): void {
    this.formNewCompany = this.formBuilder.group({
      company_name: [null, [Validators.required]],
      gstin:[null, [Validators.required]]
    })
  }

  addNewCompany = () =>{
    let formInputs = this.formNewCompany.value;
    if(this.formNewCompany.invalid){
      alert("Please check if form inputs are valid");
      return;
    }
    else{
      this.companies.filter((comp) =>{
        if(comp.company_name == formInputs.company_name){ alert("Company name already exists.")}
        else{
          alert("Code to add company to DB executes here.")
        }
      })
    }
  }

  get companyFormValidated() { return this.formNewCompany.controls; }

}
