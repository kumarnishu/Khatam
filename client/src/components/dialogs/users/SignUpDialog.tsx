import { Dialog, DialogContent, DialogTitle, Typography, Stack, IconButton } from '@mui/material';
import { useContext } from 'react';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import SignUpForm from '../../forms/user/SignUpForm';
import { Cancel } from '@mui/icons-material';

function SignUpDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog fullWidth open={choice === UserChoiceActions.signup ? true : false} scroll="paper"
      >
        <IconButton style={{ display: 'inline-block', position: 'absolute', right: '0px' }} color="error" onClick={() => setChoice({ type: UserChoiceActions.close_user })}>
          <Cancel fontSize='large' />
        </IconButton>

        <DialogTitle textAlign={"center"}>Signup for New Company & its Owner</DialogTitle>
        <DialogContent>
          <SignUpForm />
        </DialogContent>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={1}
          direction={"row"}
          sx={{ backgroundColor: "lightgrey" }}
        >
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            component="span"
            onClick={() => setChoice({ type: UserChoiceActions.close_user })}
          >
            <b>Close</b>
          </Typography >
          {" or "}
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            component="span"
            onClick={() => setChoice({ type: UserChoiceActions.reset_password_mail })}
          >
            Forgot Password
          </Typography >

        </Stack>
      </Dialog>
    </>
  )
}

export default SignUpDialog