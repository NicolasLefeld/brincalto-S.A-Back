const numberWithCommas = require('./numberWithCommas')

function generateHtml(remitosInfo) {
  const client = remitosInfo[0].client_id.name;
  const id = remitosInfo[0].statusId;
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const month = monthNames[remitosInfo[0].date.getUTCMonth()];

  let total = 0;
  let tableContent = "";

  remitosInfo.forEach((remitoInfo) => {
    const month = remitoInfo.date.getUTCMonth() + 1; //months from 1-12
    const day = remitoInfo.date.getUTCDate();
    const year = remitoInfo.date.getUTCFullYear();

    tableContent += `
    <tr>
      <td class="tr5 td9"><p class="p12 ft10">${day}/${month}/${year}</p></td>
      <td class="tr5 td10"><p class="p13 ft10">${remitoInfo.remito_id}</p></td>
      <td class="tr5 td10"><p class="p13 ft10">${remitoInfo.product_id.name}</p></td>
      <td class="tr5 td11"><p class="p13 ft10">${remitoInfo.tons}</p></td>
      <td class="tr5 td11"><p class="p13 ft10">${remitoInfo.price}</p></td>
      <td class="tr5 td15"><p class="p16 ft10">${remitoInfo.observation}</p></td>
    </tr>`;

    total += remitoInfo.price;
  });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>--EL CHANGO--</title>
      <meta name="author" content="brincalto" />
      <style type="text/css">
        body {
          margin-top: 0px;
          margin-left: 0px;
        }
  
        #page_1 {
          position: relative;
          overflow: hidden;
          margin: 73px 0px 75px 24px;
          padding: 0px;
          border: none;
          width: 792px;
        }
        #page_1 #id1_1 {
          border: none;
          margin: 0px 0px 0px 25px;
          padding: 0px;
          border: none;
          width: 767px;
          overflow: hidden;
        }
        #page_1 #id1_1 #id1_1_1 {
          float: left;
          border: none;
          margin: 0px 0px 0px 0px;
          padding: 0px;
          border: none;
          width: 426px;
          overflow: hidden;
        }
        #page_1 #id1_1 #id1_1_2 {
          float: left;
          border: none;
          margin: 25px 0px 0px 0px;
          padding: 0px;
          border: none;
          width: 341px;
          overflow: hidden;
        }
        #page_1 #id1_2 {
          border: none;
          margin: 0px 0px 0px 21px;
          padding: 0px;
          border: none;
          width: 771px;
          overflow: hidden;
        }
        #page_1 #id1_2 #id1_2_1 {
          float: left;
          border: none;
          margin: 0px 0px 0px 0px;
          padding: 0px;
          border: none;
          width: 394px;
          overflow: hidden;
        }
        #page_1 #id1_2 #id1_2_2 {
          float: left;
          border: none;
          margin: 30px 0px 0px 0px;
          padding: 0px;
          border: none;
          width: 377px;
          overflow: hidden;
        }
        #page_1 #id1_3 {
          border: none;
          margin: 20px 0px 0px 0px;
          padding: 0px;
          border: none;
          width: 697px;
          overflow: hidden;
        }
  
        #page_2 {
          position: relative;
          overflow: hidden;
          margin: 72px 0px 245px 24px;
          padding: 0px;
          border: none;
          width: 697px;
        }
  
        .ft0 {
          font: italic bold 32px "Arial";
          line-height: 36px;
        }
        .ft1 {
          font: bold 16px "Calibri";
          text-decoration: underline;
          line-height: 17px;
        }
        .ft2 {
          font: bold 16px "Calibri";
          line-height: 17px;
        }
        .ft3 {
          font: bold 11px "Arial";
          line-height: 14px;
        }
        .ft4 {
          font: bold 16px "Calibri";
          text-decoration: underline;
          line-height: 19px;
        }
        .ft5 {
          font: bold 16px "Calibri";
          line-height: 19px;
        }
        .ft6 {
          font: 15px "Calibri";
          line-height: 18px;
        }
        .ft7 {
          font: 12px "Calibri";
          line-height: 14px;
          position: relative;
          bottom: 9px;
        }
        .ft8 {
          font: 1px "Calibri";
          line-height: 1px;
        }
        .ft9 {
          font: 1px "Calibri";
          line-height: 16px;
        }
        .ft10 {
          font: 14px "Calibri";
          line-height: 17px;
        }
        .ft11 {
          font: 1px "Calibri";
          line-height: 4px;
        }
  
        .p0 {
          text-align: left;
          margin-top: 0px;
          margin-bottom: 0px;
        }
        .p1 {
          text-align: left;
          padding-left: 71px;
          margin-top: 4px;
          margin-bottom: 0px;
        }
        .p2 {
          text-align: left;
          padding-left: 53px;
          margin-top: 4px;
          margin-bottom: 0px;
        }
        .p3 {
          text-align: left;
          padding-left: 24px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p4 {
          text-align: left;
          padding-left: 19px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p5 {
          text-align: left;
          padding-left: 12px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p6 {
          text-align: left;
          padding-left: 6px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p7 {
          text-align: left;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p8 {
          text-align: left;
          padding-left: 18px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p9 {
          text-align: left;
          padding-left: 8px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p10 {
          text-align: left;
          padding-left: 27px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p11 {
          text-align: center;
          padding-right: 15px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p12 {
          text-align: center;
          padding-left: 3px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p13 {
          text-align: center;
          padding-left: 1px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p14 {
          text-align: left;
          padding-left: 2px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p15 {
          text-align: right;
          padding-right: 7px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p16 {
          text-align: center;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p17 {
          text-align: right;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p18 {
          text-align: right;
          padding-right: 16px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p19 {
          text-align: left;
          padding-left: 28px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p20 {
          text-align: right;
          padding-right: 27px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p21 {
          text-align: center;
          padding-right: 13px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p22 {
          text-align: right;
          padding-right: 1px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
        .p23 {
          text-align: left;
          padding-left: 17px;
          margin-top: 0px;
          margin-bottom: 0px;
          white-space: nowrap;
        }
  
        .td0 {
          border-left: #000000 1px solid;
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td1 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td2 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 69px;
          vertical-align: bottom;
        }
        .td3 {
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 14px;
          vertical-align: bottom;
        }
        .td4 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 95px;
          vertical-align: bottom;
        }
        .td5 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 102px;
          vertical-align: bottom;
        }
        .td6 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 155px;
          vertical-align: bottom;
        }
        .td7 {
          padding: 0px;
          margin: 0px;
          width: 14px;
          vertical-align: bottom;
        }
        .td8 {
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 95px;
          vertical-align: bottom;
        }
        .td9 {
          border-left: #000000 1px solid;
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td10 {
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td11 {
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 69px;
          vertical-align: bottom;
        }
        .td12 {
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 14px;
          vertical-align: bottom;
        }
        .td13 {
          border-bottom: #000000 1px solid;
          border-right: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 15px;
          vertical-align: bottom;
        }
        .td14 {
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 87px;
          vertical-align: bottom;
        }
        .td15 {
          border-right: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 155px;
          vertical-align: bottom;
        }
        .td16 {
          border-left: #000000 1px solid;
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td17 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 85px;
          vertical-align: bottom;
        }
        .td18 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 69px;
          vertical-align: bottom;
        }
        .td19 {
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 14px;
          vertical-align: bottom;
        }
        .td20 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 95px;
          vertical-align: bottom;
        }
        .td21 {
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 15px;
          vertical-align: bottom;
        }
        .td22 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 87px;
          vertical-align: bottom;
        }
        .td23 {
          border-right: #000000 1px solid;
          border-top: #000000 1px solid;
          border-bottom: #000000 1px solid;
          padding: 0px;
          margin: 0px;
          width: 155px;
          vertical-align: bottom;
        }
        .td24 {
          padding: 0px;
          margin: 0px;
          width: 76px;
          vertical-align: bottom;
        }
        .td25 {
          padding: 0px;
          margin: 0px;
          width: 26px;
          vertical-align: bottom;
        }
        .td26 {
          padding: 0px;
          margin: 0px;
          width: 87px;
          vertical-align: bottom;
        }
        .td27 {
          padding: 0px;
          margin: 0px;
          width: 151px;
          vertical-align: bottom;
        }
        .td28 {
          padding: 0px;
          margin: 0px;
          width: 340px;
          vertical-align: bottom;
        }
  
        .tr0 {
          height: 35px;
        }
        .tr1 {
          height: 19px;
        }
        .tr2 {
          height: 16px;
        }
        .tr3 {
          height: 20px;
        }
        .tr4 {
          height: 4px;
        }
        .tr5 {
          height: 18px;
        }
        .tr6 {
          height: 38px;
        }
        .tr7 {
          height: 43px;
        }
  
        .t0 {
          width: 697px;
          font: 15px "Calibri";
        }
        .t1 {
          width: 340px;
          margin-left: 300px;
          margin-top: 19px;
          font: 15px "Calibri";
        }
      </style>
    </head>
    <body>
      <div id="page_1">
        <div id="id1_1">
          <div id="id1_1_1">
            <p class="p0 ft0">BRINCALTO S.A</p>
          </div>
          <div id="id1_1_2">
          <p class="p0 ft2">
              <span class="ft1">Liquidación N°:</span> ${id}
            </p>
            <p class="p0 ft2">
              <span class="ft1">Razón Social:</span> ${client}
            </p>
          </div>
        </div>
        <div id="id1_2">
          <div id="id1_2_1">
            <p class="p0 ft3">
              Transporte - Movimiento de Suelo - Venta de Aridos
            </p>
            <p class="p1 ft3">Contacto: 2615583063 -</p>
            <p class="p2 ft3">aldojavierbianchi@hotmail.com</p>
          </div>
          <div id="id1_2_2">
            <p class="p0 ft5">
              <span class="ft4">Periodo liquidado:</span> ${month}
            </p>
          </div>
        </div>
        <div id="id1_3">
          <table cellpadding="0" cellspacing="0" class="t0">
            <tr>
              <td class="tr0 td0"><p class="p3 ft6">FECHA</p></td>
              <td class="tr0 td1"><p class="p4 ft6">REMITO</p></td>
              <td class="tr0 td1"><p class="p5 ft6">MATERIAL</p></td>
              <td class="tr0 td2">
                <p class="p6 ft6">METROS<span class="ft7">3</span></p>
              </td>
              <td class="tr0 td5">
                <p class="p9 ft6">PRECIO TOTAL</p>
              </td>
              <td class="tr0 td6">
                <p class="p10 ft6">OBSERVACIONES</p>
              </td>
            </tr>
            <tr>
              <td class="tr4 td9"><p class="p7 ft11">&nbsp;</p></td>
              <td class="tr4 td10"><p class="p7 ft11">&nbsp;</p></td>
              <td class="tr4 td10"><p class="p7 ft11">&nbsp;</p></td>
              <td class="tr4 td11"><p class="p7 ft11">&nbsp;</p></td>
              <td class="tr4 td13"><p class="p7 ft11">&nbsp;</p></td>
              <td class="tr4 td14"><p class="p7 ft11">&nbsp;</p></td>
            </tr>
            ${tableContent}
          </table>
  
          <table cellpadding="0" cellspacing="0" class="t1">
            <tr>
              <td class="tr7 td24"><p class="p21 ft6">TOTAL $ ${numberWithCommas(total)}</p></td>
            </tr>
          </table>
        </div>
      </div>
    </body>
  </html>
  `;
}

module.exports = generateHtml;
