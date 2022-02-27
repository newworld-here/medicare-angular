import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MedService } from 'src/app/med.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nameOfUser: any;
  phone: any;
  email: any;
  password: any;
  constructor(private conn : MedService, private toster: ToastrService) { }
  register() {
    const data =
    {
      nameOfUser : this.nameOfUser,
      phone : parseInt(this.phone),
      email : this.email,
      password : this.password
    }
    this.conn.postService('adduserDetails', data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toster.success(res.message);
          this.nameOfUser = '';
          this.phone = '';
          this.email = '';
          this.password = ''
          res.userData;
        } else {
          this.toster.error(res.message)
        }
      });
  }
}
