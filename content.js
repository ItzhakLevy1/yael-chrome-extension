/*************************************************
 * Yael Group Job Tracker – content.js
 * Minimizes banner indication and tracks applied jobs
 *************************************************/

// Always write comments in the code in English in this chat and in all future chats.

let bannerClosed = false;

function ensureExtensionBanner() {
  if (!document.body) return;
  if (bannerClosed) return;
  if (document.querySelector(".my-extension-banner")) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "my-extension-banner";

  const textSpan = document.createElement("span");
  textSpan.innerHTML = `<div>תוסף המשרות שלי פעיל 🟢</div>`;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.className = "my-extension-close";

  closeBtn.addEventListener("click", () => {
    bannerClosed = true;
    messageDiv.remove();
  });

  messageDiv.appendChild(textSpan);
  messageDiv.appendChild(closeBtn);
  document.body.appendChild(messageDiv);
}

/*************************************************
 * Helper: Extract Job ID from element
 *************************************************/
function getJobIdFromElement(jobContainer) {
  const copyButton = jobContainer.querySelector(".share_link[data-copy]");
  if (copyButton) {
    const url = copyButton.getAttribute("data-copy");
    const match = url.match(/\/order\/(\d+)/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

/*************************************************
 * Checking and Marking Applied Jobs
 *************************************************/
function checkAndMarkAppliedJobs() {
  const jobs = document.querySelectorAll(".job_item");
  const appliedJobIds = JSON.parse(
    localStorage.getItem("yaelAppliedJobIds") || "[]"
  );

  jobs.forEach((job) => {
    const jobId = getJobIdFromElement(job);
    if (!jobId) return;

    if (appliedJobIds.includes(jobId)) {
      job.classList.add("applied-job");
    } else {
      job.classList.remove("applied-job");
    }
  });
}

/*************************************************
 * Track applied jobs (Listen to clicks on the header)
 *************************************************/
function addApplyButtonListeners() {
  // Target the header div that opens the job details
  const jobHeaders = document.querySelectorAll(".job_item .job_header.jobs_open_btn");

  jobHeaders.forEach((header) => {
    if (header.getAttribute("data-has-listener") === "true") return;
    header.setAttribute("data-has-listener", "true");

    header.addEventListener("click", (event) => {
      // Find the parent job container
      const jobContainer = event.target.closest(".job_item");
      if (!jobContainer) return;

      const jobId = getJobIdFromElement(jobContainer);
      if (!jobId) return;

      let appliedJobIds = JSON.parse(
        localStorage.getItem("yaelAppliedJobIds") || "[]"
      );

      // If it's not already in the list, add it and mark it
      if (!appliedJobIds.includes(jobId)) {
        appliedJobIds.push(jobId);
        localStorage.setItem("yaelAppliedJobIds", JSON.stringify(appliedJobIds));
      }

      jobContainer.classList.add("applied-job");
    });
  });
}

/*************************************************
 * Bootstrap & observers
 *************************************************/
function runExtension() {
  ensureExtensionBanner();
  checkAndMarkAppliedJobs();
  addApplyButtonListeners();
}

// Initial load
const bootInterval = setInterval(() => {
  if (document.body) {
    runExtension();
    clearInterval(bootInterval);
  }
}, 100);

// Observe SPA / dynamic DOM changes
const observer = new MutationObserver(() => {
  runExtension();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});