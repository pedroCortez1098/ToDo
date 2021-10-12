import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssuesService} from "../issues.service";
import {Issue} from "../issue";

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  issueFrom: FormGroup | undefined;
  @Output() formClose = new EventEmitter();
  suggestions: Issue[] = [];

  constructor(private builder: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueFrom = this.builder.group({
      title:['', Validators.required],
      description:[''],
      priority:['', Validators.required],
      type:['', Validators.required]
    });
    this.issueFrom.controls.title.valueChanges.subscribe((title: string) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }

  addIssue(){
    if(this.issueFrom && this.issueFrom.invalid){
      this.issueFrom.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueFrom?.value);
    this.formClose.emit();
  }

}
