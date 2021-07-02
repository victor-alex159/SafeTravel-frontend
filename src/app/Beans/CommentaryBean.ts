import {BaseBean} from './BaseBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { ProductBean } from './ProductBean';

export class CommentaryBean extends BaseBean {
    public id: number;
	public product: ProductBean;
	public description: string;
	public username: string;
	public userPhoto: any;
	public genderTypeId: string;
}