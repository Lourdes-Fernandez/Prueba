function loadGatos() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const gatitos = document.getElementById('gatitos');

            //data.forEach(gato => {
            //              const img = document.createElement('img');
            //              img.src = gato.url;
            //              gatitos.appendChild(img);
            //});

            data.forEach(gato => {
                gatitos.innerHTML += `<img src = "${gato.url}" alt="Gato" class="w-full object-cover rounded-lg"/>`;
            });

        })
        .catch(error => {
            console.error('Error:', error)
        });
}

loadGatos()
