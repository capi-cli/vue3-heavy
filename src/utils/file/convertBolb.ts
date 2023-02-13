export function FileToBlob(file: File) {
  const blob = new Blob([file]);

  return {
    data: {
      url: window.URL.createObjectURL(blob),
    },
  };
}
