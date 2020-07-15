self.addEventListener('install',()=>{
    console.log('I am installed')
  })

self.addEventListener('fetch',(e)=>{
    if(!e.request.url.includes(location.origin)){
      e.respondWith(
        fetch(e.request)
        .then(response => {
          if(response.ok){
            return response
          }
        })
        .catch(()=>{
          const errResponse = new Response(null,{
            statusText: 'No Network Connection'
          })
          return errResponse
        })
      )
    }
  })