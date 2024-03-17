import { Component, Input } from '@angular/core';
import { Member } from '../member';
import { NgFor , NgIf, UpperCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [NgFor,NgIf,UpperCasePipe,FormsModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})


export class MemberDetailComponent {

  member?: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMember();
  }
  
  getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }

  save(): void {
    if (this.member) {
      this.memberService.updateMember(this.member)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
