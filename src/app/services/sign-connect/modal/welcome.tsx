import { Modal, StyledIcon } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useMemo } from "react";

type docTypes = "hkid" | "e-Passport";

interface docTypeProps {
    id: docTypes;
    icon: string;
    iconStyle: string;
    shorthand: string;
    type: string;
    bestFor: string;
    cardStyle: string;
    titleStyle: string;
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  docType: docTypes | null;
  updateDocType: (docType: docTypes) => void;
  handleContinue: (docType: docTypes) => void;
}

export default function ModalWelcome({ open, onClose, docType, updateDocType, handleContinue }: ModalProps) {
    const t = useTranslations();
    const translations = useMemo(() => {
        const modal = t('pages.signConnect.modal.welcome');
        const documentTypes = modal.documentTypes as docTypeProps[];
        return {
            modal,
            documentTypes,
        };
    }, [t]);

    const handleSelectDocType = (docType: docTypes) => {
        updateDocType(docType);
        handleContinue(docType);
    }

    return (
        <Modal
            open={open} 
            onClose={onClose}
            maxWidth={800}
        >
            <Box component="div" className="flex flex-col items-center">
                <img src="/assets/logo/logo-tradelink.svg" alt="Tradelink" width={150} />
                <Typography variant="h5" component="h2" className="mt-8! mb-2! font-bold! bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    { translations.modal.title }
                </Typography>
                <Typography variant="subtitle2" component="p" className="mb-8!">
                    { translations.modal.selectYourDocumentType }
                </Typography>
                <Grid container spacing={3} className="w-full">
                {
                    translations.documentTypes.map((dType, i) => (
                        <Grid size={{ xs: 12, sm: 6}} key={`doc-type-${i}`}>
                            <Card  
                                className={`
                                    relative p-6 w-full h-full card-hover cursor-pointer border-2! hover:border-blue-400! bg-linear-to-br! 
                                    ${dType.cardStyle}
                                    ${docType === dType.id ? 'border-blue-500!' : 'border-gray-200!'}
                                    transition-all!
                                `} 
                                onClick={() => handleSelectDocType(dType.id)}
                            >
                                {docType === dType.id && 
                                    <StyledIcon
                                        icon={getSVGIcon('circle-check-big', 24, '#FFFFFF')}
                                        size={32}
                                        variant="blue-inverted"
                                        className="absolute top-3 right-3"
                                    />
                                }                                
                                <Box component="div" className="flex justify-center mb-3! gap-3">
                                    <StyledIcon
                                        icon={getSVGIcon(dType.icon, 24, '#FFFFFF')}
                                        size={48}
                                        className={`bg-linear-to-br ${dType.iconStyle} shrink-0`}
                                    />
                                    <Typography 
                                        variant="h2" 
                                        component="h3"
                                        className={`font-bold! bg-linear-to-r bg-clip-text text-transparent whitespace-nowrap ${dType.titleStyle}`}
                                    >
                                        { dType.shorthand }
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle2" component="p" className="font-normal! text-center mb-4!">{ dType.type }</Typography>
                                <Typography variant="subtitle2" component="p" className="font-bold! text-center" color={theme.palette.text.blue}>{ dType.bestFor }</Typography>
                            </Card>
                        </Grid>  
                    ))
                }
                </Grid>
            </Box>                
        </Modal>
    );
}