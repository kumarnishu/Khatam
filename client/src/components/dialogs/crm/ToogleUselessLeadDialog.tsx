import { Dialog, DialogContent, DialogTitle, Typography, IconButton } from '@mui/material'
import { useContext } from 'react';
import { CrmChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { Cancel } from '@mui/icons-material';
import { ILead } from '../../../types/crm.types';
import ToogleUselessForm from '../../forms/crm/ToogleUselessForm';


function ToogleUselessLeadDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === CrmChoiceActions.convert_useless ? true : false}
            onClose={() => setChoice({ type: CrmChoiceActions.close_lead })}
        >
            <IconButton style={{ display: 'inline-block', position: 'absolute', right: '0px' }} color="error" onClick={() => setChoice({ type: CrmChoiceActions.close_lead })}>
                <Cancel fontSize='large' />
            </IconButton>
            <DialogTitle sx={{ minWidth: '350px' }} textAlign="center">
                {lead.stage === "useless" ? "Remove From " : "Make "} Useless
            </DialogTitle>


            <DialogContent>
                <Typography variant="body1" color="error">
                    {`This will toogle useless property for this  ${lead.mobile}`}
                </Typography>
                <ToogleUselessForm lead={lead} />
            </DialogContent>

        </Dialog >
    )
}

export default ToogleUselessLeadDialog
