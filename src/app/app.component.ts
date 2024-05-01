import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="surface-ground h-screen w-full">
      <div class="min-w-full px-5">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'frontend';
}
