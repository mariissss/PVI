console.log('app.js loaded'); 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker Registered', reg))
      .catch((err) => console.error('Service Worker Registration Failed', err));
} else {
    console.log('Service Workers not supported');
}
