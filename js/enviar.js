// Usamos un bloque para evitar conflictos de nombres
{
    const formElement = document.getElementById('contact-form');
    const resultMessage = document.getElementById('result-message');
    const btnSend = document.getElementById('btn-send');

    if (formElement) {
        formElement.addEventListener('submit', function (e) {
            e.preventDefault();

            btnSend.disabled = true;
            btnSend.innerText = "Enviando...";
            resultMessage.innerText = "Por favor espera...";

            const formData = new FormData(formElement);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status == 200) {
                    resultMessage.innerHTML = "¡Gracias! Tu mensaje ha sido enviado con éxito.";
                    resultMessage.style.color = "#28a745";
                    formElement.reset();
                } else {
                    resultMessage.innerHTML = "Error: " + jsonRes.message;
                    resultMessage.style.color = "#dc3545";
                }
            })
            .catch(error => {
                resultMessage.innerHTML = "Hubo un problema de conexión.";
                resultMessage.style.color = "#dc3545";
            })
            .finally(() => {
                setTimeout(() => {
                    btnSend.disabled = false;
                    btnSend.innerText = "Enviar Mensaje";
                }, 3000);
            });
        });
    } else {
        console.error("No se encontró el formulario con ID 'contact-form'");
    }
}
