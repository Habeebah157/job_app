chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "fillForm") {
    console.log("Message received in content script:", msg);

    const data = msg.data || {};
    const firstNameInput = document.querySelector('input[name="first_name"]');
    if (firstNameInput) firstNameInput.value = data.firstName || "";

    const lastNameInput = document.querySelector('input[name="last_name"]');
    if (lastNameInput) lastNameInput.value = data.lastName || "";

    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = data.email || "";

    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) phoneInput.value = data.phone || "";

    sendResponse({ status: "success" });
  }
});
