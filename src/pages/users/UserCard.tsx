import { User } from '@edgeiq/edgeiq-api-js';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import useStyles from './styles'
import AccountIcon from '@mui/icons-material/AccountCircle';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user,
}) => {
  const { first_name, last_name, email } = user;
  const classes = useStyles();
  const avatarText = first_name.charAt(0) + last_name.charAt(0);

  const { userCompanies } = useAppSelector((state: RootState) => state.user)
  const company = userCompanies.find(
    (company) => (company._id === user.company_id)
  )
  

  return(
    <Box
      className={clsx(classes.cardContainer)}
    >
      <Typography
        variant="h1"
        component="div"
        noWrap
        className={clsx('loading-container', classes.avatarName)}
      >
        {avatarText}
      </Typography>
      <Typography
        component="div"
        variant='h5'
        className={clsx('mt-4', classes.name)}
      >
        {first_name} {last_name}
      </Typography>
      <Typography
        component="div"
        variant='h6'
        className={clsx(classes.email)}
      >
        {email}
      </Typography>
      <Typography
        component="div"
        variant="caption"
        className={clsx('px-2 py-1 br-1 mt-4', classes.role)}
      >
        System Admin
      </Typography>
      {company && (
        <Typography
          component="div"
          variant='overline'
          className={clsx('mt-4', classes.account)}
        >
          <AccountIcon />{company}
        </Typography>
      )}

    </Box>
  )
}

export default UserCard;
