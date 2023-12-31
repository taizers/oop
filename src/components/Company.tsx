import React, { FC, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { companiesApiSlice } from '../store/reducers/CompaniesApiSlice';
import { apiUrl } from '../constants/constants';
import Image from './Image/Image';
import { useAppSelector, useShowErrorToast } from '../hooks';
import { Button } from '@mui/material';
import CompanyModal from '../containers/CompanyModal';
import moment from 'moment';
import EmployeesContainer from './EmployeesContainer';

const Company: FC = () => {
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEmloyeesContainerOpen, setEmloyeesContainerOpen] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.auth);

  const { data: company, error, isLoading } = companiesApiSlice.useGetCompanyQuery(id);
  const [updateCompany, { data: updatedData, error: updatinError, isLoading: updatinIsLoading }] = companiesApiSlice.useUpdateCompanyMutation();

  useEffect(() => {
    if (updatedData) {
      setModalOpen(false);
    }
  }, [updatedData]);

  useShowErrorToast(error);
  useShowErrorToast(updatinError);

  const onOpenModal = () => {
    setModalOpen(true);
  };

  const onOpenEmployeesContainer = () => {
    setEmloyeesContainerOpen(!isEmloyeesContainerOpen);
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
          Информация о компании
        </Typography>
        <Box sx={{ alignSelf: 'center'}}>
          <Image
            src={
              company?.avatar
                ? `${apiUrl}${company.avatar}`
                : `/static/images/no-image.png`
            }
            alt="Company avatar"
          />
        </Box>
        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {id}
          </Typography>
          <Typography component="h3" variant="h5">
            Название: {company?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Дата основания: {moment(company?.age).format("DD.MM.YYYY")}
          </Typography>
          <Typography component="h3" variant="h5">
            Юридитеский адрес: {company?.location}
          </Typography>
          <Typography component="h3" variant="h5">
            Количество сотрудников: {company?.employees_count}
          </Typography>
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
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={onOpenEmployeesContainer}
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '50%', alignSelf: 'center' }}
        >
          Показать/Скрыть сотрудников
        </Button>
      </Box>
      {isModalOpen && company && <CompanyModal isModalOpen={isModalOpen} company={company} setModalOpen={setModalOpen} type='update' mutationFunction={updateCompany} />}
      {isEmloyeesContainerOpen  && <EmployeesContainer />}
    </Container>
  );
};

export default Company;
