import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useContext } from 'react';
import { CrmChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ILead } from '../../../types/crm.types';
import { Cancel } from '@mui/icons-material';
import AllRemarksPage from '../../../pages/crm/AllRemarksPage';

function ViewRemarksDialog({ lead }: { lead: ILead }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog fullScreen={Boolean(window.screen.width < 500)} open={choice === CrmChoiceActions.view_remarks ? true : false}
        scroll="paper"
        onClose={() => setChoice({ type: CrmChoiceActions.close_lead })}
      >
        <IconButton style={{ display: 'inline-block', position: 'absolute', right: '0px' }} color="error" onClick={() => setChoice({ type: CrmChoiceActions.close_lead })}>
          <Cancel fontSize='large' />
        </IconButton>
        <DialogTitle sx={{ minWidth: '300px' }} textAlign="center">Remarks History</DialogTitle>
        <Typography sx={{ minWidth: '300px', textTransform: 'capitalize' }} textAlign="center">{lead.name}</Typography>
        <Typography sx={{ minWidth: '300px' }} textAlign="center">{lead.mobile}</Typography>
        <DialogContent>
          <AllRemarksPage lead={lead} />
        </DialogContent>
      </Dialog >
    </>
  )
}

export default ViewRemarksDialog