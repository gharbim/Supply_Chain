import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('600ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInUp', [
      state('void', style({ transform: 'translateY(50px)', opacity: 0 })),
      transition(':enter', [
        animate('800ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent2 implements OnInit, AfterViewInit {
  
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  
  featuredProducts = [
    {
      id: 1,
      name: 'Rare Beauty by Selena Gomez',
      price: 89,
      image: 'assets/images/rare.webp',
      description: 'La collection signature par Selena Gomez pour une beauté naturelle et radieuse'
    },
    {
      id: 2,
      name: 'Anastasia Beverly Hills',
      price: 65,
      image: 'assets/images/anastazia.webp',
      description: 'Palette de maquillage professionnelle pour un regard captivant'
    },
    {
      id: 3,
      name: 'DIOR BACKSTAGE Glow Face Palette',
      price: 155,
      image: 'assets/images/dior.webp',
      description: 'Palette illuminatrice pour un teint éclatant digne des podiums'
    }
  ];

  testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      avatar: 'assets/images/client1.jpg',
      comment: 'Les produits Aphrodite ont transformé ma routine beauté. Ma peau n\'a jamais été aussi éclatante !',
      rating: 5
    },
    {
      id: 2,
      name: 'Sophie Martin',
      avatar: 'assets/images/client3.jpg',
      comment: 'Un service client exceptionnel et des produits de qualité supérieure. Je recommande vivement !',
      rating: 5
    },
    {
      id: 3,
      name: 'Camille Leroy',
      avatar: 'assets/images/client2.jpg',
      comment: 'Depuis que j\'utilise Aphrodite, je me sens plus confiante et radieuse. Merci pour cette belle découverte !',
      rating: 5
    }
  ];

  features = [
    {
      icon: 'leaf',
      title: '100% Naturel',
      description: 'Nos produits sont formulés avec des ingrédients naturels et biologiques de première qualité'
    },
    {
      icon: 'gem',
      title: 'Luxe & Qualité',
      description: 'Des formules exclusives développées par nos experts pour des résultats exceptionnels'
    },
    {
      icon: 'shipping-fast',
      title: 'Livraison Rapide',
      description: 'Livraison gratuite sous 24-48h partout en France métropolitaine'
    }
  ];


  heroCarouselImages = [
    'assets/images/hero-1.jpg',
    'assets/images/hero-2.jpg',
    'assets/images/hero-3.jpg'
  ];
  
  currentHeroImageIndex = 0;
  
  isVisible = false;
  chatbotService: any;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    window.addEventListener('scroll', this.checkScroll);
    this.startHeroCarousel();
  }
  
 isChatbotVisible = false;

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }
 goToChatbot() {
    // On cherche le composant chatbot dans le DOM
    const chatbotComponent = document.querySelector('app-chatbot') as any;
    
    // Si le composant est trouvé, on appelle sa méthode pour ouvrir le chat
    if (chatbotComponent && chatbotComponent.componentInstance) {
      chatbotComponent.componentInstance.isOpen = true;
    } else {
      // Si on ne trouve pas le composant, on pourrait afficher une alerte ou un message
      console.log('Composant chatbot non trouvé');
    }
  }
  ngAfterViewInit() {
    if (this.heroVideo?.nativeElement) {
      this.heroVideo.nativeElement.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }
  }
  
  startHeroCarousel() {
    setInterval(() => {
      this.currentHeroImageIndex = (this.currentHeroImageIndex + 1) % this.heroCarouselImages.length;
    }, 5000);
  }
  
  checkScroll = () => {
    this.isVisible = window.pageYOffset > 300;
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}