import { DatePipe } from '@angular/common';
import { HttpClient,  } from "@angular/common/http";
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  new_name: any;
  new_email: any;
  new_pass: any;
  newPHno: any;
  new_address: any;
  new_age: any;
  userData: any = {};
  products: any = {};
  constructor(private http: HttpClient,  private router: Router,  private datePipe: DatePipe) {}

  isLoggedIn: any;
  signIn: any;
  signUp: any;
  user_password: any;
  user_email: any;



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLoggedIn = false;
    this.signIn = true;
    this.signUp = false;
    this.get_products();

  }


  init_signUp(): void{
    if (this.signIn == true){
      this.signIn = false
      this.signUp = true
  }
  else{
    this.signIn = true
    this.signUp = false
  }

}

sign_in(): void{
  let jsonobji ={
    "User_Email" : this.user_email,
    "User_Password" : this.user_password,
  }
  this.http.post('http://127.0.0.1:8000/Coffetto/Sign_In/', jsonobji).subscribe(
                (response) => {

                  let login_stat: any = response;
                  if (login_stat.LogIn_Status == true){
                    this.isLoggedIn = login_stat.LogIn_Status;
                    this.signIn = false;
                    this.signUp = false;
                    this.http.post('http://127.0.0.1:8000/Coffetto/profile/', jsonobji).subscribe(
                      (response) => {
                        this.userData = response;
                      }, (error) => {
                        console.log(error)
                      });
                  }
                  else{
                    alert("Wrong Email or Password");
                  }
                },
                (error)=>{
                  alert("Error in Signing In")
                })
}

sign_up(): void{
  let jsonObj = {
    "User_Name":this.new_name,
    "User_Email":this.new_email,
    "User_Password":this.new_pass,
    "User_Details" : {Address: this.new_address, PhoneNumber: this.newPHno, Age: this.new_age},
  }
  this.http.post('http://127.0.0.1:8000/Coffetto/Sign_Up/', jsonObj).subscribe(
    (response) => {
      this.http.post('http://127.0.0.1:8000/Coffetto/profile/', jsonObj).subscribe(
                      (response) => {
                        this.isLoggedIn = true;
                        this.userData = response
                        console.log(response)
                      }, (error) => {
                        console.log(error)
                      });
    }, (error) => {
      alert("Username already exists!");
    });
}

get_products(): void{
  this.http.get('http://127.0.0.1:8000/Coffetto/get_products/').subscribe(
    (response) => {
      this.products = response;
    });

}

}
