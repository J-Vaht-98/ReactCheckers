import PageContainer from "../PageContainer";
import Settings from "./Settings";

function SettingsPage() {
  return (
    <PageContainer>
      <Settings showFullRevert showSaveOptions showColorSettings />
    </PageContainer>
  );
}

export default SettingsPage;
