import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  oversLeft: number = 5;
  ballsLeft: number = 30; // 5 overs * 6 balls/over
  wicketsLeft: number = 10;
  target: number | null = null;
  currentRuns: number = 0;
  runsNeeded: number = 0;

  ngOnInit() {
    this.updateNeed();
  }

  updateNeed() {
    if (this.target !== null && this.target > this.currentRuns) {
      this.runsNeeded = this.target - this.currentRuns;
    } else if (this.target !== null && this.target <= this.currentRuns) {
      this.runsNeeded = 0;
    }
  }

  handleRun(runs: number) {
    if (this.target === null || this.target === 0) {
      alert('Please set the target first!');
      return;
    }

    // Update runs
    this.currentRuns += runs;
    this.ballsLeft -= 1;
    this.updateNeed();

    // Check for wicket (if current run is divisible by 3)
    if (runs > 0 && runs % 3 === 0) {
      this.wicketsLeft -= 1;
    }

    // Check for over completion (every 6 balls)
    if (this.ballsLeft % 6 === 0) {
      this.oversLeft -= 1;
    }

    this.checkGameState();
  }

  checkGameState() {
    if (this.runsNeeded <= 0 && this.ballsLeft >= 0 && this.wicketsLeft >= 0) {
      alert('Match Won!');
      this.resetGame();
    } else if ((this.ballsLeft <= 0 || this.wicketsLeft <= 0) && this.runsNeeded > 0) {
      alert('Match Lost!');
      this.resetGame();
    }
  }

  resetGame() {
    this.oversLeft = 0;
    this.ballsLeft = 0;
    this.wicketsLeft = 0;
    this.target = null;
    this.currentRuns = 0;
    this.runsNeeded = 0;
  }
}
