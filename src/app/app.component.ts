import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
 
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';

interface Item{
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  itemsArray: Array<Item> = [
    {
      nome: 'windows',
      preco: 100
    },
    {
      nome: 'Linux',
      preco: 0
    }
  ];
  private procura: Subject<string> = new Subject<string>();
  public items: Observable<Item[]>;
  procuraInput(proc: string ){
    this.procura.next(proc);
  }
  ngOnInit() {
    this.items = this.procura
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => 
        {
            console.log(term);
            const arrayProcura = this.itemsArray.filter(item =>  item.nome.toUpperCase().indexOf(term.toUpperCase())>-1);
            console.log(arrayProcura);
            return Observable.of(arrayProcura);
        }
      ).catch(()=> Observable.of(this.itemsArray));
      setTimeout(()=>this.procura.next(""),0);
     
  }
}
