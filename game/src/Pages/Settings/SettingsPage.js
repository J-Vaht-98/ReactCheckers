import DoubleCheckButton from "../../Components/UI-Components/DoubleCheckButton";
import { defaultSettings } from "../../Constants";
import PageContainer from "../PageContainer";
import Settings from "./Settings";
import Box from '@mui/material/Box'

function SettingsPage() {
    return ( 
        <PageContainer>
            <Settings showFullRevert showSaveOptions showColorSettings />
        </PageContainer>
     );
}

export default SettingsPage;