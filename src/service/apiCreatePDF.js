import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

import imgFromBase64 from '../assets/img/logo_mu'

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
  pdfMake.createPdf(docDefinition).open()
  const pdfDocGenerator = pdfMake.createPdf(docDefinition)
  return pdfDocGenerator
};

const certification_pdf = async (excel, form) => {
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
    content: run(excel, form),

    images: {
    //   // logo: mulogo.mulogo,
    //   // sign: mulogo.sign,
      // footer: mulogo.footer,
      logo: imgFromBase64.logo_mu,
      sign: imgFromBase64.mysign,
      footer: imgFromBase64.myfoot

    },
    defaultStyle: {
      lineHeight: 1.6,
      font: 'THSarabunNew',
      fontSize: 18,
      alignment: 'center'
    },

  }
  const result = await createPDF(docDefinition);
  return result
}

function run(excel, form) {
  let s = []
  excel.forEach((e, index) => {
    s.push(
      {
        image: 'logo',
        width: 80
      },
      {
        text: 'CERTIFICATION NUMBER  ' + form.pj_code + String(index + 1).padStart(4, '0'),
        fontSize: 9,
        absolutePosition: { x: 590, y: 40 }
      },

      { qr: form.pj_code + String(index + 1).padStart(4, '0') , fit: '60', absolutePosition: { x: 710, y: 60 }},

      {
        text: 'เกียรติบัตรนี้ให้ไว้เพื่อแสดงว่า', margin: [5, 16]
      },
      {
        text: e.prefix + '' + e.name, color: '#1206AA', fontSize: 26
      },
      {
        text: 'เข้าอบรมเชิงปฏิบัติการเรื่อง '
      },
      { text: "“" + form.pj_name + "”", color: '#1206AA', fontSize: 24 },
      { text: form.date },
      {
        text: 'ณ สถาบันชีววิทยาศาสตร์โมเลกุล มหาวิทยาลัยมหิดล'
      },
      (form.sign) ? {
        image: 'sign',
        width: 250,
        height: 80,

      } : {},
      {
        text: 'ศาสตราจารย์ ดร. นายแพทย์นรัตถพล  เจริญพันธุ์ \n ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล', fontSize: 12, bolditalics: true,
        absolutePosition: { x: 40, y: 490 }
      },
      {
          image: 'footer',
          width: 842,
          height: 50,
          absolutePosition: { x: 40, y: 550 }, pageBreak: 'after'
      },

    )
  })
  return s
}

export default {
  createPDF,
  certification_pdf
};
