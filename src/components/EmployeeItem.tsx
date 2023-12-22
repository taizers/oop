import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

import Image from './Image/Image';
import { EmployeeType } from '../types/entities';
import { apiUrl, separtor } from '../constants/constants';

type EmployeeItemType = {
  employee: EmployeeType;
};

const EmployeeItem: FC<EmployeeItemType> = ({ employee }) => {
  const { avatar, name, age, education, foreign_level } = employee;

  return (
    <ListItem
      alignItems="flex-start"
      sx={{ maxWidth: 500, bgcolor: '#cad2de', mb: 1 }}
    >
      <ListItemAvatar>
        <Image
          src={
            avatar
              ? `${apiUrl}${avatar}`
              : `/static/images/NoCover.jpg`
          }
          alt="Employee avatar"
        />
      </ListItemAvatar>
      <ListItemText
        sx={{ ml: 1 }}
        primary={name}
        secondary={
          <>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'author title'}
            >
              Образование:
            </Typography>
            {education.split(separtor).map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.primary"
                key={`author ${index}`}
              >
                {item}
              </Typography>
            ))}
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'cotegory title'}
            >
              Дата рождения: {age}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'cotegory title'}
            >
              Иностранные языки:
            </Typography>
            {foreign_level.split(separtor).map((item, index) => (
              <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                component="span"
                variant="body2"
                color="text.primary"
                key={`author ${index}`}
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
