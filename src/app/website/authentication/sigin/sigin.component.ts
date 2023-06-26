import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';

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
  private route: ActivatedRoute,
  private router: Router,
  private authService: AuthService
) {
  super();
}

ngOnInit() {
  this.authForm = this.formBuilder.group({
    username: ['admin@software.com', Validators.required],
    password: ['admin@123', Validators.required],
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
    this.error = 'Username and Password not valid !';
    return;
  } else {
    this.subs.sink = this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: (res) => {
          if (res) {
            if (res) {
              const token = this.authService.currentUserValue.token;
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

