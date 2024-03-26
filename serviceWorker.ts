console.log('Inside the service worker');

// Service worker setup
self.addEventListener('install', (event) => {
    console.log('Service worker installed',event);
    // Perform service worker installation tasks
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated',event);
    // Perform service worker activation tasks
});

// Push event handler
self.addEventListener('push', (event:any) => {
    console.log('Inside the service worker push event', event);

    const pushData = event.data?.json(); // Extract notification data
    if (!pushData) return;

    const { title, body } = pushData; 

    event.waitUntil(
        self?.registration?.showNotification(title, {
            body: body,
            icon: 'https://i.pinimg.com/564x/2f/40/27/2f40277250d5c1a6c993caaa3ae4278f.jpg' 
        })
    );
});
