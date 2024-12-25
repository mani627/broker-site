import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { Logout, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';

export default function LogOut({isopen ,setIsOpen}) {


const {logOut} = useAuth()

  const handleClose = () => {
    setIsOpen(false)
  };

  const handleLogOut = async() => {
    // Perform logout logic here, such as clearing tokens or redirecting
    await logOut()
    console.log('User logged out');
    setIsOpen(false)
    // Redirect or additional logout actions can go here
  };

  return (
      <Dialog
        open={isopen}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title" style={{ textAlign: 'center' }}>
          <Logout style={{ fontSize: '2rem', color: '#d32f2f' }} />
          <div>Are you sure you want to log out?</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description" style={{ textAlign: 'center' }}>
            You will be logged out of your account and need to log in again to access your data.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Cancel />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
  
  );
}

