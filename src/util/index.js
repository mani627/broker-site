

 export const  validateInput=(fieldName, value)=> {
    const validators = {
        name: /^(?=.{5,100}$)[a-zA-Z\s]+$/,
        companyName: /^(?=.{10,200}$)[a-zA-Z0-9\s]+$/,
        phoneNumber: /^\d{10}$/,
        emailId: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
        orders: /\S/
    };

    const regex = validators[fieldName];
   
    
    return regex ? regex.test(value) : false;
}
