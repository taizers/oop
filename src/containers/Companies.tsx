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

import { CompanyType } from '../types/entities';
import { defaultLimit, defaultStartPage } from '../constants/constants';
import { useDebounce, useShowErrorToast } from '../hooks';
import CompanyItem from '../components/CompanyItem/CompanyItem';
import { companiesApiSlice } from '../store/reducers/CompaniesApiSlice';
import CompanyModal from './CompanyModal';

const Companies: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(defaultStartPage);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const debouncedValue = useDebounce(query);

  const [createCompany, { data: createdData, error: creatingError, isLoading: creatingIsLoading }] = companiesApiSlice.useCreateCompanyMutation();

  // const [queryType, setQueryType] = useState('');
  const {
    data: companies,
    error,
    isLoading,
  } = companiesApiSlice.useGetCompaniesQuery({
    page,
    limit,
    query: debouncedValue,
  });

  useShowErrorToast(error);
  useShowErrorToast(creatingError);

  const companiesCount = companies?.companies?.length;

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

  const onOpenModal = () => {
    setModalOpen(true)
  };

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
        {companiesCount && (
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
            {companies.companies?.map((company: CompanyType, index: number) => (
              <CompanyItem company={company} key={`company ${index}`} />
            ))}
          </List>
        )}
        {!companiesCount && (
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
        {companiesCount && (
          <Pagination
            count={companies?.totalPages}
            color="primary"
            defaultPage={1}
            boundaryCount={2}
            page={page + 1}
            onChange={onPaginationChange}
          />
        )}
      </Box>
      {isModalOpen && <CompanyModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} type='create' mutationFunction={createCompany} />}
    </Box>
  );
};

export default Companies;
