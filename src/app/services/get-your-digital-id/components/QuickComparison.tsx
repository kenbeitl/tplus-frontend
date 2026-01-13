'use client';

import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell as MuiTableCell, TableRow, styled } from "@mui/material";

interface digitalIdentityOption {
    feature: string[];
    eligibility: string[];
    applicationTime: string[];
    applicationCost: string[];
    requiredDocument: string[];
    bestFor: string[];
}

interface quickComparisonProps {
    title: string;
    context: string;
    feature: string;
    eligibility: string;
    applicationTime: string;
    applicationCost: string;
    governmentRecognition: string;
    remoteApplication: string;
    requiredDocument: string;
    bestFor: string;
    options: digitalIdentityOption
}

const TableCell = styled(MuiTableCell)({
    fontSize: '1rem',
    '&:not(:first-child)': {
        textAlign: 'center',
    },
    '& svg': {
        margin: 'auto',
    }
});

export default function QuickComparison({ quickComparison }: { quickComparison: quickComparisonProps }) {
    return (
        <Card variant="outlined" className="p-6 bg-yellow-50! border! border-yellow-200!">
            <Card variant="outlined" className="p-6 bg-white! border! border-divider!">
                <Typography variant="h2" component="h2" className="mb-2!">{ quickComparison.title }</Typography>
                <Typography variant="body1" component="p" color={theme.palette.text.secondary} className="mb-3!">{ quickComparison.context }</Typography>
                <CardContent>
                    <Box component="div" className="overflow-x-auto">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.feature}</TableCell>
                                    {quickComparison.options.feature.map((feature, index) => (
                                        <TableCell key={index}>{feature}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.eligibility}</TableCell>
                                    {quickComparison.options.eligibility.map((eligibility, index) => (
                                        <TableCell key={index}>{eligibility}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.applicationTime}</TableCell>
                                    {quickComparison.options.applicationTime.map((applicationTime, index) => (
                                        <TableCell key={index}>{ getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }{applicationTime}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.applicationCost}</TableCell>
                                    {quickComparison.options.applicationCost.map((applicationCost, index) => (
                                        <TableCell key={index}>{applicationCost}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.governmentRecognition}</TableCell>
                                    <TableCell>{ getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }</TableCell>
                                    <TableCell>{ getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.remoteApplication}</TableCell>
                                    <TableCell>{ getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }</TableCell>
                                    <TableCell>{ getSVGIcon('circle-check-big', 20, theme.palette.text.lightGreen) }</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.requiredDocument}</TableCell>
                                    {quickComparison.options.requiredDocument.map((requiredDocument, index) => (
                                        <TableCell key={index}>{requiredDocument}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 500 }}>{quickComparison.bestFor}</TableCell>
                                    {quickComparison.options.bestFor.map((bestFor, index) => (
                                        <TableCell key={index}>{bestFor}</TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Card>
    )
}