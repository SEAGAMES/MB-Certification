
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from "pdfmake/build/vfs_fonts"


// const img = require('@/assets/logo.png')
const mulogo = require('@/assets/img/logojs')
pdfMake.vfs = pdfFonts.pdfMake.vfs


const testPDF = () => {
  const result = 'ทดสอบ'
  return result
}

const create_pdf = (excel, form) => {
    
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
            logo: mulogo.mulogo,
            sign: mulogo.sign,
            footer: mulogo.footer,
        },
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
    pdfMake.createPdf(docDefinition).open()
}

function run(excel, form) {
    let s = []
    excel.forEach((e, index) => {
        s.push(
            {
                image: 'logo',
                width: 80,


            },
            {
                text: 'CERTIFICATION NUMBER  ' + form.pj_code + String(index + 1).padStart(4, '0'),
                fontSize: 9,
                absolutePosition: { x: 590, y: 40 }
            },

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
  create_pdf,
  testPDF
}
