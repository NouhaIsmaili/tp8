import { Component, inject, viewChild } from '@angular/core';
import { EmployeListComponent } from "../employe-list/employe-list.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employe } from '../../model/employe';
import { EmployeService } from '../../services/employe.service';
import { Affiliation } from '../../model/affiliation';
import { Departement, Poste } from '../../model/types';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-employe-add',
  standalone: true,
  imports: [EmployeListComponent,ReactiveFormsModule],
  templateUrl: './employe-add.component.html',
  styleUrl: './employe-add.component.css'
})
export class EmployeAddComponent {
 // @viewChild(EmployeListComponent)childComponent!:EmployeListComponent;
  employes:Employe[] =[];
  posts = Object.values(Poste); 
  readonly fb : FormBuilder=inject(FormBuilder)

  employeService:EmployeService= inject(EmployeService)
  employeForm: any;

  ngOnInit():void{

    this.employeService.getEmploye().subscribe(
      data=>{
        this.employes=data ;
    })

    console.log(this.employes)
    this.employeForm=this.fb.nonNullable.group({
      
      matricule:[''],
      nom:[0],
      affiliation:[Departement.IT],
      diplomes:[Poste.Sec],
      
    })
    this.employeForm.get('nom')?.valueChanges.subscribe(
      (value: any)=>console.log(value)
    )
  }

  gameForm: FormGroup = new FormGroup({
   
    matricule: new FormControl(),
    nom: new FormControl(),
    affiliation: new FormControl(),
    diplomes: new FormControl(),
 
   })

   onSubmit() {
    
    this.employeService.addEmploye(this.employeForm.value).subscribe(
      data=>{
        console.log(data);
    })

    this.employeService.getEmploye().subscribe(data => {
      this.employes = data;
    });

    }

    onResetForm(){
      this.employeForm.reset();
      this.employeForm.get('affiliation')?.setValue(Departement.IT);
      this.employeForm.get('diplomes')?.setValue(Poste.Sec);
    }
}
