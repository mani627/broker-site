// CustomInput.js
import React from 'react';
import { Select, Option } from "@material-tailwind/react";
import { Typography, Input } from '@material-tailwind/react';

const CustomInput = ({
  label = "Your email",                      // Default label
  placeholder = "name@mail.com",             // Default placeholder
  size = "lg",                               // Default size
  color = "blue-gray",                       // Default label color
  labelClass = "-mb-6 font-medium",          // Default label class
  inputClass = "!border-t-blue-gray-200 focus:!border-t-gray-900", // Default input class
  isDropdown = false,                        // Condition for rendering a dropdown
  options = [],  
  setFormValues=()=>{}, 
  name="", 
  margin="", 
  page="",
  error,                       // Options for dropdown, empty by default
  ...props
}) => (
  <div id="ff" className= {`mb-1.5 flex flex-col gap-6 relative h-[14vh]  ${page!=="register"?'max-md:h-[38%]': 'max-md:h-[12vh]'} ${margin}`}>
    {label && (
      <Typography variant="small" color={color} className={labelClass}>
        {label}
      </Typography>
    )}
    
    {isDropdown ? (
    <Select  onChange={(e)=>{
    
      
      setFormValues(name,e )
    }}className={`rounded-lg p-3 h-[6.5vh] ${inputClass}`} {...props}>
    {options.map((option, index) => (
      <Option key={index} value={option.value}>
        {option.label}
        </Option>
    ))}
  </Select>
    ) : (
      <Input
    
        size={size}
        placeholder={placeholder}
        className={inputClass}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onChange={(e)=>{
          setFormValues(name,e?.target.value )
        }}
        {...props}
      />
    )}


 {error&&
 
 <span className=' text-error text-sm ' style={{display:"block",position:"absolute", bottom:0}}>{error[name]?error[name]:null }</span>
 
 }  
  </div>
);

export default CustomInput;
