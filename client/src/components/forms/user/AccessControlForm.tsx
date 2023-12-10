import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { AccessTypes, UpdateUserAccess } from '../../../services/UserServices';
import { Button, Checkbox, CircularProgress, Stack, Box, Typography } from '@mui/material'
import { queryClient } from '../../../main';
import { BackendError } from '../../..';
import AlertBar from '../../snacks/AlertBar';
import { IUser } from '../../../types/user.types';
import { STable, STableBody, STableCell, STableHead, STableRow } from '../../styled/Table';


function AccessControlForm({ user }: { user: IUser }) {
    const { setChoice } = useContext(ChoiceContext)
    const [AccessFields, setAccessFields] = useState<AccessTypes>({
        user_access_fields: user.user_access_fields,
        crm_access_fields: user.crm_access_fields,
        report_access_fields: user.report_access_fields,
        backup_access_fields: user.backup_access_fields,
        company_access_fields: user.company_access_fields
    })
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<any>, BackendError, {
            id: string, access_fields: AccessTypes
        }>
        (UpdateUserAccess, {
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        })


    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: UserChoiceActions.close_user })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <>

            <Box sx={{
                overflow: "scroll",
                height: '73.5vh',
            }}>
                <STable
                >
                    <STableHead
                    >
                        <STableRow>
                            <STableCell
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Feature
                                </Stack>
                            </STableCell>

                            <STableCell
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Editor
                                </Stack>
                            </STableCell>

                            <STableCell
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Hidden
                                </Stack>
                            </STableCell>

                            <STableCell
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Delete
                                </Stack>
                            </STableCell>

                            {/* visitin card */}
                        </STableRow>
                    </STableHead>
                    <STableBody >
                        {/* user access fields */}
                        <STableRow
                        >

                            <STableCell                 >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <Typography variant="button">Users
                                    </Typography>
                                </Stack>
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.user_access_fields.is_editable)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            user_access_fields: {
                                                is_editable: Boolean(!AccessFields.user_access_fields.is_editable),
                                                is_hidden: Boolean(AccessFields.user_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.user_access_fields.is_deletion_allowed),
                                            }
                                        })}
                                    disabled={user.created_by._id === user._id}

                                />
                            </STableCell>

                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.user_access_fields.is_hidden)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            user_access_fields: {
                                                is_editable: Boolean(AccessFields.user_access_fields.is_editable),
                                                is_hidden: Boolean(!AccessFields.user_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.user_access_fields.is_deletion_allowed),
                                            }
                                        })}
                                    disabled={user.created_by._id === user._id}

                                />
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.user_access_fields.is_deletion_allowed)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            user_access_fields: {
                                                is_editable: Boolean(AccessFields.user_access_fields.is_editable),
                                                is_hidden: Boolean(AccessFields.user_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(!AccessFields.user_access_fields.is_deletion_allowed),
                                            }
                                        })}
                                    disabled={user.created_by._id === user._id}
                                />
                            </STableCell>
                        </STableRow>
                        {/* company access fields */}
                        {user.is_crm_admin &&
                            < STableRow
                            >

                                <STableCell                 >
                                    <Stack
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"
                                        spacing={2}
                                    >
                                        <Typography variant="button">company
                                        </Typography>
                                    </Stack>
                                </STableCell>
                                <STableCell>
                                    <Checkbox size="small" checked={Boolean(AccessFields.company_access_fields.is_editable)}
                                        onChange={() => setAccessFields(
                                            {
                                                ...AccessFields,
                                                company_access_fields: {
                                                    is_editable: Boolean(!AccessFields.company_access_fields.is_editable),

                                                    is_hidden: Boolean(AccessFields.company_access_fields.is_hidden),
                                                    is_deletion_allowed: Boolean(AccessFields.company_access_fields.is_deletion_allowed),
                                                }
                                            })}

                                    />
                                </STableCell>

                                <STableCell>
                                    <Checkbox size="small" checked={Boolean(AccessFields.company_access_fields.is_hidden)}
                                        onChange={() => setAccessFields(
                                            {
                                                ...AccessFields,
                                                company_access_fields: {
                                                    is_editable: Boolean(AccessFields.company_access_fields.is_editable),

                                                    is_hidden: Boolean(!AccessFields.company_access_fields.is_hidden),
                                                    is_deletion_allowed: Boolean(AccessFields.company_access_fields.is_deletion_allowed),
                                                }
                                            })}

                                    />
                                </STableCell>
                                <STableCell>
                                    <Checkbox size="small" checked={Boolean(AccessFields.company_access_fields.is_deletion_allowed)}
                                        onChange={() => setAccessFields(
                                            {
                                                ...AccessFields,
                                                company_access_fields: {
                                                    is_editable: Boolean(AccessFields.company_access_fields.is_editable),

                                                    is_hidden: Boolean(AccessFields.company_access_fields.is_hidden),
                                                    is_deletion_allowed: Boolean(!AccessFields.company_access_fields.is_deletion_allowed),
                                                }
                                            })}

                                    />
                                </STableCell>





                            </STableRow>}
                        {/* crm access fields */}
                        <STableRow
                        >
                            <STableCell                 >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <Typography variant="button">crm
                                    </Typography>
                                </Stack>
                            </STableCell>


                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.crm_access_fields.is_editable)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            crm_access_fields: {
                                                is_editable: Boolean(!AccessFields.crm_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.crm_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.crm_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>

                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.crm_access_fields.is_hidden)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            crm_access_fields: {
                                                is_editable: Boolean(AccessFields.crm_access_fields.is_editable),

                                                is_hidden: Boolean(!AccessFields.crm_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.crm_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>

                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.crm_access_fields.is_deletion_allowed)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            crm_access_fields: {
                                                is_editable: Boolean(AccessFields.crm_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.crm_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(!AccessFields.crm_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>
                        </STableRow>

                        {/* report access fields */}
                        <STableRow
                        >

                            <STableCell                 >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <Typography variant="button">reports
                                    </Typography>
                                </Stack>
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.report_access_fields.is_editable)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            report_access_fields: {
                                                is_editable: Boolean(!AccessFields.report_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.report_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.report_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>

                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.report_access_fields.is_hidden)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            report_access_fields: {
                                                is_editable: Boolean(AccessFields.report_access_fields.is_editable),

                                                is_hidden: Boolean(!AccessFields.report_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.report_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.report_access_fields.is_deletion_allowed)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            report_access_fields: {
                                                is_editable: Boolean(AccessFields.report_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.report_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(!AccessFields.report_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>





                        </STableRow>
                        {/* backup access fields */}

                        <STableRow
                        >

                            <STableCell                 >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <Typography variant="button">backup
                                    </Typography>
                                </Stack>
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.backup_access_fields.is_editable)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            backup_access_fields: {
                                                is_editable: Boolean(!AccessFields.backup_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.backup_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.backup_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>

                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.backup_access_fields.is_hidden)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            backup_access_fields: {
                                                is_editable: Boolean(AccessFields.backup_access_fields.is_editable),

                                                is_hidden: Boolean(!AccessFields.backup_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(AccessFields.backup_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>
                            <STableCell>
                                <Checkbox size="small" checked={Boolean(AccessFields.backup_access_fields.is_deletion_allowed)}
                                    onChange={() => setAccessFields(
                                        {
                                            ...AccessFields,
                                            backup_access_fields: {
                                                is_editable: Boolean(AccessFields.backup_access_fields.is_editable),

                                                is_hidden: Boolean(AccessFields.backup_access_fields.is_hidden),
                                                is_deletion_allowed: Boolean(!AccessFields.backup_access_fields.is_deletion_allowed),
                                            }
                                        })}

                                />
                            </STableCell>





                        </STableRow>

                    </STableBody>
                </STable>
            </Box >
            {/* user access fields */}


            {
                isError ? (
                    <AlertBar message={error?.response.data.message} color="error" />
                ) : null
            }
            {
                isSuccess ? (
                    <AlertBar message="   Access For selected user updated successfully" color="success" />
                ) : null
            }
            <Stack gap={2}>
                <Button fullWidth variant="contained" color="primary"
                    onClick={() => {
                        mutate({ id: user._id, access_fields: AccessFields })
                    }}

                >
                    {isLoading ? <CircularProgress /> :
                        "Save"}
                </Button>
                <Button fullWidth size={"small"} variant="outlined" color="primary"
                    onClick={() => {
                        setChoice({ type: UserChoiceActions.close_user })
                    }}

                >
                    {isLoading ? <CircularProgress /> :
                        "Cancel"}
                </Button>
            </Stack>
        </>
    )
}

export default AccessControlForm