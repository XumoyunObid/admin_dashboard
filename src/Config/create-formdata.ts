export const createFormData = (obj: any) => {
  const formdata = new FormData();

  for (let i in obj) {
    if (obj[i]) {
      formdata.append(i, obj[i] as any);
    }
  }
  return formdata;
};
