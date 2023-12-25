
import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { StyledListItemAvatar } from './styled';
import Image from '../Image/Image';
import { CompanyType } from '../../types/entities';
import { apiUrl } from '../../constants/constants';

type CompanyItemType = {
  company: CompanyType;
  hasLink?: boolean;
};

const CompanyItem: FC<CompanyItemType> = ({company, hasLink = true}) => {
  let history = useNavigate();
  const { id, avatar, name, age, location, employees_count } = company;

  const onItemClick = () => {
    hasLink && history(`/companies/${id}`);
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
          alt="Company avatar"
        />
      </StyledListItemAvatar>
      <ListItemText
        sx={{ ml: 1 }}
        primary={`Название: ${name}`}
        secondary={
          <>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'date'}
            >
              Дата основания компании: {moment(age).format("DD.MM.YYYY")}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'adress'}
            >
              Юридитеский адрес: {location}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'employees count'}
            >
              Количество сотрудников: {employees_count}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default CompanyItem;
