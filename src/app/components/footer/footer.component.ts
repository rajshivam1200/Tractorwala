import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('footer', { static: true }) footerRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const footer = this.footerRef.nativeElement;
    const cols = footer.querySelectorAll<HTMLElement>('.col');
    const socialIcons = footer.querySelectorAll<HTMLAnchorElement>('.social-icons a');

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries, footer, cols),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(footer);

    // Ripple effect
    socialIcons.forEach((icon) => {
      icon.addEventListener('click', (e: MouseEvent) => {
        if (icon.getAttribute('href') === '#') {
          e.preventDefault();
          this.createRipple(e, icon);
        }
      });
    });

    // Extra link hover interaction
    this.addLinkHoverInteraction(cols);

    // Dynamic background
    this.addDynamicBackground(footer);

    // Add CSS ripple animation
    this.addRippleAnimationStyle();
  }

  private handleColAnimation(cols: NodeListOf<HTMLElement>, footer: HTMLElement): void {
    cols.forEach((col, index) => {
      setTimeout(() => {
        col.style.animationDelay = `${0.2 + index * 0.2}s`;
        col.style.animationPlayState = 'running';
      }, index * 100);
    });
  }

  private handleIntersection(
    entries: IntersectionObserverEntry[],
    footer: HTMLElement,
    cols: NodeListOf<HTMLElement>
  ): void {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        target.classList.add('visible');
        if (target === footer) {
          this.handleColAnimation(cols, footer);
        }
      }
    });
  }

  private createRipple(event: MouseEvent, element: HTMLElement): void {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.6);
      transform: scale(0); animation: ripple 0.6s linear;
      width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
      pointer-events: none;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  private addLinkHoverInteraction(cols: NodeListOf<HTMLElement>): void {
    cols.forEach((col) => {
      col.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
        link.addEventListener('mouseenter', function () {
          (this as HTMLElement).style.transform = 'translateX(15px) scale(1.02)';
        });
        link.addEventListener('mouseleave', function () {
          (this as HTMLElement).style.transform = 'translateX(0) scale(1)';
        });
      });
    });
  }

  private addDynamicBackground(footer: HTMLElement): void {
    footer.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      footer.style.backgroundPosition = `${x}% ${y}%`;
    });
  }

  private addRippleAnimationStyle(): void {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
}