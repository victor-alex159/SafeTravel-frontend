import { BaseBean } from './BaseBean';
import { OrganizationBean } from './OrganizationBean';

export class ProductBean extends BaseBean {
    public id: number;
    public organization: OrganizationBean
    public name: string;
    public emailAdmin: string;
    public image: string;
    public imageFile: any;
    public imagePath: string;
    public type: string;
    public ubication: string;
    public startDate: Date;
    public endDate: Date;
    public startDateRequest: Date;
    public endDateRequest: Date;
    public department: string;
	public province: string;
	public district: string;
	public short_description: string;
	public long_description: string;
	public price: number;
}