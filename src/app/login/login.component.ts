import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:any;
  userPassword:any = "";
  isLogin:any
  error:any = false;
  errorStyle:any = "";

  constructor(private api:UsersService,private router: Router) { }

  ngOnInit(): void {
      console.log(this.userPassword)
  }

  getPasswordCheck(event:any) {
      if(event.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
        this.errorStyle = "2px solid green";
      } else {
        this.errorStyle = "2px solid red"
      }
  }

login(username:any,password:any) {
    this.api.getSingleUser().subscribe((response: any) => {
      this.userPassword = response[0].password
      if (username.value === response[0].username && password.value === response[0].password && password.value.match(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
        this.isLogin = true;
        this.error = false;
        this.router.navigate(["dashboard"])
      } else {
        this.isLogin = false;
        this.error = true;
        setTimeout(()=>{
          this.error = false;
        },2000)
        console.log(response)
        console.log(username.value);
        console.log(password.value);


      }
    })
  }
}
