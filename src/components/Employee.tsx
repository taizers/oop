import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

import { employeesApiSlice } from '../store/reducers/EmployeesApiSlice';
import { useShowErrorToast } from '../hooks';
import Image from './Image/Image';
import { apiUrl, separtor } from '../constants/constants';

const Employee: FC = () => {
  const { id } = useParams();
  const { data: employee, error, isLoading } = employeesApiSlice.useGetEmployeeQuery(id);

  const { avatar, name, age, adress, courses, education, foreign_level } = employee;

  useShowErrorToast(error);

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
          Информация о сотруднике
        </Typography>
        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
          <Image
            src={
              avatar
                ? `${apiUrl}${avatar}`
                : `/static/images/NoCover.jpg`
            }
            alt="Employee avatar"
          />
        </Avatar>
        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {id}
          </Typography>
          <Typography component="h3" variant="h5">
            Имя: {name}
          </Typography>
          <Typography component="h3" variant="h5">
            Дата рождения: {age}
          </Typography>
          <Typography component="h3" variant="h5">
            Адрес проживания: {adress}
          </Typography>
          <Typography component="h3" variant="h5">
            Образование:
          </Typography>
          {
            education.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
          <Typography component="h3" variant="h5">
            Иностранные языки:
          </Typography>
          {
            foreign_level.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
          <Typography component="h3" variant="h5">
            Курсы:
          </Typography>
          {
            courses.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
        </Box>
      </Box>
    </Container>
  );
};

export default Employee;
