import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';
import { UiService } from 'src/app/services/ui.service';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Component({
  selector: 'app-ai-chatbot',
  templateUrl: './ai-chatbot.component.html',
  styleUrls: ['./ai-chatbot.component.css']
})
export class AiChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  isLoading = false;
  userInput = '';
  messages: ChatMessage[] = [];

  constructor(private geminiService: GeminiService, private ui: UiService) {
    this.ui.isChatbotOpen$.subscribe(open => {
      this.isOpen = open;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.ui.toggleChatbot();
  }

  async sendMessage(event: Event) {
    event.preventDefault();
    if (!this.userInput.trim() || this.isLoading) return;

    const userText = this.userInput.trim();
    this.userInput = '';
    
    // Add user message to UI
    this.messages.push({ role: 'user', text: userText });
    this.isLoading = true;

    try {
      const response = await this.geminiService.getChatResponse(userText, this.messages.slice(0, -1));
      this.messages.push(response as ChatMessage);
    } catch (error) {
      console.error('Chat error:', error);
      this.messages.push({ 
        role: 'model', 
        text: "I encountered an error processing that request. Please try again." 
      });
    } finally {
      this.isLoading = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
