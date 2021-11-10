const getDateFormated = require("./getDateFormated");

function generateChargeHtml(chargesInfo, detailsInfo, client) {
  let totalAmount = 0;
  let totalAmountInvoices = 0;
  let details = "";
  let invoices = "";
  let observations = "";
  let paymentPdfId = 1; // TODO: Generar en DB los autoincrementales
  let today = new Date();
  const todayFormated = getDateFormated(today);

  chargesInfo.forEach((chargeInfo) => {
    if (observations === "" && chargeInfo.paymentComment)
      observations = chargeInfo.paymentComment;

    totalAmount += chargeInfo.amount;
    const { type } = chargeInfo;
    if (type === "check") {
      details += `
        <tr>
          <td>
            Cheque
          </td>
          <td>
            ${chargeInfo.check.check_number}
          </td>
          <td>
          ${chargeInfo.check.bank}
          </td>
          <td>
          ${getDateFormated(chargeInfo.check.expiration_date)}
          </td>
          <td>
            $ ${chargeInfo.check.amount}
          </td>
          <td>
          
          </td>
        </tr>`;
    } else {
      details += `
        <tr>
          <td>
            Efectivo
          </td>
          <td>
           
          </td>
          <td>
          
          </td>
          <td>
          ${getDateFormated(chargeInfo.date)}
          </td>
          <td>
            $ ${chargeInfo.amount}
          </td>
          <td>
          ${type === "others" ? chargeInfo.commentOthers : ""}
          </td>
        </tr>`;
    }
  });

  detailsInfo.forEach((detailInfo) => {
    totalAmountInvoices += detailInfo.total;

    invoices += `<tr>
    <td>
      ${detailInfo.invoice_id}
    </td>
    <td>
      ${getDateFormated(detailInfo.date)}
    </td>
    <td>
      $ ${detailInfo.total}
    </td>
  </tr>`;
  });

  return `
  <body style="font-family: Arial">
    <div style="width:85%;margin-left: auto;margin-right: auto;margin-top:40px">
      <table style="width:100%">
        <tr>
          <td style="width:40%">
            &nbsp;
          </td>
          <td style="width:60%">
            <div style="text-align: center;float: left;">
              <div style="margin-left: auto;margin-right: auto;font-size:40px; width: 40px; border: 2px solid black">
                X
              </div>
              <div style="width: 150px; margin-left: auto;margin-right: auto;">
                Documento no valido como factura
              </div>
            </div>
            <div style="width:200px; font-size: 13px; float: right">
              <b>
                RECIBO DE COBRANZA<br>
                NUMERO 0001-${paymentPdfId}<br>
                ORIGINAL<br>
                FECHA ${todayFormated}
              </b>
            </div>
          </td>
        </tr>
      </table>
      
      <br><br>

      <div style="border:2px solid black;">
        <table>
          <tr>
            <td>
              Señores
            </td>
            <td>
            &emsp;${client.name}
            </td>
          </tr>
          <tr>
            <td>
              Domicilio
            </td>
            <td>
            &emsp;${client.address}
            </td>
          </tr>
          <tr>
            <td>
              CUIT
            </td>
            <td>
            &emsp;${client.cuit}
            </td>
          </tr>
        </table>
      </div>
    <hr style="border-top: 2px solid black;">
      <div>
        <b>DETALLES DE CONCEPTOS RECIBIDOS:</b>
        <br><br>
        <table width="100%">
          <tr>
            <td>
              TIPO
            </td>
            <td>
              NUMERO
            </td>
            <td>
              BANCO
            </td>
            <td>
              FECHA VTO
            </td>
            <td>
              IMPORTE
            </td>
            <td>
              OBSERVACION
            </td>
          </tr>
          ${details}
          <tr><td colspan="7">&nbsp;</td></tr>
          <tr>
            <td colspan="5" style="text-align: right;">
              <b>IMPORTE TOTAL RECIBIDO: $ ${totalAmount}</b>
            </td>
          </tr>
        </table>
      </div>
    <hr style="border-top: 2px solid black;" >
      <div>
        <b>COMPROBANTES CANCELADOS:</b>
        <br><br>
        <table width="75%" style="margin-left: auto;margin-right: auto;">
          <tr>
            <td>
              NUMERO
            </td>
            <td>
              FECHA
            </td>
            <td>
              IMPORTE
            </td>
          </tr>
          ${invoices}
          <tr><td colspan="3">&nbsp;</td></tr>
          <tr>
            <td colspan="3" style="text-align: right;">
              <b>IMPORTE TOTAL FACTURAS: $ ${totalAmountInvoices}</b>
            </td>
          </tr>
        </table>
      </div>
    <hr style="border-top: 2px solid black;" >
      <div>
        <b>OBSERVACIONES:</b> ${observations}
      
      </div>

      <div style="margin-top: 200px; margin-left: 50px">
        <b>FIRMA: _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</b>
      
      </div>
    </div>
  </body>
`;
}

module.exports = generateChargeHtml;
