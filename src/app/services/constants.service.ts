import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  TYPE_PRODUCT_RESTAURANT: string = 'Restaurante';
  TYPE_PRODUCT_HOTEL: string = 'Hotel';
  TYPE_PRODUCT_MUSEO: string = 'Museo';

  TYPE_SERVICES_HOTEL: number = 1;
  TYPE_SERVICES_RESTAURANT: number = 2;
  TYPE_SERVICES_MUSEO: number = 3;

  TYPE_PROFILE_ORGANIZATION: string = '2';
  TYPE_PROFILE_TOURIST: string = '3';

}
