export interface Coordinates {
  lat: number;
  lng: number;
}

export async function getCoordinatesFromAddress(
  fullAddress: string,
  city: string,
  state: string,
  pinCode: string
): Promise<Coordinates> {
  try {
    const addressQuery = `${fullAddress}, ${city}, ${state} - ${pinCode}`;
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`;
    
    const geoResponse = await fetch(geocodeUrl, {
      headers: {
        "User-Agent": "MyLocalShopApp/1.0 (dev@localhost.com)"
      }
    });
    
    const geoData = await geoResponse.json();

    if (geoData && geoData.length > 0) {
      return {
        lat: Number.parseFloat(geoData[0].lat),
        lng: Number.parseFloat(geoData[0].lon)
      };
    }
  } catch (error) {
    console.error("Geocoding failed:", error);
  }

  // Fallback default coordinates if lookup fails
  return { lat: 0, lng: 0 };
}