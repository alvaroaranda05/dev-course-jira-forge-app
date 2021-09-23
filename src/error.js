const throwError = (errorMessage) => {
  console.log("Error: ", errorMessage);
  throw new Error(errorMessage);
}

export {throwError};
