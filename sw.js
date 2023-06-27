self.addEventListener('fetch', event => {
    // if( event.request.url.includes('.jpg')) {
    //     console.log(event.request.url);
    //     // let fotoReq = fetch('img/main.jpg')
    //     // let fotoReq = fetch( event.request.url );
    //     let fotoReq = fetch( event.request );
    //     event.respondWith( fotoReq );
    // }

    // Modificar peticiones
    // if( event.request.url.includes('style.css') ){
    //     let respuesta = new Response(`
    //         body {
    //             background-color: red !important;
    //             color: pink
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     });

    //     event.respondWith( respuesta )
    // }

    // Modificar peticiones tarea
    // if (event.request.url.includes('jpg')) {
    //     let fotoPatasArriba = fetch('img/main-patas-arriba.jpg');
    //     event.respondWith(fotoPatasArriba);
    // }

    const resp = fetch( event.request )
        .then( resp => {
            // if( resp.ok ) return resp;
            // return fetch('img/main.jpg')
            return resp.ok ? resp : fetch('img/main.jpg')
        })
    event.respondWith( resp );

});


