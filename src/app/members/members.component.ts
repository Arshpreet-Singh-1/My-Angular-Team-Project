import { Component } from '@angular/core';
import { Member } from '../member';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { FormsModule } from '@angular/forms';
import { MEMBERS } from '../mock-members';
import { NgFor , NgIf, UpperCasePipe} from '@angular/common';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [RouterModule, FormsModule,NgFor ,NgIf,UpperCasePipe,MemberDetailComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

  constructor(private memberService: MemberService , private messageService: MessageService){}

  ngOnInit(): void {
    this.getMembers();
  }
  
  members: Member[] = [];

  getMembers(): void {
    this.memberService.getMembers().subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member);
      });
  }


  delete(member: Member): void {
    this.members= this.members.filter(h => h !== member);
    this.memberService.deleteMember(member.member_id).subscribe();
  }
}
