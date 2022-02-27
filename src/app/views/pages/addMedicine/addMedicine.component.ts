import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MedService } from 'src/app/med.service';
let medicinData: any = [];
@Component({
  selector: 'app-addMedicine',
  templateUrl: './addMedicine.component.html',
  styleUrls: ['./addMedicine.component.scss'],
})
export class AddMedicineComponent implements OnInit {
  name: any;
  price: any;
  seller: any;
  product_desc: any;
  offers: any;
  current_price: any;
  id: any;
  stateHide: boolean = true;
  role: any;
  array: any = [];
  formdata: any = [];
  formurl = '';
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  data: any;
  constructor(private conn: MedService, private toster: ToastrService) {}
  displayedColumns = [
    'slno',
    'name',
    'seller',
    'product_desc',
    'price',
    'offers',
    'action',
  ];
  displayedColumns1 = [
    'slno',
    'name',
    'seller',
    'product_desc',
    'price',
    'offers',
    'action',
  ];
  ngOnInit() {
    this.getMedData();
  }
  add() {
    let data;
    if (this.id) {
      data = {
        id: this.id,
        name: this.name,
        price: this.price,
        seller: this.seller,
        product_desc: this.product_desc,
        offers: this.offers,
        current_price: this.current_price,
      };
    } else {
      data = {
        name: this.name,
        price: this.price,
        seller: this.seller,
        product_desc: this.product_desc,
        offers: this.offers,
        current_price: this.current_price,
      };
    }
    this.conn.postService('createmed', data).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.toster.success(res.message);
        this.name = '';
        this.price = '';
        this.seller = '';
        this.product_desc = '';
        this.offers = '';
        this.current_price = '';
        this.getMedData();
      } else {
        this.toster.error(res.message);
      }
    });
  }
  edit(element: any, num: number) {
    this.conn
      .postService('activationMed', { id: element.id, flag: num })
      .subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toster.success(res.message);
          this.getMedData();
        } else {
          this.toster.error(res.message);
          this.getMedData();
        }
      });
  }
  update(element: any) {
    this.stateHide = false;
     this.id = element.id;
     this.name = element.name;
     this.price = element.price;
    this.seller = element.seller;
     this.product_desc = element.product_desc;
     this.offers = element.offers;
     this.current_price = element.current_price;
  }
  close() {
    this.stateHide = true;
  }
  med() {
    this.stateHide = false;
  }
  getMedData() {
    this.role = JSON.parse(sessionStorage.getItem('user') || '{}').role;
    if (JSON.parse(sessionStorage.getItem('user') || '{}').role === 'admin') {
      this.conn.postService('getMedList', '').subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          medicinData = res.message;
          for (let i = 0; i < medicinData.length; i++) {
            medicinData[i].slno = i + 1;
          }
          this.data = new MatTableDataSource(medicinData);
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
        } else {
          this.data = new MatTableDataSource([]);
        }
      });
    } else {
      this.conn.postService('getActiveMedList', '').subscribe((res: any) => {
        console.log('>>>>>>>>>>>', res);
        if (res.status) {
          medicinData = res.message;
          for (let i = 0; i < medicinData.length; i++) {
            medicinData[i].slno = i + 1;
          }
          this.data = new MatTableDataSource(medicinData);
          this.data.paginator = this.paginator;
          this.data.sort = this.sort;
        } else {
          this.data = new MatTableDataSource([]);
        }
      });
    }
  }
  // filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }
  push(arr: any) {
    this.array.push(arr);
    console.log('aaaaaaaaaa', this.array);

  }
  splice(arr: any) {
    const index = this.array.indexOf(arr);

    if (index !== -1) {
      this.array.splice(index, 1);
    }
    console.log('aaaaaaaaaa', this.array);

  }
  paytm(report: any): any {
    console.log(report);
    let sum = 0;
    this.array.filter((e: any)=> {
      sum += e.price
    })
    const data = {
      amount: sum,
      name: JSON.parse(localStorage.getItem('user') || '{}').nameOfUser,
      email: JSON.parse(localStorage.getItem('user') || '{}').email,
      phone: JSON.parse(localStorage.getItem('user') || '{}').phone
  };
    console.log(data);
    // return
    this.conn.postService('pay', data)
      .subscribe((res: any) => {
        console.log(res);
        this.formdata = res.form;
        this.formurl  = res.url;
        // this.payform.nativeElement.innerHTML = res.form;
        (<HTMLInputElement>document.getElementById('checksumArea')).innerHTML = res.form;
        // console.log(document.getElementById('checksumArea').innerHTML);
        setTimeout(() => {
          // this.payform.nativeElement.submit();
        console.log(document.getElementById('checksumArea'));
        const myForm = document.getElementsByName('f1')[0] as HTMLFormElement;
        myForm.submit();
       }, 100);
      });
   }
}
