import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useContext } from 'react';
import { CrmChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ILead } from '../../../types/crm.types';
import { Cancel } from '@mui/icons-material';
import AllReferralPage from '../../../pages/crm/AllReferralPage';

function ViewReferralsDialog({ leads, display, setDisplay }: { leads: ILead[], display: Boolean, setDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { choice, setChoice } = useContext(ChoiceContext)

    return (
        <>
            <Dialog fullScreen={Boolean(window.screen.width < 500)}  open={display || choice === CrmChoiceActions.update_remark || choice === CrmChoiceActions.view_remarks ? true : false}
                scroll="paper"
                onClose={() => setChoice({ type: CrmChoiceActions.close_lead })}
            >
                <IconButton style={{ display: 'inline-block', position: 'absolute', right: '0px' }} color="error" onClick={() => setDisplay(false)}>
                    <Cancel fontSize='large' />
                </IconButton>
                <DialogTitle sx={{ minWidth: '300px' }} textAlign="center">Referrals History</DialogTitle>
                <DialogContent>
                    <AllReferralPage leads={leads} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViewReferralsDialog