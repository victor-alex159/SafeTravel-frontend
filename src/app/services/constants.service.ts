import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  TYPE_PRODUCT_RESTAURANT: string = 'Restaurante';
  TYPE_PRODUCT_HOTEL: string = 'Hotel';
  TYPE_PRODUCT_MUSEO: string = 'Museo';

}
