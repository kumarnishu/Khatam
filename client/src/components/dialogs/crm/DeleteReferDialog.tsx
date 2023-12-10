import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress,  IconButton } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { CrmChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import {  DeleteReferParty } from '../../../services/CrmServices';
import { BackendError } from '../../..';
import { queryClient } from '../../../main';
import { IReferredParty } from '../../../types/crm.types';
import { Cancel } from '@mui/icons-material';
import AlertBar from '../../snacks/AlertBar';


function DeleteReferDialog({ refer }: { refer: IReferredParty }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, { id: string }>
        (DeleteReferParty, {
            onSuccess: () => {
                queryClient.invalidateQueries('leads')
                queryClient.invalidateQueries('customers')
                queryClient.invalidateQueries('uselessleads')
            }
        })

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: CrmChoiceActions.close_lead })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog  open={choice === CrmChoiceActions.delete_refer? true : false}
        >
            <IconButton style={{ display: 'inline-block', position: 'absolute', right: '0px' }} color="error" onClick={() => setChoice({ type: CrmChoiceActions.close_lead })}>
                <Cancel fontSize='large' />
            </IconButton>
            <DialogTitle sx={{ minWidth: '350px' }} textAlign="center">
                Delete Refer
            </DialogTitle>
            {
                isError ? (
                    <AlertBar message={error?.response.data.message} color="error" />
                ) : null
            }
            {
                isSuccess ? (
                    <AlertBar message="deleted refer" color="success" />
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                    {`Warning ! This will remove referral for ${refer.name}`}

                </Typography>
            </DialogContent>
            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <Button fullWidth variant="outlined" color="error"
                    onClick={() => {
                        setChoice({ type: CrmChoiceActions.delete_refer })
                        mutate({ id: refer._id })
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Delete"}
                </Button>
            </Stack >
        </Dialog >
    )
}

export default DeleteReferDialog
