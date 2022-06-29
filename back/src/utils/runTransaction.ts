import { startSession } from "mongoose";
import { StatusError } from "./error";

async function runTransaction(txnFunc: Function) {
  let session = await startSession();
  try {
    session.startTransaction();
    await txnFunc(session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new StatusError(500, "Caught exception during transaction, aborting.");
  } finally {
    await session.endSession();
  }
}

export { runTransaction };
