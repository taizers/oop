import React, { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { EmployeeType } from '../types/entities';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { employeesApiSlice } from '../store/reducers/EmployeesApiSlice';
import { useAppSelector, useDebounce, useShowErrorToast } from '../hooks';
import EmployeeItem from '../components/EmployeeItem/EmployeeItem';
import { useParams } from 'react-router';

const EmployeesContainer: FC = () => {
  const { id } = useParams();
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const debouncedValue = useDebounce(query);

  const { user } = useAppSelector((state) => state.auth);

  const {
    data: employees,
    error
  } = employeesApiSlice.useGetEmployeesQuery({
    page,
    limit,
    query: debouncedValue,
    company: id,
  });

  const [updateEmployee, { error: deletingError }] = employeesApiSlice.useUpdateEmployeeMutation();

  useShowErrorToast(error);
  useShowErrorToast(deletingError);

  const employeesCount = employees?.employees?.length;

  useEffect(() => {
    if (query) {
      setPage(defaultStartPage);
    }
  }, [query]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  const deleteEmployeeFromCompany = (id: number) => {
    const employee = {company_id: null};

    updateEmployee({employee, id});
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
          fullWidth
          id="query"
          label="Поиск"
          name="query"
          autoComplete="text"
          autoFocus
          onChange={(e: any) => setQuery(e.currentTarget.value)}
        />
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
              <EmployeeItem hasLink={false} employee={employee} key={`employee ${index}`} deleteFunction={deleteEmployeeFromCompany} userId={user?.id} />
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
    </Box>
  );
};

export default EmployeesContainer;
