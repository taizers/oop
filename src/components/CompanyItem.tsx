import React, { FC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

type CompanyItemType = {
    company: any;
};

const CompanyItem: FC<CompanyItemType> = ({company}) => {
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
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {company?.id}
          </Typography>
          <Typography component="h3" variant="h5">
            Почта: {company?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Имя: {company?.age}
          </Typography>
          {company?.deleted_at && <Typography component="h3" variant="h5">
            Удалена
          </Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyItem;
