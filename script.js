const token = "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"
const inputTxt = document.getElementById('input')
const image = document.getElementById('image')
const button = document.getElementById("btn")

async function query() {
    image.src = "/TextToImage/loading.gif"
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
		{
			headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
			method: "POST",
			body: JSON.stringify({"inputs": inputTxt.value}),
		}
	);
    console.log(response.status);
	const result = await response.blob();
	return result;
}

button.addEventListener('click', async function (){
    query().then((response) => {
        // Use image
        // const objectURL = URL.createObjectURL(response)
        // image.src = objectURL
        if (response) {
            const objectURL = URL.createObjectURL(response);
            image.src = objectURL;
            console.log(objectURL);  // Log the object URL to debug
        } else {
            console.error("No valid image returned");
        }
    }).catch((error) => {
        console.error("Error during the request:", error);
    });
})
