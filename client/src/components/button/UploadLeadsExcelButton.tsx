import { AxiosResponse } from "axios"
import React from "react"
import { useMutation } from "react-query"
import { BackendError } from "../.."
import { Button, CircularProgress, Snackbar } from "@mui/material"
import ExportToExcel from "../../utils/ExportToExcel"
import { Upload } from "@mui/icons-material"
import { ILeadTemplate } from "../../types/crm.types"
import { BulkLeadUpdateFromExcel } from "../../services/CrmServices"
import { FileInput } from "../styled/FileInput"


function UploadLeadsExcelButton() {
    const [leads, setLeads] = React.useState<ILeadTemplate[]>()
    const { data, mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<ILeadTemplate[]>, BackendError, FormData>
        (BulkLeadUpdateFromExcel)
    const [file, setFile] = React.useState<File | null>(null)


    function handleFile() {
        if (file) {
            let formdata = new FormData()
            formdata.append('file', file)
            mutate(formdata)
        }
    }
    React.useEffect(() => {
        if (file) {
            handleFile()
        }
    }, [file])


    React.useEffect(() => {
        if (data) {
            setLeads(data.data)
        }
    }, [data, leads])

    React.useEffect(() => {
        if (isSuccess) {
            if (data.data.length > 0)
                ExportToExcel(data.data, "errors_leads_data")
        }
    }, [isSuccess])
    return (
        <>

            <Snackbar
                open={isSuccess}
                autoHideDuration={6000}
                onClose={() => setFile(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Uploaded Successfuly wait for some minutes"
            />

            <Snackbar
                open={isError}
                autoHideDuration={6000}
                onClose={() => setFile(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message={error?.response.data.message}
            />
            {
                isLoading ?
                    <CircularProgress color="success" size={"small"} />
                    :
                    <>
                        <Button
                            size="small"
                            component="label"
                        >
                            <Upload />
                            <FileInput
                                id="upload_input"
                                hidden
                                type="file"
                                name="file"
                                onChange={
                                    (e: any) => {
                                        if (e.currentTarget.files) {
                                            setFile(e.currentTarget.files[0])
                                        }
                                    }}>
                            </FileInput >
                        </Button>
                    </>
            }
        </>
    )
}

export default UploadLeadsExcelButton