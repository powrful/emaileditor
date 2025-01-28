import { EmailCanvas } from "../lib/main";
import { defaultTemplate } from "../lib/schemas/template";

function App() {
  return (
    <>
      <EmailCanvas
        onSave={(htmlTemplate, jsonTemplate, reactComponent) => {
          console.log(htmlTemplate, jsonTemplate, reactComponent);
        }}
        onBack={() => {
          // Redirect back to where ever you want
        }}
        defaultTemplate={defaultTemplate}
      />
    </>
  );
}

export default App;
