const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const NEKOS_API_URL = "https://api.nekosapi.com/v4/images/random?limit=12&rating=safe";

export async function fetchNekosImages() {
  const response = await fetch(CORS_PROXY + NEKOS_API_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Nekos API error: ${response.status}`);
  }

  const result = await response.json();

    // Log the response to inspect its structure
    console.log("Nekos API response:", result);

    // Check if the response contains the expected 'items' property
    if (!result || !Array.isArray(result)) {
      throw new Error("Invalid response format: 'items' property is missing or not an array");
    }

  // Transform the response to match our expected format
  const transformedImages = result.map(item => ({
    id: item.id,
    image: {
      original: {
        url: item.url
      }
    }
  }));

  return { images: transformedImages };
}