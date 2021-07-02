import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

  listServices: Array<ServiceBean> = [];
  showPopupServiceForm: boolean = false;
  showPopupServiceFormEdit: boolean = false;
  selectedService: ServiceBean = new ServiceBean();
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private serviceService: ServiceService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }
  
  public getAllServices() {
    this.serviceService.getAllServices({})
      .subscribe(resp => {
        this.listServices = resp.datalist;
      });
  }

  public editService(service: any) {
    let serviceSelected = service.data;
    this.selectedService = new ServiceBean();
    this.selectedService = JSON.parse(JSON.stringify(serviceSelected));
    this.showPopupServiceFormEdit = true;
  }

  public showFormService() {
    this.showPopupServiceForm = true;
  }

  public onClosePopupForm(e: any) {
    if(e == 'false') {
      this.showPopupServiceForm = false
      setTimeout(() => {
        this.getAllServices();
      }, 1500);
    }
  }

  public onClosePopupFormEdit(e: any) {
    if(e == 'false') {
      this.showPopupServiceFormEdit = false
      setTimeout(() => {
        this.getAllServices();
      }, 1500);
    }
  }

  public deleteService(e: any) {
    let organizationSelected: ServiceBean = e.data;
    this.selectedService = JSON.parse(JSON.stringify(organizationSelected));
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
        this.serviceService.deleteService({data: this.selectedService})
          .subscribe(resp => {
            swal.fire(
              'Servicio eliminado correctamente!',
              '',
              'success'
            )
            this.getAllServices();
          });
      }
    });
  }

}
