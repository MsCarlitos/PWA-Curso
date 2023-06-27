
// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;
// function limpiarCache( cacheName, numeroItems ){

//     caches.open( cacheName )
//         .then( cache => {
//             return cache.keys()
//                 .then( keys => {
//                     if( keys.length > numeroItems ){
//                         cache.delete( keys[0]
//                             .then( limpiarCache( cacheName, numeroItems ) )
//                         );
//                     }
//                 })
//         })

// }

self.addEventListener('install', e => {

    const cacheProm = caches.open( CACHE_STATIC_NAME ).then( cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/img/no-img.jpg',
            '/js/app.js',
        ]);

    });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => {
            return cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css')
        })

    e.waitUntil( Promise.all([ cacheProm, cacheInmutable ]) );

});

// self.addEventListener('fetch', e => {

//     // 1- Cache Only: esta es usada cuando queremos que toda la aplicacion sea servida del cache
//     // e.respondWith( caches.match( e.request ) )

//     // 2-Cache With Network Fallback - then cache
//     const respuestaCache = caches.match( e.request )
//         .then( res => {
//             if( res ) return res;
//             // No existe el archivo
//             // Tengo que ir a la Web
//             console.log('No existe el archivo', e.request);
//             return fetch( e.request )
//                 .then( newResponse => {

//                     caches.open( CACHE_NAME )
//                         .then( cache => {
//                             cache.put( e.request, newResponse );
//                         });

//                     return newResponse.clone();
//                 } )
//         });

//     e.respondWith( respuestaCache );
// });

// self.addEventListener('fetch', e => {
//     // 2.1-Cache With Network Fallback - then cache
//     const respuestaCache = caches.match( e.request )
//         .then( res => {
//             if( res ) return res;
//             // No existe el archivo
//             // Tengo que ir a la Web
//             console.log('No existe el archivo', e.request);
//             return fetch( e.request )
//                 .then( newResponse => {

//                     caches.open( CACHE_DYNAMIC_NAME )
//                         .then( cache => {
//                             cache.put( e.request, newResponse );
//                             limpiarCache(CACHE_DYNAMIC_NAME, 6);
//                         });

//                     return newResponse.clone();
//                 } )
//         });

//     e.respondWith( respuestaCache );
// });

// self.addEventListener('fetch', e => {
//     // 3 - Network eith cache fallback
//     const respuesta = fetch( e.request ).then( res => {
//         if( !res ) return caches.match( e.request );
//         caches.open( CACHE_DYNAMIC_NAME )
//         .then( cache => {
//             cache.put( e.request, res );
//             limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT)
//         })

//         return res.clone();
//     }).catch(err => {
//         return caches.match( e.request );
//     })
//     e.respondWith( respuesta );
// });
// self.addEventListener('fetch', e => {
//     // 4 - Cache with network update
//     //Rendimiento Critico
//     // Siempre estaran un paso a tras

//     if( e.request.url.includes('bootstrap') ) {
//         return e.respondWith( caches.match( e.request ) );
//     }
//     const respuesta = caches.open( CACHE_STATIC_NAME )
//         .then( cache => {
//             fetch( e.request ).then( newResp => cache.put( e.request, newResp ) );
//             return cache.match( e.request );
//         });

//     e.respondWith( respuesta );
// });

self.addEventListener('fetch', e => {

    // 5 - Cache & Network Race

    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;

        const falloUnaVez = () => {
            if( rechazada ) {
                if( /\.(png|jpg)$/.test( e.request )) {
                    resolve ( caches.match('/img/no-img.jpg') )
                } else {
                    reject('No se encontro respuesta...');
                }
            } else {
                rechazada = true;
            }
        }

        fetch( e.request )
            .then( res => {
                res.ok ? resolve(res) : falloUnaVez();
            })
            .catch ( falloUnaVez );

        caches.match( e.request )
            .then( res => {
                res ? resolve(res) : falloUnaVez()
            })
            .catch( falloUnaVez )
    })

    e.respondWith( respuesta );

})