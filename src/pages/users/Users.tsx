/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Users, UserTypes, UserType, User, Company } from '@edgeiq/edgeiq-api-js';
import Header from "../../components/Header";
import UserCard from './UserCard';
import CardsGrid from "../../components/CardsGrid";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAlert } from "../../redux/reducers/alert.reducer";
import { errorHighlight } from "../../app/constants";
import Card from "../../components/Card";
import { RootState } from "../../redux/store";

const UsersPage: React.FC = () => {
  // const classes = useStyles();
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  const dispatchError = (errorMessage: string): void => {
    dispatch(
      setAlert({
        type: 'error',
        highlight: errorHighlight,
        message: errorMessage,
      }),
    );
  };

  const getUsers = (pageNumber: number /* addPage = false */): void => {
    Users.list({}, { page: pageNumber, itemsPerPage: 10})
      .then((result) => {
        setUsers(result.users);
      })
      .catch((error) => {
        dispatchError(error.message);
      })
      .finally(() => (setLoading(false)));
  }

  useEffect(() => {
    setLoading(true);
    getUsers(1);

  }, []);

  const generateCards = (): JSX.Element[] => {
    return users.map((user) => (
      <Card 
        checked={false}
        checkboxCallback={(cardId: string) => (): void => {}}
        id=""
        baseLink="./users"
        content={
          <UserCard
            user={user}
          />
        }
      />      
    ))
  }

  return (
    <Grid container direction="column" spacing={0}>
      <Header 
        title="Users"
        link="New User"
        actionLabel="Create New User"
        model="user"
      />
      {loading ? (
        <Grid container className="loading-container">
          <CircularProgress size={75} thickness={5} />
        </Grid>
      ) : (
        <CardsGrid
          cards={generateCards()}
        />
      )}
    </Grid>
  )
}

export default UsersPage;
