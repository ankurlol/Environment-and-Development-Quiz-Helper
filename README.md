# NPTEL Quiz & Exam Practice Platform 🎓

A modern, responsive, offline-ready web platform tailored for students preparing for **NPTEL / Swayam Online Certification Courses**.

---

## ✨ Features

1. **Week-Wise Practice Mode**:
   - Filter and practice assignment questions week by week (Week 1 through Week 12).
   - **Instant Answer Verification**: Reveals correct/incorrect choices instantly with detailed NPTEL lecture explanations.
   - **Focus Mode & List View**: Switch between single-question distraction-free mode or full-assignment review.
   - **Smart Filters**: Review *All*, *Unsolved*, *Needs Review*, or *Bookmarked ⭐* questions.

2. **Authentic TCS iON / NPTEL CBT Mock Exam Simulator**:
   - Random sampling across all weeks for comprehensive testing.
   - Real-time countdown timer with visual alerts.
   - **TCS iON Question Palette**:
     - 🟩 **Green**: Answered
     - 🟥 **Red**: Not Answered
     - 🟪 **Purple**: Marked for Review
     - 🟪🟩 **Purple + Green**: Answered & Marked for Review
     - ⬜ **Gray**: Not Visited
   - Save & Next, Mark for Review & Next, and Clear Response actions.

3. **Detailed Scorecard & Performance Analytics**:
   - Score breakdown, percentage, accuracy, and time spent.
   - **NPTEL Certification Medal Tier Estimation**:
     - 🥇 *Elite + Gold Medal* (>= 90%)
     - 🥈 *Elite + Silver Medal* (>= 75%)
     - 🎖️ *Elite Certificate* (>= 60%)
     - 📜 *Successfully Completed* (>= 40%)
   - **Week-Wise Weak Area Analysis**: Identifies specifically which weeks cost you marks.
   - Comprehensive question-by-question review with explanations.

4. **Automated PDF Question Extraction**:
   - Drop your NPTEL assignment PDF(s) into this folder and run `parse_my_pdfs.bat` (or let the assistant parse them).
   - In-app Question Manager to customize course titles, codes, and instructors, or import/export JSON.

---

## 🚀 Quick Start

### 1. Launch the App
Double-click `start.bat` or run:
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Loading Your PDF Questions
1. Copy your NPTEL assignment PDF files into this folder (`c:\Users\ankur\OneDrive\Desktop\nptel platform`).
2. Double-click `parse_my_pdfs.bat` (or attach the PDFs in the chat).
3. Refresh the browser to see all your questions organized week by week!
