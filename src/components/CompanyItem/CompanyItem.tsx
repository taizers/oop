
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
import { Button } from '@mui/material';

type CompanyItemType = {
  company: CompanyType;
  hasLink?: boolean;
  deleteFunction: (id: number) => void;
  userId: string | undefined | number;
};

const CompanyItem: FC<CompanyItemType> = ({company, hasLink = true, deleteFunction, userId}) => {
  let history = useNavigate();
  const { id, avatar, name, age, location, employees_count } = company;

  const onItemClick = () => {
    hasLink && history(`/companies/${id}`);
  };

  const onDelete = (evt: any, id: number) => {
    evt.stopPropagation();
    deleteFunction(id)
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
          alt="Company avatar"
        />
      </StyledListItemAvatar>
      <ListItemText
        sx={{
          ml: 1,
          '@media (max-width: 900px)': {
            alignSelf: 'center'
          } 
        }}
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
              Количество сотрудников: {employees_count || 0}
            </Typography>
            {userId && <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={(evt) => onDelete(evt, id)}
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

export default CompanyItem;
