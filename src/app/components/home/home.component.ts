import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { StatsComponent } from "../stats/stats.component";
import { VehiclesComponent } from "../vehicles/vehicles.component";
import { FeaturedComponent } from "../featured/featured.component";
import { StrengthsComponent } from "../strengths/strengths.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ContactComponent } from "../contact/contact.component";
import { TestimonialsComponent } from "../../testimonials/testimonials.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, StatsComponent, VehiclesComponent, FeaturedComponent, StrengthsComponent, NavbarComponent, ContactComponent, TestimonialsComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
  })
export class HomeComponent {

}
