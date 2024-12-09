import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import sysco from '../Assets/Sysco-Logo.jpg';
import chefsstore from  '../Assets/chefsstore.png';
import birite from '../Assets/Birite.jpeg';
import sjdistributors from '../Assets/sj_distributors.png';
import restaurantdepot from '../Assets/restaurantdepot.png';
import cheetah from '../Assets/Cheetah.jpg'


const whiteLogos = [
  sysco,
  chefsstore,
  birite,
  sjdistributors,
  restaurantdepot,
  cheetah,
];

const darkLogos = [
  sysco,
  chefsstore,
  birite,
  sjdistributors,
  restaurantdepot,
  cheetah,
];

const logoStyle = {
  width: '120px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Partnered Distributors
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}