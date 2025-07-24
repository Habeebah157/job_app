// Save info to Chrome storage
document.getElementById("saveBtn").addEventListener("click", () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  chrome.storage.sync.set({ firstName, lastName, email, phone }, () => {
    alert("Info saved!");
  });
});

// Send info to content script to fill form — ON CLICK of fill button
document.getElementById("fillBtn").addEventListener("click", () => {
  chrome.storage.sync.get(["firstName", "lastName", "email", "phone"], (data) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fillForm",
        data: data
      }, (response) => {
        if (chrome.runtime.lastError) {
          alert("Error: " + chrome.runtime.lastError.message);
        } else if (response && response.status === "success") {
          alert("Form filled successfully!");
        } else {
          alert("Unexpected response");
        }
      });
    });
  });
});
