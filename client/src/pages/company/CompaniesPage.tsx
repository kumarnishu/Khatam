import { Search } from '@mui/icons-material'
import { Fade, IconButton, LinearProgress, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { FuzzySearchCompanies, GetPaginatedCompanies } from '../../services/CompanyServices'
import CompaniesTable from '../../components/tables/CompaniesTable'
import { BackendError } from '../..'
import ExportToExcel from '../../utils/ExportToExcel'
import { Menu as MenuIcon } from '@mui/icons-material';
import AlertBar from '../../components/snacks/AlertBar'
import { ICompany } from '../../types/company.types'
import DBPagination from '../../components/pagination/DBpagination'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import { UserContext } from '../../contexts/userContext'



type SelectedData = {
  _id: string,
  name: string,
  email: string,
  mobile: string,
  pincode: string,
  address: string
  country: string,
  created_at: Date,
  updated_at: Date,
  created_by: string,
  updated_by: string

}

// react component
export default function CompaniesPage() {
  const [paginationData, setPaginationData] = useState({ limit: 100, page: 1, total: 1 });
  const { user: loggedInCompany } = useContext(UserContext)
  const [company, setCompany] = useState<ICompany>()
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const MemoData = React.useMemo(() => companies, [companies])
  const [preFilteredData, setPreFilteredData] = useState<ICompany[]>([])
  const [preFilteredPaginationData, setPreFilteredPaginationData] = useState({ limit: 100, page: 1, total: 1 });
  const [selectedCompanies, setSelectedCompanies] = useState<ICompany[]>([])
  const [filter, setFilter] = useState<string | undefined>()
  const [selectedData, setSelectedData] = useState<SelectedData[]>([])
  const [sent, setSent] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filterCount, setFilterCount] = useState(0)
  const { data, isLoading } = useQuery<AxiosResponse<{ companies: ICompany[], page: number, total: number, limit: number }>, BackendError>(["companies", paginationData], async () => GetPaginatedCompanies({ limit: paginationData?.limit, page: paginationData?.page }))

  const { data: fuzzycompanies, isLoading: isFuzzyLoading, refetch: refetchFuzzy } = useQuery<AxiosResponse<{ companies: ICompany[], page: number, total: number, limit: number }>, BackendError>(["fuzzycompanies", filter], async () => FuzzySearchCompanies({ searchString: filter, limit: paginationData?.limit, page: paginationData?.page }), {
    enabled: false
  })

  function handleExcel() {
    setAnchorEl(null)
    try {
      if (selectedData.length === 0)
        return alert("please select some rows")
      ExportToExcel(selectedData, "companies_data")
      setSent(true)
      setSelectAll(false)
      setSelectedData([])
      setSelectedCompanies([])
    }
    catch (err) {
      console.log(err)
      setSent(false)
    }

  }

  useEffect(() => {
    let data: SelectedData[] = []
    selectedCompanies.map((company) => {
      return data.push({
        _id: company._id,
        name: company.name,
        email: company.email,
        mobile: company.mobile,
        pincode: company.pincode,
        address: company.address,
        country: company.country,
        created_at: company.created_at,
        updated_at: company.updated_at,
        updated_by: company.updated_by.username,
        created_by: company.created_by.username,
      })
    })
    setSelectedData(data)
  }, [selectedCompanies])

  useEffect(() => {
    if (!filter) {
      setCompanies(preFilteredData)
      setPaginationData(preFilteredPaginationData)
    }
  }, [filter])

  useEffect(() => {
    if (filter) {
      refetchFuzzy()
    }
  }, [paginationData])

  useEffect(() => {
    if (data && !filter) {
      setCompanies(data.data.companies)
      setPreFilteredData(data.data.companies)
      setPreFilteredPaginationData({
        ...paginationData,
        page: data.data.page,
        limit: data.data.limit,
        total: data.data.total
      })
      setPaginationData({
        ...paginationData,
        page: data.data.page,
        limit: data.data.limit,
        total: data.data.total
      })
    }
  }, [data])

  useEffect(() => {
    if (fuzzycompanies && filter) {
      setCompanies(fuzzycompanies.data.companies)
      let count = filterCount
      if (count === 0)
        setPaginationData({
          ...paginationData,
          page: fuzzycompanies.data.page,
          limit: fuzzycompanies.data.limit,
          total: fuzzycompanies.data.total
        })
      count = filterCount + 1
      setFilterCount(count)
    }
  }, [fuzzycompanies])

  return (
    <>
      {
        isLoading && <LinearProgress />
      }
      {
        isFuzzyLoading && <LinearProgress />
      }
      {/*heading, search bar and table menu */}
      <Stack
        spacing={2}
        padding={1}
        direction="row"
        justifyContent="space-between"
        width="100vw"
      >
        <Typography
          variant={'h6'}
          component={'h1'}
          sx={{ pl: 1 }}
        >
          Companies
        </Typography>

        <Stack
          direction="row"
        >
          {/* search bar */}
          < Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              onChange={(e) => {
                setFilter(e.currentTarget.value)
                setFilterCount(0)
              }}

              placeholder={`${MemoData?.length} records...`}
              style={{
                fontSize: '1.1rem',
                border: '0',
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  refetchFuzzy()
                }
              }}
            />
            <IconButton
              sx={{ bgcolor: 'whitesmoke' }}
              onClick={() => {
                refetchFuzzy()
              }}
            >
              <Search />
            </IconButton>
          </Stack >
          {/* company menu */}
          <>
            {sent && <AlertBar message="File Exported Successfuly" color="success" />}
            <IconButton size="small" color="primary"
              onClick={(e) => setAnchorEl(e.currentTarget)
              }
              sx={{ border: 2, borderRadius: 3, marginLeft: 1 }}
            >
              <MenuIcon />
            </IconButton>

            {
              loggedInCompany?.company_access_fields.is_editable && < Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)
                }
                TransitionComponent={Fade}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
              </Menu>}
          </>
        </Stack>
      </Stack >



      {/*  table */}
      {isLoading && <TableSkeleton />}
      {
        !isLoading &&
        <CompaniesTable
          company={company}
          selectAll={selectAll}
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies}
          setSelectAll={setSelectAll}
          companies={MemoData}
          setCompany={setCompany}
        />
      }
      <DBPagination paginationData={paginationData} setPaginationData={setPaginationData} setFilterCount={setFilterCount} />
    </>

  )

}

