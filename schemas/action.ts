// Use this ts interface to generate a schema
export interface UpdateS3BucketAction {
  id: string,
  payload: {
    action: "read" | "write",
  }
}
