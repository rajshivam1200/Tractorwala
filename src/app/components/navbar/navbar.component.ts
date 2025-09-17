import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  mobileMenuOpen = false;
  dropdownOpen = false;
  scrollProgress = 0; // ✅ for progress bar
  roundedProgress = 0; // ✅ percentage for display
  activeSection: string = '';

  ngOnInit(): void {
    // Example initialization logic to avoid empty lifecycle method
    this.activeSection = '';
    this.scrollProgress = 0;
    this.roundedProgress = 0;
  }


  ngAfterViewInit(): void {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetId = (anchor as HTMLAnchorElement).getAttribute('href')!;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

// Detect clicks outside menu/dropdown
// (Removed duplicate onWindowScroll implementation)


  // ✅ Handle scroll for progress bar + active nav
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Progress bar calculation
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (scrollTop / scrollHeight) * 100;
    this.roundedProgress = Math.round(this.scrollProgress);

    // Active nav item calculation
    const sections = document.querySelectorAll<HTMLElement>('.section');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollTop >= (sectionTop - 200)) {
        current = section.getAttribute('id')!;
      }
    });
    this.activeSection = current;
  }

  // ✅ Utility for active nav item in template
  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
