import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Image from '../Image/Image';
import { StyledListItemAvatar } from './styled';
import { EmployeeType } from '../../types/entities';
import { apiUrl, separtor } from '../../constants/constants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

type EmployeeItemType = {
  employee: EmployeeType;
  hasLink?: boolean;
  deleteFunction: (id: number) => void;
  userId: string | undefined | number;
};

const EmployeeItem: FC<EmployeeItemType> = ({ employee, hasLink = true, deleteFunction, userId }) => {
  let history = useNavigate();

  const { id, avatar, name, age, education, foreign_level, company } = employee;

  const onItemClick = () => {
    hasLink && history(`/employees/${id}`);
  };
  
  return (
    <ListItem
      alignItems="flex-start"
      onClick={onItemClick}
      sx={{ 
        maxWidth: 500, 
        bgcolor: '#f0f0fc',
         mb: 1,
        '@media (max-width: 900px)': {
          flexDirection: 'column'
        }  
        }}
    >
      <StyledListItemAvatar sx={{
        '@media (max-width: 900px)': {
          alignSelf: 'center'
        } 
      }}>
        <Image
          src={
            avatar
              ? `${apiUrl}${avatar}`
              : `/static/images/no-image.png`
          }
          alt="Employee avatar"
        />
      </StyledListItemAvatar>
      <ListItemText
        sx={{
          ml: 1,
          '@media (max-width: 900px)': {
            alignSelf: 'center'
          } 
        }}
        primary={`ФИО: ${name}`}
        secondary={
          <>
            {company && <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'company title'}
            >
              Компания: <Link to={`/companies/${company.id}`}>{<Typography component="span" color="blue" >{company.name}</Typography>}</Link>
            </Typography>}
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'education title'}
            >
              Образование:
            </Typography>
            {education.split(separtor).map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.primary"
                key={`education ${index}`}
              >
                {item}
              </Typography>
            ))}
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'age title'}
            >
              Дата рождения: {moment(age).format("DD.MM.YYYY")}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'lang title'}
            >
              Иностранные языки:
            </Typography>
            {foreign_level.split(separtor).map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.primary"
                key={`lang ${index}`}
              >
                {item}
              </Typography>
            ))}
            {userId && <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => deleteFunction(id)}
              sx={{ width: '100%', mt: 2 }}
            >
              Удалить
            </Button>}
          </>
        }
      />
    </ListItem>
    
  );
};

export default EmployeeItem;
