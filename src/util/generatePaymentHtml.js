const numberWithCommas = require("./numberWithCommas");

function generateRemitoHtml(paymentsInfo) {
  let tableContent = "";

  paymentsInfo.forEach((paymentInfo) => {
    tableContent += `
    <tr>
      <td class="tr5 td9"><p class="p12 ft10">AAAAA</p></td>
    </tr>`;
  });

  return `
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
      <!--
      span.cls_002{font-family:Arial,serif;font-size:9.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
      div.cls_002{font-family:Arial,serif;font-size:9.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}
      span.cls_003{font-family:Arial,serif;font-size:8.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
      div.cls_003{font-family:Arial,serif;font-size:8.8px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}
      -->
    </style>
    <script
      type="text/javascript"
      src="e493de58-3b40-11ec-a980-0cc47a792c0a_id_e493de58-3b40-11ec-a980-0cc47a792c0a_files/wz_jsgraphics.js"
    ></script>
  </head>
  <body>
    <div
      style="
        position: absolute;
        left: 50%;
        margin-left: -297px;
        top: 0px;
        width: 595px;
        height: 841px;
        border-style: outset;
        overflow: hidden;
      "
    >
      <div style="position: absolute; left: 0px; top: 0px">
        <img
          src="e493de58-3b40-11ec-a980-0cc47a792c0a_id_e493de58-3b40-11ec-a980-0cc47a792c0a_files/background1.jpg"
          width="595"
          height="841"
        />
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 71.05px"
        class="cls_002"
      >
        <span class="cls_002">Orden de Pago Nº:</span>
      </div>
      <div
        style="position: absolute; left: 317.65px; top: 71.25px"
        class="cls_003"
      >
        <span class="cls_003">00005712</span>
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 83.05px"
        class="cls_002"
      >
        <span class="cls_002">Fecha:</span>
      </div>
      <div
        style="position: absolute; left: 317.65px; top: 83px"
        class="cls_002"
      >
        <span class="cls_002">29/10/2021</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 122.8px"
        class="cls_002"
      >
        <span class="cls_002">Paguese a:</span>
      </div>
      <div
        style="position: absolute; left: 77.65px; top: 122.8px"
        class="cls_002"
      >
        <span class="cls_002">1049-BRINCALTO SA</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 134.8px"
        class="cls_002"
      >
        <span class="cls_002">C.U.I.T.:</span>
      </div>
      <div
        style="position: absolute; left: 77.65px; top: 134.8px"
        class="cls_002"
      >
        <span class="cls_002">30714665681</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 152.8px"
        class="cls_002"
      >
        <span class="cls_002">Dirección:</span>
      </div>
      <div
        style="position: absolute; left: 77.65px; top: 152.8px"
        class="cls_002"
      >
        <span class="cls_002"
          >RUTA 36 KM 16 ESTAFETA (MENDOZA, LAVALLE) - C.P.: 5543</span
        >
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 170.8px"
        class="cls_002"
      >
        <span class="cls_002">LA CANTIDAD DE PESOS:</span>
      </div>
      <div
        style="position: absolute; left: 152.14px; top: 170.75px"
        class="cls_002"
      >
        <span class="cls_002">217,800.00</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 182.8px"
        class="cls_002"
      >
        <span class="cls_002">SON:</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 224.85px"
        class="cls_002"
      >
        <span class="cls_002">SEGUN EL SIGUIENTE DETALLE:</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 242.6px"
        class="cls_002"
      >
        <span class="cls_002">BANCO CREDICOOP</span>
      </div>
      <div
        style="position: absolute; left: 155.65px; top: 242.6px"
        class="cls_002"
      >
        <span class="cls_002">21350033</span>
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 242.6px"
        class="cls_002"
      >
        <span class="cls_002">VIAJES</span>
      </div>
      <div
        style="position: absolute; left: 425.65px; top: 242.55px"
        class="cls_002"
      >
        <span class="cls_002">10/12/2021</span>
      </div>
      <div
        style="position: absolute; left: 530.49px; top: 242.55px"
        class="cls_002"
      >
        <span class="cls_002">55,000.00</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 253.9px"
        class="cls_002"
      >
        <span class="cls_002">BANCO CREDICOOP</span>
      </div>
      <div
        style="position: absolute; left: 155.65px; top: 253.9px"
        class="cls_002"
      >
        <span class="cls_002">21350014</span>
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 253.9px"
        class="cls_002"
      >
        <span class="cls_002">VIAJES</span>
      </div>
      <div
        style="position: absolute; left: 425.65px; top: 253.85px"
        class="cls_002"
      >
        <span class="cls_002">06/12/2021</span>
      </div>
      <div
        style="position: absolute; left: 530.49px; top: 253.85px"
        class="cls_002"
      >
        <span class="cls_002">55,000.00</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 265.2px"
        class="cls_002"
      >
        <span class="cls_002">BANCO CREDICOOP</span>
      </div>
      <div
        style="position: absolute; left: 155.65px; top: 265.2px"
        class="cls_002"
      >
        <span class="cls_002">21350095</span>
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 265.2px"
        class="cls_002"
      >
        <span class="cls_002">VIAJES</span>
      </div>
      <div
        style="position: absolute; left: 425.65px; top: 265.15px"
        class="cls_002"
      >
        <span class="cls_002">30/11/2021</span>
      </div>
      <div
        style="position: absolute; left: 530.49px; top: 265.15px"
        class="cls_002"
      >
        <span class="cls_002">53,500.00</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 276.5px"
        class="cls_002"
      >
        <span class="cls_002">BANCO CREDICOOP</span>
      </div>
      <div
        style="position: absolute; left: 155.65px; top: 276.5px"
        class="cls_002"
      >
        <span class="cls_002">21350111</span>
      </div>
      <div
        style="position: absolute; left: 227.65px; top: 276.5px"
        class="cls_002"
      >
        <span class="cls_002">VIAJES</span>
      </div>
      <div
        style="position: absolute; left: 425.65px; top: 276.45px"
        class="cls_002"
      >
        <span class="cls_002">24/11/2021</span>
      </div>
      <div
        style="position: absolute; left: 530.49px; top: 276.45px"
        class="cls_002"
      >
        <span class="cls_002">54,300.00</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 304.8px"
        class="cls_002"
      >
        <span class="cls_002">EN CONCEPTO DE:</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 321.05px"
        class="cls_002"
      >
        <span class="cls_002">FCA 0001-00001527</span>
      </div>
      <div
        style="position: absolute; left: 171.59px; top: 321px"
        class="cls_002"
      >
        <span class="cls_002">108,900.00</span>
      </div>
      <div
        style="position: absolute; left: 245.65px; top: 321px"
        class="cls_002"
      >
        <span class="cls_002">21/10/2021</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 332.35px"
        class="cls_002"
      >
        <span class="cls_002">FCA 0001-00001528</span>
      </div>
      <div
        style="position: absolute; left: 171.59px; top: 332.3px"
        class="cls_002"
      >
        <span class="cls_002">108,900.00</span>
      </div>
      <div
        style="position: absolute; left: 245.65px; top: 332.3px"
        class="cls_002"
      >
        <span class="cls_002">21/10/2021</span>
      </div>
      <div
        style="position: absolute; left: 17.65px; top: 361.65px"
        class="cls_002"
      >
        <span class="cls_002">O B S E R V A C I O N E S :</span>
      </div>
      <div
        style="position: absolute; left: 59.6px; top: 795.05px"
        class="cls_002"
      >
        <span class="cls_002">CONFECCIONO</span>
      </div>
      <div
        style="position: absolute; left: 273.85px; top: 795.05px"
        class="cls_002"
      >
        <span class="cls_002">AUTORIZO</span>
      </div>
      <div
        style="position: absolute; left: 453px; top: 795.05px"
        class="cls_002"
      >
        <span class="cls_002">RECIBI CONFORME</span>
      </div>
    </div>
  </body>
</html>



  
            ${tableContent}
  `;
}

module.exports = generateRemitoHtml;
