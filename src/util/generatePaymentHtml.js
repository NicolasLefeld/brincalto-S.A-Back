const getDateFormated = require("./getDateFormated");
const writtenNumber = require("written-number");
const autoIncrementIdDb = require("../util/autoIncrementIdDb");

async function generateRemitoHtml(paymentsInfo) {
  let totalAmount = 0;
  let details = "";
  let observations = "";
  let paymentPdfId = await autoIncrementIdDb("payment");
  let today = new Date();
  const todayFormated = getDateFormated(today);

  paymentsInfo.forEach((paymentInfo) => {
    const { type, amount, check, commentOthers } = paymentInfo.payment;
    totalAmount += amount;
    if (type.includes("check")) {
      const { amount, expiration_date, check_number } = check;
      details += `
      <tr>
        <td>Cheque</td>
        <td>${check_number}</td>
        <td>${getDateFormated(expiration_date)}</td>
        <td>$ ${amount}</td>
      </tr>`;
    } else {
      details += `
      <tr>
        <td>${type === "cash" ? "Efectivo" : "Otros"}</td>
        <td>${type === "others" ? commentOthers : "&nbsp;"}</td>
        <td>${todayFormated}</td>
        <td>$ ${amount}</td>
      </tr>`;
    }
  });

  const writenAmount = writtenNumber(totalAmount, { lang: "es" });
  const writenAmountCapitalized =
    writenAmount[0].toUpperCase() + writenAmount.substring(1);

  return `
  <html>
  <head>
    <title>PDF - Cobros</title>
    <style type="text/css">
      body {
        margin: 30px;
        border: 1px solid black;
        font: 12px "Arial";
      }

      #page_1 {
        position: relative;
        overflow: hidden;
        margin: 0px;   
      }
      #page_1 #id1_2 {
        margin-top: 556px;
        margin-left: 60px;
        width: 692px;
      }

      .p0 {
        text-align: left;
        padding-left: 289px;
        margin-top: 20px;
      }
      .p1 {
        text-align: left;
        padding-left: 289px;
        margin-top: 9px;
        margin-bottom: 0px;
      }
  
      .p6 {
        margin-top: 0px;
        margin-bottom: 0px;
        white-space: nowrap;
      }
      .p12 {
        text-align: left;
        padding-left: 9px;
        margin-top: 31px;
        margin-bottom: 0px;
      }
      .p13 {
        white-space: nowrap;
      }
      .p14 {
        white-space: nowrap;
      }
      .p15 {
        white-space: nowrap;
      }
      .p16 {
        white-space: nowrap;
      }
      .p17 {
        white-space: nowrap;
      }
      .td1 {
        padding: 0px;
        margin: 0px;
        width: 77px;
        vertical-align: bottom;
      }
      .td2 {
        padding: 0px;
        margin: 0px;
        width: 273px;
        vertical-align: bottom;
      }
      .td13 {
        padding: 0px;
        margin: 0px;
        width: 197px;
        vertical-align: bottom;
      }
      .td14 {
        padding: 0px;
        margin: 0px;
        width: 261px;
        vertical-align: bottom;
      }
      .td15 {
        padding: 0px;
        margin: 0px;
        width: 234px;
        vertical-align: bottom;
      }
      .tr0 {
        height: 7px;
      }
      .tr3 {
        height: 15px;
      }
      .t1 {
        width: 753px;
        margin-top: 49px;
      }
      .t2 {
        width: 692px;
      }
    </style>
  </head>

  <body>
    <div id="page_1">
      <div id="id1_1">
        <table class="p0">
          <tr>
            <td>Orden de Pago Nº: </td>
            <td><b>${paymentPdfId}</b></td>
          </tr>
          <tr>
            <td>Fecha: </td>
            <td>${todayFormated}</td>
          </tr>
        </table>

<br>
<br>

        <table>
          <tr>
            <td>Paguese a: </td>
            <td>${paymentsInfo[0].provider.name}</td>
          </tr>
          <tr>
            <td>C.U.I.T.: </td>
            <td>${paymentsInfo[0].provider.cuit}</td>
          </tr>
          <tr>
            <td>Dirección: </td>
            <td>${paymentsInfo[0].provider.address}</td>
          </tr>
        </table>

<br>
<hr>
<br>

        <table>
          <tr>
            <td>LA CANTIDAD DE PESOS: </td>
            <td>${totalAmount}</td>
          </tr>
          <tr>
            <td>SON: </td>
            <td>${writenAmountCapitalized}</td>
          </tr>
        </table>
<br>
<hr>
<br>
        <table width="100%">
          <tr>
            <td colspan="4">SEGUN EL SIGUIENTE DETALLE:</td>
          </tr>
          <div>
            ${details}
          </div>
        </table>

        <hr>
        
        
        <p class="p12">O B S E R V A C I O N E S :<br><br>${observations}</p>
		
      </div>
      <div id="id1_2">
        <table width="100%">
          <tr>
            <td>................................</td>
            <td>................................</td>
            <td>................................</td>
          </tr>
          <tr>
            <td>CONFECCIONO</td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AUTORIZO</td>
            <td>RECIBI CONFORME</td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>`;
}

module.exports = generateRemitoHtml;
