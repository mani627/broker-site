import api from "./BaseURL";

export const signInAPI = async (data = null) => {
  try {
    const { phoneNumber , password} = data;
    const response = await api.post('/auth/signInSeller',{phoneNumber, password});
    const { token } = response.data;
    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);
    }
    return response;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
    return error
  }
}

export const signUpAPI = async (data = null) => {
  try {
     const {
      sellerName,
      companyName,
      phoneNumber ,
      email,
      password,
      shipmentPerMonth,
      shopifyAccessToken,
      shopifyDomainURL,
      role,
      pickupDate,
      pickupTime,
      pickupPackageCount,
     } = data
    const response = await api.post('/auth/registerSeller',{
      sellerName,
      companyName,
      phoneNumber ,
      email,
      password,
      shipmentPerMonth,
      shopifyAccessToken,
      shopifyDomainURL,
      role,
      pickupDate,
      pickupTime,
      pickupPackageCount,
     });
    return response;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
    return error
  }
}
