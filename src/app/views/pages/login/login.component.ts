import { ToasterService } from '@coreui/angular';
import { MedService } from './../../../med.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: any;
  password: any;
  constructor(private conn : MedService, private toster: ToastrService, private router: Router) { }
  submit() {
    const data =
    {
      email : this.username,
      password : this.password
    }
    this.conn.postService('login', data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toster.success(res.message);
          this.router.navigate(['pages/addMedicine'])
          sessionStorage.setItem('user', JSON.stringify(res.userData));
        } else {
          this.toster.error(res.message)
        }
      });

  }
}
