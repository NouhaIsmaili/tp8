import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameAddComponent } from './application/components/game-add/game-add.component';
import { EmployeAddComponent } from './exercice/components/employe-add/employe-add.component';
import {  HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, GameAddComponent, EmployeAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TP8';
}
