import React, { FC, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

import { employeesApiSlice } from '../store/reducers/EmployeesApiSlice';
import { useAppSelector, useShowErrorToast } from '../hooks';
import Image from './Image/Image';
import { apiUrl, separtor } from '../constants/constants';
import moment from 'moment';
import { Button } from '@mui/material';
import EmployeeModal from '../containers/EmployeeModal';
import { Link } from 'react-router-dom';

const Employee: FC = () => {
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);

  const [updateEmployee, { data: updatedData, error: updatinError, isLoading: updatinIsLoading }] = employeesApiSlice.useUpdateEmployeeMutation();
  const { data: employee, error, isLoading } = employeesApiSlice.useGetEmployeeQuery(id);

  useEffect(() => {
    if (updatedData) {
      setModalOpen(false);
    }
  }, [updatedData]);

  useShowErrorToast(error);
  useShowErrorToast(updatinError);

  const onOpenModal = () => {
    setModalOpen(true)
  };

  return (
    <Container component="div" maxWidth="xs">
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
        <Box sx={{ alignSelf: 'center'}}>
          <Image
            src={
              employee?.avatar
                ? `${apiUrl}${employee.avatar}`
                : `/static/images/no-image.png`
            }
            alt="Employee avatar"
          />
        </Box>
        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {id}
          </Typography>
          <Typography component="h3" variant="h5">
            Имя: {employee?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Дата рождения: {moment(employee?.age).format("DD.MM.YYYY")}
          </Typography>
          <Typography component="h3" variant="h5">
            Адрес проживания: {employee?.adress}
          </Typography>
          <Typography component="h3" variant="h5">
            Компания: {employee?.company ? <Link to={`/companies/${employee?.company?.id}`}>{<Typography component="span" color="blue" >{employee?.company?.name}</Typography>}</Link> : 'Нет'}
          </Typography>
          <Typography component="h3" variant="h5">
            Образование:
          </Typography>
          {
            employee?.education.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
          <Typography component="h3" variant="h5">
            Иностранные языки:
          </Typography>
          {
            employee?.foreign_level.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
          <Typography component="h3" variant="h5">
            Курсы:
          </Typography>
          {
            employee?.courses.split(separtor).map((item: string, index: number) => (
              <Typography key={index} component="h4" variant="h6">
                {item}
              </Typography>
            ))
          }
        </Box>
        {user?.id && <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={onOpenModal}
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '35%', alignSelf: 'center' }}
        >
          Обновить
        </Button>}
      </Box>

      {isModalOpen && employee && <EmployeeModal isModalOpen={isModalOpen} employee={employee} setModalOpen={setModalOpen} type='update' mutationFunction={updateEmployee} />}
    </Container>
  );
};

export default Employee;
