import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserType } from '../constants/tsSchemes';
import { createToast } from '../utils/toasts';

type UserModalType = {
  user?: UserType;
  type: 'update' | 'create';
  mutationFunction: (data:unknown) => void;
  setModalOpen: (data:boolean) => void;
  isModalOpen: boolean;
};

const UserModal: FC<UserModalType> = ({ user, isModalOpen, setModalOpen, mutationFunction, type='create' }) => {
  const [name, setName] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmitForm = () => {
    if ((!name || name === user?.name) && (!oldPassword || !newPassword)) {
      return createToast.error('Заполните все поля');
    }

    mutationFunction({ id: user?.id, user: { name, oldPassword, newPassword } });
  };

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{'Редактирование профиля'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.name || ''}
            onChange={(evt) => setName(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="oldPassword"
            label="Старый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={(evt) => setOldPassword(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="newPassword"
            label="Новый пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={(evt) => setNewPassword(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserModal;
