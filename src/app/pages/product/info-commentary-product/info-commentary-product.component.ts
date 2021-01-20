import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentaryBean } from 'src/app/Beans/CommentaryBean';
import { ProductBean } from 'src/app/Beans/ProductBean';
import { ProductDetailBean } from 'src/app/Beans/ProductDetailBean';
import { UserBean } from 'src/app/Beans/UserBean';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-info-commentary-product',
  templateUrl: './info-commentary-product.component.html',
  styleUrls: ['./info-commentary-product.component.scss']
})
export class InfoCommentaryProductComponent implements OnInit {
  url: string = 'http://localhost:8085/pdc';
  date_format:string = 'dd/MM/yyyy';
  START_DATE = new Date(1900, 0, 1);
  END_DATE = new Date(2060, 12, 31);
  productId: any;
  productDetail: ProductDetailBean;
  user: UserBean;
  commentary: CommentaryBean;
  listCommentaries: Array<any> = [];
  commentariesWithUsername: Array<any> = [];


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.productDetail = new ProductDetailBean();
    this.commentary = new CommentaryBean();
    this.user = new UserBean();
    this.productId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getProductDetailById(this.productId);
    this.getListCommentaries();
  }

  public getProductDetailById(productId: number) {
    let productDetail = new ProductDetailBean();
    productDetail.product = new ProductBean();
    productDetail.product.id = productId;
    this.productService.getProductDetailByProductId({data: productDetail})
      .subscribe(resp => {
        this.productDetail = resp.data;
        console.log(this.productDetail);
      });
  }

  public saveCommentary() {
    let productFromCommentary = new ProductBean();
    productFromCommentary.id = this.productId;
    let data = {
      description: this.commentary.description,
      product: productFromCommentary
    }
    if(this.authService.isAthenticated()) {
      this.productService.saveCommentary({data})
        .subscribe(resp => {
          this.getListCommentaries();
        });
    } else {
      swal.fire('Debe registrarse o iniciar sesión para comentar', '','warning');
    }
  }

  public getListCommentaries() {
    let commentaryData = new CommentaryBean();
    commentaryData.product = new ProductBean();
    commentaryData.product.id = this.productId; 
    this.productService.getCommentaryByProductId({data: commentaryData})
      .subscribe(resp => {
        console.log(resp);
        this.listCommentaries = resp.datalist;
      });
  }

}
