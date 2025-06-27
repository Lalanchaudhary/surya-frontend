// lib/reverseGeocode.js
export const reverseGeocode = async (lat, lon) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          'User-Agent': 'MERN-Ecommerce-App/1.0 (your@email.com)',
        }
      }
    );
    const data = await res.json();
    const address = data.address || {};
  
    return {
      street:
        address.road ||
        address.neighbourhood ||
        address.hamlet ||
        address.suburb ||
        '',
      city:
        address.city ||
        address.town ||
        address.village || // like "Talpur"
        address.county || // fallback to "Patran Tahsil"
        '',
      state: address.state || '',
      pincode: address.postcode || '',
    };
  };
  