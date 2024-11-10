import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent implements OnInit {
  onAddShop() {
    this.gameShops.push(this.fb.control(''))
  }
  games:Game[] =[];
  readonly fb : FormBuilder=inject(FormBuilder)
  gameService:GameService= inject(GameService)

  ngOnInit():void{

    this.gameService.getGame().subscribe(
      data=>{
        this.games=data    ;
        this.gameForm.get('id')?.setValue(this.games.length + 1);
    })

    console.log(this.games)
    this.gameForm=this.fb.nonNullable.group({
      id:[null],
      name:[''],
      price:[0],
      madeIn:['Tunisie'],
      category:[Category.BoardGames],
      isNew:[true],
      shops: this.fb.array([])
    })
    this.gameForm.get('name')?.valueChanges.subscribe(
      (value)=>console.log(value)
    )

  }

  public get gameShops(){
    return this.gameForm.get('shops') as FormArray;
  }


  categories = Object.values(Category); 
  gameForm: FormGroup = new FormGroup({
   /* id: new FormControl(1,{nonNullable:true}),
    name: new FormControl("Echec",{nonNullable:true}),
    price: new FormControl(46.3,{nonNullable:true}),
    madeIn: new FormControl("Tunisie",{nonNullable:true}),
    category: new FormControl(Category.BoardGames,{nonNullable:true}),
    isNew: new FormControl(true,{nonNullable:true}),
*/
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    madeIn: new FormControl(),
    category: new FormControl(),
    isNew: new FormControl(),

  })

  
  onSubmit() {
    console.log(this.games.length);
    console.log(this.gameForm.value);
    console.log(this.gameForm.get('name')?.value);
    console.log(this.gameForm.controls['price'].value);
    console.log(this.gameForm.value['category']);
    console.log(this.gameForm.value.madeIn);
    
    this.gameService.addGame(this.gameForm.value).subscribe(
      data=>{
        console.log(data);
    })

    this.gameService.getGame().subscribe(data => {
      this.games = data;
      this.gameForm.get('id')?.setValue(this.games.length + 1);
    });

    }

  onResetForm(){
    this.gameForm.reset();
    this.gameForm.get('id')?.setValue(this.games.length + 1);
    this.gameForm.get('madeIn')?.setValue(Category.CardGames);
    this.gameShops.clear();
  }

}


