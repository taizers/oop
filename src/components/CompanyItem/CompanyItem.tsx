
import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { StyledListItemAvatar } from './styled';
import Image from '../Image/Image';
import { CompanyType } from '../../types/entities';
import { apiUrl } from '../../constants/constants';

type CompanyItemType = {
  company: CompanyType;
};

const CompanyItem: FC<CompanyItemType> = ({company}) => {
  const { avatar, name, age, location } = company;

  return (
    <ListItem
      sx={{ 
        flexGrow: 1,
        flexBasis: 500,
        bgcolor: '#cad2de',
        display: 'flex',
        justifySelf: 'center'
      }}
    >
      <StyledListItemAvatar>
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
              Дата основания компании: {age}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'cotegory title'}
            >
              Адрес: {location}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default CompanyItem;
