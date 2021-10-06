import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import * as agGrid from 'ag-grid-community';
import axios from "axios";

const columnDefs = [
    {field: 'athlete'},
    {field: 'age'},
    {field: 'country'},
    {field: 'gold'},
    {field: 'silver'},
    {field: 'bronze'}
];

const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        flex: 1
    },
    rowData: undefined,
    rowModelType: 'serverSide',
    serverSideStoreType: 'partial',
    onGridReady: onGridReady
};

const eGridDiv = document.querySelector('#myGrid');
new agGrid.Grid(eGridDiv, gridOptions);

function onGridReady(params) {
    params.api.setServerSideDatasource({
        getRows(params) {
            axios({
                method: 'get',
                url: 'http://localhost:3000/allData'
            }).then(function (response) {
                const data = response.data;
                params.success(
                    {
                        rowData: data,
                        rowCount: data.length
                    }
                );
            });
        }
    });


}


