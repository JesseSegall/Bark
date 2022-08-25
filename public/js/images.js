(function($) {
    var uploadImage = $(`#fileupload`)

    
    uploadImage.submit(function (event){
        const files = event.target.files
        const formData = new FormData()
        formData.append('myFile', files[0])
      
        fetch('/saveImage', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.path)
        })
        .catch(error => {
          console.error(error)
        })
    })
        
     
      
    document.querySelector('#fileUpload').addEventListener('change', event => {
    handleImageUpload(event)
    })

    t => {
        handleImageUpload(event);
    }
})