import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Input() organizationId: number;
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private organizationService: OrganizationServiceService
  ) { }

  ngOnInit(): void {
    this.organizationBean = new OrganizationBean();
    if(this.organizationId) {
      this.getOrganzationById(this.organizationId);
    }
  }

  public saveOrganization(e: any) {
    //const swal = require('sweetalert2');
    this.organizationBean.service = new ServiceBean();
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
    this.closePopup.emit("false");
    e.preventDefault();
  }

  public getOrganzationById(organizationId: number) {
    let organizationBean = new OrganizationBean();
    organizationBean.id = organizationId;
    this.organizationService.getOrganizationById({data: organizationBean})
      .subscribe(resp => {
        this.organizationBean = resp.data;
      });
  }

}
