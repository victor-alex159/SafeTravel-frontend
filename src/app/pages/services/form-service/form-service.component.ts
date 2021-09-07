import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceBean } from 'src/app/Beans/ServiceBean';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
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
    public authService: AuthService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.service = new ServiceBean();
    if(this.serviceId) {
      let serviceBean = new ServiceBean();
      serviceBean.id = this.serviceId;
      this.sharedService.sendOrRecieveData('/sc/gsbi', serviceBean, false)
        .subscribe(resp => {
          this.service = resp.data;
        });
    }
  }


  public save(e: any) {
    if(this.service != null || this.service != undefined) {
      this.sharedService.sendOrRecieveData('/sc/ss', this.service, false)
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
