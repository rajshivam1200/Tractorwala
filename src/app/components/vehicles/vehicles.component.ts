import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements AfterViewInit {

ngAfterViewInit(): void {
  const track = document.querySelector('.carousel-track') as HTMLElement;
  const prevBtn = document.querySelector('.carousel-btn.prev') as HTMLButtonElement;
  const nextBtn = document.querySelector('.carousel-btn.next') as HTMLButtonElement;
  const cards = Array.from(track.children) as HTMLElement[];

  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

  const updateCarousel = () => {
    let visibleCards = 4;
    if (window.innerWidth <= 1200) visibleCards = 2;
    if (window.innerWidth <= 768) visibleCards = 1;

    const cardStyle = getComputedStyle(cards[0]);
    const cardMargin = parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
    const cardWidth = cards[0].offsetWidth + cardMargin;

    let currentIndex = 0;

    const updateButtons = () => {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= cards.length - visibleCards;
    };

    const moveTrack = () => {
      track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
      updateButtons();
    };

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        moveTrack();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        moveTrack();
      }
    });

    updateButtons();
    window.addEventListener('resize', () => {
      moveTrack(); // recalc positions on resize
    });
  };

  updateCarousel();
}

}
