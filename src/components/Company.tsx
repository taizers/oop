import React, { FC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { companiesApiSlice } from '../store/reducers/CompaniesApiSlice';
import { apiUrl } from '../constants/constants';
import Image from './Image/Image';

const Company: FC = () => {
  const { id } = useParams();
  const { data: company, error, isLoading } = companiesApiSlice.useGetCompanyQuery(id);

  const { avatar, name, age, location } = company;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Информация о компании
        </Typography>
        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
          <Image
            src={
              avatar
                ? `${apiUrl}${avatar}`
                : `/static/images/no-image.png`
            }
            alt="Employee avatar"
          />
        </Avatar>

        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {id}
          </Typography>
          <Typography component="h3" variant="h5">
            Название: {name}
          </Typography>
          <Typography component="h3" variant="h5">
            Дата основания: {age}
          </Typography>
          <Typography component="h3" variant="h5">
            Адрес: {location}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Company;
