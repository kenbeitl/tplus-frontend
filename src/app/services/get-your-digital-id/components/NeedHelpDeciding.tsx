'use client';

import theme from "@/theme/theme";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface needHelpDecidingProps {
    title: string;
    description: string;
    buttonText: string;
}

export default function NeedHelpDeciding({ needHelpDeciding }: { needHelpDeciding: needHelpDecidingProps }) {
    const router = useRouter();

    return (
        <Card variant="outlined" className="p-6 bg-blue-50! border! border-blue-200!">
            <Box className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <Box component="div">
                    <Typography variant="h5" component="h3" className="mb-2!">
                        {needHelpDeciding.title}
                    </Typography>
                    <Typography variant="body1" component="p" color={theme.palette.text.secondary}>
                        {needHelpDeciding.description}
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    className="whitespace-nowrap! bg-white!"
                    onClick={() => router.push('/help-centre')}
                >
                    {needHelpDeciding.buttonText}
                </Button>
            </Box>
        </Card>
    );
}
