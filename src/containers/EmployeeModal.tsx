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
import dayjs, { Dayjs } from 'dayjs';
import UploadFile from '../components/UploadFile';
import AutoCompleteComponent from '../components/AutoComplete';
import { companiesApiSlice } from '../store/reducers/CompaniesApiSlice';
import { useShowErrorToast } from '../hooks';
import { createToast } from '../utils/toasts';

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
  const [age, setAge] = useState<Date | null | Dayjs>(employee?.age || dayjs(Date.now()));
  const [avatar, setAvatar] = useState<any>(null);
  const [company, setCompany] = useState<any>(employee?.company ? {id: employee.company?.id, name: employee.company?.name} : null);

  const {
    data: companies,
    error,
    isLoading,
  } = companiesApiSlice.useGetAllCompaniesQuery('');

  useShowErrorToast(error);

  const handleClose = () => {
    setModalOpen(false);
  };

  const sendEmployee = (newEmployee: object | FormData) => {

    if (type === 'create') {
      return mutationFunction(newEmployee);
    };
    
    if (type === 'update') {
      return mutationFunction({ id: employee?.id, employee: newEmployee });
    };
  }

  const onSubmitForm = () => {
    if (!name || !adress || !courses || !foreignLevel || !education || !age) {
      return createToast.error('Заполните все поля');
    };

    if (avatar) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('avatar', avatar[0].file);
      formData.append('adress', adress);
      formData.append('courses', courses?.join(separtor));
      formData.append('foreign_level', foreignLevel?.join(separtor));
      formData.append('education', education?.join(separtor));
      formData.append('age', age.toString());

      if (company?.id) {
        formData.append('company_id', company?.id);
      }
      

      return sendEmployee(formData);
    };

    const company_id = company?.id;
  
    const newEmployee = {
      name,
      adress,
      courses: courses?.join(separtor),
      foreign_level: foreignLevel?.join(separtor),
      education: education?.join(separtor),
      age,
      company_id,
    };

    sendEmployee(newEmployee);
  };

  const getTitle = () => {
    if (type === 'create') {
      return 'Создать сотрудника';
    }

    if (type === 'update') {
      return 'Обновить информацио о сотруднике';
    }
  };

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
          <AutoCompleteComponent options={companies} value={company} setValue={setCompany} label={'Компания'} />
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
