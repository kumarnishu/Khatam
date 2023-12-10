import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { AssignRefer } from '../../../services/CrmServices';
import { ChoiceContext, CrmChoiceActions } from '../../../contexts/dialogContext';
import { BackendError } from '../../..';
import { queryClient } from '../../../main';
import AlertBar from '../../snacks/AlertBar';
import { IUser } from '../../../types/user.types';
import { IReferredParty } from '../../../types/crm.types';


function AssignReferForm({ refer, users }: { refer: IReferredParty, users: IUser[] }) {
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            id: string, body: {
                lead_owners: string[]
            }
        }>
        (AssignRefer, {
            onSuccess: () => {
                queryClient.invalidateQueries('refers')
                queryClient.invalidateQueries('paginatedrefers')
                queryClient.invalidateQueries('customers')
                queryClient.invalidateQueries('uselessrefers')
            }
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<{
        lead_owners?: string[],
    }>({
        initialValues: {
            lead_owners: refer.lead_owners.map((owner) => {
                return owner._id
            }),
        },
        validationSchema: Yup.object({

            lead_owners: Yup.array()
                .required('Required field')
        }),
        onSubmit: (values: {
            lead_owners?: string[]
        }) => {
            mutate({
                id: refer._id,
                body: {
                    lead_owners: values.lead_owners || []
                }
            })
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: CrmChoiceActions.close_lead })
            }, 1000)
        }
    }, [isSuccess, setChoice])
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack
                gap={2}
                pt={2}
            >
                < TextField

                    select
                    SelectProps={{
                        native: true,
                        multiple: true
                    }}
                    focused
                    required
                    error={
                        formik.touched.lead_owners && formik.errors.lead_owners ? true : false
                    }
                    id="lead_owners"
                    label="Lead Owners"
                    fullWidth
                    helperText={
                        formik.touched.lead_owners && formik.errors.lead_owners ? formik.errors.lead_owners : ""
                    }
                    {...formik.getFieldProps('lead_owners')}
                >
                    {
                        refer.lead_owners.map(owner => {
                            return (<option key={owner._id} value={owner._id}>
                                {owner.username}
                            </option>)
                        })
                    }
                    {
                        users.map((user, index) => {
                            let referowners = refer.lead_owners.map(owner => {
                                return owner.username
                            })
                            if (!referowners.includes(user.username)) {
                                return (<option key={index} value={user._id}>
                                    {user.username}
                                </option>)
                            }
                            else return null
                        })
                    }
                </TextField>
                <Button variant="contained" color="primary" type="submit"
                    disabled={Boolean(isLoading)}
                    fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Assign"}
                </Button>
            </Stack>
            {
                isError ? (
                    <AlertBar message={error?.response.data.message} color="error" />
                ) : null
            }
            {
                isSuccess ? (
                    <AlertBar message="assigned successfully" color="success" />
                ) : null
            }

        </form>
    )
}

export default AssignReferForm
