import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  baseUrl: string = 'https://api.escuelajs.co/api/v1/';

  //LISTA DE CARRITO
  private myList: Product[] = [];

  //CARRITO OBSERBABLE
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) {}

  //DEVOLVER TODO LOS PRODUCTO
  getAllProducts(): Observable<Product[]> {
    const response = this.httpClient.get<Product[]>(`${this.baseUrl}products`);
    console.log(response);
    return response;
  }

  /*DEVOLVER UNA PROMESA CON TODO LOS PRODUCTO
  getPromise(): Promise<any[]>{
    return lastValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}products`))
  }*/

  //AÑADIR EL PRODUCTO AL CARRITO
  addProduct(product: Product) {
    //VERIFICAMOS SI HAY PRODUCTO EN LA LISTA DEL CARRITO
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);
    } else {
      //VERIFICAMOS SI YA EXISTE ESE PRODUCTO EN LA LISTA
      const productMod = this.myList.find((elem) => {
        return elem.id === product.id;
      });
      //SI EL PRODUCTO YA EXISTE EN LA LISTA, SUMAMOS MAS 1
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        //VERIFICAMOS SI NO EXISTE EN LA LISTA, LO AÑADIMOS
        product.cantidad = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }
  }

  deleteProduct(id: string) {
    this.myList = this.myList.filter((product) => {
      return product.id != id;
    });
    this.myCart.next(this.myList);
  }

  //AÑADE UN PRODUCTO, PARA LA OPCION DE -
  findProductById(id: string) {
    return this.myList.find((elem) => {
      return elem.id === id;
    });
  }

  //TOTAL DE COMPRA 
  totalCart(){
    const total = this.myList.reduce(function (acc,product){return acc + (product.cantidad * product.price);},0)
    return total;
  }
}
