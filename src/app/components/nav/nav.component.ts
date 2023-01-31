import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

    constructor(
        private router: Router,
        private authService: AuthService,
        private toast: ToastrService){}

    ngOnInit(): void {
        this.router.navigate(['chamados']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
        this.toast.info('Logout realizado com sucesso!', 'Logout', {timeOut: 7000});
    }
}