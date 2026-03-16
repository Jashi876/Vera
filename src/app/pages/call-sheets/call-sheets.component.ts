import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-sheets',
  templateUrl: './call-sheets.component.html',
  styleUrls: ['./call-sheets.component.css']
})
export class CallSheetsComponent implements OnInit {

  isDownloading = false;

  constructor() { }

  ngOnInit(): void {
  }

  simulateDownload() {
    this.isDownloading = true;
    setTimeout(() => {
      this.isDownloading = false;
      alert('Call Sheet PDF generated. Your download will start shortly.');
    }, 2000);
  }

}
