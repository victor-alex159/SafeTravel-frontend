import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss']
})
export class FormServiceComponent implements OnInit {

  @Input() serviceId: number;
  @Output() closePopup: EventEmitter<string> = new EventEmitter<string>();
  service: ServiceBean;

  constructor(
    private serviceService: ServiceService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.service = new ServiceBean();
    if(this.serviceId) {
      let serviceBean = new ServiceBean();
      serviceBean.id = this.serviceId;
      this.serviceService.getServiceById({data: serviceBean})
        .subscribe(resp => {
          this.service = resp.data;
        });
    }
  }


  public save(e: any) {
    if(this.service != null || this.service != undefined) {
      this.serviceService.saveService({data: this.service})
        .subscribe(resp => {
          swal.fire(
            'Registrado correctamente!',
            'Con éxito!',
            'success'
          )
        });
        this.closePopup.emit("false");
    }
    e.preventDefault();
  }
}
