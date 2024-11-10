import { Component,Input } from '@angular/core';
import { Employe } from '../../model/employe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './employe-list.component.html',
  styleUrl: './employe-list.component.css'
})
export class EmployeListComponent {
  @Input()tabEmp!:Employe[];
}
