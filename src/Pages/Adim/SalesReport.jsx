import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const SalesReport = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: medicines = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['manageMedicine', user?.email],
        queryFn: async () => {
            try {
                if (user?.email) {
                    const response = await axios.get(`http://localhost:5000/datas`);
                    return response.data;
                } else {
                    toast.error('User email is not available');
                    return [];
                }
            } catch (err) {
                toast.error('Failed to fetch medicines');
                throw err;
            }
        },
        enabled: !!user?.email, // Only run the query if the email is available
    });

    if (isLoading) {
        return <p>Loading sales report...</p>;
    }

    if (isError) {
        return <p>Error fetching sales report: {error?.message}</p>;
    }

    // Filter medicines by date range
    const filteredMedicines = medicines.filter((medicine) => {
        if (startDate && endDate) {
            const saleDate = new Date(medicine.date);
            return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
        }
        return true; // Show all if no date range is selected
    });

    // Define table columns
    const columns = [
        {
            name: 'Medicine Name',
            selector: row => row.itemName,
            sortable: true,
        },
        {
            name: 'Seller Email',
            selector: row => row.sellerEmail,
            sortable: true,
        },
        {
            name: 'Buyer Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Total Price',
            selector: row => `$${row.price}`,
            sortable: true,
        },
        {
            name: 'Sale Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
        }
    ];

    // Excel Export Functionality
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredMedicines);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sales Report');
        XLSX.writeFile(wb, 'sales_report.xlsx');
    };

    // PDF Export Component
    const SalesReportPDF = () => {
        const styles = StyleSheet.create({
            page: {
                padding: 10,
            },
            section: {
                marginBottom: 10,
            },
        });

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <Text style={styles.section}>Sales Report</Text>
                    {filteredMedicines.map((medicine, index) => (
                        <Text key={index} style={styles.section}>
                            {`Medicine Name: ${medicine.medicineName}, Seller Email: ${medicine.sellerEmail}, Buyer Email: ${medicine.buyerEmail}, Total Price: $${medicine.totalPrice}, Sale Date: ${new Date(medicine.date).toLocaleDateString()}`}
                        </Text>
                    ))}
                </Page>
            </Document>
        );
    };

    return (
        <div>
            {/* Date Range Filter */}
            <div className="filters">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
            </div>

            {/* Table displaying sales report */}
            <DataTable
                title="Sales Report"
                columns={columns}
                data={filteredMedicines}
                pagination
                highlightOnHover
            />

            {/* Export Buttons */}
            <div className="export-buttons mr-2">
    <button
        onClick={exportToExcel}
        style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px',
        }}
    >
        Download as Excel
    </button>

    <CSVLink
        data={filteredMedicines}
        filename="sales_report.csv"
        className="btn"
        style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none', // removes underline from link
            marginRight: '10px',
        }}
    >
        Download as CSV
    </CSVLink>

    <PDFDownloadLink
        document={<SalesReportPDF />}
        fileName="sales_report.pdf"
    >
        {({ loading }) => (
            <button
                style={{
                    backgroundColor: '#FF5722',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px',
                }}
            >
                {loading ? 'Loading document...' : 'Download as PDF'}
            </button>
        )}
    </PDFDownloadLink>
</div>

        </div>
    );
};

export default SalesReport;
