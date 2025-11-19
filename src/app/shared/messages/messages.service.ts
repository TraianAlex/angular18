import { Injectable, signal } from '@angular/core';

type MessageSeverity = 'error' | 'warning' | 'info' | 'success';

type Message = {
  severity: MessageSeverity;
  text: string;
};

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  #messageSignal = signal<Message | null>(null);
  #timeoutId: ReturnType<typeof setTimeout> | null = null;

  message = this.#messageSignal.asReadonly();

  showMessage(text: string, severity: MessageSeverity, durationInSeconds: number = 5) {
    // Clear any existing timeout
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }

    // Set the new message
    this.#messageSignal.set({
      text,
      severity,
    });

    // Auto-dismiss after the specified duration
    this.#timeoutId = setTimeout(() => {
      this.clearMessages();
    }, durationInSeconds * 1000);
  }

  clearMessages() {
    // Clear any existing timeout
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }
    this.#messageSignal.set(null);
  }
}
