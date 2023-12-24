import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

import { EmployeeType } from '../types/entities';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { employeesApiSlice } from '../store/reducers/EmployeesApiSlice';
import { useDebounce, useShowErrorToast } from '../hooks';
import EmployeeItem from '../components/EmployeeItem/EmployeeItem';
import EmployeeModal from './EmployeeModal';

const Employees: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce(query);

  const [createEmployee, { data: createdData, error: creatingError, isLoading: creatingIsLoading }] = employeesApiSlice.useCreateEmployeeMutation();
  const {
    data: employees,
    error,
    isLoading,
  } = employeesApiSlice.useGetEmployeesQuery({
    page,
    limit,
    query: debouncedValue,
  });

  useShowErrorToast(error);
  useShowErrorToast(creatingError);
  console.log(employees)

  const employeesCount = employees?.employees?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  useEffect(() => {
    if (createdData) {
      setModalOpen(false);
    }
  }, [createdData]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query);
    if (query) {
      setPage(defaultStartPage);
    }
  };

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (query) {
      window.scrollTo(0, 0);
    }
    setPage(value - 1);
  };

  const onOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1, display: 'flex' }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="query"
          label="Название"
          name="query"
          autoComplete="text"
          autoFocus
          onChange={(e: any) => setQuery(e.currentTarget.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%' }}
        >
          Найти
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={onOpenModal}
          sx={{ ml: 3, mt: '16px', mb: '8px', width: '20%' }}
        >
          Создать
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {employeesCount && (
          <List
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 2,
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            {employees.employees?.map((employee: EmployeeType, index: number) => (
              <EmployeeItem employee={employee} key={`employee ${index}`} />
            ))}
          </List>
        )}
        {!employeesCount && (
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              fontSize: 22,
            }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {'Нет данных'}
          </Typography>
        )}
        {employeesCount && (
          <Pagination
            count={employees.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
      </Box>
      {isModalOpen && <EmployeeModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} type='create' mutationFunction={createEmployee} />}
    </Box>
  );
};

export default Employees;
