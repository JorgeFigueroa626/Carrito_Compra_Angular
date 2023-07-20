import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  {
  //EXTRAEMOS EL MYCART
  myCart$ = this.storeService.myCart$

  constructor(private storeService: StoreService) {}

  //FUNCION DE TOTAL SUMA DE UN PRODUCTO
  totalProduct(price: number, units: number) {
    return price * units;
  }

  //FUNCION DE ELIMINAR
  deleteProduct(id: string) {
    this.storeService.deleteProduct(id);
  }

  //MIDIFICAR EL NUMERO DE PRODUCTO
  updateUnits(operation: string, id: string) {
    const product = this.storeService.findProductById(id);
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;
      }
      if (product.cantidad === 0) {
        this.deleteProduct(id);
      }
    }
  }

  //TOTAL DE COMPRA
  totalCart(){
    const result = this.storeService.totalCart();
    return result;
  }
}
