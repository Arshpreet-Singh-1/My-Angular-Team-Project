import { Component , OnInit} from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberSearchComponent } from '../member-search/member-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MemberSearchComponent,RouterModule , NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members.slice(0, 4));
  }
}
