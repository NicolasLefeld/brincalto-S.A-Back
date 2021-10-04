const html_to_pdf = require("html-pdf-node");

async function generatePdfWithHtml(html) {
  let options = { format: "A4" };

  let file = { content: html };

  const pdf = await html_to_pdf.generatePdf(file, options);

  return pdf;
}

module.exports = generatePdfWithHtml;
