import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  scriptURL = 'https://script.google.com/macros/s/AKfycbxbxQtmia_P41bvDIOEBvug8kNasSyPl1gp526TNhVoNJIUO0yJedzoO0t6RaF4OCuIqQ/exec';
  toastMessage: string | null = null;

  async onSubmit(form: NgForm) {
    if (form.invalid) return;

    const data = form.value;

    try {
      await fetch(this.scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      this.showToast("Message submitted successfully!");
      form.reset();
    } catch (error) {
      console.error('Error!', error);
      this.showToast("Submission failed!");
    }
  }

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000); // Hide after 3 seconds
  }
}