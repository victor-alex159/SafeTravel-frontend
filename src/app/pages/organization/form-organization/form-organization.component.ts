import { Component, OnInit } from '@angular/core';
import { UserBean } from 'src/app/Beans/UserBean';
import { OrganizationBean } from '../../../Beans/OrganizationBean';
import { OrganizationServiceService } from '../../../services/organization-service.service';
import swal from 'sweetalert2'
import { ServiceBean } from 'src/app/Beans/ServiceBean';

@Component({
  selector: 'app-form-organization',
  templateUrl: './form-organization.component.html',
  styleUrls: ['./form-organization.component.scss']
})
export class FormOrganizationComponent implements OnInit {

  organizationBean: OrganizationBean;

  constructor(
    private organizationService: OrganizationServiceService
  ) { }

  ngOnInit(): void {
    this.organizationBean = new OrganizationBean();
  }

  public saveOrganization(e: any) {
    //const swal = require('sweetalert2');
    let userAdmin: UserBean = new UserBean();
    let service: ServiceBean = new ServiceBean();
    this.organizationBean.adminUserId = userAdmin;
    this.organizationBean.adminUserId.id = 3;
    this.organizationBean.service.id = 1;
    console.log(this.organizationBean);
    this.organizationService.saveOrganization({data: this.organizationBean}).subscribe(resp => {
      if(this.organizationBean != null) {
        swal.fire(
          'Organanización registrado correctamente!',
          'Con éxito!',
          'success'
        )
      }
    });
    e.preventDefault();
  }

}
