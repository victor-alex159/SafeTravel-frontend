import { BaseBean } from './BaseBean';
import { ProductBean } from './ProductBean';

export class ProductDetailBean extends BaseBean {
    public id: number;
    public product: ProductBean;
	public icon: string;
	public description: string;
	public address: string;
	public price: number;
	public image: string;
	public imageFile: any;
	public imagePath: string;
}