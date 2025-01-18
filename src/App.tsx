import { EmailCanvas } from "../lib/main";

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
        // template={jsonTemplate} // Optional
      />
    </>
  );
}

export default App;
