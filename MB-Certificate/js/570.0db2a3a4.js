"use strict";(self["webpackChunkpure_vue"]=self["webpackChunkpure_vue"]||[]).push([[570],{3107:function(e,t,a){a.r(t),a.d(t,{default:function(){return l}});var r=a(3396),i=a(6824);const n=["src"];function s(e,t,a,s,o,c){return(0,r.wg)(),(0,r.j4)(i.o,{justify:"center"},{default:(0,r.w5)((()=>[(0,r._)("div",null,[o.preview?((0,r.wg)(),(0,r.iD)("iframe",{key:0,src:o.base_64,ref:"pdfIframe"},null,8,n)):(0,r.kq)("",!0)])])),_:1})}a(8858),a(1318),a(3228),a(560);var o=a(2492),c=a.n(o),f=a(8974),u=a(5479),d={data(){return{preview:!1,base_64:""}},async mounted(){const e=new URL(window.location.href),t=new URLSearchParams(e.search),a=t.get("param1"),r=t.get("param2"),{data:i}=await f.Z.getDataQrCode(a,r);if("not found"===i.msg)this.showAlert("error","Certificate Not Found !!");else{const e=[];e.push({prefix:i.data[0].prefix,name:i.data[0].name}),await this.createPDF(i.data[0],e),this.preview=!0}},methods:{showAlert(e,t){c().fire({position:"center",icon:e,title:t,showConfirmButton:!1,allowOutsideClick:!1})},async createPDF(e,t){const a=await u.Z.certification_pdf(t,e);this.base_64=a,a.getDataUrl((e=>{this.base_64=e;const t=this.$refs.pdfIframe;t.src=e,t.style.width=`${window.innerWidth}px`,t.style.height=`${window.innerHeight}px`}))}}},w=a(89);const h=(0,w.Z)(d,[["render",s]]);var l=h}}]);
//# sourceMappingURL=570.0db2a3a4.js.map