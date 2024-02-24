import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem} from '@mui/material'

const Header = ({setValue}) => {
  const styles = {
    appBar: {
      backgroundColor: '#2196f3',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
    select: {
      padding: '5px',
      color: '#fff',
      backgroundColor:'CBE9F7'
    },
  };

  return (
    <AppBar position="static" style={styles.appBar}>
      <Toolbar style={styles.toolbar}>
        <Typography variant="h5" style={styles.title}>
          Most Starred Repos
        </Typography>
        <Select defaultValue="" onChange={(e)=>{setValue(e.target.value)}}  style={styles.select}>
          <MenuItem value="" disabled>Select an option</MenuItem>
          <MenuItem value="1 week">Last 1 week</MenuItem>
          <MenuItem value="2 week">Last 2 weeks</MenuItem>
          <MenuItem value="1 month">Last 1 month</MenuItem>
        </Select>
      </Toolbar>
    
    </AppBar>
  );
};

export default Header;
