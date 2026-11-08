const button = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");
const keyInput = document.querySelector("#api-key");
const gifContainer = document.querySelector("#gif-container");
const statusText = document.querySelector("#status");

button.addEventListener("click", async function () {
  const apiKey = keyInput.value.trim();
  let search = searchInput.value.trim();

  // Use golf if the search box is empty.
  if (search === "") {
    search = "Cat";
  }

  if (apiKey === "") {
    statusText.textContent = "Please enter your API key.";
    return;
  }

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(search)}&limit=12&rating=g`;

  statusText.textContent = "Loading...";
  gifContainer.innerHTML = "";
  button.disabled = true;

  try {
    // Get the GIF data.
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Could not get GIFs.");
    }

    const data = await response.json();
    const images = [];

    // Put the image URLs in an array.
    for (let i = 0; i < data.data.length; i++) {
      images.push(data.data[i].images.original.url);
    }

    console.log(images);

    // Show each GIF on the page.
    for (let i = 0; i < images.length; i++) {
      gifContainer.innerHTML += `
        <img src="${images[i]}" class="col-3 mb-3" alt="GIF result">
      `;
    }

    if (images.length === 0) {
      statusText.textContent = "No GIFs found. Try another word.";
    } else {
      statusText.textContent = "Here are your GIFs!";
    }
  } catch (error) {
    statusText.textContent = "Something went wrong. Check your API key and try again.";
    console.log(error);
  }

  button.disabled = false;
});