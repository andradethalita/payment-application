import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  showBackButton: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.showBackButton = !urlSegments.some(segment => segment.path === 'payments-dashboard');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toGoBack() {
    this.router.navigate(['/payments-dashboard']);
  }

}
