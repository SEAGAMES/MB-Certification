import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

const createPDF = async (PdfForm) => {
  let docDefinition = PdfForm;
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    THSarabunNew: {
      normal: 'Sarabun-Regular.ttf',
      // normal: 'Sarabun-Light.ttf',
      bold: 'Sarabun-Bold.ttf',
      italics: 'Sarabun-Thin.ttf',
      bolditalics: 'Sarabun-Light.ttf'

    },
    Fontello: {
      normal: 'fontello.ttf',
      bold: 'fontello.ttf',
      italics: 'fontello.ttf',
      bolditalics: 'fontello.ttf'
    }
  };
  await pdfMake.createPdf(docDefinition).open();
};

const create_pdf = async () => {
  console.log('มา')
  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',

    info: {
      title: 'Certificate',
      author: "Bam",
      subject: 'Certificate',
      keyword: 'cer'

    },
    styles: {
      mid: {
        alignment: 'center'
      },
      topic: {
        bold: true,
        fontSize: 12,

      },
      right: {
        alignment: 'right'
      },
      icon: { font: 'Fontello' }

    },
    watermark: { text: 'ตัวอย่าง', color: 'blue', opacity: 0.2, fontSize: 50, bold: false, italics: false },
    //content: run(excel, form),

    // images: {
    //     logo: mulogo.mulogo,
    //     sign: mulogo.sign,
    //     footer: mulogo.footer,
    // },
    defaultStyle: {
      lineHeight: 1.6,
      font: 'THSarabunNew',
      fontSize: 18,
      alignment: 'center'

    },

  }
  pdfMake.fonts = {
    THSarabunNew: {
      normal: 'Sarabun-Regular.ttf',
      // normal: 'Sarabun-Light.ttf',
      bold: 'Sarabun-Bold.ttf',
      italics: 'Sarabun-Thin.ttf',
      bolditalics: 'Sarabun-Light.ttf'

    },
    Fontello: {
      normal: 'fontello.ttf',
      bold: 'fontello.ttf',
      italics: 'fontello.ttf',
      bolditalics: 'fontello.ttf'
    }
  }
  //pdfMake.createPdf(docDefinition).download('เลขที่'+'s'+'-'+'pdf.building'+'-แจ้งซ่อม.pdf');
  //return pdfMake.createPdf(docDefinition)
  //pdfMake.createPdf(docDefinition).open()
  await createPDF(docDefinition);
}

export default {
  createPDF,
  create_pdf
};
