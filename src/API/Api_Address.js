export const API_URL = 'http://177.44.248.32:8083'
//export const API_URL = 'http://localhost:3003'

export function CITY_GET(token) {
  return {
      url: API_URL + '/address',
      options: {
          headers: {
              Authorization: 'Bearer ' + token,
          },
      },
  };
}





