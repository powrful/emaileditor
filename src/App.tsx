import { EmailCanvas } from "../lib/main";

function App() {
  return (
    <>
      <EmailCanvas
        onSave={(htmlTemplate, jsonTemplate, reactComponent) => {
          // Do whatever you want with html, json and react template
        }}
        onBack={() => {
          // Redirect back to where ever you want
        }}
        // template={jsonTemplate} // Optional
      />
    </>
  );
}

export default App;
