import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useParams } from 'react-router-dom';

import { StyledListItemAvatar } from './styled';
import Image from '../Image/Image';
import { BookType } from '../../constants/tsSchemes';
import { usersApiSlice } from '../../store/reducers/UsersApiSlice';

type CompanyType = {
  book: BookType;
};

const Company: FC = () => {
  const { id } = useParams();
  const { data: company, error, isLoading } = usersApiSlice.useGetUserQuery(id);

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
            company.avatar
              ? `http://flibusta.site/${company.avatar}`
              : `/static/images/no-image.png`
          }
          alt="Company avatar"
        />
      </StyledListItemAvatar>
      <ListItemText
        sx={{ ml: 1 }}
        primary={company.name}
        secondary={
          <>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'author title'}
            >
              Дата основания компании: {company.age}
            </Typography>
            <Typography
              sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}
              component="span"
              variant="body2"
              color="text.primary"
              key={'cotegory title'}
            >
              Основатель: {company.creator}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default Company;
