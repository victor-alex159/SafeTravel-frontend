import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';


@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  url: string = 'http://localhost:8085/pc';

  organizationList: Array<OrganizationBean> = [];
  selectedOrganization: OrganizationBean = new OrganizationBean();
  showPopupOrganizationForm: boolean = false;
  showPopupOrganizationFormEdit: boolean = false;
  organizationId: number;
  constructor(
    private organizationService: OrganizationServiceService
  ) { }

  ngOnInit(): void {
    this.getAllOrganization();
  }

  public getAllOrganization() {
    this.organizationService.getAllOrganization( { } )
      .subscribe((resp: any) => {
        this.organizationList = resp.datalist;
        console.log(this.organizationList);
      });
  }

  public showFormOrganization() {
    this.selectedOrganization = new OrganizationBean();
    this.showPopupOrganizationForm = true;
  }

  public selectProduct(e:any) {
    let organizationSelected: OrganizationBean = e.data;
    this.selectedOrganization = JSON.parse(JSON.stringify(organizationSelected));
    console.log(this.selectedOrganization);
    this.showPopupOrganizationForm = true;
  }
  public selectProductEdit(e:any) {
    let organizationSelected: OrganizationBean = e.data;
    this.selectedOrganization = JSON.parse(JSON.stringify(organizationSelected));
    this.showPopupOrganizationFormEdit = true;
  }


}
