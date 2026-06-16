export const generatePdfFromLatex = async (
  tex: string,
  saveOptions?: { savePath: string; filename: string },
): Promise<Blob | { success: true }> => {
  let url = `/api/latex/compile`;
  if (saveOptions && saveOptions.savePath) {
    const params = new URLSearchParams({
      savePath: saveOptions.savePath,
      filename: saveOptions.filename,
    });
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-tex' },
    body: tex,
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(err);
    throw new Error(`LaTeX compilation failed (${res.status}): ${err}`);
  }

  if (saveOptions && saveOptions.savePath) {
    return res.json();
  }
  return res.blob();
};

export const downloadPdf = (blob: Blob, filename = 'cv.pdf') => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
