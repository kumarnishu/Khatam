import { Box, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import { ICompany } from '../../types/company.types'
import { STable, STableBody, STableCell, STableHead, STableHeadCell, STableRow } from '../styled/Table'

type Props = {
    company: ICompany | undefined,
    setCompany: React.Dispatch<React.SetStateAction<ICompany | undefined>>,
    selectAll: boolean,
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>,
    companies: ICompany[],
    selectedCompanies: ICompany[]
    setSelectedCompanies: React.Dispatch<React.SetStateAction<ICompany[]>>,
}

function CompaniesTable({ companies, setCompany, selectAll, setSelectAll, selectedCompanies, setSelectedCompanies }: Props) {
    const [data, setData] = useState<ICompany[]>(companies)

    useEffect(() => {
        setData(companies)
    }, [companies])

    return (
        <>
            <Box sx={{
                overflow: "scroll",
                maxHeight: '70vh'
            }}>
                <STable
                >
                    <STableHead
                    >
                        <STableRow>
                            <STableHeadCell
                            >

                                <Checkbox
                                    indeterminate={selectAll ? true : false}
                                    checked={Boolean(selectAll)}
                                    size="small" onChange={(e) => {
                                        if (e.currentTarget.checked) {
                                            setSelectedCompanies(companies)
                                            setSelectAll(true)
                                        }
                                        if (!e.currentTarget.checked) {
                                            setSelectedCompanies([])
                                            setSelectAll(false)
                                        }
                                    }} />

                            </STableHeadCell>

                            <STableHeadCell
                            >

                                Company

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Mobile

                            </STableHeadCell>

                            <STableHeadCell
                            >

                                Email

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Country

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Pincode

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Address

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Created At

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Updated At

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Created By

                            </STableHeadCell>
                            <STableHeadCell
                            >

                                Updated By

                            </STableHeadCell>
                        </STableRow>
                    </STableHead>

                    <STableBody >
                        {

                            data && data.map((company, index) => {
                                return (
                                    <STableRow
                                        key={index}
                                    >
                                        {selectAll ?

                                            <STableCell>


                                                <Checkbox size="small"
                                                    checked={Boolean(selectAll)}
                                                />


                                            </STableCell>
                                            :
                                            null
                                        }
                                        {!selectAll ?

                                            <STableCell>

                                                <Checkbox size="small"
                                                    onChange={(e) => {
                                                        setCompany(company)
                                                        if (e.target.checked) {
                                                            setSelectedCompanies([...selectedCompanies, company])
                                                        }
                                                        if (!e.target.checked) {
                                                            setSelectedCompanies((companies) => companies.filter((item) => {
                                                                return item._id !== company._id
                                                            }))
                                                        }
                                                    }}
                                                />

                                            </STableCell>

                                            :
                                            null
                                        }

                                        <STableCell>
                                            {company.name}
                                        </STableCell>
                                        <STableCell>
                                            {company.mobile}
                                        </STableCell>
                                        <STableCell>
                                            {company.email}
                                        </STableCell>
                                        <STableCell>
                                            {company.country}
                                        </STableCell>
                                        <STableCell>
                                            {company.address}
                                        </STableCell>
                                        <STableCell>
                                            {company.address}
                                        </STableCell>
                                        <STableCell>
                                            {new Date(company.created_at).toLocaleString()}
                                        </STableCell>
                                        <STableCell>
                                            {new Date(company.updated_at).toLocaleString()}
                                        </STableCell>
                                        <STableCell>
                                            {company.created_by.username}
                                        </STableCell>
                                        <STableCell>
                                            {company.updated_by.username}

                                        </STableCell>
                                    </STableRow>
                                )
                            })

                        }
                    </STableBody>
                </STable>
            </Box >

        </>

    )
}

export default CompaniesTable