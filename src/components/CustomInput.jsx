import React from 'react';
import { Select, Option } from "@material-tailwind/react";
import { Typography, Input } from '@material-tailwind/react';
import { Tooltip } from '@mui/material'; // Make sure you have this import
import { BsInfoCircle } from 'react-icons/bs'; // Import the icon

const CustomInput = ({
  label,
  values = "",
  placeholder,
  size = "lg",
  color = "blue-gray",
  labelClass = "font-medium",
  inputClass = "!border-t-blue-gray-200 focus:!border-t-gray-900",
  isDropdown = false,
  options = [],
  setFormValues = () => {},
  name = "",
  margin = "",
  page = "",
  error = "",
  ...props
}) => {

  const tooltips = {
    domainName: "Pick a valid domain name, without 'www' prefix",
    accessToken: "Provide the access token to authenticate",
  };
  return (
    <div
      id="ff"
      className={`mb-2 flex flex-col gap-1 relative ${page !== "register" ? 'max-md:h-[38%]' : 'max-md:h-[12vh]'} ${margin}`}
    >
      {label && (
        <Typography variant="small" color={color} className={labelClass}>
          {label}
        </Typography>
      )}

      {name === 'domainName' || name === 'accessToken'  ? (
        <Tooltip title={tooltips[name]} arrow placement="bottom">
          <div className="flex items-center gap-2">
            {isDropdown ? (
              <Select
                onChange={(e) => {
                  setFormValues(name, e);
                }}
                className={`rounded-lg p-3 h-[6.5vh] ${inputClass}`}
                {...props}
              >
                {options.map((option, index) => (
                  <Option key={index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input
                size={size}
                value={values}
                placeholder={placeholder}
                className={inputClass}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => {
                  setFormValues(name, e?.target.value);
                }}
                {...props}
              />
            )}
            <BsInfoCircle className="cursor-pointer text-gray-500" />
          </div>
        </Tooltip>
      ) : (
        isDropdown ? (
          <Select
            onChange={(e) => {
              setFormValues(name, e);
            }}
            className={`rounded-lg p-3 h-[6.5vh] ${inputClass}`}
            {...props}
          >
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
          value={values}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) => {
              setFormValues(name, e?.target.value);
            }}
            {...props}
          />
        )
      )}

      {error && (
        <span className="text-error text-sm" style={{ display: "block" }}>
          {error[name] ? error[name] : null}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
