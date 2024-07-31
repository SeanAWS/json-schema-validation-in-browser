export interface UpdateS3BucketAction {
  id: string,
  payload: {
    action: "read" | "write",
  }
}
