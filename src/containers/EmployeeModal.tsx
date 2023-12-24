import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EmployeeType } from '../types/entities';
import { separtor } from '../constants/constants';
import SelectField from '../components/SelectField';
import DatePicker from '../components/DatePicker';

type EmployeeModalType = {
  employee?: EmployeeType;
  type: 'update' | 'create';
  mutationFunction: (data:unknown) => void;
  setModalOpen: (data:boolean) => void;
  isModalOpen: boolean;
};

const EmployeeModal: FC<EmployeeModalType> = ({ employee, type, mutationFunction, setModalOpen, isModalOpen }) => {
  const [name, setName] = useState<string | null>(employee?.name || null);
  const [adress, setAdress] = useState<string | null>(employee?.adress || null);
  const [courses, setCourses] = useState<Array<string> | null>(employee?.courses?.split(separtor) || null);
  const [foreignLevel, setForeignLevel] = useState<Array<string> | null>(employee?.foreign_level?.split(separtor) || null);
  const [education, setEducation] = useState<Array<string> | null>(employee?.education?.split(separtor) || null);
  const [age, setAge] = useState<Date | null>(employee?.age || null);

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmitForm = () => {
    if (!name || !adress || !courses || !foreignLevel || !education || !age) {
      console.log('Вы заполнили не все поля');
    }

    const newEmployee = {
      name,
      adress,
      courses: courses?.join(separtor),
      foreign_level: foreignLevel?.join(separtor),
      education: education?.join(separtor),
      age,
    }

    console.log({ id: employee?.id, employee: newEmployee });

    if (type === 'create') {
      return mutationFunction(newEmployee);
    }
    
    if (type === 'update') {
      return mutationFunction({ id: employee?.id, employee: newEmployee });
    }
  };

  const getTitle = () => {
    if (type === 'create') {
      return 'Создать сотрудника';
    }

    if (type === 'update') {
      return 'Обновить информацио о сотруднике';
    }
  }

  return (
    <div>
      <Dialog open={isModalOpen} onClose={handleClose}>
        <DialogTitle>{getTitle()}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.name || ''}
            onChange={(evt) => setName(evt.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="adress"
            label="Адрес"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.adress || ''}
            onChange={(evt) => setAdress(evt.target.value)}
          />
          <SelectField values={courses} setValues={setCourses} label={'Курсы'}/>
          <SelectField values={education} setValues={setEducation} label={'Образование'}/>
          <SelectField values={foreignLevel} setValues={setForeignLevel} label={'Иностранные изыки'}/>
          <DatePicker value={age} setValue={setAge} label={'Дата рождения'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={onSubmitForm}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeModal;
