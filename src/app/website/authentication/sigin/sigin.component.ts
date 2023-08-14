import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/service/authentication/auth.service';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TokenService } from '@core/service/authentication/token.service';
import { User } from '@core/models/user.model';


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent extends UnsubscribeOnDestroyAdapter
implements OnInit
{
authForm!: UntypedFormGroup;
submitted = false;
loading = false;
error = '';
hide = true;
constructor(
  private formBuilder: UntypedFormBuilder,
  private router: Router,
  private authService: AuthService,
  private tokeService: TokenService
) {
  super();
}

ngOnInit() {
  this.authForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
}
get f() {
  return this.authForm.controls;
}
onSubmit() {
  this.submitted = true;
  this.loading = true;
  this.error = '';
  if (this.authForm.invalid) {
    return;
  } else {
    this.subs.sink = this.authService
      .login(this.authForm.getRawValue())
      .subscribe({
        next: (res) => {
          if (res) {
            if (res) {
              const token = this.tokeService.getToken();
              if (token) {
                this.router.navigate(['/dashboard']);
              }
            } else {
              this.error = 'Invalid Login';
            }
          } else {
            this.error = 'Invalid Login';
          }
        },
        error: (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        },
      });
  }
}
}

