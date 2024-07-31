import "./App.css";
import { Schema, validate, Validator } from "@cfworker/json-schema";
import schema from "./schema.json";
import { useState } from "react";

const validator = new Validator(schema as Schema);

function App() {
  const [errors, setErrors] = useState<Schema | null>();

  const validateAction = (action: "read" | "write" | "delete") => {
    const result = validator.validate({
      id: "test",
      payload: {
        action,
      },
    });

    if (result.errors.length) {
      return setErrors(result.errors);
    }

    console.log(result);

    setErrors(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ paddingLeft: 12, paddingRight: 12 }}>
        <h1>json schema validation</h1>
        <p>
          <strong>tl;dr</strong> - validate the payload with a "write" action
          and the second with a "delete" action
        </p>
        <div className="card">
          <button onClick={() => validateAction("read")}>
            ✅ Test Good Schema
          </button>
          <button onClick={() => validateAction("delete")}>
            🚫 Test Bad Schema
          </button>
          <hr style={{ width: "80%", borderColor: "#515151" }} />
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      </div>
      <div style={{ paddingLeft: 24 }}>
        <h2>schema</h2>
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
