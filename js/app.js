
// confirmar que podemos usar SW
// if( 'serviceWorker' in navigator ){
//     console.log('podemos usar service worker.')
// }

if( navigator.serviceWorker ){
    navigator.serviceWorker.register('/sw.js')
    console.log('podemos usar SW.');
}

