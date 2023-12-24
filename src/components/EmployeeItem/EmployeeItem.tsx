import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Image from '../Image/Image';
import { EmployeeType } from '../../types/entities';
import { apiUrl, separtor } from '../../constants/constants';
import moment from 'moment';
import { StyledLink } from './styled';
import { Link } from 'react-router-dom';

type EmployeeItemType = {
  employee: EmployeeType;
};

const EmployeeItem: FC<EmployeeItemType> = ({ employee }) => {
  let history = useNavigate();

  const { id, avatar, name, age, education, foreign_level, company } = employee;

  const onItemClick = () => {
    history(`/employees/${id}`);
  }
  
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
      <ListItemAvatar sx={{
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
      </ListItemAvatar>
      <ListItemText
        sx={{ ml: 1 }}
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
              Компания: <Link to={`/companies/${company.id}`}>{company.name}</Link>
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
          </>
        }
      />
    </ListItem>
    
  );
};

export default EmployeeItem;
