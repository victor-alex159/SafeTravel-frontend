import { Component, OnInit } from '@angular/core';
import { OrganizationBean } from 'src/app/Beans/OrganizationBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import swal from 'sweetalert2';

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
    public authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getAllOrganization();
  }

  public getAllOrganization() {
    this.sharedService.sendOrRecieveData('/oc/gao', {}, false)
      .subscribe((resp: any) => {
        this.organizationList = resp.datalist;
      });
  }

  public showFormOrganization() {
    this.selectedOrganization = new OrganizationBean();
    this.showPopupOrganizationForm = true;
  }

  public selectOrganizationEdit(e:any) {
    let organizationSelected: OrganizationBean = e.data;
    this.selectedOrganization = JSON.parse(JSON.stringify(organizationSelected));
    this.showPopupOrganizationFormEdit = true;
  }


  public onClosePopupForm(e: any) {
    console.log(e);
    if(e == 'false') {
      this.showPopupOrganizationForm = false
      setTimeout(() => {
        this.getAllOrganization();
      }, 1000);
    }
  }

  public onClosePopupFormEdit(e: any) {
    console.log(e);
    if(e == 'false') {
      this.showPopupOrganizationFormEdit = false
      setTimeout(() => {
        this.getAllOrganization();
      }, 1000);
    }
  }

  public deleteOrganization(e: any) {
    let organizationSelected: OrganizationBean = e.data;
    this.selectedOrganization = JSON.parse(JSON.stringify(organizationSelected));
    swal.fire({
      title: '¿Seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed) {
        this.sharedService.sendOrRecieveData('/oc/dobi', this.selectedOrganization, false)
          .subscribe(resp => {
            swal.fire(
              'Organanización eliminada correctamente!',
              '',
              'success'
            )
            this.getAllOrganization();
          });
      }
    });
  }

}
