import React, { useEffect, useState } from 'react';
import SERVER_URL from '../../Constant';
import { getToken } from '../../auth';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cohortName', headerName: 'Cohort', width: 130 },
];

const Cohort = () => {
    const token = getToken();
    const [cohorts, setCohorts] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Giá trị mặc định

    const getCohorts = async () => {
        try {
            const response = await fetch(SERVER_URL + '/get-all-cohort', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pageIndex: pageIndex, // Dùng state thay vì cố định 0
                    pageSize: pageSize,
                    keyword: "",
                    displayActiveItem: false
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cohorts');
            }

            const data = await response.json();
            setCohorts(data.data);
        } catch (error) {
            console.error('Error fetching cohorts:', error);
        }
    };

    // Gọi API mỗi khi pageIndex, pageSize hoặc token thay đổi
    useEffect(() => {
        if (token) {
            getCohorts();
        }
    }, [token, pageIndex, pageSize]);

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={cohorts}
                columns={columns}
                paginationModel={{ page: pageIndex, pageSize: pageSize }}
                onPaginationModelChange={(params) => {
                    setPageIndex(params.page);
                    setPageSize(params.pageSize);
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default Cohort;
