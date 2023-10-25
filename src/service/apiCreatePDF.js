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
  //pdfMake.createPdf(docDefinition).open()
  const pdfDocGenerator = pdfMake.createPdf(docDefinition)
  return pdfDocGenerator
};


const certification_pdf = async (excel, form) => {
  console.log(form)
  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',

    info: {
      title: 'Certificate-' + form.language,
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
    //watermark: { text: 'ตัวอย่าง', color: 'blue', opacity: 0.2, fontSize: 50, bold: false, italics: false },
    content: run(excel, form),

    images: {
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


function signOption(form) {
  let data = ''
  if (form.language === 'TH') {
    if (form.two_sign) {
      if (form.sign) {
        console.log('TH 2Sign Sign')
        data =
        {
          columns: [
            [
              // second column consists of paragraphs
              {
                image: 'sign',
                width: 250,
                height: 80,
                absolutePosition: { x: -200, y: 410 }
              },
              // {
              //   text: 'ศาสตราจารย์ ดร. นายแพทย์นรัตถพล เจริญพันธุ์',
              //   fontSize: 12,
              //   bolditalics: true,
              //   absolutePosition: { x: -220, y: 495 }
              // },
              // {
              //   text: 'ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล', fontSize: 12, bolditalics: true,
              //   absolutePosition: { x: -220, y: 520 }
              // }
            ],
            // [
            //   // second column consists of paragraphs
            //   // {
            //   //   text: '(............................................)',
            //   //   absolutePosition: { x: 335, y: 450 }
            //   // },
            //   {
            //     text: `${form.add_name}`,
            //     fontSize: 12,
            //     bolditalics: true,
            //     absolutePosition: { x: 330, y: 495 }
            //   },
            //   {
            //     text: `${form.position}`, fontSize: 12, bolditalics: true,
            //     absolutePosition: { x: 335, y: 520 }
            //     // absolutePosition: form.add_name.length <= 30 ? { x: 520 - countDivisions(form.add_name.length), y: 490 } : { x: 450, y: 490 }
            //   },
            // ]
          ]
        }
      } else { //TH 2 ลายเซ็น ผอ. ไม่เซ็น
        console.log('TH 2Sign NoSign')
      }
    } else { // 1 ลายเซ็น 
      if (form.sign) { // TH 1 ลายเซ็น ผอ. เซ็น
        data = [
          {
            image: 'sign',
            width: 250,
            height: 80,
            absolutePosition: { x: 90, y: 410 }
          }
        ]
        console.log('TH 1Sign Sign')
      } else { // 1 ลายเซ็น ผอ. ไม่เซ็น
        console.log('TH 1Sign Sign')
      }
    }
  } else { // ENG
    if (form.two_sign) {
      if (form.sign) {
        console.log('ENG 2Sign Sign')
        data = [
          {
            image: 'sign',
            width: 250,
            height: 80,
            absolutePosition: { x: -200, y: 410 }
          },
        ]
      } else { // ENG 2 ลายเซ็น ผอ. ไม่เซ็น
        console.log('ENG 2Sign NoSign')
        data = [
          // {
          //   text: '(............................................)',
          //   absolutePosition: { x: -205, y: 450 }
          // },
          // {
          //   text: '(............................................)',
          //   absolutePosition: { x: 335, y: 450 }
          // }
        ]
      }
    } else { // 1 ลายเซ็น 
      if (form.sign) { // ENG 1 ลายเซ็น ผอ. เซ็น
        console.log('ENG 1Sign Sign')
        data = [
          {
            image: 'sign',
            width: 250,
            height: 80,
            absolutePosition: { x: 90, y: 415 }
          }
        ]
      } else { // ENG 1 ลายเซ็น ผอ. ไม่เซ็น
        console.log('ENG 1Sign Sign')
        data = [
          // {
          //   text: '(............................................)',
          //   absolutePosition: { x: 70, y: 455 }
          // }
        ]
      }
    }
  }
  return data
}

function run(excel, form) {
  let s = []
  console.log(form.pj_code.length)
  signOption(form)
  excel.forEach((e, index) => {
    s.push(
      {
        image: 'logo',
        width: 80
      },
      {
        text: 'CERTIFICATION NUMBER  ' + form.currentYear + '-' + form.pj_code + String(index + 1).padStart(4, '0'),
        fontSize: 9,
        absolutePosition: { x: 590, y: 40 }
      },

      (form.pj_code.length <= 4) ? { qr: form.pj_code + String(index + 1).padStart(4, '0'), fit: '60', absolutePosition: { x: 708, y: 60 } } : { qr: form.pj_code + String(index + 1).padStart(4, '0'), fit: '60', absolutePosition: { x: 728, y: 60 } },

      (form.language === "Eng") ? { text: 'Institute of  Molecular Biosciences', color: '#1565C0', fontSize: 22 } : {},
      (form.language === "Eng") ? { text: 'Mahidol University ', color: '#1565C0', fontSize: 22 } : {},

      (form.language === "TH") ? { text: 'เกียรติบัตรนี้ให้ไว้เพื่อแสดงว่า', margin: [0,15,0,0] } : { text: 'This is to certify that' },

      {
        text: e.prefix + ' ' + e.name, color: '#0D47A1', fontSize: 28
      },

      (form.language === "TH") ? {
        text: 'เข้าอบรมเชิงปฏิบัติการเรื่อง '
      } : { text: 'participated in the practical training entitled' },

      (form.language === "TH") ? { text: "“" + form.pj_name + "”", color: '#1565C0', fontSize: 24 } : { text: form.pj_name, color: '#1565C0', fontSize: 24 },
      { text: form.date },

      (form.language === "TH") ? {
        text: 'ณ สถาบันชีววิทยาศาสตร์โมเลกุล มหาวิทยาลัยมหิดล'
      } : {},

      signOption(form),

      (form.two_sign) ? {
        columns: [
          [
            {
              text: 'ศาสตราจารย์ ดร. นายแพทย์นรัตถพล เจริญพันธุ์',
              fontSize: 12,
              bolditalics: true,
              absolutePosition: { x: -220, y: 495 }
            },
            {
              text: 'ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล', fontSize: 12, bolditalics: true,
              absolutePosition: { x: -220, y: 520 }
            }
          ],
          [
            {
              text: `${form.add_name}`,
              fontSize: 12,
              bolditalics: true,
              absolutePosition: { x: 330, y: 495 }
            },
            {
              text: `${form.position}`, fontSize: 12, bolditalics: true,
              absolutePosition: { x: 335, y: 520 }
            },
          ]
        ]
      } : {
        columns: [
          [
            {
              text: 'ศาสตราจารย์ ดร. นายแพทย์นรัตถพล เจริญพันธุ์',
              fontSize: 12,
              bolditalics: true,
              absolutePosition: { x: 80, y: 495 }
            },
            {
              text: 'ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล', fontSize: 12, bolditalics: true,
              absolutePosition: { x: 90, y: 520 }
            }
          ],
        ]
      } ,
      //  { columns: [
      //   {
      //     image: 'sign',
      //     width: 250,
      //     height: 80,
      //     absolutePosition: { x: -200, y: 400 }
      //   },
      //   {
      //     text: '(............................................)',
      //     absolutePosition: { x: 335, y: 450 }
      //   }
      // ]},

      // {
      //   alignment: 'justify',

      //   columns: [
      //     (form.language === "TH") ? {
      //       text: 'ศาสตราจารย์ ดร. นายแพทย์นรัตถพล  เจริญพันธุ์', fontSize: 12, bolditalics: true,
      //       absolutePosition: { x: 183, y: 490 }
      //     } : {
      //       text: 'Professor Narattaphol Charoenphandhu, M.D., Ph.D.', fontSize: 12, bolditalics: true,
      //       absolutePosition: { x: 170, y: 500 }
      //     },
      //     {
      //       text: `${form.add_name}`, fontSize: 12, bolditalics: true,
      //       absolutePosition: { x: 520, y: 500 }
      //       // absolutePosition: form.add_name.length <= 30 ? { x: 520 - countDivisions(form.add_name.length), y: 490 } : { x: 450, y: 490 }
      //     },
      //   ]// obj.reason.length === 2 ? [0, 0, 0, -20]
      // },
      // {
      //   alignment: 'justify',

      //   columns: [
      // (form.language === "TH") ? {
      //   text: 'ผู้อำนวยการสถาบันชีววิทยาศาสตร์โมเลกุล', fontSize: 12, bolditalics: true,
      //   absolutePosition: { x: 195, y: 520 }
      // } : { text: 'Director', fontSize: 12, bolditalics: true, absolutePosition: { x: 280, y: 520 } },
      // {
      //   text: `${form.position}`, fontSize: 12, bolditalics: true,
      //   absolutePosition: { x: 475, y: 520 }
      //   // absolutePosition: form.add_name.length <= 30 ? { x: 520 - countDivisions(form.add_name.length), y: 490 } : { x: 450, y: 490 }
      // },
      //   ]// obj.reason.length === 2 ? [0, 0, 0, -20]
      // },
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
