import {Component} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {CurrencyPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {Button} from "primeng/button";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [

    RouterOutlet,
    RouterLink,
    CurrencyPipe,
    SidebarModule,
    Button,
    NgOptimizedImage,
    NgIf,
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent  {
  drawerOpened = false;

  constructor(public mainService:ProductsService,private activatedRoute:ActivatedRoute) {
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }


}
