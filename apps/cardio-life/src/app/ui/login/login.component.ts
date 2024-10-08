import {Component, signal} from '@angular/core';
import {AuthService} from "../../guards/auth.service";
import {UtilsService} from "../../services/utils.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MessageModule} from "primeng/message";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MessageModule, ButtonDirective, InputTextModule, CardModule],
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.component.css',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string | null = null;
  password: string | null = null;
  confirmPassword: string | null = null;
  error = signal<string | null>(null);
  loader: boolean = false;

  constructor(
    public authService: AuthService,
    public utilsService: UtilsService,
  ) {
    //this.authService.SignOut(true);

  }

  async signIn() {
    try {
      this.error.set(null);
      if (this.email === null || this.email === '') {
        throw ('please enter your email');
      } else {
        if (!this.utilsService.emailRegx().test(this.email)) {
          throw ('please enter a valid email');
        } else if (this.password === null || this.password === '') {
          throw ('please enter your password');
        } else if (this.password.length < 6) {
          throw ('please enter a valid password');
        } else {
          console.log("SUBMIT");
          this.authService.SignIn(this.email, this.password).then((message: any) => {
            if (message) {
              let error = JSON.parse(JSON.stringify(message));
              console.log(error);
              if (error.code == "auth/user-not-found") {
                this.error.set("There is no user record corresponding to this email. Please Sign Up.");
              } else if (error.code == "auth/wrong-password") {
                this.error.set("Wrong Password");
              } else {
                this.error.set('Ops, there\'s an error on your account. Please contact us at ');
              }
            }
          });
        }
      }
    } catch (err: any) {
      this.error.set(err.toString());
    }

  }
  //
  // // ResetPassword
  // async resetPassword() {
  //   try {
  //     this.loader = true;
  //     this.error.set(null);
  //     /*  this.authService.ForgotPassword(this.email).then(ok=>{
  //        if (ok.type === 'error') {
  //          this.error = ok.message;
  //        } else {
  //
  //          const dialogRef = this.dialog.open(DialogInfoComponent, {
  //            disableClose:true,
  //            width:'400px',
  //            data:{
  //              title:'Done',
  //              message:ok.message
  //            }
  //          });
  //        }
  //        this.loader = false;
  //      }) */
  //   } catch (err) {
  //     this.error.set(JSON.stringify(err));
  //     this.loader = false;
  //   }
  // }

}
