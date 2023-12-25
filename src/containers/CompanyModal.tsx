import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CompanyType } from '../types/entities';
import DatePicker from '../components/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import UploadFile from '../components/UploadFile';

type CompanyModalType = {
  company?: CompanyType;
  type: 'update' | 'create';
  mutationFunction: (data:unknown) => void;
  setModalOpen: (data:boolean) => void;
  isModalOpen: boolean;
};

const CompanyModal: FC<CompanyModalType> = ({ company, type, mutationFunction, setModalOpen, isModalOpen }) => {
  const [name, setName] = useState<string | null>(company?.name || null);
  const [location, setLocation] = useState<string | null>(company?.location || null);
  const [scope, setScope] = useState<string | null>(company?.scope || null);
  const [ceo, setCeo] = useState<string | null>(company?.scope || null);
  const [age, setAge] = useState<Date | null | Dayjs>(company?.age || dayjs(Date.now()));
  const [avatar, setAvatar] = useState<any>(null);

  const handleClose = () => {
    setModalOpen(false);
  };

  const sendCompany = (newCompany: object | FormData) => {
    if (type === 'create') {
      return mutationFunction(newCompany);
    }
    
    if (type === 'update') {
      return mutationFunction({ id: company?.id, employee: newCompany });
    }
  }

  const onSubmitForm = () => {
    if (!name || !location || !scope || !ceo || !age) {
      return console.log('Вы заполнили не все поля');
    }

    if (avatar) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('avatar', avatar[0].file);
      formData.append('location', location);
      formData.append('scope', scope);
      formData.append('ceo', ceo);
      formData.append('age', age.toString());

      return sendCompany(formData);
    }
  
    const newCompany = {
      name,
      location,
      ceo,
      scope,
      age,
    }

    sendCompany(newCompany);
  };

  const getTitle = () => {
    if (type === 'create') {
      return 'Создать компанию';
    }

    if (type === 'update') {
      return 'Обновить информацио о компании';
    }
  }

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{getTitle()}</DialogTitle>
        <DialogContent>
          <UploadFile files={avatar} setFiles={setAvatar}/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={company?.name || ''}
            onChange={(evt) => setName(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="adress"
            label="Юридитеческий адрес"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={company?.location || ''}
            onChange={(evt) => setLocation(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="ceo"
            label="Руководитель"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={company?.ceo || ''}
            onChange={(evt) => setCeo(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="scope"
            label="Напрвление деятельности"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={company?.scope || ''}
            onChange={(evt) => setScope(evt.target.value)}
          />
          <DatePicker value={age} setValue={setAge} label={'Дата онования'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyModal;
