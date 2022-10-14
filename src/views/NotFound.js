import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@mui/material';
import notfound from '../assets/error_notfound.png'

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Page Notfound</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <img
            alt="Under development"
            src={notfound}
            style={{
              marginTop: 50,
              display: 'inline-block',
              maxWidth: '100%',
              width: 560
            }}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          404: The page you are looking for isn’t here
        </Typography>
      </Container>
    </Box>
  </>
);

export default NotFound;