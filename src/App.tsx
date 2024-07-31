import "./App.css";
import { Validator } from "@cfworker/json-schema";
import schema from "./schema.json";
import { useState } from "react";

const validator = new Validator(schema);

function App() {
  const [errors, setErrors] = useState<any>();

  const handleGoodSchema = () => {
    const result = validator.validate({
      id: "test",
      payload: {
        action: "write",
      },
    });

    if (result.errors.length) {
      return setErrors(result.errors);
    }

    console.log(result);

    setErrors(null);
  };

  const handleBadSchema = () => {
    const result = validator.validate({
      id: "test",
      payload: {
        action: "delete",
      },
    });

    if (result.errors.length) {
      return setErrors(result.errors);
    }

    console.log(result);

    setErrors(null);
  };

  return (
    <div>
      <h1>json-schema-validation-in-browser</h1>
        <p><strong>tl;dr</strong> - validate the payload with a "write" action and the second with a "delete" action</p>
      <div className="card">
        <button onClick={handleGoodSchema}>✅ Test Good Schema</button>
        <button onClick={handleBadSchema}>🚫 Test Bad Schema</button>
          <hr style={{ width: "80%", borderColor: "#515151" }} />
        <pre>{(JSON.stringify(errors, null, 2))}</pre>
      </div>
    </div>
  );
}

export default App;
