import { Component } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { MessagesComponent } from './messages/messages.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,MembersComponent,MessagesComponent,

  // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Angular Team';
}
