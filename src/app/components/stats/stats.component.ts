import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {

  @ViewChildren('statNumber') statNumbers!: QueryList<ElementRef>;
  private readonly speed = 300; // Adjust speed for smooth animation

  ngAfterViewInit(): void {
    this.statNumbers.forEach((counter: ElementRef) => {
      this.animateCounter(counter.nativeElement);
    });
  }
private animateCounter(counter: HTMLElement): void {
  const target = +counter.getAttribute('data-target')!;
  let count = 0;
  const increment = target / this.speed;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.floor(count).toString();
      requestAnimationFrame(update);
    } else {
      counter.innerText = target.toString();
    }
  };

  update();
}

}
