import { EmailCanvas } from "../lib/main";

function App() {
  return (
    <>
      <EmailCanvas
        onSave={(htmlTemplate, jsonTemplate, reactComponent) => {
          console.log("Save button clicked");
          console.log({ htmlTemplate });
          console.log({ jsonTemplate });
          console.log({ reactComponent });
        }}
        onBack={() => {
          alert("back");
        }}
        defaults={{
          design: {
            backgroundColor: "#f0f0f0",
          },
        }}
      />
    </>
  );
}

export default App;
