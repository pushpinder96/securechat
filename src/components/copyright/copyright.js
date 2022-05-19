import React from "react";
import Typography from '@mui/material/Typography';
import LinkMaterial from '@mui/material/Link';

 export default function Copyright(props) {
    return (
            <Typography variant="overline" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <LinkMaterial color="inherit" >
                Secure Chat
              </LinkMaterial>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          );
  }
  