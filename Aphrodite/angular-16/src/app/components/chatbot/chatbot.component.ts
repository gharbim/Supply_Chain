import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  isTyping = false;
  messages: { sender: 'user' | 'bot', text: string }[] = [];
  userInput = '';

  // Base de connaissances étendue avec des mots-clés variés
knowledgeBase: { keywords: string[], response: string, priority: number }[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'good evening', 'greetings'],
    response: 'Hello and welcome to Aphrodite Cosmetics! 😊 How can I help you today?',
    priority: 1
  },
  {
    keywords: ['delivery', 'shipping', 'timeframe', 'parcel', 'shipment', 'fees'],
    response: '🚚 Delivery is free within 48 hours across mainland Tunisia. For international shipping, fees depend on the destination.',
    priority: 2
  },
  {
    keywords: ['product', 'natural', 'organic', 'ingredients', 'composition', 'manufacturing'],
    response: '💄 Our products are 100% natural, cruelty-free, and made in Tunisia. We don\'t use any harmful chemical components for your skin or the environment.',
    priority: 2
  },
  {
    keywords: ['skin', 'sensitive', 'dry', 'oily', 'combination', 'acne', 'irritation', 'allergy'],
    response: '🌿 For sensitive skin, our Aphrodite Douceur range is specially formulated. If you tell me your skin type, I can recommend suitable products.',
    priority: 2
  },
  {
    keywords: ['return', 'refund', 'exchange', 'unsatisfied', 'issue', 'mistake'],
    response: '↩️ You have 14 days to return any unused product in its original packaging. Refunds are processed within 7 days after receiving the returned parcel.',
    priority: 2
  },
  {
    keywords: ['discount', 'promotion', 'code', 'sale', 'offer', 'deal'],
    response: '🎁 Use the code APHRO10 to get 10% off your first order! We also offer special deals each month — subscribe to our newsletter to stay updated.',
    priority: 2
  },
  {
    keywords: ['contact', 'customer service', 'phone', 'email', 'mail', 'call'],
    response: '📩 You can contact us by email at contact@aphrodite-cosmetics.com or by phone at +216 70 145 984 (Monday to Friday, 9 AM to 6 PM).',
    priority: 2
  },
  {
    keywords: ['advice', 'routine', 'usage', 'apply', 'tip', 'recommendation'],
    response: '✨ For an optimal beauty routine, we recommend cleansing, toning, and moisturizing morning and evening. Do you need tips for a specific product type?',
    priority: 2
  },
  {
    keywords: ['order', 'purchase', 'buy', 'checkout', 'cart'],
    response: '🛒 You can order directly from our website aphrodite-cosmetics.fr. Payment is secure, and we accept all credit cards and PayPal.',
    priority: 2
  },
  {
    keywords: ['store', 'shop', 'physical', 'address', 'find'],
    response: '🏬 We deal with  stores in Tunis, Ariana, Hammamet and other . You can find the nearest location on our website in the "Our Stores" section.',
    priority: 2
  },
  {
    keywords: ['thanks', 'awesome', 'great', 'perfect', 'excellent'],
    response: '💖 You\'re welcome! Don\'t hesitate if you have more questions. At Aphrodite Cosmetics, your satisfaction is our priority!',
    priority: 1
  },
  {
    keywords: ['goodbye', 'bye', 'see you soon', 'ciao'],
    response: '👋 Goodbye and thank you for contacting Aphrodite Cosmetics! Have a wonderful day!',
    priority: 1
  }
];
  // Ajoutez d'autres entrées de la base de connaissances ici
  // Vous pouvez également ajouter des entrées pour les mots-clés de produits spécifiques
  // ou des questions fréquentes sur la livraison, le service client, etc.

  ngOnInit() {
    this.addBotMessage('Hello, I\'m your Aphrodite Assistant 🌺. How can I help you?');
  }

  toggleChatbot(): void {
    this.isOpen = !this.isOpen;
  }

  // Méthode pour ajouter un message bot
  addBotMessage(text: string): void {
    this.isTyping = true;
    
    // Simuler un délai naturel de frappe
    const typingDelay = Math.min(1200, text.length * 20);
    
    setTimeout(() => {
      this.isTyping = false;
      this.messages.push({ sender: 'bot', text });
      
      // Faire défiler vers le bas après l'ajout du message
      setTimeout(() => this.scrollToBottom(), 50);
    }, typingDelay);
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;
    
    // Ajouter le message de l'utilisateur
    this.messages.push({ sender: 'user', text });
    this.scrollToBottom();
    this.userInput = '';

    // Analyser le message et générer une réponse
    this.analyzeAndRespond(text);
  }

  analyzeAndRespond(userMessage: string): void {
    const normalizedMessage = userMessage.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;
    let highestPriority = 0;

    // Parcourir la base de connaissances pour trouver la meilleure correspondance
    for (const entry of this.knowledgeBase) {
      const matchScore = this.calculateMatchScore(normalizedMessage, entry.keywords);
      
      // Si score plus élevé ou même score mais priorité plus élevée
      if (matchScore > 0 && (matchScore > highestScore || 
          (matchScore === highestScore && entry.priority > highestPriority))) {
        highestScore = matchScore;
        highestPriority = entry.priority;
        bestMatch = entry.response;
      }
    }

    // Si aucune correspondance trouvée
    if (!bestMatch) {
      bestMatch = "❓ Je ne suis pas sûr de comprendre votre demande. Pourriez-vous reformuler ou me demander des informations sur nos produits, la livraison, les promotions ou le service client ?";
    }

    // Ajouter la réponse du bot après un court délai
    this.addBotMessage(bestMatch);
  }

  calculateMatchScore(message: string, keywords: string[]): number {
    let score = 0;
    
    for (const keyword of keywords) {
      if (message.includes(keyword)) {
        // Donner plus de poids aux correspondances exactes
        if (message === keyword) {
          score += 10;
        } else {
          score += 1;
        }
      }
    }
    
    return score;
  }

  scrollToBottom(): void {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  // Méthodes utilitaires pour l'analyse contextuelle
  containsQuestion(text: string): boolean {
    return text.includes('?') || 
           text.includes('comment') || 
           text.includes('quoi') || 
           text.includes('pourquoi') || 
           text.includes('quand') || 
           text.includes('où') || 
           text.includes('qui');
  }

  containsNegativeSentiment(text: string): boolean {
    const negativeWords = ['insatisfait', 'mécontent', 'déçu', 'mauvais', 'horrible', 'terrible', 'nul'];
    return negativeWords.some(word => text.includes(word));
  }
}