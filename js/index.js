"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      // On affiche ou non le bouton en fonction de la réponse
      notificationBtn.style.display =
        permission === "granted" ? "none" : "block";
    });
    navigator.serviceWorker.register("sw.js").then((swRegistered) => {
      console.log("[ServiceWorker**] - Registered");
    });
  });
}
