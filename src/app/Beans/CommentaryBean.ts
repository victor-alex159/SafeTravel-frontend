import {BaseBean} from './BaseBean';
import { ProfileBean } from 'src/app/Beans/ProfileBean';
import { UserBean } from 'src/app/Beans/UserBean';

export class CommentaryBean extends BaseBean {
    public id: number;
	public  product: ProfileBean;
	public user: UserBean;
	public description: string;
}