import React, { FC, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UpdateUserModal from '../containers/UserModal';
import { useAppSelector, useShowErrorToast } from '../hooks';
import { usersApiSlice } from '../store/reducers/UsersApiSlice';
import { Button } from '@mui/material';
import moment from 'moment';

const Profile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [updateUser, { data, error, isLoading }] =
  usersApiSlice.useUpdateUserMutation();

  useShowErrorToast(error);

  const onOpenModal = () => {
    setModalOpen(true)
  };

  useEffect(() => {
    if (data) {
      setModalOpen(false);
    }
  }, [data]);

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
          Личный кабинет
        </Typography>
        <Avatar sx={{ m: 4, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" sx={{ mt: 1 }}>
          <Typography component="h3" variant="h5">
            ID: {user?.id}
          </Typography>
          <Typography component="h3" variant="h5">
            Почта: {user?.email}
          </Typography>
          <Typography component="h3" variant="h5">
            Имя: {user?.name}
          </Typography>
          <Typography component="h3" variant="h5">
            Дата создания: {moment(user?.created_at).format("DD.MM.YYYY HH:mm:ss")}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onOpenModal}
          >
            Редактировать профиль
          </Button>
        </Box>
        {isModalOpen && user && <UpdateUserModal user={user} isModalOpen={isModalOpen} setModalOpen={setModalOpen} type='update' mutationFunction={updateUser} />}
      </Box>
    </Container>
  );
};

export default Profile;
