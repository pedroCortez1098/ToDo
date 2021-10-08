import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IssuesService} from "../issues.service";

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  issueFrom: FormGroup | undefined;
  @Output() formClose = new EventEmitter();

  constructor(private builder: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueFrom = this.builder.group({
      title:[''],
      description:[''],
      priority:[''],
      type:['']
    });
  }

  addIssue(){
    this.issueService.createIssue(this.issueFrom?.value);
    this.formClose.emit();
  }

}
