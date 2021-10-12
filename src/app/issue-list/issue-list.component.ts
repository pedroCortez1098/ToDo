import { Component, OnInit } from '@angular/core';
import { IssuesService } from "../issues.service";
import { Issue } from "../issue";


@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  showReportIssue = false;
  selectedIssue: Issue | null = null;

  constructor(private issueService: IssuesService) { }

  private getIssues(){
    this.issues = this.issueService.getPendingIssues();
  }

  ngOnInit(): void {
    this.getIssues();
  }

  onCloseerport(){
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean){
    if(confirmed && this.selectedIssue){
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
  }

}
