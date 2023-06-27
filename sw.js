
// Ciclo de vida del SW

self.addEventListener('install', event => {
    // Descargar assets
    // Creamos Cache
    console.log('SW: instalando SW');

    const instalacion = new Promise((resolve, reject) => {
        setTimeout( () => {
            console.log('SW: Instalaciones Terminadas');
            // Evitar usar para no perder informacion cayendole en cima
            self.skipWaiting();
            resolve();
        }, 1)
    });

    event.waitUntil( instalacion );
});

self.addEventListener('activate', event => {
    // Borrar Cache Viejo
    console.log('SW: Activo y listo para contolar la app');
});

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', event => {

    // Aplicar estrategias del cache
    // console.log('SW:', event.request.url );

    // if( event.request.url.includes('https://reqres.in/') ){
    //     const resp = new Response(`{ ok: false, mensaje:'jajajaja' }`);

    //     event.respondWith( resp );
    // }
});

// SYNC: recuperamos conexion a internet

self.addEventListener( 'sync', event => {
    console.log( 'Tenemos Conexion' );
    console.log( event );
    console.log( event.tag );
});

// PUSH: Manejar las push notifications

self.addEventListener('push', event => {
    console.log('Notificacion recibida...');
})