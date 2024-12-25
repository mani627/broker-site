import api from "./BaseURL";


export const verifyOTP = async (data = null) => {
    try {
      const { phoneNumber , otp ,newPassword =null} = data;
      let newData = {}
      if(newPassword == null ) { 
        newData.phoneNumber = "+91"+phoneNumber;
        newData.otp = otp;
      }else{
        newData.phoneNumber = phoneNumber;
        newData.otp = otp;
        newData.newPassword = newPassword;
      }
      const response = await api.post('/auth/verifyOTP',{phoneNumber: newData.phoneNumber, otp: newData.otp});
      return response;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
      return error
    }
  }

  export const forgetPassword = async (data = null) =>{

    try {
        const { phoneNumber , otp ,newPassword = null} = data;
        let newData = {}
        if(newPassword == null ) { 
          newData.phoneNumber = "+91"+phoneNumber;
          newData.otp = otp;
        }else{
          newData.phoneNumber = "+91"+phoneNumber;
          newData.otp = otp;
          newData.newPassword = newPassword;
        }
      
      const response = await api.post('/auth/forgetPassword',newData);
      return response;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
      return error
    }

  }